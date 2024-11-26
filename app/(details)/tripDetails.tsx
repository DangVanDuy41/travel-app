import React, { useEffect, useRef, useState } from 'react';
import { router, Stack, useLocalSearchParams } from 'expo-router';
import { Trip, ShareTripType } from '../../types/Trip';
import { ScrollView, Dimensions, Image, View, Text, TouchableOpacity, ToastAndroid } from 'react-native';
import AntDesign from '@expo/vector-icons/AntDesign';
import { useMutation, useQuery } from '@tanstack/react-query';
import { getInineraryByTripId, getUserInTrip, shareTrip } from '../../api/trip.api';
import moment from 'moment';
import { useModal } from '../../hooks/useModalConfirm';
import ShareComponent from '../../components/ShareComponent';

const image = require('../../assets/images/ImageTravel.jpg');

const TripDetails = () => {
    const { trip } = useLocalSearchParams();
    const { width } = Dimensions.get('window');
    const tripData: Trip = JSON.parse(decodeURIComponent(Array.isArray(trip) ? trip[0] : trip));
    const date = `${moment(tripData.startDate).format('DD/MM/YYYY')} - ${moment(tripData.endDate).format('DD/MM/YYYY')}`
    const { showModal, hideModal } = useModal();
    const emailShareRef = useRef<string>('');
    const permissionRef = useRef<boolean>(true);
    const { data: itinerarys } = useQuery({
        queryKey: ['initerary', tripData.id],
        queryFn: () => getInineraryByTripId(tripData.id),
    });

    const { data: users } = useQuery({
        queryKey: ['users', tripData.id],
        queryFn: () => getUserInTrip(tripData.id),
    });

    const { mutateAsync } = useMutation({
        mutationKey: ['shareTrip', tripData.id],
        mutationFn: (shareTripType: ShareTripType) => shareTrip(shareTripType, tripData.id)
    });

    const handleShare = async () => {
        try {
            const response = await mutateAsync(
                {
                    email: emailShareRef.current,
                    tripPermission: permissionRef.current ? "READ" : "EDIT"
                }
            )
            if (response) {
                ToastAndroid.show('Chia sẻ thành công!', ToastAndroid.SHORT);
            }
        } catch (error) {
            ToastAndroid.show('Chia sẻ không thành công!', ToastAndroid.SHORT);
        } finally {
            hideModal()
        }

    }

    const handleButtonShare = () => {
        showModal(
            () => handleShare()
            ,
            <ShareComponent
                setEmailShare={emailShareRef}
                setPermission={permissionRef}
            />

        );
    };

    return (
        <>
            <Stack.Screen
                options={{
                    headerTransparent: true,
                    title: "",
                    headerLeft: () => (
                        <TouchableOpacity onPress={() => router.back()}>
                            <AntDesign name="arrowleft" size={27} color="white" />
                        </TouchableOpacity>
                    ),
                    headerRight: () => (
                        <TouchableOpacity onPress={handleButtonShare}>
                            <AntDesign name="sharealt" size={24} color="white" />
                        </TouchableOpacity>
                    )
                }}
            />
            <ScrollView className='flex-1 bg-white'>
                <Image

                    style={{ width: width, height: 300 }}
                    source={{ uri: tripData.image }}
                />
                <View className='px-4'>
                    <Text numberOfLines={2} className='text-2xl font-bold my-3'>{tripData.title}</Text>
                    <View className="flex-row items-center mb-3">
                        <AntDesign name="calendar" size={18} color="#4CAF50" />
                        <Text className='text-sm ml-2 text-gray-600'>{date}</Text>
                    </View>
                    <View className="flex-row items-center mb-3 w-[98%]">
                        <AntDesign name="enviromento" size={18} color="#4CAF50" />
                        <Text className="text-sm ml-2 text-gray-600">{tripData.location.display_name}</Text>
                    </View>
                    <View className='flex-row justify-between items-center'>
                        <Text className='mt-4 text-xl font-bold'>Lịch trình:</Text>
                        <Text onPress={() => router.push(`/(modal)/initeraryEdit?id=${tripData.id}`)}
                            className='mt-4 text-lg font-bolds text-blue-500 p-3'>Xem chi tiết</Text
                        >
                    </View>

                    <ScrollView
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        className='mt-3'
                    >
                        {itinerarys?.map((itinerary, index) => (
                            <View key={itinerary.id} className='mr-3 relative '>
                                <Image className='rounded-lg w-[200] h-[200] '
                                    source={
                                        itinerary.destinations[0]?.location?.thumbnail.url ?
                                            { uri: itinerary.destinations[0]?.location?.thumbnail.url } :
                                            image
                                    }
                                />
                                <Text
                                    style={{
                                        borderTopLeftRadius: 50,
                                        borderBottomLeftRadius: 50,

                                    }}
                                    className='absolute right-0 top-5 py-1 px-3 bg-black text-white font-medium'
                                >
                                    {`Ngày ${index + 1}`}
                                </Text>
                                <View className="absolute top-0 left-0 w-full h-full bg-black opacity-10 rounded-2xl" />
                                <View
                                    style={{
                                        borderTopRightRadius: 50,
                                        borderBottomRightRadius: 50,

                                    }} className='px-3 py-2 absolute bottom-0 left-0 bg-black'>
                                    <Text className='font-medium text-white'>{moment(itinerary.day).format('DD-MM-YYYY')}</Text>
                                    <Text className='font-medium  text-white'>{itinerary.destinations.length} Địa điểm</Text>
                                </View>
                            </View>
                        ))}
                    </ScrollView>
                    <View className='mt-6'>
                        <Text className='text-xl font-bold'>Thành Viên</Text>
                        <View className='mt-4 '>
                            {
                                users?.map((user, index) => (
                                    <View key={index} className='flex-row mb-2 gap-2'>
                                        <Image
                                            source={require('../../assets/images/ImageUser.jpg')}
                                            className='w-[40] h-[40] rounded-full'
                                        />
                                        <View>
                                            <Text className='font-medium text-gray-500'>{user.tripPermission}</Text>
                                            <Text className='font-medium text-gray-500'>{user.email}</Text>
                                        </View>
                                    </View>
                                ))
                            }
                        </View>
                    </View>
                </View>
            </ScrollView>
        </>
    );
};

export default TripDetails;