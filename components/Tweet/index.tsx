import React from 'react'
import { View, StyleSheet } from 'react-native'
import LeftContainer from './LeftContainer'
import MainContainer from './MainContainer'

import { TweetType } from '../../types'

export type TweetProps = {
  tweet: TweetType
}

const Tweet = ({ tweet }: TweetProps) => (
  <View style={styles.container}>
    <LeftContainer user={tweet.user} />
    <MainContainer tweet={tweet} />
  </View>
)

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    width: '100%',
    padding: 15,
    borderBottomWidth: 0.3,
    borderBottomColor: 'lightgrey',
  },
})

export default Tweet
