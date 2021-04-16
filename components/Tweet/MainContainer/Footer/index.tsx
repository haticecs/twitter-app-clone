import React, { useEffect, useState } from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { Auth, API, graphqlOperation } from 'aws-amplify'
import { AntDesign, EvilIcons, Feather } from '@expo/vector-icons'
import { TweetType } from '../../../../types'
import styles from './styles'
import { createLike, deleteLike } from '../../../../src/graphql/mutations'

export type FooterProps = {
  tweet: TweetType
}
const Footer = ({ tweet }: FooterProps) => {
  const [user, setUser] = useState(null)
  const [myLike, setMyLike] = useState(null)
  const [likesCount, setLikesCount] = useState(tweet.likes.items.length)

  useEffect(() => {
    const fetchUser = async () => {
      const currentUser = await Auth.currentAuthenticatedUser()
      setUser(currentUser)
      const searchedLike = tweet.likes.items.find(
        (like) => like.userID === currentUser.attributes.sub
      )
      setMyLike(searchedLike)
    }
    fetchUser()
  }, [])

  const onLike = async () => {
    if (!user) {
      return
    }
    if (!myLike) {
      await submitLike()
    } else {
      await removeLike()
    }
  }

  const submitLike = async () => {
    const like = {
      userID: user.attributes.sub,
      tweetID: tweet.id,
    }

    try {
      const response = await API.graphql(
        graphqlOperation(createLike, {
          input: like,
        })
      )
      setMyLike(response.data.createLike)
      setLikesCount(likesCount + 1)
    } catch (error) {
      console.log(error)
    }
  }

  const removeLike = async () => {
    try {
      await API.graphql(
        graphqlOperation(deleteLike, { input: { id: myLike.id } })
      )
      setMyLike(null)
      setLikesCount(likesCount - 1)
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
          <AntDesign
            name={!myLike ? 'hearto' : 'heart'}
            size={20}
            color={!myLike ? 'grey' : 'red'}
          />
        </TouchableOpacity>
        {likesCount === 0 ? (
          <Text style={styles.number}> </Text>
        ) : (
          <Text style={styles.number}>{likesCount}</Text>
        )}
      </View>
      <View style={styles.iconContainer}>
        <EvilIcons name='share-google' size={28} color='grey' />
      </View>
    </View>
  )
}

export default Footer
