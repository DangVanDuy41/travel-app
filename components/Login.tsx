import { View, Text, TextInput, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { MaterialIcons } from '@expo/vector-icons';
import { useAuth } from '../hooks/useAuth';
import Animated, { SlideInRight } from 'react-native-reanimated';
const Login = () => {
    const { onLogin } = useAuth();
    const [email, setEmail] = useState<string>("duy@yopmail.com");
    const [password, setPassword] = useState<string>("12345");

    return (
        <Animated.View entering={SlideInRight} className='flex-1 '>
            <Text className='text-center text-4xl  p-6'>Đăng nhập</Text>
            <View className='justify-center items-center '>
                <View className='w-full p-3 gap-10'>
                    <View className='flex-row p-3 border rounded-xl '>
                        <MaterialIcons name="email" size={30} color="black" />
                        <TextInput
                            value={email}
                            keyboardType='email-address'
                            returnKeyType="next"                     
                            onChangeText={(email) => setEmail(email)}
                            placeholder='Email'
                            className='ml-3 text-xl flex-1'
                        />
                    </View>
                    <View className='flex-row p-3 border rounded-xl'>
                        <MaterialIcons name="password" size={30} color="black" />
                        <TextInput              
                            value={password}
                            onChangeText={(password) => setPassword(password)}
                            returnKeyType='done'
                            onSubmitEditing={()=> onLogin({ email, password })} 
                            secureTextEntry
                            placeholder='Password'
                            className='ml-3 text-xl flex-1'
                        />
                    </View>

                    <TouchableOpacity onPress={() => onLogin({ email, password })}>
                        <View className='bg-black p-3 rounded-3xl'>
                            <Text className='text-white text-center font-bold text-xl'>Login</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        </Animated.View>
    )
}

export default Login