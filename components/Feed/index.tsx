import React, { useEffect, useState } from 'react'
import { View, FlatList } from 'react-native'
import { API, graphqlOperation } from 'aws-amplify'
import Tweet from '../Tweet'
import { listTweets } from '../../src/graphql/queries'

const Feed = () => {
  const [tweets, setTweets] = useState([])

  useEffect(() => {
    const fetchTweets = async () => {
      //get the tweets from backend and set it to state
      try {
        const tweetsData = await API.graphql(graphqlOperation(listTweets))
        //console.log(tweetsData.data.listTweets.items)
        setTweets(tweetsData.data.listTweets.items)
      } catch (error) {
        console.log(error)
      }
    }
    fetchTweets()
  }, [])

  return (
    <View style={{ width: '100%' }}>
      <FlatList
        data={tweets}
        renderItem={({ item }) => <Tweet tweet={item} />}
        keyExtractor={(item) => item.id}
      />
    </View>
  )
}

export default Feed
