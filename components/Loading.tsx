import { View, Modal, StyleSheet, ActivityIndicator } from 'react-native'
import React from 'react'
import { StatusBar } from 'expo-status-bar';

const Loading = () => {
    return (
        <>
            <StatusBar backgroundColor='rgba(0, 0, 0, 0.5)' />
            <Modal transparent={true} animationType="none">
                <View style={styles.overlay}>
                    <ActivityIndicator size="large" color="#ffffff" />
                </View>
            </Modal>
        </>

    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    overlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // Màu nền mờ
    },
});
export default Loading