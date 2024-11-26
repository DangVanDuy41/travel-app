import { View, Text, TextInput, TouchableOpacity, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { AntDesign, EvilIcons, FontAwesome, Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useLocationCurrent } from '../utils/permisstion';
import { useQuery } from '@tanstack/react-query';
import { getProfile } from '../api/profile.api';

const image = require("../assets/images/ImageUser.jpg")

const Header = () => {
    const [address, setAddress] = useState<string | null>('');

    const { data } = useQuery({
        queryKey: ['profile'],
        queryFn: () => getProfile()
    })

    useEffect(() => {
        const getAddress = async () => {
            const addressLocation = await useLocationCurrent();
            setAddress(addressLocation?.address ?? "Đang load...")
        }
        getAddress();
    }, [])

    return (
        <View className="h-[230] bg-black p-3 justify-center items-center">
            <View className='flex-row justify-between items-center w-[100%] p-3 '>
                <View className='flex-row justify-center items-center gap-3'>
                    <View className='border border-white rounded-full'>
                        <Image
                            source={data?.avatar ? { uri: data?.avatar} : image }
                            className='w-[40] h-[40] rounded-full'
                        />
                    </View>
                    <Text className="text-white font-semibold">
                        Chào, <Text className="text-white font-bold text-lg"> {data?.lastName}</Text>!
                    </Text>
                </View>
                <View>
                    <View className='flex-row items-center'>
                        <EvilIcons name="location" size={30} color="white" />
                        <Text className='text-white font-bold text-lg mr-2'>{address}</Text>
                        <AntDesign name="down" size={13} color="white" />
                    </View>
                </View>
            </View>

            <View className="py-3 bg-white flex-row justify-center items-center rounded-full mx-5 mt-4">
                <FontAwesome style={{ paddingHorizontal: 10 }} name="search" size={24} color="black" />
                <TextInput
                    className="flex-1 p-2 text-base"
                    placeholder="Tìm kiếm"
                    style={{ height: 35 }}
                />
                <TouchableOpacity onPress={() => router.push('/(modal)/createTrip')}>
                    <Ionicons style={{ paddingHorizontal: 10 }} name="options" size={32} color="black" />
                </TouchableOpacity>
            </View>
        </View>
    );

}

export default Header