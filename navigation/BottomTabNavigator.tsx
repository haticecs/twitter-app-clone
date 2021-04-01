import React, { useEffect, useState } from 'react'
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createStackNavigator } from '@react-navigation/stack'
import { Auth, API, graphqlOperation } from 'aws-amplify'

import ProfilePicture from '../components/ProfilePicture'
import Colors from '../constants/Colors'
import useColorScheme from '../hooks/useColorScheme'
import HomeScreen from '../screens/HomeScreen'
import TabTwoScreen from '../screens/TabTwoScreen'
import {
  BottomTabParamList,
  HomeNavigatorParamList,
  TabTwoParamList,
} from '../types'
import { getUser } from '../src/graphql/queries'

const BottomTab = createBottomTabNavigator<BottomTabParamList>()

export default function BottomTabNavigator() {
  const colorScheme = useColorScheme()

  return (
    <BottomTab.Navigator
      initialRouteName='Home'
      tabBarOptions={{
        activeTintColor: Colors[colorScheme].tint,
        showLabel: false, //in order to make the labels invisible
      }}
    >
      <BottomTab.Screen
        name='Home'
        component={HomeNavigator}
        options={{
          tabBarIcon: ({ color }) => (
            <TabBarIcon name='md-home' color={color} />
          ),
        }}
      />
      <BottomTab.Screen
        name='Search'
        component={TabTwoNavigator}
        options={{
          tabBarIcon: ({ color }) => (
            <TabBarIcon name='ios-search' color={color} />
          ),
        }}
      />
      <BottomTab.Screen
        name='Notifications'
        component={TabTwoNavigator}
        options={{
          tabBarIcon: ({ color }) => (
            <TabBarIcon name='ios-notifications-outline' color={color} />
          ),
        }}
      />
      <BottomTab.Screen
        name='Messages'
        component={TabTwoNavigator}
        options={{
          tabBarIcon: ({ color }) => (
            <TabBarIcon name='ios-mail' color={color} />
          ),
        }}
      />
    </BottomTab.Navigator>
  )
}

// You can explore the built-in icon families and icons on the web at:
// https://icons.expo.fyi/
function TabBarIcon(props: {
  name: React.ComponentProps<typeof Ionicons>['name']
  color: string
}) {
  return <Ionicons size={30} style={{ marginBottom: -3 }} {...props} />
}

// Each tab has its own navigation stack, you can read more about this pattern here:
// https://reactnavigation.org/docs/tab-based-navigation#a-stack-navigator-for-each-tab
const TabOneStack = createStackNavigator<HomeNavigatorParamList>()
//Param list let navigator know which screens will be included.

function HomeNavigator() {
  const [user, setUser] = useState(null)

  useEffect(() => {
    const fetchUser = async () => {
      //get the current authenticated user
      const userInfo = await Auth.currentAuthenticatedUser({
        bypassCache: true,
      })
      if (!userInfo) {
        return
      }
      try {
        //get its data from database using getUser query
        const userData = await API.graphql(
          graphqlOperation(getUser, { id: userInfo.attributes.sub })
        )

        if (userData) {
          setUser(userData.data.getUser)
        }
      } catch (error) {
        console.log(error)
      }
    }
    console.log(user)
    console.log(user?.image)

    fetchUser()
  }, [])

  return (
    <TabOneStack.Navigator>
      <TabOneStack.Screen
        name='HomeScreen'
        component={HomeScreen}
        //configuring the header with the options property.
        options={{
          headerRightContainerStyle: { marginRight: 15 },
          headerLeftContainerStyle: { marginLeft: 15 },
          headerTitleAlign: 'center', //for Android devices.
          headerTitle: () => (
            <Ionicons
              name={'logo-twitter'}
              size={30}
              color={Colors.light.tint}
            />
          ),

          headerRight: () => (
            <MaterialCommunityIcons
              name={'star-four-points-outline'}
              size={30}
              color={Colors.light.tint}
            />
          ),
          headerLeft: () => <ProfilePicture image={user?.image} size={40} />,
        }}
      />
    </TabOneStack.Navigator>
  )
}

const TabTwoStack = createStackNavigator<TabTwoParamList>()

function TabTwoNavigator() {
  return (
    <TabTwoStack.Navigator>
      <TabTwoStack.Screen
        name='TabTwoScreen'
        component={TabTwoScreen}
        options={{ headerTitle: 'Tab Two Title' }}
      />
    </TabTwoStack.Navigator>
  )
}
