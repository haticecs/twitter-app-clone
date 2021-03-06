import React from 'react'
import { View, Text, Image } from 'react-native'
import { TweetType } from '../../../../types'
import styles from './styles'

export type ContentProps = {
  tweet: TweetType
}

const Content = ({ tweet }: ContentProps) => (
  <View style={styles.contentContainer}>
    <Text style={styles.content}>{tweet.content}</Text>
    {!!tweet.image && (
      <Image style={styles.image} source={{ uri: tweet.image }} />
    )}
  </View>
)

export default Content
