import { View, Text, Pressable, StyleSheet, GestureResponderEvent } from 'react-native'
import React, { useEffect } from 'react'
import { AntDesign, Feather } from "@expo/vector-icons";
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import Entypo from '@expo/vector-icons/Entypo';
import Ionicons from '@expo/vector-icons/Ionicons';

import Animated, { interpolate, useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';
type IconName = 'index' | 'explore' | 'create' | 'profile' | 'itinerary' | 'notification';

interface TabBarButtonProps {
    isFocused: boolean;
    label: any;
    routeName: IconName;
    onPress: (event: GestureResponderEvent) => void;
    onLongPress: (event: GestureResponderEvent) => void;
    color: string;
}
const TabBarButton = (props: TabBarButtonProps) => {
    const { isFocused, label, routeName, color } = props;


    const icons = {
        index: (props: any) => <AntDesign name="home" size={26} {...props} />,
        explore: (props: any) => <Feather name="compass" size={26} {...props} />,
        create: (props: any) => <AntDesign name="pluscircleo" size={26} {...props} />,
        profile: (props: any) => <AntDesign name="user" size={26} {...props} />,
        itinerary: (props: any) => <MaterialIcons name="card-travel" size={26} {...props} />,
        notification: (props: any) => <Ionicons name="notifications-outline" size={26} {...props} />,
    };
    const scale = useSharedValue(0);

    useEffect(() => {
        scale.value = withSpring(
            typeof isFocused === 'boolean' ? (isFocused ? 1 : 0) : isFocused,
            { duration: 350 }
        );
    }, [scale, isFocused]);

    const animatedIconStyle = useAnimatedStyle(() => {

        const scaleValue = interpolate(
            scale.value,
            [0, 1],
            [1, 1.4]
        );
        const top = interpolate(
            scale.value,
            [0, 1],
            [0, 8]
        );

        return {
            // styles
            transform: [{ scale: scaleValue }],
            top
        }
    })
    const animatedTextStyle = useAnimatedStyle(() => {

        const opacity = interpolate(
            scale.value,
            [0, 1],
            [1, 0]
        );

        return {
            // styles
            opacity
        }
    })
    return (
        <Pressable {...props} style={styles.container}>
            <Animated.View style={[animatedIconStyle]}>
                {
                    icons[routeName]({
                        color
                    })
                }
            </Animated.View>

            <Animated.Text style={[{
                color,
                fontSize: 11
            }, animatedTextStyle]}>
                {label}
            </Animated.Text>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        gap: 4
    }
})

export default TabBarButton