import { View, StyleSheet, Text } from 'react-native'
import React from 'react'
import { useQuery } from '@tanstack/react-query'
import { getProfile } from '../api/profile.api'
import AntDesign from '@expo/vector-icons/AntDesign';
import ProfileInfo from './ProfileInfo';
import BackgroundAvatar from './BackgroundAvatar';
import { useAuth } from '../hooks/useAuth';
import Options from './Options';
import { MaterialIcons } from '@expo/vector-icons';
import { useModal } from '../hooks/useModalConfirm';


const Profile = () => {
    const { onLogout } = useAuth();
    const { showModal } = useModal();
    const { data } = useQuery({
        queryKey: ['profile'],
        queryFn: () => getProfile()
    })

    const handleLogout = () => {
        showModal(onLogout,
            <Text className='text-base font-bold'>Bạn có chắc chắn đăng xuất không?</Text>
        )
    }
    return (
        <View
            className='flex-1 bg-white'      
        >
            <BackgroundAvatar avatar={data?.avatar} />
            <View className='p-3 mt-10'>
                <ProfileInfo
                    title='Họ '
                    data={data?.firstName}
                    Icon={
                        <AntDesign name="user" size={24} color="black" />
                    }
                />
                <ProfileInfo
                    title='Tên'
                    data={data?.lastName}
                    Icon={
                        <AntDesign name="user" size={24} color="black" />
                    }
                />
            </View>
            <View style={styles.options}>
                <Options
                    title='Đổi mật khẩu'
                    Icon={
                        <MaterialIcons style={{ paddingHorizontal: 15 }} name="password" size={24} color="blue" />
                    }
                />
                <Options
                    title='Thay đổi thông tin'
                    Icon={
                        <AntDesign style={{ paddingHorizontal: 15 }} name="infocirlce" size={24} color="black" />
                    }
                />
                <Options
                    title='Đăng xuất'
                    Icon={
                        <AntDesign style={{ paddingHorizontal: 15 }} name="logout" size={24} color="red" />
                    }
                    event={handleLogout}
                />
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    border: {
        borderTopWidth: 1,
        borderBottomWidth: 1,
        borderColor: 'gray',
    },
    options: {
        marginTop: 30
    },
})
export default Profile