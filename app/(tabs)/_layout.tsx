
import { Tabs } from 'expo-router'
import React from 'react'
import TabBar from '../../components/TabBar';

const TabsLayout = () => {
  return (
    <Tabs
      tabBar={props => <TabBar {...props} />}

    >
      <Tabs.Screen
        name='index'
        options={{
          title: "Trang chủ",
        }}
      />
      <Tabs.Screen
        name='itinerary'
        options={{
          title: "Lịch trình",
        }}
      />
     
      <Tabs.Screen
        name='notification'
        options={{
          title: "Thông báo",
        }}
      />
      <Tabs.Screen
        name='profile'
        options={{
          title: "Hồ sơ",
        }}
      />
    </Tabs>
  )
}

export default TabsLayout