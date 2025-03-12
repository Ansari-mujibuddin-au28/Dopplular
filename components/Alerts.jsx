import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import AppBar from './AppBar';

const alertsData = [
  { id: '1', message: 'New message from Priya' },
  { id: '2', message: 'You have a new follower' },
  { id: '3', message: 'Your post has 10 likes' },
];

const Alerts = () => {
  return (
    <> 
    <AppBar title="Alerts" />
    <View style={styles.container}>
      <Text style={styles.header}>Alerts</Text>
      <FlatList
        data={alertsData}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.alertItem}>
            <Text style={styles.alertMessage}>{item.message}</Text>
          </View>
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
  alertItem: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  alertMessage: {
    fontSize: 16,
  },
});

export default Alerts;