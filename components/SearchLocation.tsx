import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import Ionicons from '@expo/vector-icons/Ionicons';
import { EvilIcons } from '@expo/vector-icons';
import { useQuery } from '@tanstack/react-query';
import useDebounce from '../hooks/useDebouce';
import { searchLocation } from '../api/location.api';
import { Geocoding } from '../types/Geocoding';
import Animated, { useAnimatedStyle, withTiming, useSharedValue, SlideInRight } from 'react-native-reanimated';

interface Props {
    handleLocationId: (id: number) => void
}

const SearchLocation = ({ handleLocationId }: Props) => {

    const [searchText, setSearchText] = useState('');
    const animatedHeight = useSharedValue<number>(0);
    const debouncedSearchText = useDebounce(searchText, 500);
    const { data: locationData } = useQuery({
        queryKey: ['locations', debouncedSearchText],
        queryFn: () => searchLocation(debouncedSearchText),
        enabled: debouncedSearchText !== ''
    })

    useEffect(() => {
        if (locationData) {

            animatedHeight.value = withTiming(locationData.length * 70, { duration: 300 });
        } else {
            animatedHeight.value = withTiming(0, { duration: 300 });
        }
    }, [locationData]);

    const animatedStyle = useAnimatedStyle(() => {
        return {
            height: animatedHeight.value,
        };
    });

    const handleSelectAddress = (location: Geocoding) => {
        handleLocationId(location.place_id)
        setSearchText('');
    }
    return (
        <View >
            <Animated.View  entering={SlideInRight.delay(1000)} className={'px-3'} style={styles.card}>
                <Text className='text-xl px-6 font-bold py-3'>
                    Bạn muốn đi du lịch ở đâu ?
                </Text>
                <View className='p-3'>
                    <View className='flex-row justify-between items-center py-2 border rounded-md '>
                        <Ionicons name='search' style={{ paddingHorizontal: 10 }} size={20} />
                        <TextInput
                            className='flex-1 pr-2'
                            placeholder='Nhập địa điểm'
                            onChangeText={(text) => setSearchText(text)}
                            value={searchText}
                            
                        />
                    </View>
                </View>
                <Animated.ScrollView
                    className='py-2'
                    nestedScrollEnabled={true}
                    style={animatedStyle}         
                >
                    {locationData?.map((location) => (

                        <TouchableOpacity
                            onPress={() => handleSelectAddress(location)}
                            className='flex-1 border-b-2 '
                            key={location.place_id}
                        >
                            <View className='flex-row gap-3 py-3 w-[90%] '>
                                <EvilIcons name="location" size={30} color="red" />
                                <Text>{location.address.quarter}, {location.address.suburb}, {location.address.city}</Text>
                            </View>
                        </TouchableOpacity>

                    ))}
                </Animated.ScrollView>
            </Animated.View>
        </View>
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
    }
})
export default SearchLocation