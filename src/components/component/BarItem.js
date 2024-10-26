import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { useNavigation } from '@react-navigation/native'; // useNavigationState hook'u eklendi

const BarItem = ({ itemText, itemLink, itemIcon, iconSize, iconColor, iconStyle, isActive }) => {

    const navigation = useNavigation();

    const Linkislemi = () => {
        navigation.navigate(itemLink);
    };

    return (
        <TouchableOpacity style={styles.tabButton} onPress={Linkislemi}>
            <FontAwesomeIcon
                icon={itemIcon}
                size={iconSize}
                color={isActive ? '#4e9c2e' : iconColor} // Aktifse mavi, değilse varsayılan renk
                style={iconStyle}
            />
            <Text style={[styles.tabLabel, isActive && styles.activeTabLabel]}>{itemText}</Text>
        </TouchableOpacity>
    );
};

export default BarItem

const styles = StyleSheet.create({
    tabButton: {
        alignItems: 'center',
        justifyContent: 'space-around',
    },
    tabLabel: {
        fontSize: 12,
        lineHeight:25 ,
        color: 'black',
        marginTop: 2,
        alignItems: 'center',
        verticalAlign: 'bottom',
        justifyContent: 'center',
        height:25
    },
    activeTabLabel: {
        color: '#4e9c2e', // Aktif sekmenin metin rengini mavi yap
    },
});