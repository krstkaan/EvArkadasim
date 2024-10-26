import { StyleSheet, View, Keyboard } from 'react-native';
import React, { useState, useEffect } from 'react';
import { faHome, faUser, faCartShopping, faPerson, faPeopleArrows } from '@fortawesome/free-solid-svg-icons';
import { useNavigationState } from '@react-navigation/native'; // useNavigationState hook'u eklendi
import BarItem from './BarItem';



const CustomUserBottomBar = () => {
    const [isKeyboardVisible, setKeyboardVisible] = useState(false);

    const navigationState = useNavigationState((state) => state); // navigationState ile mevcut state alınıyor
    const currentRouteName = navigationState?.routes[navigationState.index]?.name; // Aktif olan route'u alıyoruz

    useEffect(() => {
        const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () => {
            setKeyboardVisible(true);
        });

        const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => {
            setKeyboardVisible(false);
        });

        return () => {
            keyboardDidShowListener.remove();
            keyboardDidHideListener.remove();
        };
    }, []);

    // Belirli sayfalarda gizlemek için kontrol
    const hideBottomBarRoutes = ['İşlemlerim', 'ProductDetails']; // Gizlemek istediğiniz sayfa isimlerini buraya ekleyin (Örnek: ['İşlemlerim', 'Profilim'])

    if (isKeyboardVisible || hideBottomBarRoutes.includes(currentRouteName)) {
        return null;
    }

    return (
        <View style={styles.container}>
            <BarItem
                itemText="Ana Sayfa"
                itemLink="HomePage"
                itemIcon={faHome}
                iconSize={20}
                iconColor="black"
                isActive={currentRouteName === 'HomePage'} // Aktif rota kontrolü
            />
            <BarItem
                itemText="İlan Ver"
                itemLink="CreateAdPage"
                itemIcon={faPeopleArrows}
                iconSize={20}
                iconColor="black"
                isActive={currentRouteName === 'CreateAdPage'} // Aktif rota kontrolü
            />
            <BarItem
                itemText="Hesabım"
                itemLink="LoginPage"
                itemIcon={faUser}
                iconSize={25}
                iconColor="black"
                isActive={currentRouteName === 'LoginPage'}
            />




        </View>
    );
};

export default CustomUserBottomBar;

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        paddingVertical: 5,
        backgroundColor: 'white',
        borderTopWidth: 1,
        borderTopColor: 'lightgrey',
        position: 'absolute',
        bottom: 0,
        width: '100%',
    }
});