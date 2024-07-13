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
        <Text style={{fontSize: 13, color: '#555'}}>
          {date.toLocaleDateString()}
        </Text>
      </View>
    </View>
  );
};

export default FeedProfile;