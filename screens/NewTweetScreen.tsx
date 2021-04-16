import React, { useEffect, useState } from 'react'
import {
  Text,
  View,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Platform,
  Image,
} from 'react-native'
import { Auth, API, graphqlOperation } from 'aws-amplify'
import { useNavigation } from '@react-navigation/native'
import { AntDesign } from '@expo/vector-icons'
import { SafeAreaView } from 'react-native-safe-area-context'
import * as ImagePicker from 'expo-image-picker'

import Colors from '../constants/Colors'
import ProfilePicture from '../components/ProfilePicture'
import { createTweet } from '../src/graphql/mutations'
import { getUser } from '../src/graphql/queries'

const NewTweetScreen = () => {
  const [user, setUser] = useState(null)
  const [tweet, setTweet] = useState('')
  const [imageUrl, setImageUrl] = useState('')

  const navigation = useNavigation()

  useEffect(() => {
    fetchUser()
    getPermissionAsync()
  }, [])

  const fetchUser = async () => {
    try {
      const userInfo = await Auth.currentAuthenticatedUser({
        bypassCache: true,
      })
      if (!userInfo) {
        return
      }
      const userData = await API.graphql(
        graphqlOperation(getUser, { id: userInfo.attributes.sub })
      )
      setUser(userData.data.getUser)
    } catch (error) {
      console.log(error)
    }
  }

  const getPermissionAsync = async () => {
    if (Platform.OS !== 'web') {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync()
      if (status !== 'granted') {
        alert('Sorry, we need camera roll permissions to make this work!')
      }
    }
  }

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    })

    console.log(result)
    if (!result.cancelled) {
      setImageUrl(result.uri)
    }
  }

  const onPostTweet = async () => {
    if (!user) {
      return
    }
    const newTweet = {
      content: tweet,
      image: imageUrl,
      userID: user?.id,
    }
    try {
      await API.graphql(graphqlOperation(createTweet, { input: newTweet }))
    } catch (error) {
      console.log(error)
    }
    navigation.goBack()
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <AntDesign name='close' size={26} color={Colors.light.tint} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={onPostTweet}>
          <Text style={styles.buttonText}>Tweet</Text>
        </TouchableOpacity>
      </View>
      <ScrollView>
        <View style={styles.newTweetComponent}>
          <ProfilePicture image={user?.image} />
          <View style={styles.inputsContainer}>
            <TextInput
              numberOfLines={0}
              maxLength={280}
              multiline={true}
              style={styles.tweetInput}
              placeholder="What' s happening?"
              value={tweet}
              onChangeText={(text) => setTweet(text)}
            />
            <TouchableOpacity onPress={pickImage}>
              <Text style={styles.pickImage}>Pick a Image</Text>
            </TouchableOpacity>
            {!!imageUrl && (
              <Image source={{ uri: imageUrl }} style={styles.image} />
            )}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default NewTweetScreen
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'flex-start',
    backgroundColor: 'white',
    padding: 15,
  },
  headerContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  button: {
    backgroundColor: Colors.light.tint,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    paddingHorizontal: 18,
    paddingVertical: 8,
  },
  newTweetComponent: {
    flexDirection: 'row',
    paddingVertical: 20,
  },
  inputsContainer: {
    marginHorizontal: 10,
    width: '80%',
  },
  tweetInput: {
    marginTop: 12,
    fontSize: 18,
    textAlignVertical: 'top', //for android
  },
  pickImage: {
    fontSize: 18,
    color: Colors.light.tint,
    marginVertical: 10,
  },
  image: {
    width: 150,
    height: 150,
  },
})
