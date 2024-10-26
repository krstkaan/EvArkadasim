import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const CreateAdPage = () => {
  return (
    <View style={styles.container}>
      <Text>Create Ad Page</Text>
    </View>
  )
}

export default CreateAdPage

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
})