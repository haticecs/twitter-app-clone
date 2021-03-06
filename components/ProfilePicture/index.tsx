import React from 'react'
import { Image } from 'react-native'

//props
export type ProfilePictureProps = {
  image?: string
  size?: number //optional
}

const ProfilePicture = ({ image, size = 50 }: ProfilePictureProps) => (
  <Image
    source={{ uri: image }}
    style={{
      width: size,
      height: size,
      borderRadius: size, //to get round shape
    }}
  />
)

export default ProfilePicture
