import React from 'react'
import { View, TouchableOpacity } from 'react-native'
import { MaterialCommunityIcons, Ionicons } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import styles from './styles'

const NewTweetButton = () => {
  const navigation = useNavigation()

  const onPress = () => {
    navigation.navigate('NewTweet')
  }

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      style={styles.button}
      onPress={onPress}
    >
      <Ionicons name='md-add-outline' size={18} color='white' />
      <MaterialCommunityIcons name='feather' size={30} color='white' />
    </TouchableOpacity>
  )
}

export default NewTweetButton
