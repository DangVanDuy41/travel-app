import { View, TextInput, StyleSheet, Image, Text } from 'react-native';
import React, { useState } from 'react';

import { TouchableOpacity } from 'react-native-gesture-handler';
import StarRating from './StartRating';
import { useMutation } from '@tanstack/react-query';
import { postReview } from '../api/review.api';
import { PostReviewData } from '../types/Review';

interface Props {
    locationId: number | undefined;
}
const ReviewComponent = ({ locationId }: Props) => {
    if(!locationId){
        return
    }
    const [content, setContent] = useState<string>('');
    const [starRate, setStarRate] = useState<number>(1);
    const [active, setActive] = useState<boolean>(false);

    const { mutate } = useMutation({
        mutationFn: (postReviewData: PostReviewData) => postReview(postReviewData),
        onError: (error) => {
            console.log(error)
        }
    })

    const submitReview = () => {
        mutate({ content, starRate, locationId })
        setContent('');
        setStarRate(0);
    }
    return (
        <View style={[styles.container]}>
            <View style={styles.row}>
                <View className='p-1 rounded-full'>
                    <Image
                        style={styles.image}
                        source={require('../assets/images/ImageUser.jpg')}
                    />
                </View>
                <View style={styles.flex1}>
                    <View style={active ? styles.inputFocusContainer : styles.inputContainer}>
                        <TextInput
                            style={styles.input}
                            value={content}
                            placeholder="Nhập nội dung đánh giá của bạn..."
                            onChangeText={(text) =>setContent(text)}
                            onFocus={() => setActive(true)}
                            onBlur={() => setActive(false)}
                        />
                    </View>
                    <View className=' flex-row mt-3 items-center justify-between'>
                        <StarRating size={35} starRating={starRate} setStarRating={setStarRate} />
                        <TouchableOpacity
                            disabled={ content.length  < 1}
                            onPress={submitReview}
                            className={`px-4 py-3 rounded-md ${content ? 'bg-black' : 'bg-gray-400'}`}>
                            <Text className='text-white font-medium'>Đăng</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 20,
        borderWidth: 1,
        borderRadius: 10
    },
    row: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        gap: 10,

    },
    image: {
        width: 40,
        height: 40,
    },
    flex1: {
        flex: 1,
    },
    inputContainer: {
        borderWidth: 1,
        borderRadius: 8,
        borderColor: 'lightgray',
        marginTop: 10,
        marginBottom: 2,
    },
    inputFocusContainer: {
        borderWidth: 2,
        borderColor: 'black',
        borderRadius: 8,
        marginTop: 10,
        marginBottom: 2,
    },
    input: {
        padding: 10,
        height: 40,
        borderRadius: 8,

    },
});

export default ReviewComponent;