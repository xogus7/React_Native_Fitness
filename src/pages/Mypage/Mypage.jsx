import React, { useEffect, useState } from 'react';
import { SafeAreaView, View, Text, TouchableOpacity, Image } from 'react-native';
import BasicHeader from '@components/BasicHeader';
import FitnessCalender from '@components/FitnessCalender';
import { useIsFocused } from '@react-navigation/native';
import { API_URL, api } from '@utils/api';
import { TEST_ID } from 'react-native-gifted-chat';




const Mypage = ({ navigation, route }) => {
    const isFocused = useIsFocused();
    const [myPageInfo, setMyPageInfo] = useState();

    useEffect(() => {
        
        if (isFocused) {
            console.log("Get")
            getMypageInfo();
            getMyFeedListDates();
        }
    }, [isFocused]);

    const getMypageInfo = async () => {
        const response = await api.get('/accounts/info/mypage');
        if (response.ok || response.data) {
            setMyPageInfo(response.data.result);
        } else {
            console.warn(response.data);
        }
    }

    const getMyFeedListDates = () => {
        {myPageInfo && myPageInfo.feedList.map((item) => {
            console.log(item.tags[item.tags.length - 1])
        })}
        return
    }


    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#FFF' }}>
            <View style={{ flex: 1 }}>

                <BasicHeader title={'내 정보'} />
                {myPageInfo && (
                    <>
                        <View style={{ flexDirection: 'row', alignItems: 'center', borderBottomWidth: 1, borderBottomColor: '#ddd', paddingVertical: 30 }}>
                            <Image
                                source={myPageInfo.accountInfoResponse.profileImagePath ?
                                    { uri: `${API_URL}${myPageInfo.accountInfoResponse.profileImagePath}` }
                                    : { uri: 'https://avatar.iran.liara.run/public' }}
                                style={{ width: 60, height: 60, borderRadius: 30, marginLeft: 20 }} />
                            <Text style={{ color: '#111', fontSize: 20, fontWeight: 'bold', marginLeft: 20 }}>
                                {myPageInfo.accountInfoResponse.nickName}</Text>
                            <TouchableOpacity
                                style={{
                                    width: 100,
                                    height: 40,
                                    marginLeft: 150,
                                    backgroundColor: '#9CB6FF',
                                    borderRadius: 8,
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                }}
                                onPress={() =>
                                    navigation.navigate('EditMyInfo',
                                        myPageInfo.accountInfoResponse
                                    )}
                            >
                                <Text style={{ color: '#fff', fontWeight: 'bold' }}>
                                    프로필 편집
                                </Text>
                            </TouchableOpacity>
                            <Text style={{bottom: 7, left: 20, fontWeight: 500, fontSize: 15, position: 'absolute'}}>자기소개: {myPageInfo.accountInfoResponse.introduce}</Text>
                        </View>
                        
                        <View style={{
                            borderBottomWidth: 1,
                            borderBottomColor: '#ddd',
                            paddingHorizontal: 70, 
                            paddingVertical: 15,
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            alignItems: 'center'
                        }}>
                            <TouchableOpacity
                                onPress={() => navigation.navigate('Myfeed', {data: myPageInfo.feedList,
                                    onPressFeedImage: id => navigation.navigate('FeedDetail', {id})}
                                )}
                                style={{ alignItems: 'center', gap: 2 }}>

                                <Text style={{ color: '#111', fontSize: 13 }}>게시물</Text>
                                <Text style={{ color: '#111', fontSize: 12 }}>{myPageInfo.feedList.length}</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => navigation.navigate('Follower')}
                                style={{ alignItems: 'center', gap: 2 }}>
                                <Text style={{ color: '#111', fontSize: 13 }}>팔로워</Text>
                                <Text style={{ color: '#111', fontSize: 12 }}>{myPageInfo.accountInfoResponse.followerCount}</Text>

                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => navigation.navigate('Follower')}
                                style={{ alignItems: 'center', gap: 2 }}>
                                <Text style={{ color: '#111', fontSize: 13 }}>팔로잉</Text>
                                <Text style={{ color: '#111', fontSize: 12 }}>{myPageInfo.accountInfoResponse.followingCount}</Text>
                            </TouchableOpacity>
                        </View>
                    </>
                )}
                <FitnessCalender navigation={navigation} />
            </View>
        </SafeAreaView>
    )
}

export default Mypage;