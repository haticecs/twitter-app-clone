import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { Entypo } from '@expo/vector-icons'
import { TweetType } from '../../../../types'
import styles from './styles'
import moment from 'moment' //moment is the library for displaying the time

export type HeaderProps = {
  tweet: TweetType
}

const Header = ({ tweet }: HeaderProps) => {
  return (
    <View style={styles.HeaderContainer}>
      <View style={{ flexDirection: 'row' }}>
        <Text style={styles.name}>{tweet.user.name}</Text>
        <Text style={styles.username}>@{tweet.user.username}</Text>
        <Text style={styles.createdAt}>
          &#183;
          {moment(tweet.createdAt).fromNow(true)}
        </Text>
      </View>
      <TouchableOpacity>
        <Entypo
          name='chevron-down'
          size={18}
          color='lightgrey'
        />
      </TouchableOpacity>
    </View>
  )
}

export default Header

//customizations
moment.updateLocale('en', {
  relativeTime: {
    future: 'in %s',
    past: '%s ago',
    s: 'a few s',
    ss: '%d s',
    m: 'a m',
    mm: '%d m',
    h: '1 h',
    hh: '%d h',
    d: '1 d',
    dd: '%d d',
    w: '1 w',
    ww: '%d w',
    M: 'a mon',
    MM: '%d mon',
    y: '1 y',
    yy: '%d y',
  },
})
