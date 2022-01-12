import React, { PropsWithChildren } from 'react'
import {
  Keyboard,
  KeyboardAvoidingView as _KeyboardAvoidingView,
  Platform,
  StyleSheet,
  TouchableWithoutFeedback,
} from 'react-native'

type KeyboardAvoidingViewProps = PropsWithChildren<{}>

const KeyboardAvoidingView: React.FC<KeyboardAvoidingViewProps> = ({
  children,
}) => {
  return (
    <_KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        {children}
      </TouchableWithoutFeedback>
    </_KeyboardAvoidingView>
  )
}

export default KeyboardAvoidingView

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})
