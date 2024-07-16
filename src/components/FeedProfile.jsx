import React from 'react';
import {View, Image, Text} from 'react-native';

const FeedProfile = ({ imageUrl, name, date, }) => {
  return (
    <View style={{flex: 1, flexDirection: 'row', alignItems: 'center', gap: 8}}>
      <Image
        style={{width: 40, height: 40, borderRadius: 100}}
        source={{uri: imageUrl}}
      />
      <View style={{flex: 1, gap: 4}}>
        <Text style={{fontWeight: 'bold', color: '#000'}}>{name}</Text>
        <Text style={{marginBottom: 18, fontSize: 13, color: '#999'}}>
          {formattingTime(date)}
        </Text>
      </View>
    </View>
  );
};

const formattingTime = (date) => {
  const diff = new Date().getTime() - new Date(date).getTime();
  const milliSecond = 1000;
  const minute = 60 * milliSecond;
  const hour = 60 * minute;
  if (diff <= 59 * milliSecond) // 59초
    return `${Math.floor(diff/milliSecond)}초 전`;
  else if (diff <= 59 * minute + 59 * milliSecond) // 59분59초
    return  `${Math.floor(diff/minute)}분 전`;
  else if (diff <= 23 * hour ) // 23시간59분59초
    return  `${Math.floor(diff/hour)}시간 전`;
  else return new Date(date).toISOString().split('T')[0];
}

export default FeedProfile;