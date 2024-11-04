import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const HomePage = () => {
  return (
    <View style={styles.container}>
      <Text>Büşra Kocaman Was Here</Text>
      <Text>We Could Be The Same</Text>
    </View>

  )
}

export default HomePage

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
})