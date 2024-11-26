import { View, Text, Image, StyleSheet } from 'react-native'
import React, { Dispatch } from 'react'
import { Destination } from '../types/Trip';
import { convertDuration } from '../utils/convertDuration';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Entypo } from '@expo/vector-icons';
import { router } from 'expo-router';

interface Props {
    destination: Destination;
    setFlyToLocation: Dispatch<React.SetStateAction<{
        lat: number;
        lon: number;
    } | undefined>>
    distanceAndDuration: any;
    setAddress: Dispatch<React.SetStateAction<string>>;
}
const image = require('../assets/images/ImageTravel.jpg');

const LocationInMap = ({ destination, distanceAndDuration, setFlyToLocation, setAddress }: Props) => {
    const duration = distanceAndDuration?.duration;
    const distance = (distanceAndDuration?.distance / 1000).toFixed(1);

    const handleButton = () => {
        setAddress(destination.location.display_name)
        setFlyToLocation({ lat: +destination.location.lat, lon: +destination.location.lon })
    }
    return (
        <View>
            <TouchableOpacity
                onPress={handleButton}
                style={styles.card} className='flex-row p-2 items-center'
            >
                <Image
                    style={styles.imageStyle}
                    source={
                        destination.location.thumbnail.url
                            ? { uri: destination.location.thumbnail.url }
                            : image
                    }
                />
                <View className='flex-1 ml-3'>
                    <Text
                        className='font-semibold text-white text-base'
                        numberOfLines={1}
                    >
                        {destination.location.name}
                    </Text>
                    <View style={styles.simpleInfoContainer}>
                        <Text style={styles.simpleInfoText}>
                            {`🚗 ${distance} km  |  ⏱️ ${convertDuration(duration)}`}
                        </Text>
                    </View>
                    <TouchableOpacity
                        onPress={()=>router.push(`/(details)/locationDirection?destination=${encodeURIComponent(JSON.stringify(destination))}`)}
                        className='p-2  mt-3 bg-white justify-center flex-row items-center rounded-lg'
                    >
                        <Entypo name="location-pin" size={24} color="red" />
                        <Text className='text-base font-semibold'>Đường đi</Text>
                    </TouchableOpacity>
                </View>

            </TouchableOpacity>
        </View>
    )
}
const styles = StyleSheet.create({
    card: {
        backgroundColor: 'black',
        borderRadius: 14,
        margin: 5,
        elevation: 10,
        shadowColor: '#000',
        borderColor: ' #E0E0E0',
        shadowOpacity: 0.3,
        shadowRadius: 4,
        shadowOffset: {
            width: 2,
            height: 2,
        },
    },
    simpleInfoContainer: {
        padding: 5,
        marginTop: 10,
        backgroundColor: '#f39c12',
        borderRadius: 8,
        alignItems: 'center',
    },
    simpleInfoText: {
        fontSize: 16,
        color: 'white',
        fontWeight: '500'

    },
    imageStyle: {
        borderRadius: 10,
        width: 100,
        height: 100,
        borderWidth: 2,
        borderColor: '#fff',
    }

})
export default LocationInMap