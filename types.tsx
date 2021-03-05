export type RootStackParamList = {
  Root: undefined
  NotFound: undefined
}

export type BottomTabParamList = {
  Home: undefined
  Search: undefined
  Notifications: undefined
  Messages: undefined
}

export type HomeNavigatorParamList = {
  HomeScreen: undefined
}

export type TabTwoParamList = {
  TabTwoScreen: undefined
}

export type UserType = {
  id: string
  username: string
  name: string
  image?: string
}
export type TweetType = {
  id: string
  user: UserType
  content: string
  createdAt: string
  image?: string
  numberOfComments?: number
  numberOfLikes?: number
  numberOfRetweets?: number
}
