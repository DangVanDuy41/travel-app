import { Text, ScrollView, TouchableOpacity } from 'react-native'
import React, { Dispatch, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { getTypeLocation } from '../api/location.api'
import { locationTypeTranslations } from '../types/TypeLocation'

interface Props{
    setType:  Dispatch<React.SetStateAction<string>>
}
const Category = ({setType}:Props) => {

    const { data } = useQuery({
        queryKey: ['typeLocation'],
        queryFn: () => getTypeLocation()
    })
    
    const [active, setActive] = useState<number>(0);

    const handleActive = (index:number,type:string) =>{
        setActive(index);
        setType(type)
    }
    return (
        <ScrollView className='my-6' horizontal showsHorizontalScrollIndicator={false}>
            {data?.map((type, index) => (
                <TouchableOpacity
                    key={index}
                    onPress={() =>handleActive(index,type)}
                    className={`${active === index ? 'bg-black text-white' : ''} p-2 border font-semibold rounded-3xl mr-3`}
                >
                    <Text className={`${active === index ? ' text-white' : ''} font-semibold `}>
                        {locationTypeTranslations[type]}
                    </Text>
                </TouchableOpacity>
            ))
            }
        </ScrollView >
    )
}

export default Category