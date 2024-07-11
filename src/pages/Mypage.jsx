import React from 'react';
import { SafeAreaView, View, Text, TouchableOpacity, Image } from 'react-native';

const settingsIcon = require('../assets/icons/settings.png');
const alarm = require('../assets/icons/alarm.png');
const backArrow = require('../assets/icons/back_arrow.png');


const Mypage = ({ navigation }) => {
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#FFF' }}>
            <View style={{ flex: 1 }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 10, marginBottom: 16, borderBottomWidth: 1, borderBottomColor: '#ddd' }}>
                    <View>
                        <TouchableOpacity onPress={() => navigation.goBack()}>
                            <Image source={backArrow} style={{ width: 40, height: 40, marginLeft: 8 }} />
                        </TouchableOpacity>
                    </View>
                    <View>
                        <Text style={{ color: '#111', fontSize: 18, fontWeight: 'bold' }}>내 정보</Text>
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8, marginRight: 8}}>
                        <TouchableOpacity>
                            <Image source={settingsIcon} style={{ width: 32, height: 32 }} />
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <Image source={alarm} style={{ width: 32, height: 32 }} />
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center', borderBottomWidth: 1, borderBottomColor: '#ddd', paddingBottom: 15, marginBottom: 15}}>
                    <Image source={{ uri: 'https://picsum.photos/130/130' }} style={{ width: 60, height: 60, borderRadius: 30, marginLeft: 20}} />
                    <Text style={{ color: '#111', fontSize: 20, fontWeight: 'bold', marginLeft: 20 }}>김태현</Text>
                </View>
                <View style={{ marginHorizontal: 70, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                    <TouchableOpacity style={{ alignItems: 'center', gap: 2 }}>

                        <Text style={{ fontSize: 13 }}>게시물</Text>
                        <Text style={{ fontSize: 12 }}>10</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => navigation.navigate('Follower')}
                        style={{ alignItems: 'center', gap: 2 }}>
                        <Text style={{ fontSize: 13 }}>팔로워</Text>
                        <Text style={{ fontSize: 12 }}>12</Text>

                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => navigation.navigate('Follower')}
                        style={{ alignItems: 'center', gap: 2 }}>
                        <Text style={{ fontSize: 13 }}>팔로윙</Text>
                        <Text style={{ fontSize: 12 }}>5</Text>

                    </TouchableOpacity>
                </View>


            </View>
        </SafeAreaView>
    )
}

export default Mypage;