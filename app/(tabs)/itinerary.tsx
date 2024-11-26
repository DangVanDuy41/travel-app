import { View, Text, TouchableOpacity, ScrollView, RefreshControl, TextInput } from 'react-native';
import React from 'react';
import { router, Stack } from 'expo-router';
import { useQuery } from '@tanstack/react-query';
import { getMyTrip } from '../../api/trip.api';
import LottieView from 'lottie-react-native';
import TripsComponent from '../../components/TripsComponent';
import Loading from '../../components/Loading';
import { StatusBar } from 'expo-status-bar';
import Header from '../../components/Header';

const Itinerary = () => {

  const { data, isLoading, refetch } = useQuery({
    queryKey: ['trips'],
    queryFn: () => getMyTrip(),
  });

  return (
    <View className='flex-1 bg-white'>
      <StatusBar style='light' backgroundColor='black' />
      <View className="border-b border-gray-300">
        <Stack.Screen
          options={{
            headerShown: true,
            header: () => <Header />
          }}
        />
      </View>
      <ScrollView
        className='flex-1 '
        refreshControl={
          <RefreshControl refreshing={isLoading} onRefresh={() => refetch()} />
        }
      >
        {
          isLoading ? (
            <Loading />
          ) :
            data && data.length > 0 ? (
              <ScrollView className='p-5'>
                {
                  data.map(trip => (
                    <TripsComponent key={trip.id} trip={trip} />
                  ))

                }
              </ScrollView>

            ) : (
              <View className="flex-1 justify-center items-center bg-white">
                <LottieView
                  source={require('../../assets/lottie/Animation.json')}
                  autoPlay
                  loop
                  style={{ width: 200, height: 200 }}
                />
                <Text className="text-base px-10 font-normal text-center">
                  Hãy bắt đầu tạo chuyến đi của bạn với một lịch trình hấp dẫn, thú vị với bạn bè
                </Text>
                <TouchableOpacity
                  className="pt-5"
                  onPress={() => router.push('/(modal)/createTrip  ')}
                >
                  <View className="bg-black p-3 rounded-lg">
                    <Text className="text-white font-medium text-lg">Tạo lịch trình</Text>
                  </View>
                </TouchableOpacity>
              </View>
            )}
      </ScrollView>
    </View>
  );
};

export default Itinerary;