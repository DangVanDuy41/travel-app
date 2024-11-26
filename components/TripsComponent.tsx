import { View, Text, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { Trip } from '../types/Trip'
import moment from 'moment'
import { router } from 'expo-router'
import AntDesign from '@expo/vector-icons/AntDesign';

interface Props {
    trip: Trip
}

const TripsComponent = ({ trip }: Props) => {

    const handlePress = () => {
        const tripString = encodeURIComponent(JSON.stringify(trip));
        router.push(`/(details)/tripDetails?trip=${tripString}`)
    }

    return (
        <View className="rounded-xl mb-4 shadow-md">
            <Image
                source={{ uri: trip.location.thumbnail.url }}
                className="w-full h-[250] rounded-2xl"
                resizeMode="cover"
            />          
            <View className="absolute top-0 left-0 w-full h-full bg-black opacity-40 rounded-2xl" />
            <View className="p-4 absolute bottom-0 ">
                <View className='w-[200]'>
                    <Text numberOfLines={1} className="text-2xl text-white font-bold mb-2">{trip.title}</Text>
                    <Text className="text-sm font-medium text-white mb-2">
                        {moment(trip.startDate).format('DD/MM/YYYY')} - {moment(trip.endDate).format('DD/MM/YYYY')}
                    </Text>
                    <Text className="text-sm  font-medium text-white">{trip.location.name}</Text>
                </View>
            </View>
            <TouchableOpacity className='absolute top-32 right-4' onPress={handlePress}>
                <View className='p-5 bg-white rounded-full'>
                    <AntDesign name="arrowright" size={30} color="black" />
                </View>
            </TouchableOpacity>
        </View>
    )
}

export default TripsComponent