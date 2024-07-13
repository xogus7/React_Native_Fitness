import React, { useState } from 'react';
import {
    TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Text,
  View,
  TextInput,
} from 'react-native';
import Modal from 'react-native-modal';
import {Controller, useForm} from 'react-hook-form';
import Feed from '../components/Feed';
import FeedProfile from '../components/FeedProfile';
import BasicHeader from '../components/BasicHeader';


const FeedDetail = () => {
    const [isAlertVisible, setIsAlertVisible] = useState(false);
    const {
      control,
      handleSubmit,
      formState: {errors},
    } = useForm({defaultValues: {
        comment: '',
      }
    });
  
    const renderComments = (comments) => {
      return (
        <>
          {comments.map( comment => (
            <View
              style={{
                gap: 8,
                backgroundColor: '#f1f1f1',
                borderRadius: 8,
                padding: 16,
              }}
              key={comment.id}>
              <FeedProfile {...comment} />
              <Text style={{color: '#333'}}>{comment.content}</Text>
            </View>
          ))}
        </>
      );
    };
  
    const onPressSubmitComment = (data) => {
      console.log(data);
    };
  
    const onInvalid = () => {
      setIsAlertVisible(true);
    };
  
    return (
      <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
        <BasicHeader
          title="FeedDetail" />
        <ScrollView style={{flex: 1}}>
          <Feed content="feed content" />
          <View
            style={{
              padding: 16,
              gap: 16,
              borderTopColor: '#e1e1e1',
              borderTopWidth: 1,
            }}>
            {renderComments(dummy_comments)}
          </View>
        </ScrollView>
        <View
          style={{
            padding: 16,
            borderTopColor: '#e1e1e1',
            borderTopWidth: 1,
            flexDirection: 'row',
            gap: 8,
          }}>
          <Controller
            name="comment"
            control={control}
            render={({onBlur, onChange, value}) => (
              <TextInput
                style={{
                  flex: 1,
                  paddingHorizontal: 16,
                  borderRadius: 8,
                  borderWidth: 1,
                  borderColor: '#c1c1c1',
                }}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                placeholder="코멘트를 입력해주세요"
              />
            )}
          />
  
          <TouchableOpacity
            style={{
              width: 60,
              backgroundColor: '#e1e1e1',
              borderRadius: 8,
              alignItems: 'center',
              justifyContent: 'center',
            }}
            onPress={handleSubmit(onPressSubmitComment, onInvalid)}>
            <Text>등록</Text>
          </TouchableOpacity>
        </View>
        <Modal
          isVisible={isAlertVisible}
          onBackdropPress={() => setIsAlertVisible(false)}>
          <View style={{backgroundColor: '#fff', padding: 16, gap: 16}}>
            <Text style={{fontSize: 16, fontWeight: 'bold'}}>
              {errors.comment?.message}
            </Text>
            <TouchableOpacity style={{marginLeft: 'auto'}} onPress={onPress}>
              <Text style={{color: '#4080c4'}}>확인</Text>
            </TouchableOpacity>
          </View>
        </Modal>
      </SafeAreaView>
    );
    function onPress() {
      setIsAlertVisible(false);
    }
  };

const dummy_comments = [
  {
    id: 1,
    imageUrl: 'https://i.pravatar.cc/52',
    name: 'user1',
    date: new Date(),
    content: 'content1',
  },
  {
    id: 2,
    imageUrl: 'https://i.pravatar.cc/52',
    name: 'user2',
    date: new Date(),
    content: 'content2',
  },
  {
    id: 3,
    imageUrl: 'https://i.pravatar.cc/52',
    name: 'user3',
    date: new Date(),
    content: 'content3',
  },
  {
    id: 4,
    imageUrl: 'https://i.pravatar.cc/52',
    name: 'user4',
    date: new Date(),
    content: 'content4',
  },
  {
    id: 5,
    imageUrl: 'https://i.pravatar.cc/52',
    name: 'user5',
    date: new Date(),
    content: 'content1.',
  },
  {
    id: 6,
    imageUrl: 'https://i.pravatar.cc/52',
    name: 'user6',
    date: new Date(),
    content: 'content1.',
  },
  {
    id: 7,
    imageUrl: 'https://i.pravatar.cc/52',
    name: 'user7',
    date: new Date(),
    content: 'content1.',
  },
  {
    id: 8,
    imageUrl: 'https://i.pravatar.cc/52',
    name: 'user8',
    date: new Date(),
    content: 'content1.',
  },
  {
    id: 9,
    imageUrl: 'https://i.pravatar.cc/52',
    name: 'user9',
    date: new Date(),
    content: 'content1.',
  },
];

export default FeedDetail;