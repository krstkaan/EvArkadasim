import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomePage from './src/screens/HomePage';
import CreateAdPage from './src/screens/CreateAdPage';
import MyAccountPage from './src/screens/MyAccountPage';
import LoginPage from './src/screens/LoginPage';
import SignupPage from './src/screens/SignupPage';
import CustomUserBottomBar from './src/components/component/CustomUserBottomBar';

const Stack = createStackNavigator();
const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="HomePage" component={HomePage} options={{ headerShown: false,}} />
        <Stack.Screen name="CreateAdPage" component={CreateAdPage} options={{ headerShown: false,}} />
        <Stack.Screen name="MyAccountPage" component={MyAccountPage} options={{ headerShown: false,}} />
        <Stack.Screen name="LoginPage" component={LoginPage} options={{ headerShown: false,}} />
        <Stack.Screen name="SignupPage" component={SignupPage} options={{ headerShown: false,}} />


      </Stack.Navigator>
      <CustomUserBottomBar/>

    </NavigationContainer>
  );
};

export default App;