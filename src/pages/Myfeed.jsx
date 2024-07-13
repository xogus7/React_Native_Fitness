import React from 'react';
import { SafeAreaView, View, Text, TouchableOpacity, Image } from 'react-native';
import BasicHeader from '../components/BasicHeader';


const Myfeed = ({ navigation }) => {
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#FFF' }}>
            <View style={{ flex: 1 }}>
                <BasicHeader title={'My Feed'}/>
                <View style={{ flexDirection: 'row', alignItems: 'center', borderBottomWidth: 1, borderBottomColor: '#ddd', paddingVertical: 15}}>
                    <Image source={{ uri: 'https://picsum.photos/130/130' }} style={{ width: 60, height: 60, borderRadius: 30, marginLeft: 20}} />
                    <Text style={{ color: '#111', fontSize: 20, fontWeight: 'bold', marginLeft: 20 }}>김태현</Text>
                </View>
                <View style={{ paddingHorizontal: 70, paddingVertical: 15, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                    <TouchableOpacity
                        style={{ alignItems: 'center', gap: 2 }}>
                        <Text style={{ fontSize: 13 }}>게시물</Text>
                        <Text style={{ fontSize: 12 }}>10</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    )
}

export default Myfeed;