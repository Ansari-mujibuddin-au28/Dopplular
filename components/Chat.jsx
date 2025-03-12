import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import AppBar from './AppBar';

const suggestedUsers = [
  { id: '1', name: 'Priya', username: '@priya143' },
  { id: '2', name: 'Priya', username: '@priya143' },
  { id: '3', name: 'Telesa', username: 'Telesa' },
];

const Chats = () => {
  return (
    <>  
    <AppBar title="Chats" />
    <View style={styles.container}>
      <Text style={styles.header}>Chat</Text>
      <Text style={styles.noChatsText}>No chats</Text>
      <Text style={styles.suggestionText}>Show dogs or follow and start chatting with your friends</Text>
      <Text style={styles.suggestedHeader}>Suggested to follow</Text>
      <FlatList
        data={suggestedUsers}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.userItem}>
            <Text style={styles.userName}>{item.name}</Text>
            <Text style={styles.userUsername}>{item.username}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  noChatsText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginTop: 20,
  },
  suggestionText: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginTop: 10,
  },
  suggestedHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
  },
  userItem: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  userName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  userUsername: {
    fontSize: 14,
    color: '#666',
  },
});

export default Chats;