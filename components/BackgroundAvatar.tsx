import { View, Image, StyleSheet, Dimensions, TouchableOpacity } from 'react-native'
import React from 'react'
import * as ImagePicker from 'expo-image-picker';

interface Props {
  avatar: string | undefined
}

const BackgroundAvatar = ({avatar}:Props) => {
  const { width } = Dimensions.get('window');
  
  const pickImageAsync = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      console.log(result);
    }
  };

  return (
    <View style={{ position: 'relative', alignItems: 'center' }}>
      <Image
        style={{ height: 200, width: width }}
        source={require('../assets/images/ImageTravel.jpg')}
      />
       <View className="absolute top-0 left-0 w-full h-full bg-black opacity-40" />
      <TouchableOpacity onPress={pickImageAsync} style={styles.avatarContainer}>
        <Image
          style={styles.avatar}
          source={avatar ? { uri: avatar } : require('../assets/images/ImageUser.jpg')}
         
        />
      </TouchableOpacity>
    </View>
  )
}
const styles = StyleSheet.create({
  avatarContainer: {
    position: 'absolute',
    bottom: -60,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1
  },
  avatar: {
    width: 190,
    height: 190,
    borderRadius: 100,
  },

})
export default BackgroundAvatar