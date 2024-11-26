
import { useMutation } from '@tanstack/react-query'
import React, { createContext, useEffect, useState } from 'react'
import { AuthLogin, AuthRegister, AuthResponse } from '../types/Auth';
import { login, logout, register } from '../api/auth.api'
import { router } from 'expo-router'
import * as SecureStore from 'expo-secure-store';

interface Props {
    children: React.ReactNode
}

export interface PropsContext {
    isAuthentication: boolean,
    onLogin: (autLogin: AuthLogin) => void,
    onLogout: () => void,
    onRegister: (authRegister: AuthRegister) => void
}

export const AuthContext = createContext<PropsContext>({
    isAuthentication: false,
    onLogin: () => { },
    onLogout: () => { },
    onRegister: () => { }
})


const AuthProvider = ({ children }: Props) => {
    const [isAuthentication, setIsAuthentication] = useState<boolean>(false);

    const handleLoginOrRegiser = async (data: AuthResponse) => {
        await SecureStore.setItemAsync("accessToken", data.accessToken);
        await SecureStore.setItemAsync("refreshToken", data.refreshToken)
        setIsAuthentication(true)

    }

    const handleLogin = useMutation({
        mutationFn: (auth: AuthLogin) => login(auth),
        onSuccess: async (data) => {
            console.log(data);
            handleLoginOrRegiser(data)
        },
        onError(error) {
            console.log(error)
        },
    })
    const handleRegister = useMutation({
        mutationFn: (auth: AuthRegister) => register(auth),
        onSuccess: (data) => {
            handleLoginOrRegiser(data)
        },
        onError(error) {
            console.log(error)
        },
    })

    const handleLogout = useMutation({
        mutationFn: async () => {

            const token = await SecureStore.getItemAsync("refreshToken");
            if (token)
                return logout(token)
        },
        onSuccess: async () => {
            await SecureStore.deleteItemAsync("accessToken");
            await SecureStore.deleteItemAsync("refreshToken");
            await setIsAuthentication(false);
        },
        onError: (error) => {
            console.log(error)
        }

    })

    useEffect(() => {
        const loadToken = async () => {
            const token = await SecureStore.getItemAsync("accessToken");
            if (token)
                setIsAuthentication(true);
        }
        loadToken();
    }, [])

    useEffect(() => {
        if (!isAuthentication) {
            router.replace('/(modal)/authPage')
        } else {
            router.replace('/(tabs)')
        }
    }, [isAuthentication])

    const value = {
        isAuthentication,
        onLogin: handleLogin.mutate,
        onRegister: handleRegister.mutate,
        onLogout: handleLogout.mutate,
    }
    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider