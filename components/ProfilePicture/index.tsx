import React from 'react'
import { Image } from 'react-native'

//props
export type ProfilePictureProps = {
  image?: string
  size?: number //optional
}

const ProfilePicture = ({ image, size = 50 }: ProfilePictureProps) => {
  return (
    <Image
      source={{
        uri: image ? image : 'https://pbs.twimg.com/media/EfwBAQXU8AAFTR3.jpg',
      }}
      style={{
        width: size,
        height: size,
        borderRadius: size, //to get round shape
      }}
    />
  )
}

export default ProfilePicture
