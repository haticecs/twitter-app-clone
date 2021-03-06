import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
  tweetHeaderContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  tweetHeaderNames: {
    flexDirection: 'row',
  },
  name: {
    marginRight: 5,
    fontWeight: 'bold',
  },
  username: {
    marginRight: 5,
    color: 'grey',
  },
  createdAt: {
    marginRight: 5,
    color: 'grey',
  },
})

export default styles
