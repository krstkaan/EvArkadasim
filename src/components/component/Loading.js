import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { ActivityIndicator } from 'react-native'


const Loading = ({ IndicatorMetni }) => {
    return (
        <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#343a40" />
            <Text style={styles.loadingText}> {IndicatorMetni} </Text>
        </View>
    )
}

export default Loading

const styles = StyleSheet.create({
    loadingContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgb(243 239 239)',
        position: 'absolute',
        width: '100%',
        height: '100%',
        zIndex: 1000000,
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
    },
    loadingText: {
        marginTop: 10,
        fontSize: 16,
        color: '#343a40',
    },
})