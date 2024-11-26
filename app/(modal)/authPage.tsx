import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { router, Stack } from 'expo-router';
import Login from '../../components/Login';
import Register from '../../components/Register';
import Ionicons from '@expo/vector-icons/Ionicons';
import { StatusBar } from 'expo-status-bar';

const AuthPage = () => {
  const [active, setActive] = useState<boolean>(true);
  return (

    <View className='flex-1'>
      <Stack.Screen
        options={{
          headerTransparent: true,
          title: "",
         
        }}
      />
      <View className='flex-1'>
        <StatusBar style='light'  />
        <View className='flex-1 '>
          <View style={styles.radius} className='flex-row  bg-black justify-center pt-52  '>
            <TouchableOpacity className='text-white mx-4' onPress={() => setActive(true)} >
              <Text className={`p-3 bg-black text-white font-bold text-xl`}>Đăng nhập</Text>
            </TouchableOpacity>
            <TouchableOpacity className='text-white mx-4' onPress={() => setActive(false)}>
              <Text className={`p-3 bg-black text-white font-bold text-xl`} >Đăng ký</Text>
            </TouchableOpacity>
          </View>
          {active && <Login />}
          {!active && <Register />}
        </View>
      </View>
    </View>

  )
}
const styles = StyleSheet.create({
  radius: {
    borderBottomLeftRadius: 50,
    borderBottomRightRadius: 50
  },

})


export default AuthPage