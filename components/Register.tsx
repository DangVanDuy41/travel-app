import { View, Text, TextInput, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'

import {  FontAwesome, MaterialIcons } from '@expo/vector-icons';
import { useAuth } from '../hooks/useAuth';
import Animated, { SlideInRight } from 'react-native-reanimated';


const Register = () => {

    const {onRegister} = useAuth();
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [firstName, setFirstName] = useState<string>("");
    const [lastName, setLastName] = useState<string>("");
    // const handleRegister = (authRegister: AuthRegister) => {
    //     if (email && password && email) {
    //         onRegister(authRegister)
    //     } else {
    //         ToastAndroid.show('Vui lòng nhập đủ thông tin', ToastAndroid.SHORT);
    //     }

    // }
    return (
        <Animated.View entering={SlideInRight}  className='flex-1 '>
            <Text className='text-center text-4xl  p-6'>Đăng ký tài khoản</Text>
            <View className='justify-center items-center '>
                <View className='w-full p-3 gap-10'>
                    <View className='flex-row p-3 border  rounded-lg'>
                        <FontAwesome name="user" size={30} color="black" />
                        <TextInput
                            value={firstName}                       
                            onChangeText={(firstName) => setFirstName(firstName)}
                            placeholder='Nhập Họ'
                            className='ml-3 text-xl flex-1'
                        />
                    </View>
                    <View className='flex-row p-3 border  rounded-lg'>
                        <FontAwesome name="user" size={30} color="black" />
                        <TextInput
                            value={lastName}                          
                            onChangeText={(lastName) => setLastName(lastName)}
                            placeholder='Nhập Tên'
                            className='ml-3 text-xl flex-1'
                        />
                    </View>
                    <View className='flex-row p-3 border  rounded-lg'>
                        <MaterialIcons name="email" size={30} color="black" />
                        <TextInput
                            value={email}
                            keyboardType='email-address'
                            onChangeText={(email) => setEmail(email)}
                            placeholder='Email'
                            className='ml-3 text-xl flex-1'
                        />
                    </View>
                    <View className='flex-row p-3 border  rounded-lg'>
                        <MaterialIcons name="password" size={30} color="black" />
                        <TextInput
                            value={password}
                            onChangeText={(password) => setPassword(password)}
                          //  secureTextEntry                      
                            placeholder='Password'
                            className='ml-3 text-xl flex-1'
                        />
                    </View>

                    <TouchableOpacity onPress={() => onRegister({email,password,firstName,lastName})}>
                        <View className='bg-black p-3 rounded-3xl'>
                            <Text className='text-white text-center font-bold text-xl'>Đăng ký</Text>
                        </View>
                    </TouchableOpacity>
                </View>

            </View>
        </Animated.View>
    )
}

export default Register