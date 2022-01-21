import * as React from 'react'
import { Easing, TextInput, Animated, View, StyleSheet } from 'react-native'
import Svg, { G, Circle } from 'react-native-svg'

import theme, { ColorVariant } from '../../components/theme'

const RADIUS = 200
const STROKE_WIDTH = 10

const AnimatedTextInput = Animated.createAnimatedComponent(TextInput)

type ClockProps = {
  color: Extract<ColorVariant, 'turquoise' | 'red'>
  max: number
  bookedTime?: number
}

const Clock: (props: ClockProps) => JSX.Element = ({
  color,
  max,
  bookedTime,
}: ClockProps) => {
  const animated = React.useRef(new Animated.Value(0)).current
  const circleRef = React.useRef<View>(null)
  const inputRef = React.useRef<TextInput>(null)
  const circumference = 2 * Math.PI * RADIUS
  const halfCircle = RADIUS + STROKE_WIDTH

  const animation = (toValue: number) => {
    return Animated.timing(animated, {
      delay: 1000,
      toValue,
      useNativeDriver: true,
      easing: Easing.out(Easing.ease),
    }).start(() => {
      animation(toValue === 0 ? max : toValue - 1)
    })
  }

  React.useEffect(() => {
    animation(max)
    if (max !== 1 && bookedTime) {
      animated.addListener((v) => {
        const maxPerc = ((100 * v.value) / bookedTime) * 2
        const strokeDashoffset = circumference - (circumference * maxPerc) / 100
        if (inputRef?.current) {
          const hours = Math.floor(v.value / 3600)
          const minutes = Math.floor((v.value - hours * 3600) / 60)
          const seconds = Math.floor(v.value) - hours * 3600 - minutes * 60
          inputRef.current.setNativeProps({
            text: `${hours < 10 ? '0' : ''}${hours}:${
              minutes < 10 ? '0' : ''
            }${minutes}:${seconds < 10 ? '0' : ''}${seconds}`,
          })
        }
        if (circleRef?.current) {
          circleRef.current.setNativeProps({
            strokeDashoffset: -strokeDashoffset,
          })
        }
      })
    } else {
      animated.addListener((v) => {
        const maxPerc = (100 * v.value) / max
        const strokeDashoffset = circumference - (circumference * maxPerc) / 100
        if (inputRef?.current) {
          const hours = new Date().getHours()
          const minutes = new Date().getMinutes()
          const seconds = new Date().getSeconds()
          inputRef.current.setNativeProps({
            text: `${hours < 10 ? '0' : ''}${hours}:${
              minutes < 10 ? '0' : ''
            }${minutes}:${seconds < 10 ? '0' : ''}${seconds}`,
          })
        }
        if (circleRef?.current) {
          circleRef.current.setNativeProps({
            strokeDashoffset: strokeDashoffset + 1,
          })
        }
      })
    }

    return () => {
      animated.removeAllListeners()
    }
  })

  return (
    <View style={{ width: RADIUS * 2, height: RADIUS * 2 }}>
      <Svg
        height={RADIUS * 2}
        width={RADIUS * 2}
        viewBox={`0 0 ${halfCircle * 2} ${halfCircle * 2}`}
      >
        <G rotation="-90" origin={`${halfCircle}, ${halfCircle}`}>
          <Circle
            ref={circleRef}
            cx="50%"
            cy="50%"
            r={RADIUS}
            fill={theme.colors[color]}
            fillOpacity={color === 'turquoise' ? 0.1 : 0.3}
            stroke={
              max === 1 ? theme.colors.backgroundLight : theme.colors[color]
            }
            strokeWidth={STROKE_WIDTH}
            strokeLinecap="round"
            strokeDashoffset={circumference}
            strokeDasharray={color === 'turquoise' ? 0 : circumference}
          />
        </G>
      </Svg>
      <AnimatedTextInput
        ref={inputRef}
        underlineColorAndroid="transparent"
        editable={false}
        defaultValue="0"
        style={[StyleSheet.absoluteFillObject, styles.text]}
      />
    </View>
  )
}

export default Clock

const styles = StyleSheet.create({
  text: {
    textAlign: 'center',
    fontSize: theme.fontSize.h2,
    fontFamily: theme.fontFamily.h2,
    color: theme.typographyColors.white,
  },
})
