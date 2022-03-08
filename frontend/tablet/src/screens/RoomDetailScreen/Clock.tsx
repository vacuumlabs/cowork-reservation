import * as React from 'react'
import { useContext } from 'react'
import {
  Easing,
  TextInput,
  Animated,
  View,
  StyleSheet,
  ViewStyle,
} from 'react-native'
import Svg, { G, Circle } from 'react-native-svg'
import { Button } from '../../components'

import theme, { ColorVariant } from '../../components/theme'
import Typography from '../../components/Typography'
import { DataContext } from '../../contexts/DataContext'

const RADIUS = 50
const STROKE_WIDTH = 2

const AnimatedTextInput = Animated.createAnimatedComponent(TextInput)

type ClockProps = {
  color: Extract<ColorVariant, 'turquoise' | 'red'>
  max: number
  bookedTime?: number
  isAvailable: boolean
  aspectRatio: number
}

const Clock: (props: ClockProps) => JSX.Element = ({
  color,
  max,
  bookedTime,
  isAvailable,
  aspectRatio,
}: ClockProps) => {
  const animated = React.useRef(new Animated.Value(0)).current
  const circleRef = React.useRef<View>(null)
  const inputRef = React.useRef<TextInput>(null)
  const circumference = 2 * Math.PI * RADIUS
  const halfCircle = RADIUS + STROKE_WIDTH

  const { currentRoomId, endCurrentEvent } = useContext(DataContext)

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
    if (max !== 1) {
      animated.addListener(({ value }) => {
        const maxPerc = bookedTime
          ? (100 * value) / bookedTime
          : (100 * value) / max
        const strokeDashoffset = circumference - (circumference * maxPerc) / 100
        if (inputRef?.current) {
          const hours = Math.floor(value / 3600)
          const minutes = Math.floor((value - hours * 3600) / 60)
          const seconds = Math.floor(value) - hours * 3600 - minutes * 60
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
      animated.addListener(() => {
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
      })
    }

    return () => {
      animated.removeAllListeners()
    }
  })

  const circleContainer: ViewStyle = {
    width: aspectRatio > 1 ? 'auto' : '100%',
    height: aspectRatio > 1 ? '100%' : 'auto',
  }

  return (
    <View style={[styles.circleAspectRatio, circleContainer]}>
      <Svg
        height="100%"
        width="100%"
        viewBox={`0 0 ${halfCircle * 2} ${halfCircle * 2}`}
      >
        <G rotation={'-90'} origin={`${halfCircle}, ${halfCircle}`}>
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
            strokeDasharray={max == 1 ? 0 : circumference}
          />
        </G>
      </Svg>
      <Typography variant="h3" style={styles.statusLabel}>
        {isAvailable ? 'FREE' : 'BOOKED'}
      </Typography>

      <AnimatedTextInput
        ref={inputRef}
        underlineColorAndroid="transparent"
        editable={false}
        defaultValue="0"
        style={[StyleSheet.absoluteFillObject, styles.text]}
      />

      {!isAvailable && (
        <Button
          title="End early"
          onPress={() => endCurrentEvent(currentRoomId)}
          variant="error"
          style={styles.earlyButton}
        />
      )}
    </View>
  )
}

export default Clock

const styles = StyleSheet.create({
  circleAspectRatio: {
    aspectRatio: 1,
  },
  text: {
    textAlign: 'center',
    fontSize: theme.fontSize.h2,
    fontFamily: theme.fontFamily.h2,
    color: theme.typographyColors.white,
  },
  statusLabel: {
    top: 90,
    position: 'absolute',
    alignSelf: 'center',
  },
  earlyButton: {
    bottom: 90,
    position: 'absolute',
    alignSelf: 'center',
  },
})
