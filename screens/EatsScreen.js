import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

const EatsScreen = () => {
  const Stack = createStackNavigator()
  

  return (
    
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="EatsScreen" component={EatsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
    
  )
}

export default EatsScreen

const styles = StyleSheet.create({})