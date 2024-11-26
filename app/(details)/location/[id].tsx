import { View, Text, Image, Dimensions, TouchableOpacity, ScrollView, NativeSyntheticEvent, NativeScrollEvent } from 'react-native'
import React, { useEffect, useState } from 'react'
import { router, Stack, useLocalSearchParams } from 'expo-router'
import { useQuery } from '@tanstack/react-query';
import { getLocationById } from '../../../api/location.api';
import { AntDesign, Entypo } from '@expo/vector-icons';
import ReviewComponent from '../../../components/ReviewComponent';
import LocationPopular from '../../../components/LocationPopular';
import ListReview from '../../../components/ListReview';
import { getReviews } from '../../../api/review.api';
import { Review } from '../../../types/Review';
import Animated, { SlideInLeft } from 'react-native-reanimated';


const LocationDetail = () => {
    const { id } = useLocalSearchParams();
    const { width } = Dimensions.get('window');
    const [active, setActive] = useState<number>(0);
    const [page, setPage] = useState<number>(1);
    const [data, setData] = useState<Review[]>([]);
    const options = ['Overview', 'Reviews(125)'];

    const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
        if (active === 1) {
            const { layoutMeasurement, contentOffset, contentSize } = event.nativeEvent;
            const isCloseToBottom = layoutMeasurement.height + contentOffset.y >= contentSize.height - 0.1;
            if (isCloseToBottom && review.data?.data && review.data?.data.length > 0) {
                setPage(prev => prev + 1);
            }
        }

    };

    const { data: location } = useQuery({
        queryKey: ['location', id],
        queryFn: () => getLocationById(id)
    })
    const review = useQuery({
        queryKey: ['reviews', page],
        queryFn: () => getReviews(Number(id), page)
    })


    useEffect(() => {
        if (data) {
            setData((prevData) => [...prevData, ...review.data?.data || []]);
        }
    }, [review.data?.data]);
    return (
        <>
            <Stack.Screen
                options={{
                    headerTransparent: true,
                    title: "",
                    headerLeft: () => (
                        <TouchableOpacity onPress={() => router.back()}>
                            <AntDesign name="leftcircleo" size={30} color="white" />
                        </TouchableOpacity>

                    )
                }}
            />
            <View className='flex-1 bg-white'>
                <ScrollView
                    onScroll={handleScroll}
                >
                    <Image
                        source={{ uri: location?.thumbnail.url }}
                        style={{ width, height: 400 }}
                    />
                    <View className='p-3 mt-[-25] bg-[#ffffff] rounded-[30px]'>
                        <Text className='text-2xl font-semibold my-2'>{location?.name}</Text>
                        <View className='flex-row gap-2'>
                            <Entypo name="location-pin" size={24} color="grey" />
                            <Text className='text-base  text-gray-500 font-semibold'>{location?.address.city}</Text>
                            <Text className='font-bold text-base'>⭐ 4.5(122)</Text>
                        </View>
                        <View className="flex-row items-center my-7">
                            {options.map((option, index) => (
                                <TouchableOpacity
                                    key={index}
                                    onPress={() => setActive(index)}
                                    className='mr-5'
                                >
                                    <Text
                                        className={`
                                         ${index === active ?
                                                'font-bold text-xl border-b-4 border-black py-2' :
                                                'text-base text-gray-600 font-medium'
                                            }
                                         `}
                                    >
                                        {option}
                                    </Text>
                                </TouchableOpacity>
                            ))}
                        </View>

                        {
                            active === 0 ? (
                                <Animated.View entering={SlideInLeft.delay(100).duration(300)} >
                                    <ReviewComponent locationId={location?.place_id} />
                                    <Text className='text-xl font-bold my-3'>About</Text>
                                    <ScrollView
                                        style={{ maxHeight: 400 }}
                                        nestedScrollEnabled
                                    >
                                        <Text className='text-base font-medium'>
                                            Dự án phát triển du lịch tại Đà Nẵng đang chú trọng vào việc tích hợp công nghệ thông minh để cải thiện trải nghiệm du khách. Với sự nổi tiếng của những địa danh như Bà Nà Hills, cầu Rồng và biển Mỹ Khê, Đà Nẵng không chỉ là trung tâm nghỉ dưỡng mà còn là điểm đến của các sự kiện quốc tế. Các dịch vụ đặt tour, khách sạn, và nhà hàng tại đây đều ngày càng được số hóa nhằm mang lại sự tiện lợi và hiệu quả cho du khách.
                                        </Text>
                                    </ScrollView>
                                    <Text className='text-xl font-bold mt-3 mb-7'>Các địa điểm liên quan</Text>
                                    <LocationPopular type={location?.type} />
                                </Animated.View>

                            ) : (
                                <View>
                                    <Text className='text-xl mb-6 font-bold'>Thế giới ngoài kia nói gì</Text>
                                    <ListReview reviews={data || []} />
                                </View>
                            )
                        }
                    </View>

                </ScrollView>

            </View>
        </>
    )
}

export default LocationDetail