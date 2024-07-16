import React, { useRef } from 'react';
import { View, TouchableOpacity, Text, Image, Animated, useWindowDimensions, StyleSheet, FlatList } from 'react-native';
import FeedProfile from '@components/FeedProfile';
import { API_URL } from '@utils/api';

const heart_empty = require('@icons/heart_empty.png');
const heart_fill = require('@icons/heart_fill.png');
const comment = require('@icons/comment.png');
const more = require('@icons/more.png');

const Feed = ({navigation,
  item: { content, emotions, images, nickname, replys, tags, id }, }) => {

  const { width } = useWindowDimensions();
  const value = useRef(new Animated.Value(0)).current;

  return (
    <View>
      <View style={{ flexDirection: 'row', marginHorizontal: 16, marginTop: 16 }}>
        <FeedProfile
          imageUrl="https://avatar.iran.liara.run/public"
          name={nickname}
          date={tags[tags.length - 1]}
        />
        <TouchableOpacity>
          <Image style={{ width: 40, height: 40 }} source={more} />
        </TouchableOpacity>
      </View>
      <View style={{ width, height: width, backgroundColor: '#f1f1f1' }}>
        <FlatList
          horizontal
          snapToInterval={width}
          data={images}
          renderItem={({ item }) => {
            return (
              <Image
                style={{ width, height: width }}
                source={{ uri: `${API_URL}${item}` }}
              />
            );
          }}
        />
      </View>
      <View style={{ padding: 16 }}>
        <Text style={{ color: '#333'}}>{content}</Text>
      </View>
      <View style={{ width: '100%', paddingHorizontal: 16, }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
            {tags.map((item, index) => (tags.length - 1 > index) && 
            <TouchableOpacity onPress={() => navigation.navigate('Search')}>
            <Text style={styles.feedTag}>{item}</Text>
            </TouchableOpacity>
            )}
          </View>
        
        <View style={{ flexDirection: 'row', gap: 16, paddingVertical: 8 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <TouchableOpacity>
              <Animated.Image
                source={emotions.emotionCheck ? heart_fill : heart_empty}
                style={{
                  width: 28,
                  height: 28,
                  transform: [
                    {
                      scale: value.interpolate({
                        inputRange: [0, 1],
                        outputRange: [1, 1.2],
                      }),
                    },
                  ],
                }}
              />
            </TouchableOpacity>
            <Text>{emotions.total}</Text>
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <TouchableOpacity>
              <Image
                style={{ width: 26, height: 26 }}
                source={comment}
                resizeMode="cover"
              />
            </TouchableOpacity>
            <Text>{replys.length}</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  feedTag: {
    backgroundColor: '#eee',
    padding: 5,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  }
});

export default Feed;