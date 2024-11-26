import { TouchableOpacity, View, Text } from 'react-native'
import React, { useEffect, useMemo, useState } from 'react'
import { router, useLocalSearchParams } from 'expo-router';
import { Geocoding } from '../../types/Geocoding';
import Map from '../../components/Map'
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { getDirectionLocation } from '../../utils/direction';
import { point } from '@turf/helpers';
import { AntDesign, FontAwesome } from '@expo/vector-icons';
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import { convertDuration } from '../../utils/convertDuration';
import * as Location from 'expo-location';

const LocationDirection = () => {
    const { destination } = useLocalSearchParams();
    const location: Geocoding = JSON.parse(destination as string).location || null;
    const [userLocation, setUserLocation] = useState<[number, number] | null>(null);
    const [flyToLocation, setFlyToLocation] = useState<{ lat: number, lon: number } | undefined>(undefined);
    const [maneuver, setManeuver] = useState<{ type: string, instruction: string, modifier: string }[] | null>(null);
    const [directionCoordinate, setDirectionCoordinate] = useState<any>();
    const [isfolowUser, setIsFolowUser] = useState<boolean>(false)
    
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();

    const { data } = useQuery({
        queryKey: ['direction', userLocation],
        queryFn: () => getDirectionLocation([userLocation!, [+location.lon, +location.lat]]),
        placeholderData: keepPreviousData
    })

    const points = [point([+location.lon, +location.lat])]

    const handleCurrent = () => {
        if (userLocation) {
            setFlyToLocation({ lat: userLocation[1], lon: userLocation[0] })
        }
    }

    useEffect(() => {
        const routes = data?.routes[0];
        console.log(routes.legs[0])
        const maneuverArray = routes?.legs[0]?.steps.map((steps: any) => {
            return {
                type: steps.maneuver.type,
                instruction: steps.maneuver.instruction,
                modifier: steps.maneuver.modifier
            }
        })       
        setManeuver(maneuverArray)
        setDirectionCoordinate(routes)
    }, [data])
  

    useEffect(() => {
        const watchLocation = async () => {
            const subscription = await Location.watchPositionAsync(
                { accuracy: Location.Accuracy.High, timeInterval: 4000 },
                (location) => {
                    const { latitude, longitude } = location.coords;
                    setUserLocation([longitude, latitude]);
                }
            );
            return () => subscription.remove();
        };

        watchLocation();
    }, []);

    return (
        <View className='flex-1'>
            <Map
                flyToLocation={flyToLocation}
                directionCoordinate={directionCoordinate?.geometry.coordinates}
                points={points}
                isfolowUser={isfolowUser}
                setIsFolowUser={setIsFolowUser}

            />

            <View
                className={`absolute top-14 left-5 right-5 bg-black rounded-lg`}

            >
                <View className='py-6 px-4'>

                    <View>
                        <Text className='text-white text-center text-xl font-semibold'>
                            {maneuver?.[0].instruction}
                        </Text>
                    </View>

                </View>

            </View>

            <TouchableOpacity
                className='p-[10] absolute right-[10] top-[50%] bg-black rounded-full'
                onPress={handleCurrent}
            >
                <FontAwesome name="circle-o" size={24} color="white" />
            </TouchableOpacity>
            <TouchableOpacity
                className='p-[10] absolute left-[10] top-[60%] bg-black rounded-full'
                onPress={() => setIsFolowUser(true)}
            >
                <FontAwesome name="circle-o" size={24} color="white" />
            </TouchableOpacity>
            <BottomSheet
                index={1}
                snapPoints={['15%']}
            >
                <BottomSheetView
                    style={{ padding: 10 }}
                >
                    <View className='mb-3 flex-row'>
                        <TouchableOpacity onPress={() => router.back()} className='px-5 mr-6'>
                            <AntDesign name="closecircleo" size={50} color="black" />
                        </TouchableOpacity>
                        <View className='items-center'>
                            <Text className='pb-2 text-2xl font-medium'>{convertDuration(directionCoordinate?.duration)}</Text>
                            <View className='flex-row gap-4'>
                                <Text className='text-gray-500 text-base'>{(directionCoordinate?.distance / 1000).toFixed(2)} Km</Text>
                                <Text className='text-gray-500 text-base'>{`${hours}:${minutes}`}</Text>
                            </View>
                        </View>
                    </View>
                </BottomSheetView>
            </BottomSheet>
        </View>
    )
}

export default LocationDirection;