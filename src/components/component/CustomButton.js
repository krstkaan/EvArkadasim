import { StyleSheet, Text, Pressable } from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons';

const CustomButton = ({ 
  ButtonText, 
  setWidth, 
  handleOnpress,
  ButtonColor, 
  pressedButtonColor, 
  ButtonBorderRadius,
  handleMarginBottom, 
  handleIconname, 
  handleIconsize,
  handleIconColor, 
  ButtonTextFontsize = 16 // Varsayılan değer 16
}) => {
  return (
    <Pressable 
      style={({ pressed }) => [
        {
          backgroundColor: pressed ? pressedButtonColor : ButtonColor, 
          width: setWidth, 
          borderRadius: ButtonBorderRadius, 
          marginBottom: handleMarginBottom 
        }, 
        styles.buton
      ]}
      onPress={handleOnpress}
    >
      {ButtonText && <Text style={[styles.buttonText, { fontSize: ButtonTextFontsize }]}>{ButtonText}</Text>}
      {handleIconname && <Ionicons name={handleIconname} size={handleIconsize} color={handleIconColor} />}
    </Pressable>
  )
}

export default CustomButton

const styles = StyleSheet.create({
  buton: {
    padding: 10,
    marginTop: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});