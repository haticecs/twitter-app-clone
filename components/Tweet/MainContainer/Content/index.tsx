import React from 'react'
import { View, Text, Image } from 'react-native'
// @ts-ignore
import { S3Image } from 'aws-amplify-react-native'
import { TweetType } from '../../../../types'
import styles from './styles'

export type ContentProps = {
  tweet: TweetType
}

const Content = ({ tweet }: ContentProps) => (
  <View style={styles.contentContainer}>
    <Text style={styles.content}>{tweet.content}</Text>
    {!!tweet.image && <S3Image style={styles.image} imgKey={tweet.image} />}
  </View>
)

export default Content
