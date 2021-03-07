import React from 'react'
import { View, TouchableOpacity } from 'react-native'
import { MaterialCommunityIcons, Ionicons } from '@expo/vector-icons'
import styles from './styles'

const onPress = () => {}
const NewTweetButton = () => (
  <TouchableOpacity activeOpacity={0.8} style={styles.button} onPress={onPress}>
    <Ionicons name='md-add-outline' size={18} color='white' />
    <MaterialCommunityIcons name='feather' size={30} color='white' />
  </TouchableOpacity>
)

export default NewTweetButton
