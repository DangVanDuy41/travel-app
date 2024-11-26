import { View, Text, TouchableOpacity, StyleSheet, TextInput, ScrollView, KeyboardAvoidingView, Platform, Keyboard } from 'react-native';
import React, { useState } from 'react';
import Animated, { SlideInRight, SlideInUp } from 'react-native-reanimated';
import { router, Stack } from 'expo-router';
import { useMutation } from '@tanstack/react-query';
import CalendarPicker, { ChangedDate } from "react-native-calendar-picker";
import { TripRequest } from '../../types/Trip';
import { createTrip } from '../../api/trip.api';
import SearchLocation from '../../components/SearchLocation';


const Index = () => {
  const [locationId, setLocationId] = useState<number | null>(null);
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [title, setTitle] = useState<string>('');

  const { mutateAsync } = useMutation({
    mutationFn: (trip: TripRequest) => createTrip(trip),
  });

  const handleSelectAddress = (id: number) => {
    setLocationId(id);
    console.log(id);
  };

  const handleDays = (date: Date, type: ChangedDate) => {
    if (type === "END_DATE") {
      setEndDate(date);
    } else {
      setStartDate(date);
    }
  };

  const handleCreateTrip = async () => {
    if (locationId && startDate && endDate && title) {
      const response = await mutateAsync({ locationId, endDate, startDate, title });
      if (response) {
        const tripString = encodeURIComponent(JSON.stringify(response));
        router.push(`/(details)/tripDetails?trip=${tripString}`);
      }
    }
  };

  return (

    <ScrollView> 
      <Stack.Screen
        options={{
          headerShown: true,
          title: "Tạo lịch trình",
          headerTitleAlign: 'center',
          headerStyle: {
            backgroundColor: 'white',
          },
        }}
      />

      <Animated.View entering={SlideInRight.delay(500).duration(1000)} style={styles.card}>
        <Text className='text-xl px-10 font-bold py-2'>Nhập tiêu đề</Text>
        <View className='p-4'>
          <View className='flex-row justify-between items-center py-2 border rounded-md'>
            <TextInput
              className='flex-1 p-2'
              placeholder='Nhập tiêu đề'
              onChangeText={(title) => setTitle(title)}
              value={title}
              returnKeyType="done"
              onSubmitEditing={() => Keyboard.dismiss()}
            />
          </View>
        </View>
      </Animated.View>

      <SearchLocation handleLocationId={(id) => handleSelectAddress(id)} />

      <Animated.View entering={SlideInRight.delay(500).duration(1000)} style={styles.card}>
        <Text className='text-xl px-10 font-bold py-5 '>Bạn đi khi nào ?</Text>
        <CalendarPicker
          width={350}
          onDateChange={(date, type) => handleDays(date, type)}
          allowRangeSelection={true}
          minDate={new Date()}
          selectedRangeStyle={{
            backgroundColor: 'black',
          }}
          selectedDayTextStyle={{
            color: 'white'
          }}
        />
      </Animated.View>

      <Animated.View entering={SlideInUp.delay(300).duration(1000)} className='p-3'>
        <TouchableOpacity
          className='bg-[#f39c12] p-3 mb-3 rounded-2xl'
          onPressIn={handleCreateTrip}
        >
          <Text className='text-white text-xl text-center font-bold'>Bắt đầu tạo lịch trình</Text>
        </TouchableOpacity>
      </Animated.View>
    </ScrollView>

  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 14,
    margin: 10,
    elevation: 10,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 4,
    shadowOffset: {
      width: 2,
      height: 2,
    },
  },
});

export default Index;