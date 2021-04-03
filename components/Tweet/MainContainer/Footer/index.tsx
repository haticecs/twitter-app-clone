import React, { useEffect, useState } from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { Auth, API, graphqlOperation } from 'aws-amplify'
import { AntDesign, EvilIcons, Feather } from '@expo/vector-icons'

import { TweetType } from '../../../../types'
import styles from './styles'
import { createLike } from '../../../../src/graphql/mutations'

export type FooterProps = {
  tweet: TweetType
}
const Footer = ({ tweet }: FooterProps) => {
  console.log(tweet)
  const [user, setUser] = useState(null)

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userInfo = await Auth.currentAuthenticatedUser({
          bypassCache: true,
        })

        if (!userInfo) return
        setUser(userInfo)
      } catch (error) {
        console.log(error)
      }
    }

    fetchUser()
  }, [])

  const onLike = async () => {
    if (!user) return
    const like = {
      userID: user.attributes.sub,
      tweetID: tweet.id,
    }
    try {
      await API.graphql(
        graphqlOperation(createLike, {
          input: like,
        })
      )
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <View style={styles.footerContainer}>
      <View style={styles.iconContainer}>
        <Feather name='message-circle' size={20} color='grey' />
        <Text style={styles.number}> {tweet.numberOfComments}</Text>
      </View>
      <View style={styles.iconContainer}>
        <EvilIcons name='retweet' size={28} color='grey' />
        <Text style={styles.number}> {tweet.numberOfRetweets}</Text>
      </View>
      <View style={styles.iconContainer}>
        <TouchableOpacity onPress={onLike}>
          <AntDesign name='hearto' size={20} color='grey' />
        </TouchableOpacity>
        <Text style={styles.number}> {tweet.numberOfLikes}</Text>
      </View>
      <View style={styles.iconContainer}>
        <EvilIcons name='share-google' size={28} color='grey' />
      </View>
    </View>
  )
}

export default Footer
