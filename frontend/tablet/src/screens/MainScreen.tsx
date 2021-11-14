import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

const RoomDetailScreen : React.FC = () => {
    return (
        <View style={styles.container}>
            <Text>Room Screen</Text>
        </View>
    )
}

export default RoomDetailScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignSelf: 'center',
        justifyContent: 'center'
    },
})