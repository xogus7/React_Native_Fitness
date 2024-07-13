import React, { useRef } from 'react';
import { View, TouchableOpacity, Animated, StyleSheet  } from 'react-native';

const BottomTab = ({ state, navigation, insets, descriptors }) => {
    const tab1Value = useRef(new Animated.Value(0)).current;
    const tab2Value = useRef(new Animated.Value(0)).current;
    const tab3Value = useRef(new Animated.Value(0)).current;
    const tab4Value = useRef(new Animated.Value(0)).current;
    const tab5Value = useRef(new Animated.Value(0)).current;

    const scaleAnimated = (value, animatedValue) => 
        Animated.timing(animatedValue, {
            useNativeDriver: true,
            toValue: value,
            duration: 150
        });
    const animatedValues = {
        0: tab1Value,
        1: tab2Value,
        2: tab3Value,
        3: tab4Value,
        4: tab5Value,
    };

    return (
        <View style={[styles.bottomTabBarWrapper, {paddingBottom: insets.bottom}]}>
            {
                state.routes.map((route, index) => {
                    const { options } = descriptors[route.key];
                    const label = route.name;
                    const isFocused = state.index === index;
                    const animatedOf = animatedValues[index];

                    const iconFlag = bool => {
                        switch (label) {
                            case 'Home':
                                return bool ? home_fill : home_empty;
                            case 'Search':
                                return bool ? search_fill : search_empty;
                            case 'Add':
                                return bool ? addOn : addOn;
                            case 'Chat':
                                return bool ? chat_fill : chat_empty;
                            default:
                                return bool ? mypage_fill : mypage_empty;
                        }
                    }
                    
                    const onPress = () => {
                        const event = navigation.emit({
                            type: 'tabPress',
                            target: route.key,
                            canPreventDefault: true,
                        })

                        if (!isFocused && !event.defaultPrevented) {
                            navigation.navigate(route.name);
                        }

                        scaleAnimated(1, animatedOf).start(({ finished}) => {
                            if (finished) {
                                scaleAnimated(0, animatedOf).start();
                            }
                        })
                    }
                    return (
                        <TouchableOpacity 
                            key={index}
                            activeOpacity={0.7}
                            onPress={onPress}
                            style={{ flex: 1, alignItems: 'center' }}>
                            <Animated.Image
                            source={iconFlag(isFocused)}
                            resizeMode={'contain'}
                            style={{
                                width: 24,
                                height: 24,
                                transform: [
                                    {
                                        scale: animatedOf.interpolate({
                                            inputRange: [0, 1],
                                            outputRange: [1, 0.9],
                                        }),
                                    },
                                ],
                            }}
                        />
                        </TouchableOpacity>
                    )
                })
            }
        </View>
    )
}

const styles = StyleSheet.create({
    bottomTabBarWrapper: {
        flexDirection: 'row',
        position: 'absolute',
        bottom: 0,
        justifyContent: 'space-between',
        borderStyle: 'solid',
        borderTopWidth: 0.5,
        borderLeftWidth: 0.5,
        borderRightWidth: 0.5,
        borderColor: '#EEE',
        backgroundColor: '#FFF',
        paddingTop: 10,
        zIndex: 10
    }
})

const home_fill = require('../assets/icons/bottomtab/home_fill.png');
const home_empty = require('../assets/icons/bottomtab/home_empty.png');
const search_fill = require('../assets/icons/bottomtab/search_fill.png');
const search_empty = require('../assets/icons/bottomtab/search_empty.png');
const addOn = require('../assets/icons/bottomtab/add_circle_off.png');
const chat_fill = require('../assets/icons/bottomtab/chat_fill.png');
const chat_empty = require('../assets/icons/bottomtab/chat_empty.png');
const mypage_fill = require('../assets/icons/bottomtab/mypage_fill.png');
const mypage_empty = require('../assets/icons/bottomtab/mypage_empty.png');

export default BottomTab;