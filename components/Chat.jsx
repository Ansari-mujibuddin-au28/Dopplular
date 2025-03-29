import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { View, Text, FlatList, TouchableOpacity, TextInput } from 'react-native';
import { fetchUserChats, fetchMessages, sendMessage, createChat } from '../redux/chatReducer';
import io from 'socket.io-client';

const socket = io('https://doppular.vercel.app');

const ChatScreen = ({ route, navigation,fetchUserChats, fetchMessages, sendMessage, createChat,loginResponse,chats, messages}) => {
  console.log(loginResponse?.result?.profileId,"chatReducer")

  const [selectedChat, setSelectedChat] = useState(null);
  const [newMessage, setNewMessage] = useState('');

  useEffect(() => {
    fetchUserChats(loginResponse?.result?.profileId)
    socket.emit('saveUser', { loginProfileId: loginResponse?.result?.profileId, socket: socket.id });
    socket.on('onlineUsers', (users) => console.log('Online Users:', users));
    createChat({ firstId: loginResponse.result.profileId, secondId: "67a9fad83937c0d6f16e8669" });
  }, []);

  const openChat = (chatId) => {
    setSelectedChat(chatId);
    fetchMessages(chatId);
  };

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      sendMessage({ chatId: selectedChat, message: newMessage });
      socket.emit('sendMessage', { chatId: selectedChat, message: newMessage });
      setNewMessage('');
    }
  };

  return (
    <View style={{ flex: 1, padding: 16 }}>
      {!selectedChat ? (
        <FlatList
          data={chats}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => openChat(item?._id)}>
              <Text style={{ fontSize: 18, padding: 10 }}>{item._id}</Text>
            </TouchableOpacity>
          )}
        />
      ) : (
        <View style={{ flex: 1 }}>
          <FlatList
            data={messages[selectedChat] || []}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => <Text>{item.message}</Text>}
          />
          <TextInput
            value={newMessage}
            onChangeText={setNewMessage}
            placeholder='Type a message...'
            style={{ borderWidth: 1, padding: 10, marginVertical: 10 }}
          />
          <TouchableOpacity onPress={handleSendMessage}>
            <Text>Send</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};
const mapStateToProps = (state) => ({
  loginResponse: state.login?.loginResponseData || {},
  chats: state.chat?.chats || [],
  messages: state.chat?.messages || {},
});

const mapDispatchToProps = {
  fetchUserChats, 
  fetchMessages, 
  sendMessage, 
  createChat 
};

export default connect(mapStateToProps, mapDispatchToProps)(ChatScreen);
