import React, {useState} from 'react';
import { SafeAreaView, View, Text, Image, TouchableOpacity, Dimensions, FlatList } from 'react-native';
import CommentsModal from '../components/CommentsModal';

const logo = require('../assets/icons/logo.png');
const heart = require('../assets/icons/heart.png');
const comment = require('../assets/icons/comment.png');
const more = require('../assets/icons/more.png');

const { width } = Dimensions.get('window');


const dummy_feed = [
    {
        id: 1,
        name: 'user_1',
        profileImg: 'https://avatar.iran.liara.run/public',
        feedImg: [
            'https://picsum.photos/400',

        ],
        contents: 'contents...',
        like: 37,
        likeUsers: [
            1, 2, 3,
        ]
    },
    {
        id: 2,
        name: 'user_2',
        profileImg: 'https://avatar.iran.liara.run/public',
        feedImg: [
            'https://picsum.photos/400/',

        ],
        contents: 'contents...',
        like: 37,
        likeUsers: [
            1, 2, 3,
        ]
    },
    {
        id: 3,
        name: 'user_3',
        profileImg: 'https://avatar.iran.liara.run/public',
        feedImg: [
            'https://picsum.photos/400/400',

        ],
        contents: 'contents...',
        like: 37,
        likeUsers: [
            1, 2, 3,
        ]
    }
]

const Home = () => {
    const [isVisible, setIsVisible] = useState(false);

    const renderFeed = ({ item, index }) => {
        return (
            <View style={{ paddingVertical: 24 }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginHorizontal: 16, marginBottom: 8 }}>
                    <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
                        <Image source={{ uri: item.profileImg }} style={{ width: 32, height: 32 }} />
                        <Text style={{ fontSize: 16, fontWeight: '400', lineHeight: 19.97 }}>{item.name}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Image source={more} style={{ width: 24, height: 24 }} />
                    </TouchableOpacity>
                </View>
               
                <Image source={{ uri: item.feedImg[0] }} style={{ width: width - 30, height: width - 30, borderRadius: 15, marginHorizontal: 15}} resizeMode='contain' />
                
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 16, marginBottom: 4 }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                        <TouchableOpacity>
                            <Image source={heart} style={{ width: 32, height: 32 }} />
                        </TouchableOpacity>
                        <Text>{item.like}</Text>
                        <TouchableOpacity
                            onPress={() => setIsVisible(!isVisible)}
                        >
                            <Image source={comment} style={{ width: 32, height: 32 }} />
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={{ marginHorizontal: 16, gap: 4 }}>
                    <Text style={{ fontWeight: '400', color: '#4F4F4F' }}>{item.contents}</Text>
                    <Text style={{ fontSize: 12, color: '#bbb' }}>작성 시간</Text>
                </View>
            </View>
        )
    }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#FFF' }}>
            <View style={{ flex: 1, backgroundColor: '#FFF', marginBottom: 32 }}>
                <FlatList
                    data={dummy_feed}
                    renderItem={renderFeed}
                    keyExtractor={item => item.id}
                    removeClippedSubviews
                    showsVerticalScrollIndicator={false}
                    ListHeaderComponent={() => (
                        <View>
                            <View style={{ padding: 16, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                <Text style={{fontSize: 16, fontWeight: '500', color: 'black'}}>오운완</Text>
                                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                                    {/* header right */}
                                </View>
                            </View>
                        </View>
                    )}
                />
                <CommentsModal 
                    isVisible={isVisible} setIsVisible={setIsVisible}
                />
            </View>

        </SafeAreaView>
    )
}

export default Home;