import React from 'react'
import { View, Text, Image } from 'react-native'
import styles from './styles'
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

export default MainContainer
