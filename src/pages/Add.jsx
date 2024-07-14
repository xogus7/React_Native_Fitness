import React, { useEffect, useState } from 'react';
import {
  SafeAreaView, View, Text, Image, FlatList, TouchableOpacity,
  useWindowDimensions, Platform, ScrollView,
  StyleSheet
} from 'react-native';
import { CameraRoll } from '@react-native-camera-roll/camera-roll';
import { hasAndroidPermission } from '../utils/permissions';
import BasicHeader from '../components/BasicHeader';

const Add = ({ navigation }) => {
  const [images, setImages] = useState([]);
  const [selectedPhoto, setSelectedPhoto] = useState();
  const [selectedIndex, setSelectedIndex] = useState();

  const uploadImage = async () => {
    FetchImages();
  };

  const FetchImages = async () => {
    if (Platform.OS === "android" && !(await hasAndroidPermission())) {
      console.log("fail");
    }
    else {
      CameraRoll.getPhotos({
        first: 100,
        assetType: 'Photos',
        groupTypes: 'All'
      }).then(res => {
        console.log(res);
        if (!selectedPhoto) {
          setSelectedPhoto(res.edges[0].node.image);
          setSelectedIndex(0);
        }

        setImages(res.edges.map(e => e.node.image))
      })
    }
  }

  const renderItem = ({ item, index }) => {
    return (
      <View>
        <TouchableOpacity
          style={styles.cancelImage}
          onPress={() => {
            const newImages = [...images];
            newImages.splice(index, 1);
            setImages(newImages);
          }}>
          <Image style={{ width: '100%', height: "100%" }} source={closeIcon} />
        </TouchableOpacity>
        <Image
          style={{ width: 72, height: 72, borderRadius: 8 }}
          source={item}
        />
      </View>
    )
  }


  return (
    <SafeAreaView>
      <BasicHeader title="오운완 등록하기" />
      <ScrollView>
        <View style={{ flexDirection: 'row' }}>
          <TouchableOpacity
            style={styles.uploadImageButton}
            onPress={uploadImage}>
            <Image style={{ width: 40, height: 40 }} source={image_upload} />
            <Text style={{ color: '#bbb' }}>{`${images.length}개`}</Text>
          </TouchableOpacity>
          <View style={{ flex: 1 }}>
            <FlatList
              horizontal
              data={images}
              contentContainerStyle={{
                gap: 16,
                paddingVertical: 16,
                paddingRight: 16,
              }}
              renderItem={renderItem}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

const image_upload = require('../assets/icons/image_upload.png');
const closeIcon = require('../assets/icons/close.png');

const styles = StyleSheet.create({
  cancelImage: {
    position: 'absolute',
    backgroundColor: '#f2f2f2',
    width: 24,
    height: 24,
    borderRadius: 100,
    zIndex: 1,
    right: -12,
    top: -12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  uploadImageButton: {
    marginVertical: 16,
    marginRight: 16,
    width: 72,
    height: 72,
    alignItems: 'center',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#aaa',
    justifyContent: 'center',
  }
});

export default Add;