import React, { useState } from 'react';
import { SafeAreaView, View, TouchableOpacity, FlatList } from 'react-native';
import Feed from '../../components/Feed';
import BasicHeader from '../../components/BasicHeader';

const Home = ({ navigation }) => {
    const [liked, setLiked] = useState(false);

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#FFF' }}>
            <BasicHeader title={'Home'}/>
            <View style={{ flex: 1, backgroundColor: '#FFF', marginBottom: 32 }}>
                <TouchableOpacity onPress={() => navigation.navigate('FeedDetail')}>
                    <Feed navigation={navigation} liked={liked} setLiked={setLiked} content="feed content" />
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}

export default Home;