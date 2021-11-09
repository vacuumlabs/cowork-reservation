import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

const App : React.FC = () => {
    return (
        <View style={styles.container}>
            <Text>Room Screen</Text>
        </View>
    )
}

export default App;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignSelf: 'center',
        justifyContent: 'center'
    },
})