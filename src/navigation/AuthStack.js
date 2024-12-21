import React, { useState, useEffect } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LoginPage from '../screens/LoginPage';
import SignupPage from '../screens/SignupPage';
import OnboardingScreen1 from '../screens/OnboardingScreen1';
import OnboardingScreen2 from '../screens/OnboardingScreen2';
import OnboardingScreen3 from '../screens/OnboardingScreen3';
import LoadingScreen from '../screens/LoadingScreen'; // Yükleme ekranı

const Stack = createNativeStackNavigator();

const AuthStack = () => {
    const [hasSeenOnboarding, setHasSeenOnboarding] = useState(null);

    useEffect(() => {
        const checkOnboarding = async () => {
            try {
                const value = await AsyncStorage.getItem('hasSeenOnboarding');
                if (value === null) {
                    // İlk kez açılıyor, bayrak yok
                    setHasSeenOnboarding(false);
                } else {
                    // Onboarding daha önce görüldü
                    setHasSeenOnboarding(true);
                }
            } catch (error) {
                console.error('AsyncStorage error:', error);
            }
        };

        checkOnboarding();
    }, []);

    if (hasSeenOnboarding === null) {
        // AsyncStorage işlemi tamamlanana kadar bir yükleme ekranı gösterilir
        return <LoadingScreen />;
    }

    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            {!hasSeenOnboarding ? (
                <>
                    <Stack.Screen name="OnboardingScreen1" component={OnboardingScreen1} />
                    <Stack.Screen name="OnboardingScreen2" component={OnboardingScreen2} />
                    <Stack.Screen name="OnboardingScreen3" component={OnboardingScreen3} />
                    <Stack.Screen name="LoginPage" component={LoginPage} />
                    <Stack.Screen name="SignupPage" component={SignupPage} />
                </>
            ) : (
                <>
                    <Stack.Screen name="LoginPage" component={LoginPage} />
                    <Stack.Screen name="SignupPage" component={SignupPage} />
                </>
            )}
        </Stack.Navigator>
    );
};

export default AuthStack;
