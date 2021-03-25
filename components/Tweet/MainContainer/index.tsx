import React from 'react'
import { View, StyleSheet } from 'react-native'
import { TweetType } from '../../../types'

import Header from './Header'
import Content from './Content'
import Footer from './Footer'

export type MainContainerProps = {
  tweet: TweetType
}

const MainContainer = ({ tweet }: MainContainerProps) => (
  <View style={styles.container}>
    <Header tweet={tweet} />
    <Content tweet={tweet} />
    <Footer tweet={tweet} />
  </View>
)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    marginHorizontal: 10,
  },
})

export default MainContainer
