import React, {useCallback, useEffect, useState} from 'react';
import {SafeAreaView} from 'react-native';
import {GiftedChat} from 'react-native-gifted-chat';
import BasicHeader from '../components/BasicHeader';

const ChatDetail = ({}) => {
  const [otherUser, setOtherUser] = useState();
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    fetchOtherUser(route.params.id);
    fetchMessages(route.params.id);

    async function fetchOtherUser(id) {
      setOtherUser({
        _id: id,
        name: 'user1',
        avatar: 'https://avatar.iran.liara.run/public',
      });
    }

    async function fetchMessages(id) {
      setMessages([
        {
          _id: id,
          text: 'Message text',
          createdAt: new Date(),
          user: {
            _id: 2,
            name: 'user2',
            avatar: 'https://avatar.iran.liara.run/public',
          },
        },
      ]);
    }
  }, [route.params.id]);

  const onSend = useCallback((sendMessages) => {
    setMessages(prevMessages => [...sendMessages, ...prevMessages]);
  }, []);

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
      <BasicHeader
        title={'ChatDetail'}
      />
      <GiftedChat
        messages={messages}
        showAvatarForEveryMessage={true}
        onSend={onSend}
        user={{
          _id: 1,
          name: 'song',
          avatar: 'https://avatar.iran.liara.run/public',
        }}
      />
    </SafeAreaView>
  );
};



export default ChatDetail;