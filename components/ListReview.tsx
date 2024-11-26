import { View, Text, Image, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'

import StarRating from './StartRating';
import { Review } from '../types/Review';


interface Props {
    reviews: Review[],
}

const ListReview = ({ reviews }: Props) => {

    return (
        <View>
            {reviews.map((item, index) => (
                <View className='mb-10' key={`${item.id}-${index}`} >
                    <View key={item.id} className="flex-row gap-1  ">
                        <Image
                            source={item.user.avatar ? { uri: item.user.avatar } : require('../assets/images/ImageUser.jpg')}
                            className="w-10 h-10 rounded-full"
                        />
                        <View className='rounded-lg flex-1'>
                            <Text className='font-medium text-lg'>{item.user.userName}</Text>
                            <StarRating starRating={item.starRate} size={15} />
                        </View>
                    </View>

                    <Text className='text-base mt-1 text-left' >{item.content}</Text>
                    {item.images.length > 0 && (
                        <ScrollView className='my-3' horizontal >
                            {item.images.map(image => (
                                <Image
                                    key={image.id}
                                    source={{ uri: image.url }}
                                    className='w-[200] h-[200] mr-3 rounded-lg'
                                />
                            ))}
                        </ScrollView>
                    )}

                </View>
            ))
            }
        </View >
    )
}

export default ListReview