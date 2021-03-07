import { StyleSheet } from 'react-native'
import Colors from '../../constants/Colors'

const styles = StyleSheet.create({
  button: {
    bottom: 20,
    right: 20,
    position: 'absolute',
    borderRadius: 60,
    width: 60,
    height: 60,
    backgroundColor: Colors.light.tint,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 1,
  },
})

export default styles
