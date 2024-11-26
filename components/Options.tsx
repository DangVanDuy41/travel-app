import {  Text, TouchableOpacity, StyleSheet } from 'react-native'
import React, { ReactNode } from 'react'


interface Props {
    title: string,
    Icon: ReactNode
    event?:()=>void
}

const Options = ({ title, Icon,event }: Props) => {
    return (
        <TouchableOpacity onPress={event} style={styles.border} className='flex-row items-center p-2'>
            {Icon}
            <Text className='text-lg'>{title}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    border: {
        borderTopWidth: 1,
        borderColor: 'gray',
    },

})
export default Options