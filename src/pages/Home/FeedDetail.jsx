import React, { useEffect, useRef, useState } from 'react';
import { Keyboard, SafeAreaView, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Controller, FieldErrors, useForm } from 'react-hook-form';
import Toast from 'react-native-toast-message';

import Feed from '@components/Feed';
import FeedProfile from '@components/FeedProfile';
import BasicHeader from '@components/BasicHeader';
import { api } from '@utils/api';

const FeedDetail = ({
  navigation,
  route,
}) => {
  const scrollViewRef = useRef(null);
  const [feed, setFeed] = useState();
  const { control, setValue, handleSubmit } = useForm({
    defaultValues: {
      comment: '',
    },

  });

  useEffect(() => {
    fetchFeed();
  }, []);

  const fetchFeed = async () => {
    const response = await api.get(
      `/feed/${route.params.id}`,
    );

    if (response.ok && response.data) {
      setFeed(response.data?.result);
    }
  };

  const renderComments = (comments) => {
    return (
      <>
        {comments.map(comment => (
          <View
            style={{
              gap: 8,
              backgroundColor: '#f1f1f1',
              borderRadius: 8,
              padding: 16,
            }}
            key={comment.replyId}>
            <FeedProfile
              name={comment.nickname}
              date={new Date(comment.createDate)}
              imageUrl="https://avatar.iran.liara.run/public"
            />
            <Text style={{ color: '#333' }}>{comment.reply}</Text>
          </View>
        ))}
      </>
    );
  };

  const postComment = async (data) => {
    const response = await api.post(`/feed/${feed?.id}/reply`, {
      reply: data.comment,
    });

    if (response.ok) {
      await fetchFeed();
      Keyboard.dismiss();
      setValue('comment', '');
      scrollViewRef.current?.scrollToEnd();
    }
  };

  const onInvalid = (formErrors) => {
    Toast.show({ type: 'error', text1: formErrors.comment?.message });
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <BasicHeader title="" />
      {feed && (
        <View style={{ flex: 1 }}>
          <ScrollView ref={scrollViewRef} style={{ flex: 1 }}>
            <Feed item={feed} />
            <View
              style={{
                padding: 16,
                gap: 16,
                borderTopColor: '#e1e1e1',
                borderTopWidth: 1,
              }}>
              {renderComments(feed.replys)}
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
              render={({ field: { onBlur, onChange, value } }) => (
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
                backgroundColor: '#9CB6FF',
                borderRadius: 8,
                alignItems: 'center',
                justifyContent: 'center',
              }}
              onPress={handleSubmit(postComment, onInvalid)}>
              <Text style={{ color: '#fff' }}>등록</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </SafeAreaView>
  );
};

export default FeedDetail;