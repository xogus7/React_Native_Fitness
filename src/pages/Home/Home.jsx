import React, { useCallback, useEffect, useState } from 'react';
import { SafeAreaView, View, TouchableOpacity, FlatList, RefreshControl } from 'react-native';

import Feed from '@components/Feed';
import TitleHeader from '@components/TitleHeader';
import { api } from '@utils/api';
import { useIsFocused } from '@react-navigation/native';


const Home = ({ navigation }) => {
  const [feeds, setFeeds] = useState([]);
  const [likedFeedList, setLikedFeedList] = useState();
  const [refreshing, setRefreshing] = useState(false);
  const isFocused = useIsFocused();

  useEffect(() => {
    fetchFeeds();
  }, []);

  useEffect(() => {
  if (isFocused){
    fetchFeeds();
  }
  }, [isFocused]);


  const fetchFeeds = async () => {
    const response = await api.get('/feed', {});
    if (response.ok && response.data?.result) {
      try {
        setFeeds(response.data.result.content);
        console.log(response.data.result.content)
      } catch (error) {
        
      }
      
      console.log(response.data.result.totalPages);
    }
  };

  const renderFeedItem = useCallback(
    ({ item }) => (
      <TouchableOpacity
        onPress={() =>
          navigation.navigate('FeedDetail', {
            id: `${item.id}`,
          })
        }>
        <Feed navigation={navigation} item={item} />
      </TouchableOpacity>
    ),
    [],
  );

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#FFF' }}>
      <TitleHeader title={'Home'} />
      <View style={{ flex: 1 }}>
        <FlatList
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={async () => {
                await fetchFeeds();
                setRefreshing(false);
              }}
            />
          }
          keyExtractor={item => item.id}
          data={feeds}
          renderItem={({ item }) => (
              <Feed navigation={navigation} item={item} />
          )}
        />
      </View>
    </SafeAreaView>
  )
}

export default Home;