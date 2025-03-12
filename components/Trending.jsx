import React from 'react';
import { View, Text, StyleSheet, FlatList, Image } from 'react-native';
import AppBar from './AppBar';

const trendingData = [
  { id: '1', image: 'https://picsum.photos/202', title: 'Trending Reel 1' },
  { id: '2', image: 'https://picsum.photos/201', title: 'Trending Reel 2' },
  { id: '3', image: 'https://picsum.photos/203', title: 'Trending Reel 3' },
];

const Trending = () => {
  return (
    <> <AppBar title="Trending" />
    <View style={styles.container}>
      
      <Text style={styles.header}>Trending</Text>
      <FlatList
        data={trendingData}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.reelItem}>
            <Image source={{ uri: item.image }} style={styles.reelImage} />
            <Text style={styles.reelTitle}>{item.title}</Text>
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
  reelItem: {
    marginBottom: 20,
  },
  reelImage: {
    width: '100%',
    height: 200,
    borderRadius: 8,
  },
  reelTitle: {
    fontSize: 16,
    marginTop: 8,
  },
});

export default Trending;