import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomePage from '../screens/HomePage';
import CreateAdPage from '../screens/CreateAdPage';
import MyAccountPage from '../screens/MyAccountPage';

const Stack = createNativeStackNavigator();

const AppStack = () => {
    return (
        <Stack.Navigator initialRouteName="HomePage" screenOptions={{ headerShown: false }}>
            <Stack.Screen name="HomePage" component={HomePage} />
            <Stack.Screen name="CreateAdPage" component={CreateAdPage} />
            <Stack.Screen name="MyAccountPage" component={MyAccountPage} />
        </Stack.Navigator>
    );
};

export default AppStack;