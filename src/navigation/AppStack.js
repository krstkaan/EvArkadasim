import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomePage from '../screens/HomePage';
import CreateAdPage from '../screens/CreateAdPage';
import MyAccountPage from '../screens/MyAccountPage';
import AdDetailsPage from '../screens/AdDetailsPage';
import SettingsPage from '../screens/SettingsPage';
import ProfileEditPage from '../screens/ProfileEditPage';
import MyAdsPage from '../screens/MyAdsPage';
import MyFavAdsPage from '../screens/MyFavAdsPage';
import EditAdPage from '../screens/EditAdPage';
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
            <Stack.Screen name="AdDetailsPage" component={AdDetailsPage} options={{ headerShown: true, title: "Kaan" }} />
            <Stack.Screen name="SettingsPage" component={SettingsPage} options={{ headerShown: true, title: "Ayarlar" }} />
            <Stack.Screen name="ProfileEditPage" component={ProfileEditPage} options={{ headerShown: true, title: "Profil Düzenle" }} />
            <Stack.Screen name="MyAdsPage" component={MyAdsPage} options={{ headerShown: true, title: "İlanlarım" }} />
            <Stack.Screen name="MyFavAdsPage" component={MyFavAdsPage} options={{ headerShown: true, title: "Favorilerim" }} />
            <Stack.Screen name="EditAdPage" component={EditAdPage} options={{ headerShown: true, title: "İlanı Düzenle" }} />
        </Stack.Navigator>
    );
};

export default AppStack;