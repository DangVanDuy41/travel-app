import { View } from 'react-native';
import React from 'react'
import { Stack } from 'expo-router';


import Profile from '../../components/Profile';

const MyProfile = () => {
 

  return (
    <>
      <View style={{ borderBottomWidth: 1, borderBottomColor: 'gray' }}>
        <Stack.Screen
          options={{
            headerShown: true,
            headerTitle: "Hồ sơ của tôi",
            headerTitleAlign: 'center',
            headerStyle: {
              backgroundColor: 'white',
            },
          }}
        />
      </View>
      <View className='flex-1'>  
          <Profile />     
      </View>
    </>

  )
}

export default MyProfile