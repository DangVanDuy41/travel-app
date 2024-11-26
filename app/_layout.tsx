
import React from 'react'
import { Stack } from 'expo-router'
import { QueryClient, QueryClientProvider, useIsMutating } from '@tanstack/react-query'
import AuthProvider from '../context/AuthProvider'
import Loading from '../components/Loading'
import { ModalProvider } from '../context/ModalProvider'
import { GestureHandlerRootView } from 'react-native-gesture-handler'

const queryClient = new QueryClient()

const InitialLayout = () => {

    const isMutate = useIsMutating();



    return (
        <>
            {isMutate > 0 && <Loading />}
            <Stack>
                <Stack.Screen
                    options={{ headerShown: false }}
                    name='(tabs)'
                />
                <Stack.Screen
                    name='(modal)/authPage'
                    options={{
                        animation: 'slide_from_right',
                        presentation: "modal"
                    }}
                />

                <Stack.Screen name='(modal)/initeraryEdit' />
                <Stack.Screen name='(modal)/createTrip' />
                <Stack.Screen
                    name='(details)/mapDetails'
                    options={{
                        headerShown: false
                    }}
                />
                <Stack.Screen
                    name='(details)/locationDirection'
                    options={{
                        headerShown: false
                    }}
                />
                <Stack.Screen name='(details)/tripDetails' />


            </Stack>
        </>
    )
}

const RootLayout = () => {

    return (
        <QueryClientProvider client={queryClient}>
            <GestureHandlerRootView style={{ flex: 1 }}>
                <AuthProvider>
                    <ModalProvider>
                        <InitialLayout />
                    </ModalProvider>
                </AuthProvider>
            </GestureHandlerRootView>
        </QueryClientProvider>
    )
}
export default RootLayout