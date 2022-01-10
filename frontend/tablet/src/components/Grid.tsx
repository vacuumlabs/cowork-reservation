import React, { PropsWithChildren } from 'react'
import { View, ViewStyle, StyleProp } from 'react-native'

import { spacing as themeSpacing } from './theme'

const createStyles: (
  direction: ViewStyle['flexDirection'],
  justify: ViewStyle['justifyContent'],
  alignItems: ViewStyle['alignItems']
) => ViewStyle = (direction, justify, alignItems) => ({
  flexDirection: direction,
  justifyContent: justify,
  alignItems,
})

const createItemStyle: (
  spacing: number,
  direction: ViewStyle['flexDirection'],
  stretch: boolean,
  totalItemsNumber: number,
  index: number
) => ViewStyle = (spacing, direction, stretch, totalItemsNumber, index) => {
  const halfSpacing = themeSpacing(spacing / 2)
  const isLastItem = !direction?.includes('reverse')
    ? totalItemsNumber - 1 === index
    : index === 0
  const isFirstItem = direction?.includes('reverse')
    ? totalItemsNumber - 1 === index
    : index === 0
  return {
    ...(direction?.includes('row')
      ? {
          ...(stretch ? { height: '100%' } : {}),
          marginRight: !isLastItem ? halfSpacing : 0,
          marginLeft: !isFirstItem ? halfSpacing : 0,
        }
      : {
          ...(stretch ? { width: '100%' } : {}),
          marginBottom: !isLastItem ? halfSpacing : 0,
          marginTop: !isFirstItem ? halfSpacing : 0,
        }),
  }
}

type Props = PropsWithChildren<{
  spacing?: number
  stretch?: boolean
  direction?: ViewStyle['flexDirection']
  justify?: ViewStyle['justifyContent']
  alignItems?: ViewStyle['alignItems']
  style?: StyleProp<ViewStyle>
}>

const Grid: React.FC<Props> = ({
  spacing = 0,
  stretch = false,
  direction = 'column',
  justify = 'flex-start',
  alignItems = 'flex-start',
  style,
  children,
}: Props) => {
  const gridStyle = createStyles(direction, justify, alignItems)
  return (
    <View style={[gridStyle, style]}>
      {Array.isArray(children) &&
      children.filter((child) => !!child).length > 1 ? (
        children.map((child, i) => (
          <View
            key={`${child}-${i}`}
            style={createItemStyle(
              spacing,
              direction,
              stretch,
              children.length,
              i
            )}
          >
            {child}
          </View>
        ))
      ) : (
        <View style={createItemStyle(spacing, direction, stretch, 1, 0)}>
          {children}
        </View>
      )}
    </View>
  )
}

export default Grid
