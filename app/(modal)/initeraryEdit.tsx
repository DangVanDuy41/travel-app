import { View, Text, ScrollView, useWindowDimensions, Image, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { router, Stack, useLocalSearchParams } from 'expo-router'
import { useMutation, useQuery } from "@tanstack/react-query";
import { createDestinationByItineraryId, deleteDestination, getInineraryByTripId } from "../../api/trip.api";

import SearchLocation from '../../components/SearchLocation';
import moment from 'moment';
import AntDesign from '@expo/vector-icons/AntDesign';
import Animated, { FadeIn, SlideInRight } from 'react-native-reanimated';
import { getDirection } from '../../utils/direction';
import { Destination, Itinerary } from '../../types/Trip';




const image = require('../../assets/images/ImageTravel.jpg');

const IniteraryEdit = () => {

    const { id } = useLocalSearchParams();
    const { width } = useWindowDimensions();
    const [distances, setDistances] = useState<{ [key: string]: { distance: number, duration: number } }>({});
    const { data, refetch } = useQuery({
        queryKey: ['initerary', Number(id)],
        queryFn: () => getInineraryByTripId(Number(id)),
    });

    const { mutateAsync } = useMutation({
        mutationFn: ({ itineraryId, locationId }: { locationId: number, itineraryId: number }) =>
            createDestinationByItineraryId(locationId, itineraryId)
    })

    const { mutateAsync: deleteDestinationMutate } = useMutation({
        mutationFn: ({ itineraryId, destinationId }: { destinationId: number, itineraryId: number }) =>
            deleteDestination(destinationId, itineraryId)
    })

    const handleLocationId = async (locationId: number, itineraryId: number) => {
        const response = await mutateAsync({ itineraryId, locationId })
        if (response) refetch()
    }

    const calculateDistance = async (from: any, to: any) => {
        const direction = await getDirection([+from.lon, +from.lat], [+to.lon, +to.lat]);
        const route = direction.routes[0]
        return {
            distance: route.distance / 1000,
            duration: route.duration / 3600
        };
    };

    const handleDeleteDestination = async (destinationId: number, itineraryId: number) => {
        const response = await deleteDestinationMutate({ destinationId, itineraryId });
        if (response) {
            const updatedDistances = { ...distances };
            delete updatedDistances[destinationId];
            setDistances(updatedDistances);
            await refetch();
        }
    };

    const handleButton = (itinerary: Itinerary,day:number) => {
        const encodedDestinations = encodeURIComponent(JSON.stringify(itinerary));
        router.push(`/(details)/mapDetails?itinerary=${encodedDestinations}&day=${day +1}`);
    };

    useEffect(() => {
        const calculateDistances = async () => {
            const distancesObj: { [key: string]: { distance: number, duration: number } } = {};
            if (data) {
                for (let i = 0; i < data.length; i++) {
                    const itinerary = data[i];
                    for (let j = 0; j < itinerary.destinations.length - 1; j++) {
                        const from = itinerary.destinations[j].location;
                        const to = itinerary.destinations[j + 1].location;
                        if (!distancesObj[itinerary.destinations[j].id]) {
                            const { distance, duration } = await calculateDistance(from, to);

                            distancesObj[itinerary.destinations[j].id] = {
                                distance: Number(distance.toFixed(2)),
                                duration: Number(duration.toFixed(1))
                            };
                        }
                    }
                }
            }
            setDistances({ ...distancesObj });
        };
        calculateDistances();
    }, [data]);

    return (
        <>
            <Stack.Screen
                options={{
                    title: " Chỉnh sửa lịch trình"
                }}
            />

            <ScrollView
                horizontal
                className='flex-1 '
                pagingEnabled
                showsHorizontalScrollIndicator={false}
            >
                {data?.map((itinerary, index) => (
                    <View
                        key={itinerary.id}
                        style={{ width, padding: 4, backgroundColor: 'white' }}
                    >
                        <Animated.View entering={FadeIn.delay(1000)} className='justify-center items-center mb-3'>
                            <Text className=' py-2 text-xl font-medium'>Ngày {index + 1}</Text>
                            <View className='flex-row gap-4'>
                                <Text className='text-gray-500 text-base'>{moment(itinerary.day).format('DD/MM/YYYY')}</Text>
                                <Text className='text-gray-500 text-base'>{itinerary.destinations.length} địa điểm</Text>
                                <Text className='text-gray-500 text-base'>{index + 1}/{data.length} Ngày</Text>
                            </View>
                        </Animated.View>
                        <SearchLocation handleLocationId={(locationId: number) => handleLocationId(locationId, itinerary.id)} />

                        <ScrollView
                            nestedScrollEnabled
                        >
                            {itinerary.destinations.length > 0 && (
                                itinerary.destinations.map((destination) => (
                                    <View key={destination.id} >
                                        <Animated.View
                                            entering={SlideInRight.delay(500)}
                                            style={styles.card} className='flex-row p-2'
                                        >
                                            <TouchableOpacity onPress={() => router.push(
                                                `/(details)/GeocodingDetails?location=${encodeURIComponent(JSON.stringify(destination.location))}`
                                            )}>
                                                <Image
                                                    style={{ borderRadius: 10, width: 100, height: 100 }}
                                                    source={
                                                        destination.location.thumbnail.url
                                                            ? { uri: destination.location.thumbnail.url }
                                                            : image
                                                    }
                                                />
                                            </TouchableOpacity>

                                            <View className='flex-1 ml-3 p-2'>
                                                <Text className='font-semibold text-gray-500' numberOfLines={4}>{destination.location.display_name}</Text>
                                            </View>
                                            <TouchableOpacity
                                                className='border rounded-full w-7 h-7 justify-center items-center'
                                                onPress={() => handleDeleteDestination(destination.id, itinerary.id)}
                                            >
                                                <AntDesign
                                                    name="close"
                                                    size={15}
                                                    color="black"
                                                />
                                            </TouchableOpacity>
                                        </Animated.View>

                                        <View className='px-2'>
                                            {itinerary.destinations.length > 1 && distances[destination.id] !== undefined && distances[destination.id] !== null && (
                                                <View style={styles.simpleInfoContainer}>
                                                    <Text style={styles.simpleInfoText}>
                                                        {`🚗 ${distances[destination.id].distance} km  |  ⏱️ ${distances[destination.id].duration} giờ`}
                                                    </Text>
                                                </View>
                                            )}
                                        </View>
                                    </View>
                                ))
                            )}
                        </ScrollView>
                        <TouchableOpacity
                            className='p-2 bg-white'
                            onPress={() => handleButton(itinerary,index)}
                        >
                            <View className='p-3 bg-black rounded-3xl'>
                                <Text className='text-center font-medium text-lg text-white'>Xem bảng đồ</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                ))}
            </ScrollView >


        </>
    )
}
const styles = StyleSheet.create({
    card: {
        backgroundColor: '#fff',
        borderRadius: 14,
        margin: 10,
        elevation: 10,
        shadowColor: '#000',
        shadowOpacity: 0.3,
        shadowRadius: 4,
        shadowOffset: {
            width: 2,
            height: 2,
        },
    },
    simpleInfoContainer: {
        padding: 5,
        backgroundColor: '#F0F0F0',
        borderRadius: 8,
        alignItems: 'center',
        marginVertical: 8,
    },
    simpleInfoText: {
        fontSize: 16,
        color: '#333',
    },
})
export default IniteraryEdit