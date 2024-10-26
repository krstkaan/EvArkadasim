import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const MyAccountPage = () => {
  return (
    <View style={styles.container}>
      <Text>My Account Page</Text>
    </View>
  )
}

export default MyAccountPage

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
})