import { ScrollView, Text, View } from 'react-native'
import React, { useState } from 'react'
import { Stack } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import Header from '../../components/Header'
import Category from '../../components/Category'
import LocationPopular from '../../components/LocationPopular'
import LocationRecomment from '../../components/LocationRecomment'

const Index = () => {
  const [type,setType] = useState<string>("TOURIST_ATTRACTION");
  
  
  return (
    <ScrollView className='flex-1  bg-white'>
      <StatusBar style='light' backgroundColor='black' />
      <View className="border-b border-gray-300">
        <Stack.Screen
          options={{
            headerShown: true,
            header: () => <Header />
          }}
        />
      </View>
      <View className='p-3'>
        <Text className='text-2xl my-2 font-bold'>Tìm kiếm địa điểm yêu thích của bạn</Text>
        <Category  setType ={setType}/>
        <LocationPopular type={type} />
        <Text className='font-bold text-2xl my-3'>Gợi ý</Text>
        <LocationRecomment />
      </View>
    </ScrollView>
  )
}

export default Index