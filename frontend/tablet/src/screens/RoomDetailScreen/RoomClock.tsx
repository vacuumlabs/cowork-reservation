import React, { useContext, useState, useRef, useEffect } from 'react'
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
import { Room } from '../../models'
import {
  diffChangeDateAndNow,
  findRoomCurrentEvent,
  findRoomNextChangeDate,
  isRoomAvailable,
} from '../../utils'
import { hoursToSeconds, minutesToSeconds } from 'date-fns'

const RADIUS = 50
const STROKE_WIDTH = 2
const circumference = 2 * Math.PI * RADIUS
const halfCircle = RADIUS + STROKE_WIDTH

const AnimatedTextInput = Animated.createAnimatedComponent(TextInput)

const parseSeconds = (seconds: number) => {
  const hours = Math.floor(seconds / 3600)
  const minutes = Math.floor((seconds - hours * 3600) / 60)
  const remainingSeconds = Math.floor(seconds) - hours * 3600 - minutes * 60

  return { hours, minutes, seconds: remainingSeconds }
}

const formatTimeForCountDown = (time: {
  hours: number
  minutes: number
  seconds: number
}) => {
  const { hours, minutes, seconds } = time
  return `${hours < 10 ? '0' : ''}${hours}:${
    minutes < 10 ? '0' : ''
  }${minutes}:${seconds < 10 ? '0' : ''}${seconds}`
}

type ClockProps = {
  room: Room
  parentAspectRatio: number
  onEventStateChange: () => void
}

const RoomClock: (props: ClockProps) => JSX.Element = ({
  room,
  parentAspectRatio: aspectRatio,
  onEventStateChange,
}: ClockProps) => {
  const [isAvailable, setIsAvailable] = useState(isRoomAvailable(room))
  const changeDate = findRoomNextChangeDate(room)
  const currentEvent = findRoomCurrentEvent(room)
  const color = isAvailable ? 'turquoise' : 'red'
  const remainingSeconds = diffChangeDateAndNow(changeDate)
  const animatedProgress = useRef(new Animated.Value(0)).current
  const circleRef = useRef<View>(null)
  const inputRef = useRef<TextInput>(null)
  const { currentRoomId, endCurrentEvent } = useContext(DataContext)

  const currentEventStartEndDate = currentEvent
    ? hoursToSeconds(currentEvent.endDate.getHours()) +
      minutesToSeconds(currentEvent.endDate.getMinutes()) +
      currentEvent.endDate.getSeconds() -
      (hoursToSeconds(currentEvent.startDate.getHours()) +
        minutesToSeconds(currentEvent.startDate.getMinutes()) +
        currentEvent.startDate.getSeconds())
    : 0

  const bookedTime = !isAvailable ? currentEventStartEndDate : undefined

  const animateProgress = (toValue: number) => {
    Animated.timing(animatedProgress, {
      duration: 1000,
      toValue,
      useNativeDriver: true,
      easing: Easing.linear,
    }).start()
  }

  const updateTimerComponent = (newValue: number) => {
    if (inputRef?.current) {
      if (remainingSeconds !== undefined) {
        const formattedTime = {
          text: formatTimeForCountDown(parseSeconds(newValue)),
        }

        inputRef.current.setNativeProps(formattedTime)
      } else {
        const hours = new Date().getHours()
        const minutes = new Date().getMinutes()
        const seconds = new Date().getSeconds()
        inputRef.current.setNativeProps({
          text: formatTimeForCountDown({ hours, minutes, seconds }),
        })
      }
    }
  }

  const startCountdownTimer = (fromValue: number) => {
    let seconds = fromValue
    const timerId = setInterval(() => {
      seconds--
      console.log(seconds)
      console.log('remaining seconds', remainingSeconds)
      updateTimerComponent(seconds)
      if (remainingSeconds !== undefined) {
        animateProgress(currentPercentageProgress(seconds))
        if (seconds < 0) {
          setIsAvailable(isRoomAvailable(room))
          onEventStateChange()
          clearInterval(timerId)
        } else {
          updateTimerComponent(seconds)
        }
      } else {
        updateTimerComponent(seconds)
      }
    }, 1000)
    return timerId
  }

  const currentPercentageProgress = (value: number | undefined) => {
    if (remainingSeconds && value) {
      return bookedTime
        ? (100 * value) / bookedTime
        : (100 * value) / remainingSeconds
    } else {
      return 100
    }
  }

  useEffect(() => {
    console.log('use effect remaining seconds', remainingSeconds)
    if (remainingSeconds === undefined) {
      animateProgress(100)
    } else {
      animateProgress(currentPercentageProgress(remainingSeconds))
      updateTimerComponent(remainingSeconds ?? 0)
    }
    const timerId = startCountdownTimer(remainingSeconds ?? 0)
    if (remainingSeconds !== undefined) {
      animatedProgress.addListener(({ value }) => {
        updateProgressCircle(value)
      })
    }

    return () => {
      animatedProgress.removeAllListeners()
      clearInterval(timerId)
    }
  }, [remainingSeconds])

  const updateProgressCircle = (percentageProgress: number) => {
    const strokeDashoffset =
      circumference - (circumference * percentageProgress) / 100
    if (circleRef?.current) {
      circleRef.current.setNativeProps({
        strokeDashoffset: -strokeDashoffset,
      })
    }
  }

  const timerDefaultValue = () => {
    if (remainingSeconds !== undefined) {
      formatTimeForCountDown(parseSeconds(remainingSeconds ?? 0))
    } else {
      const hours = new Date().getHours()
      const minutes = new Date().getMinutes()
      const seconds = new Date().getSeconds()
      return formatTimeForCountDown({ hours, minutes, seconds })
    }
  }

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
              remainingSeconds === undefined
                ? theme.colors.backgroundLight
                : theme.colors[color]
            }
            strokeWidth={STROKE_WIDTH}
            strokeLinecap="round"
            strokeDashoffset={circumference}
            strokeDasharray={remainingSeconds === undefined ? 0 : circumference}
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
        defaultValue={timerDefaultValue()}
        style={[StyleSheet.absoluteFillObject, styles.text]}
      />

      {!isAvailable && (
        <Button
          title="End early"
          onPress={() => {
            endCurrentEvent(currentRoomId)
          }}
          variant="error"
          style={styles.earlyButton}
        />
      )}
    </View>
  )
}

export default RoomClock

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
