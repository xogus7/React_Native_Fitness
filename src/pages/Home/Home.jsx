import React, { useCallback, useEffect, useState } from 'react';
import { SafeAreaView, View, TouchableOpacity, FlatList, RefreshControl } from 'react-native';

import Feed from '@components/Feed';
import BasicHeader from '@components/BasicHeader';
import { api } from '@utils/api';

const Home = ({ navigation }) => {
  const [feeds, setFeeds] = useState([]);
  const [liked, setLiked] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    fetchFeeds();
  }, []);
  const fetchFeeds = async () => {
    const response = await api.get('/feed', {});
    if (response.ok && response.data?.result) {
      setFeeds(response.data.result.content);
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
      <BasicHeader title={'Home'} />
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
          renderItem={renderFeedItem}
        />
      </View>
    </SafeAreaView>
  )
}

export default Home;