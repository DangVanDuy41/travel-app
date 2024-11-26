import { View, StyleSheet } from 'react-native'
import React from 'react'

import TabBarButton from './TabBarButton';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';

type IconName = 'index' | 'explore' | 'create' | 'profile' | 'itinerary' | 'notification';

const TabBar = ({ state, descriptors, navigation }: BottomTabBarProps) => {

    const routeNameMap: { [key: string]: IconName } = {
        index: 'index',
        explore: 'explore',
        create: 'create',
        profile: 'profile',
        itinerary: 'itinerary',
     
        notification: 'notification',
    };

    const primaryColor = '#0891b2';
    const greyColor = '#737373';
    return (
        <View style={styles.tabbar}>
            {state.routes.map((route, index) => {
                const { options } = descriptors[route.key];
                const label =
                    options.tabBarLabel !== undefined
                        ? options.tabBarLabel
                        : options.title !== undefined
                            ? options.title
                            : route.name;

                if (['_sitemap', '+not-found'].includes(route.name)) return null;

                const isFocused = state.index === index;

                const onPress = () => {
                    const event = navigation.emit({
                        type: 'tabPress',
                        target: route.key,
                        canPreventDefault: true,
                    });

                    if (!isFocused && !event.defaultPrevented) {
                        navigation.navigate(route.name, route.params);
                    }
                };

                const onLongPress = () => {
                    navigation.emit({
                        type: 'tabLongPress',
                        target: route.key,
                    });
                };

                return (
                    <TabBarButton
                        key={route.name}
                        onPress={onPress}
                        onLongPress={onLongPress}
                        isFocused={isFocused}
                        routeName={routeNameMap[route.name] as IconName}
                        color={isFocused ? primaryColor : 'white'}
                        label={label}
                    />
                )


            })}
        </View>
    )
}

const styles = StyleSheet.create({
    tabbar: {        
        bottom: 25,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: 'black',
        marginHorizontal: 20,
        paddingVertical: 10,     
        borderRadius: 25,
        borderCurve: 'continuous',
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 10 },
        shadowRadius: 10,
        shadowOpacity: 0.1
    }
})

export default TabBar