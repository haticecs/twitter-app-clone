import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createStackNavigator } from '@react-navigation/stack'
import * as React from 'react'
import ProfilePicture from '../components/ProfilePicture'

import Colors from '../constants/Colors'
import useColorScheme from '../hooks/useColorScheme'
import TabOneScreen from '../screens/TabOneScreen'
import TabTwoScreen from '../screens/TabTwoScreen'
import {
  BottomTabParamList,
  HomeNavigatorParamList,
  TabTwoParamList,
} from '../types'

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
  return (
    <TabOneStack.Navigator>
      <TabOneStack.Screen
        name='HomeScreen'
        component={TabOneScreen}
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
          headerLeft: () => (
            <ProfilePicture
              image={
                'https://avatars.githubusercontent.com/u/57989556?s=460&u=a8ec645a7ecd67f85394fb580f34d51e8d3c768f&v=4'
              }
              size={40}
            />
          ),
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
