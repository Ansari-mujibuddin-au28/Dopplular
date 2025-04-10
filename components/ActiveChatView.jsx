import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigate,useParams } from 'react-router-native';
import { connect } from 'react-redux';
import { fetchMessages, sendMessage } from '../redux/chatReducer';
import io from 'socket.io-client';

const ActiveChatView = ({
  loginResponse,
  members,
  messages,
  fetchMessages,
  sendMessage,
}) => {
   const params = useParams(); 
  const navigate = useNavigate();
  const [newMessage, setNewMessage] = useState('');
  const socket = io('https://doppular.vercel.app');
  console.log('Socket connected:', socket);

  useEffect(() => {
    if (params?.chatId) {
      fetchMessages(params?.chatId);
    }
  }, [params?.chatId]);

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      sendMessage({ chatId:params?.chatId,senderId:params?.chatId, message: newMessage });
      socket.emit('sendMessage', { chatId: params?.chatId, message: newMessage });
      setNewMessage('');
    }
  };

  

  const otherMember = (members[params?.chatId] || []).find(
    (member) => member
  );

  const renderMessageItem = ({ item }) => (
    console.log(item,"+++++++"),
    <View
      style={[
        styles.messageBubble,
       
      ]}
    >
      <Text
     
      >
        {item.message}
      </Text>
      <Text style={styles.messageTime}>
        {new Date(item.createdAt).toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit',
        })}
      </Text>
    </View>
  );

  return (
    <View style={styles.chatContainer}>
      <View style={styles.chatHeader}>
        <TouchableOpacity onPress={() => navigate(-1)}>
          <Text style={styles.backButton}>←</Text>
        </TouchableOpacity>
        <Text style={styles.chatHeaderName}>{otherMember?.username || 'Chat'}</Text>
      </View>

      <FlatList
        data={messages[params?.chatId] || []}
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
  messages: state.chat?.messages || {},
  members: state.chat?.members || {},
});

const mapDispatchToProps = {
  fetchMessages,
  sendMessage,
};

export default connect(mapStateToProps, mapDispatchToProps)(ActiveChatView);
