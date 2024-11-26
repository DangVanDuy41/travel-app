import { View, Text, StyleSheet } from 'react-native'
import React from 'react'


interface Props {
    title: string,
    data: string | undefined,
    Icon: React.ReactNode
}

const ProfileInfo = ({ title, data, Icon }: Props) => {
    return (
        <View className='my-3 '>
            <Text className='text-base font-bold mb-1'>{title}</Text>
            <View style={styles.border}>
                <View className='p-3 flex-row justify-between  items-center'>
                    <Text className='text-lg font-medium'>{data}</Text>
                    {Icon}
                </View>
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    border: {
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 10
    },
})
export default ProfileInfo