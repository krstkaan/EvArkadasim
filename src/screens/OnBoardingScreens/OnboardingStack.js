import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import OnboardingScreen1 from './OnboardingScreen1';
import OnboardingScreen2 from './OnboardingScreen2';
import OnboardingScreen3 from './OnboardingScreen3';

const Stack = createNativeStackNavigator();

const OnboardingStack = () => {
    return (
        <Stack.Navigator initialRouteName="OnboardingScreen1" screenOptions={{ headerShown: false }}>
            <Stack.Screen name="OnboardingScreen1" component={OnboardingScreen1} />
            <Stack.Screen name="OnboardingScreen2" component={OnboardingScreen2} />
            <Stack.Screen name="OnboardingScreen3" component={OnboardingScreen3} />
        </Stack.Navigator>
    );
};

export default OnboardingStack;