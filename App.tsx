import React, { useEffect } from 'react'
import Amplify, { Auth, API, graphqlOperation } from 'aws-amplify'
import { StatusBar } from 'expo-status-bar'
import { SafeAreaProvider } from 'react-native-safe-area-context'

// @ts-ignore
import { withAuthenticator } from 'aws-amplify-react-native'

import useCachedResources from './hooks/useCachedResources'
import useColorScheme from './hooks/useColorScheme'
import Navigation from './navigation'

// @ts-ignore
import config from './aws-exports'
import { getUser } from './src/graphql/queries'
import { createUser } from './src/graphql/mutations'
import { CreateUserInput } from './src/API'

Amplify.configure(config)

/* 
  Aws authentication is not connected to the Database.
  We need to take care of the connection.
  In order to sync authenticated user to DB 
  useEffect will be used. 
  Just like componentDidMount().
*/

/* 
  getRequest -> query
  postRequest -> mutation in the graphql
*/

function App() {
  const isLoadingComplete = useCachedResources()
  const colorScheme = useColorScheme()

  const getRandomImage = () => {
    return 'https://wallpaperaccess.com/full/1098723.jpg'
  }

  const saveUserToDB = async (user: CreateUserInput) => {
    console.log(user)
    await API.graphql(graphqlOperation(createUser, { input: user }))
  }

  useEffect(() => {
    const updateUser = async () => {
      //Get current authenticated cognito user
      const userInfo = await Auth.currentAuthenticatedUser({
        bypassCache: true,
      })

      if (userInfo) {
        //Check if the user already exist in the database
        const userData = await API.graphql(
          graphqlOperation(getUser, { id: userInfo.attributes.sub })
        )

        //If it doesn't, create user in the database.
        if (!userData.data.getUser) {
          const user = {
            id: userInfo.attributes.sub,
            username: userInfo.username,
            name: userInfo.username,
            email: userInfo.attributes.email,
            image: getRandomImage(),
          }
          await saveUserToDB(user)
        } else {
          console.log('User already exist in the database')
        }
      }
    }
    updateUser()
  }, [])

  if (!isLoadingComplete) {
    return null
  } else {
    return (
      <SafeAreaProvider>
        <Navigation colorScheme={colorScheme} />
        <StatusBar />
      </SafeAreaProvider>
    )
  }
}

export default withAuthenticator(App)
