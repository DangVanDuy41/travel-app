import { View, Text, Image, ScrollView, TouchableOpacity } from 'react-native'
import React from 'react'
import { useQuery } from '@tanstack/react-query'
import { getLocationByType } from '../api/location.api'
import { Entypo } from '@expo/vector-icons';
import { router } from 'expo-router';


interface Props {
    type: string | undefined,
}
const LocationPopular = ({ type }: Props) => {
    if (!type) {
        return
    }

    const { data } = useQuery({
        queryKey: ['location', type],
        queryFn: () => getLocationByType(type),
        staleTime: 10000,
    })
    
    return (
        <View className='h-60'>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {data?.map(location => {
                    return (
                        <TouchableOpacity
                            key={location.place_id}
                            className='mr-3 rounded-xl relative'
                            onPress={() => router.push("/(details)/location/" + location.place_id)}
                        >
                            <Image
                                className='w-[280] h-[230] rounded-2xl'
                                source={{ uri: location.thumbnail.url }}
                            />
                            <Text
                                numberOfLines={2} ellipsizeMode='head'
                                className='absolute text-white text-lg font-bold bottom-5 ml-3'
                            >
                                {location.name}
                            </Text>
                            <View className='absolute flex-row bg-white rounded-2xl p-2 right-6 mt-3 items-center'>
                                <Entypo name="location-pin" size={20} color="black" />
                                <Text className='font-semibold'>{location.address.city.substring(9)}</Text>
                            </View>
                        </TouchableOpacity>
                    )
                })}
            </ScrollView>
        </View>

    )
}

export default LocationPopular