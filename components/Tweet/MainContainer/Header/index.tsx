import React from 'react'
import { View, Text } from 'react-native'
import { Entypo } from '@expo/vector-icons'
import { TweetType } from '../../../../types'
import styles from './styles'

export type HeaderProps = {
  tweet: TweetType
}

const Header = ({ tweet }: HeaderProps) => (
  <View style={styles.tweetHeaderContainer}>
    <View style={styles.tweetHeaderNames}>
      <Text style={styles.name}>{tweet.user.name}</Text>
      <Text style={styles.username}>@{tweet.user.username}</Text>
      <Text style={styles.createdAt}>15s</Text>
    </View>
    <Entypo name='chevron-down' size={18} color='grey' />
  </View>
)

export default Header
