import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomePage from '../screens/HomePage';
import CreateAdPage from '../screens/CreateAdPage';
import MyAccountPage from '../screens/MyAccountPage';
import AdDetailsPage from '../screens/AdDetailsPage';

const Stack = createNativeStackNavigator();

const AppStack = () => {
    return (
        <Stack.Navigator initialRouteName="HomePage" screenOptions={{ headerShown: false }}>
            <Stack.Screen name="HomePage" component={HomePage} />
            <Stack.Screen
                name="CreateAdPage"
                component={CreateAdPage}
                options={{ headerShown: true, title: "İlan Oluştur" }}
            />
            <Stack.Screen name="MyAccountPage" component={MyAccountPage} />
            <Stack.Screen name="AdDetailsPage" component={AdDetailsPage} options={{headerShown:true, title: "Kaan"}} />
        </Stack.Navigator>
    );
};

export default AppStack;
