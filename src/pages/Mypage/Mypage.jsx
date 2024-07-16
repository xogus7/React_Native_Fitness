import React, { useEffect, useState } from 'react';
import { SafeAreaView, View, Text, TouchableOpacity, Image } from 'react-native';
import BasicHeader from '@components/BasicHeader';
import FitnessCalender from '@components/FitnessCalender';
import { useIsFocused } from '@react-navigation/native';
import { API_URL, api } from '@utils/api';




const Mypage = ({ navigation, route }) => {
    const isFocused = useIsFocused();
    const [myPageInfo, setMyPageInfo] = useState();

    useEffect(() => {
        getMyFeedListDates();
        if (isFocused) {
            console.log("Get")
            getMypageInfo();
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
        myPageInfo.feedList.map((item) => {
            console.log(item.tags[item.tags.length - 1])
        })
        return
    }


    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#FFF' }}>
            <View style={{ flex: 1 }}>

                <BasicHeader title={'내 정보'} />
                {myPageInfo && (
                    <>
                        <View style={{ flexDirection: 'row', alignItems: 'center', borderBottomWidth: 1, borderBottomColor: '#ddd', paddingVertical: 15 }}>
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
                                    backgroundColor: '#4AABFF',
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
                        </View>
                        <View style={{ paddingHorizontal: 70, paddingVertical: 15, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                            <TouchableOpacity
                                onPress={() => navigation.navigate('Myfeed')}
                                style={{ alignItems: 'center', gap: 2 }}>

                                <Text style={{ fontSize: 13 }}>게시물</Text>
                                <Text style={{ fontSize: 12 }}>{myPageInfo.feedList.length}</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => navigation.navigate('Follower')}
                                style={{ alignItems: 'center', gap: 2 }}>
                                <Text style={{ fontSize: 13 }}>팔로워</Text>
                                <Text style={{ fontSize: 12 }}>{myPageInfo.accountInfoResponse.followerCount}</Text>

                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => navigation.navigate('Follower')}
                                style={{ alignItems: 'center', gap: 2 }}>
                                <Text style={{ fontSize: 13 }}>팔로잉</Text>
                                <Text style={{ fontSize: 12 }}>{myPageInfo.accountInfoResponse.followingCount}</Text>

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