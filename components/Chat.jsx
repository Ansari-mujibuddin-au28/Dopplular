import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { View, Text, FlatList, TouchableOpacity, TextInput, Image, StyleSheet, ScrollView } from 'react-native';
import { fetchUserChats, fetchMessages, sendMessage, createChat } from '../redux/chatReducer';
import { getSuggestions } from '../redux/profilereducer';
import io from 'socket.io-client';

const socket = io('https://doppular.vercel.app');

const ChatScreen = ({ 
  fetchUserChats, 
  fetchMessages, 
  sendMessage,
  createChat,
  loginResponse,
  chats,
  messages,
  getSuggestions,
  getSuggestionsData,
  members
}) => {
  const [selectedChat, setSelectedChat] = useState(null);
  const [newMessage, setNewMessage] = useState('');

  useEffect(() => {
    getSuggestions();
    fetchUserChats(loginResponse?.result?.profileId);
    socket.emit('saveUser', { loginProfileId: loginResponse?.result?.profileId, socket: socket.id });
    socket.on('onlineUsers', (users) => console.log('Online Users:', users));
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

  const startNewChat = (userId) => {
    createChat({ firstId: loginResponse.result.profileId, secondId: userId });
  };

  const renderChatItem = (item) => {
    const chatMembers = members[item._id] || [];
    const otherMember = chatMembers.find(member => member);
    
    return (
      <TouchableOpacity 
        style={styles.chatItem} 
        onPress={() => openChat(item._id)}
      >
        <Image 
          source={{ uri: otherMember?.profilePicture || 'https://picsum.photos/502/502' }} 
          style={styles.profileImage}
        />
        <View style={styles.chatInfo}>
          <Text style={styles.chatName}>{otherMember?.username || 'Unknown User'}</Text>
          <Text style={styles.lastMessage}>Tap to chat</Text>
        </View>
        <View style={styles.newMessageBadge}>
          <Text style={styles.badgeText}>2+</Text>
        </View>
      </TouchableOpacity>
    );
  };

  const renderSuggestionItem = (item) => (
    <View style={styles.suggestionItemContainer}>
      <TouchableOpacity 
        style={styles.suggestionItem}
        onPress={() => startNewChat(item._id)}
      >
        <Image 
          source={{ uri: item.profilePicture || 'https://via.placeholder.com/50' }} 
          style={styles.suggestionImage}
        />
        <Text style={styles.suggestionName}>{item.name}</Text>
        <Text style={styles.suggestionUsername}>@{item.username}</Text>
      </TouchableOpacity>
    </View>
  );

  const renderEmptyState = () => (
    <View style={styles.emptyContainer}>
      <Image 
        source={require('../assets/nochats.png')}
        style={styles.emptyImage}
      />
      <Text style={styles.emptyTitle}>No chats</Text>
      <Text style={styles.emptySubtitle}>Share days or follow posts to start chatting with your friends</Text>
    </View>
  );

  const renderMessageItem = ({ item }) => (
    <View style={[
      styles.messageBubble,
      item.sender === loginResponse?.result?.profileId 
        ? styles.myMessage 
        : styles.theirMessage
    ]}>
      <Text style={item.sender === loginResponse?.result?.profileId ? styles.myMessageText : styles.theirMessageText}>
        {item.message}
      </Text>
      <Text style={styles.messageTime}>
        {new Date(item.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
      </Text>
    </View>
  );

  const hasChats = chats?.response?.length > 0;
  const hasSuggestions = getSuggestionsData?.length > 0;

  if (selectedChat) {
    // Active chat view
    const chatMembers = members[selectedChat] || [];
    const otherMember = chatMembers.find(member => member._id !== loginResponse?.result?.profileId);
    
    return (
      <View style={styles.chatContainer}>
        <View style={styles.chatHeader}>
          <TouchableOpacity onPress={() => setSelectedChat(null)}>
            <Text style={styles.backButton}>←</Text>
          </TouchableOpacity>
          <Text style={styles.chatHeaderName}>{otherMember?.name || 'Chat'}</Text>
        </View>
        
        <FlatList
          data={messages[selectedChat] || []}
          keyExtractor={(item, index) => index.toString()}
          renderItem={renderMessageItem}
          contentContainerStyle={styles.messagesContainer}
          inverted
        />
        
        <View style={styles.inputContainer}>
          <TextInput
            value={newMessage}
            onChangeText={setNewMessage}
            placeholder="Message..."
            style={styles.input}
            placeholderTextColor="#999"
          />
          <TouchableOpacity 
            style={styles.sendButton}
            onPress={handleSendMessage}
            disabled={!newMessage.trim()}
          >
            <Text style={styles.sendText}>Send</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  return (
    <ScrollView 
      style={styles.container}
      contentContainerStyle={styles.scrollContent}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Chat</Text>
      </View>
      
      {hasChats ? (
        <View style={styles.chatListContainer}>
          {chats.response.map(item => (
            <View key={item._id}>
              {renderChatItem(item)}
            </View>
          ))}
        </View>
      ) : (
        renderEmptyState()
      )}
      
      <Text style={styles.sectionTitle}>People You May Know</Text>
      {hasSuggestions ? (
        <ScrollView 
          horizontal
          style={styles.suggestionsScroll}
          contentContainerStyle={styles.suggestionsContainer}
          showsHorizontalScrollIndicator={false}
        >
          {getSuggestionsData.map(item => (
            <View key={item._id}>
              {renderSuggestionItem(item)}
            </View>
          ))}
        </ScrollView>
      ) : (
        <Text style={styles.noSuggestionsText}>No suggestions available</Text>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollContent: {
    flexGrow: 1,
  },
  header: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    marginVertical: 20,
  },
  emptyImage: {
    width: 120,
    height: 120,
    marginBottom: 20,
    resizeMode: 'contain',
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  emptySubtitle: {
    fontSize: 14,
    color: '#888',
    textAlign: 'center',
    maxWidth: '80%',
  },
  chatListContainer: {
    marginBottom: 20,
  },
  chatItem: {
    flexDirection: 'row',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
    alignItems: 'center',
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 15,
  },
  chatInfo: {
    flex: 1,
  },
  chatName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  lastMessage: {
    fontSize: 14,
    color: '#888',
  },
  newMessageBadge: {
    backgroundColor: '#007AFF',
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 2,
  },
  badgeText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    padding: 15,
    backgroundColor: '#f9f9f9',
    marginTop: 10,
  },
  suggestionsScroll: {
    marginBottom: 20,
  },
  suggestionsContainer: {
    paddingHorizontal: 15,
  },
  suggestionItemContainer: {
    marginRight: 15,
  },
  suggestionItem: {
    width: 100,
    alignItems: 'center',
    padding: 10,
  },
  suggestionImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginBottom: 8,
  },
  suggestionName: {
    fontSize: 14,
    fontWeight: '500',
    textAlign: 'center',
  },
  suggestionUsername: {
    fontSize: 12,
    color: '#888',
    textAlign: 'center',
  },
  noSuggestionsText: {
    textAlign: 'center',
    color: '#888',
    padding: 20,
  },
  chatContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
  chatHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  backButton: {
    fontSize: 20,
    marginRight: 15,
  },
  chatHeaderName: {
    fontSize: 18,
    fontWeight: '600',
  },
  messagesContainer: {
    padding: 15,
  },
  messageBubble: {
    maxWidth: '80%',
    padding: 12,
    borderRadius: 15,
    marginBottom: 10,
  },
  myMessage: {
    alignSelf: 'flex-end',
    backgroundColor: '#007AFF',
    borderTopRightRadius: 0,
  },
  theirMessage: {
    alignSelf: 'flex-start',
    backgroundColor: '#f0f0f0',
    borderTopLeftRadius: 0,
  },
  messageText: {
    fontSize: 16,
  },
  myMessageText: {
    color: '#fff',
  },
  theirMessageText: {
    color: '#333',
  },
  messageTime: {
    fontSize: 10,
    color: '#888',
    marginTop: 4,
    textAlign: 'right',
  },
  inputContainer: {
    flexDirection: 'row',
    padding: 10,
    borderTopWidth: 1,
    borderTopColor: '#eee',
    alignItems: 'center',
    backgroundColor: '#f9f9f9',
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginRight: 10,
    backgroundColor: '#fff',
    fontSize: 16,
  },
  sendButton: {
    padding: 10,
  },
  sendText: {
    color: '#007AFF',
    fontWeight: '600',
  },
});

const mapStateToProps = (state) => ({
  loginResponse: state.login?.loginResponseData || {},
  chats: state.chat?.chats || {},
  messages: state.chat?.messages || {},
  getSuggestionsData: state.profile?.getSuggestionsData || [],
  members: state.chat?.members || {},
});

const mapDispatchToProps = {
  fetchUserChats, 
  fetchMessages, 
  sendMessage,
  createChat,
  getSuggestions 
};

export default connect(mapStateToProps, mapDispatchToProps)(ChatScreen);