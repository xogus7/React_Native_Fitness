import React, { useRef } from 'react';
import {View, TouchableOpacity, Text, Image, Animated, useWindowDimensions, StyleSheet} from 'react-native';
import FeedProfile from './FeedProfile';

const Feed = ({navigation, liked, setLiked, content }) => {
  const { width } = useWindowDimensions();

  const value = useRef(new Animated.Value(0)).current;

  return (
    <View>
      <View style={{ flexDirection: 'row', marginHorizontal: 16, marginTop: 16 }}>
        <FeedProfile
          imageUrl="https://avatar.iran.liara.run/public"
          name="user1"
          date={new Date()}
        />
        <TouchableOpacity>
          <Image style={{ width: 40, height: 40 }} source={more} />
        </TouchableOpacity>
      </View>

      <View style={{ padding: 16 }}>
        <Text>{content}</Text>
      </View>
      <View style={{ width, height: width }}>
        <Image
          style={{ width: width, height: width }}
          source={{
            uri: 'https://images.unsplash.com/photo-1538805060514-97d9cc17730c?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
          }}
        />
      </View>
      <View style={{ width: '100%', padding: 16, }}>
      <TouchableOpacity onPress={() => navigation.navigate('SearchTag')}>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10}}>
          <Text style={styles.feedTag} >#운동</Text>
          <Text style={styles.feedTag}>#헬스</Text>
          <Text style={styles.feedTag}>#스포츠</Text>
        </View>
        </TouchableOpacity>
        <View style={{ flexDirection: 'row', gap: 16, paddingVertical: 8}}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <TouchableOpacity
            onPress={() => setLiked(!liked)}>
            <Animated.Image
              source={liked ? heart_fill : heart_empty}
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
          <Text>12</Text>
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <TouchableOpacity>
            <Image
              style={{ width: 26, height: 26 }}
              source={comment}
              resizeMode="cover"
            />
          </TouchableOpacity>
          <Text>9</Text>
        </View>
      </View>
      </View>
    </View>
  );
};

const heart_empty = require('../assets/icons/heart_empty.png');
const heart_fill = require('../assets/icons/heart_fill.png');
const comment = require('../assets/icons/comment.png');
const more = require('../assets/icons/more.png');

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