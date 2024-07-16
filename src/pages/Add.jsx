import React, { useEffect, useRef, useState } from 'react';
import {
  SafeAreaView, View, Text, Image, FlatList, TouchableOpacity,
  ScrollView, StyleSheet, TextInput,
  useWindowDimensions
} from 'react-native';
import ImageCropPicker from 'react-native-image-crop-picker';

import { hasAndroidPermission } from '@utils/permissions';
import BasicHeader from '@components/BasicHeader';
import { api } from '@utils/api';

var onPressPost = false;

const Add = ({ navigation }) => {
  const { width } = useWindowDimensions();
  const [images, setImages] = useState([]);
  const [feedForm, setFeedForm] = useState({ content: '', tags: [] });
  const [tag, setTag] = useState('');
  const contentInputRef = useRef(null);

  const uploadImage = async () => {
    if (hasAndroidPermission()) {
      const selectedImages = await ImageCropPicker.openPicker({
        multiple: true,
        mediaType: 'photo',
        cropping: true,
        maxFiles: 5 - images.length,
      });
      setImages([...images,
      ...selectedImages]);
    }
  };

  const postFeed = async () => {
    const formData = new FormData();
    console.log(feedForm)
    formData.append('feedRequest', JSON.stringify(feedForm));
    images.forEach(image => {
      console.log({
        uri: image.path,
        type: image.mime,
        name: 'image.name',
      });
      formData.append('image', {
        uri: image.path,
        type: image.mime,
        name: 'image.name',
      })
    });

    console.log(formData);

    const response = await api.post('/feed', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
    console.log("ok: "+response.ok+ " problem: "+ response.problem)
    if (response.ok) {
      console.log("post success");
      setImages([]);
      setFeedForm({ content: '', tags: [] });
      setTag('');
      contentInputRef.current.clear();
      navigation.navigate('Home');
      
    } else {
      console.log(response.problem);
    }
  };

  useEffect(() => {
    if (onPressPost) {
      postFeed();
      onPressPost = false;
    }
  }, [feedForm])

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <BasicHeader title="데일리 피드 작성" />
      <ScrollView showsVerticalScrollIndicator={false}
      style={{ marginHorizontal: 16 }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
          <TouchableOpacity
            style={styles.uploadImageButton}
            onPress={uploadImage}>
            <Image style={{ width: 40, height: 40 }} source={image_upload} />
            <Text style={{ color: '#aaa' }}>{`${images.length}/5`}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button}
          onPress={() => {
            onPressPost = true;
            const postCreateDate = new Date();
            setFeedForm(state => ({
              content: state.content,
              tags: [...state.tags,
              postCreateDate.toString()]
            }));
          }}>
          <Text style={{ color: '#fff' }}>피드 등록하기</Text>
        </TouchableOpacity>
        </View>
        <View style={{ gap: 16, flex: 1 }}>
          <TextInput ref={contentInputRef}
            style={styles.input}
            placeholder="input content"
            multiline={true}
            onChangeText={text =>
              setFeedForm(state => ({
                content: text,
                tags: [...state.tags],
              }))
            }
          />
          <View style={{ flexDirection: 'row', gap: 16 }}>
            <TextInput
              style={styles.input}
              placeholder="input tag"
              onChangeText={setTag}
              value={tag}
            />
            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                const newTags = [...feedForm.tags, `#${tag.replaceAll('#', '')}`];
                setFeedForm(state => ({ content: state.content, tags: newTags }));
                setTag('');
              }}>
              <Text style={{ color: '#fff' }}>태그 등록</Text>
            </TouchableOpacity>
          </View>
          <View
            style={{
              flex: 1,
              borderTopColor: '#e1e1e1',
              borderTopWidth: 1,
              paddingVertical: 8,
              gap: 8,
            }}>
            <Text style={{ fontSize: 16, color: '#000', fontWeight: 'bold' }}>
            미리보기
            </Text>
            <View style={{ flex: 1 }}>
              <FlatList
              horizontal
                data={images}
                snapToInterval={width}
                contentContainerStyle={{
                  gap: 16,
                  paddingRight: 16,
                }}
                renderItem={({ item, index }) => (
                  <View >
                    <TouchableOpacity
                      style={styles.cancelImage}
                      onPress={() => {
                        const newImages = [...images];
                        newImages.splice(index, 1);
                        setImages(newImages);
                      }}>
                      <Image source={closeIcon} style={{ width: '100%', height: '100%' }} />
                    </TouchableOpacity>
                    <Image
                      style={{ width, height: width, borderRadius: 8, resizeMode: 'center'}}
                      source={{ uri: item.path }}
                    />
                  </View>
                )}
              />
            </View>
            <FlatList
              data={feedForm.tags}
              horizontal
              ItemSeparatorComponent={() => <Text style={{ marginHorizontal: 5 }} />}
              renderItem={({ item, index }) => {
                return (
                  <TouchableOpacity
                    style={styles.tagButton}
                    onPress={() => {
                      const newTags = [...feedForm.tags];
                      newTags.splice(index, 1);
                      setFeedForm({ ...feedForm, tags: newTags });
                    }}>
                    <Text style={{ color: '#555' }}>{item}</Text>
                  </TouchableOpacity>
                );
              }}
            />
          </View>
        </View>
      </ScrollView>
      <View style={{ flex: 1, borderTopColor: '#e1e1e1', borderTopWidth: 1, padding: 16 }}>
        
      </View>
    </SafeAreaView>
  );
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
    right: 40,
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
  },

  input: {
    flex: 1,
    paddingHorizontal: 16,
    borderRadius: 8,
    backgroundColor: '#B2DCFF',
  },

  button: {
    height: 50,
    backgroundColor: '#4AABFF',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  tagButton: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: '#eee',
    borderRadius: 5,
  }
});

export default Add;