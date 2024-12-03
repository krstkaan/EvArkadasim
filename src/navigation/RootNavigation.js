import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import AuthStack from "./AuthStack";
import { useSelector } from 'react-redux';
import CustomUserBottomBar from '../components/component/CustomUserBottomBar';
import AppStack from './AppStack';
const RootNavigation = () => {

    const isAuth = useSelector(state => state.user.isAuth)

    return (
        <NavigationContainer>
            {!isAuth ? <><AuthStack /></> : <><AppStack /><CustomUserBottomBar /></>}
        </NavigationContainer>

    )
}

export default RootNavigation