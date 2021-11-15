import React from 'react'
import { StyleSheet, Text } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'

interface Props {
  title: string
  onPress: () => void
}

const Button: React.FC<Props> = (props) => {
  return (
    <TouchableOpacity style={styles.container} onPress={props.onPress}>
      <Text style={styles.text}>{props.title}</Text>
    </TouchableOpacity>
  )
}

export default Button

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#36DABC',
    borderRadius: 12,
    paddingHorizontal: 18,
    paddingVertical: 12,
  },
  text: {
    color: '#000000',
    fontFamily: 'PT Sans Caption Bold',
    fontSize: 18,
    textTransform: 'uppercase',
    textAlign: 'center',
  },
})
