import { View, Text, Image, ScrollView, TouchableOpacity } from 'react-native'
import React from 'react'
import {  useQuery } from '@tanstack/react-query'
import { searchLocation } from '../api/location.api'
import { EvilIcons } from '@expo/vector-icons';

import { router } from 'expo-router';

const LocationRecomment = () => {
    const { data: locations } = useQuery({
        queryKey: ['location'],
        queryFn: () => searchLocation('')
    })


    return (
        <ScrollView >
            {locations?.map(location => (
                <TouchableOpacity
                    onPress={() => router.push("/(details)/location/" + location.place_id)}
                    key={location.place_id}
                    className='mb-5'
                >
                    <View className='flex-row gap-3'>
                        <Image
                            className='w-[100] h-[100] rounded-2xl'
                            source={{ uri: location.thumbnail.url }}
                        />
                        <View>
                            <Text className='text-base font-bold'>{location.name}</Text>
                            <View className='flex-row my-2'>
                                <EvilIcons name="location" size={24} color="gray" />
                                <Text className='text-gray-400'>{location.address.city.substring(9)}</Text>
                            </View>
                            <Text>
                                ⭐ <Text className='font-bold'>4.7</Text> (1048 reviews)
                            </Text>
                        </View>
                    </View>

                </TouchableOpacity>
            ))}
        </ScrollView>
    )
}

export default LocationRecomment