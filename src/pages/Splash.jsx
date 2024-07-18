import React, { useEffect, useState } from 'react';
import { View, Text, Linking, Platform, Image } from 'react-native';

const splashIcon = require('@icons/splash.png')

const Splash = ({ navigation }) => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        setTimeout(() => {
            navigation.navigate('Login')
        }, 2000)
    }, [])

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Image style={{width: '100%', height: '100%'}}source={splashIcon} resizeMode='contain'/>
        </View>
    )
}

export default Splash;