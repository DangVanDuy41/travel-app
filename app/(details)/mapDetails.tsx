
import { Text, TouchableOpacity, View } from 'react-native'
import { router, useLocalSearchParams } from 'expo-router';
import Map from '../../components/Map';
import { Itinerary } from '../../types/Trip';
import { point } from '@turf/helpers';
import { getDirectionLocation } from '../../utils/direction';
import { useQuery } from '@tanstack/react-query';
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import { useLocationCurrent } from '../../utils/permisstion';
import React, { useEffect, useState } from 'react';
import LocationInMap from '../../components/LocationInMap';
import { AntDesign, FontAwesome } from '@expo/vector-icons';
import { ScrollView } from 'react-native-gesture-handler';
import moment from 'moment';
import Animated, { FadeIn } from 'react-native-reanimated';

const MapDirection = () => {

    const { itinerary, day } = useLocalSearchParams();
    const itineraryDestinations: Itinerary = JSON.parse(itinerary as string) || undefined;
    const dayNumber: number = JSON.parse(day as string) || undefined;
    const [userLocation, setUserLocation] = useState<[number, number] | null>(null);
    const [flyToLocation, setFlyToLocation] = useState<{ lat: number, lon: number } | undefined>(undefined);
    const [address, setAddress] = useState<string>('')
    const points =
        itineraryDestinations.destinations.map(destination =>
            point([+destination.location.lon, +destination.location.lat])
        )

    const locations: [number, number][] = itineraryDestinations.destinations.map(destination => [
        + destination.location.lon,
        + destination.location.lat
    ]);

    const { data } = useQuery({
        queryKey: ['direction'],
        queryFn: () => getDirectionLocation([userLocation!, ...locations]),
        enabled: userLocation !== null,
        gcTime:0,
        staleTime:0
    })

    const directionCoordinate = data?.routes[0];

    const handleCurrent = () => {
        if (userLocation) {
            setFlyToLocation({ lat: userLocation[1], lon: userLocation[0] })
        }
    }

    useEffect(() => {
        const getUserLocation = async () => {
            const response = await useLocationCurrent()
            if (response) {
                const { lat, lon } = response;
                setUserLocation([lon, lat])
                setFlyToLocation({ lat: lat, lon: lon })
            }
        }
        getUserLocation();
    }, [])

    return (
        <View className='flex-1'>
            <Map
                points={points}
                directionCoordinate={directionCoordinate?.geometry.coordinates}
                flyToLocation={flyToLocation}
            />
            <View
                className={`absolute top-14 left-5 right-5 bg-black rounded-lg`}

            >
                {address &&
                    <Animated.View entering={FadeIn.delay(200)} className='py-6 px-4'>
                        <Text className='text-white text-center text-xl font-semibold'>
                            {address}
                        </Text>
                    </Animated.View>
                }
            </View>
            <TouchableOpacity
                className='p-[10] absolute right-[10] top-[50%] bg-black rounded-full'
                onPress={handleCurrent}
            >
                <FontAwesome name="circle-o" size={24} color="white" />
            </TouchableOpacity>

            <BottomSheet
                index={0}
                snapPoints={['20%', '50%']}
            >
                <BottomSheetView
                    style={{ padding: 10 }}
                >

                    <ScrollView
                        style={{ maxHeight: 420 }}
                        showsVerticalScrollIndicator={false}
                    >
                        <View className='mb-3 flex-row '>
                            <TouchableOpacity onPress={() => router.back()} className='px-5 mr-6'>
                                <AntDesign name="closecircleo" size={40} color="black" />
                            </TouchableOpacity>
                            <View className='items-center'>
                                <Text className='pb-2 text-xl font-medium'>Ngày {dayNumber}</Text>
                                <View className='flex-row gap-4'>
                                    <Text className='text-gray-500 text-base'>{moment(itineraryDestinations.day).format('DD/MM/YYYY')}</Text>
                                    <Text className='text-gray-500 text-base'>{itineraryDestinations.destinations.length} địa điểm</Text>
                                </View>
                            </View>
                        </View>
                        {itineraryDestinations.destinations.map((destination, index) => (
                            <LocationInMap
                                setAddress={setAddress}
                                setFlyToLocation={setFlyToLocation}
                                key={destination.id} destination={destination}
                                distanceAndDuration={directionCoordinate?.legs[index]}
                            />
                        ))}
                    </ScrollView>
                </BottomSheetView>
            </BottomSheet >
        </View>

    )
}

export default MapDirection