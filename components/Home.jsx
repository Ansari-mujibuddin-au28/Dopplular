import React from 'react';
import { View, Text, Image, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/FontAwesome';
import AppBar from './AppBar';

const posts = [
  {
    id: '1',
    username: 'Raju',
    handle: '@raju143',
    text: 'Hey this one is so cool I have found the similar person..',
    time: '3:50 - 26 Nov 2024',
    images: [
      'https://picsum.photos/202',
      'https://picsum.photos/201',
      'https://picsum.photos/200',
    ],
  },
  {
    id: '2',
    username: 'Priya',
    handle: '@priya143',
    text: 'Hey this one is so cool I have found the similar person..',
    time: '5:30 - 26 Nov 2024',
    images: [
      'https://picsum.photos/202',
      'https://picsum.photos/203',
       'https://picsum.photos/201',
    ],
  }
];

const HomeScreen = () => {
  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <View style={styles.userDetails}>
        <Text style={styles.username}>{item.username}</Text>
        <Text style={styles.handle}>{item.handle}</Text>
        <Text style={styles.time}>{item.time}</Text>
      </View>
      <Text style={styles.postText}>{item.text}</Text>
      <View style={styles.reelsContainer}>
        {item.images.map((img, index) => (
          <Image key={index} source={{ uri: img }} style={styles.image} />
        ))}
      </View>
      <View style={styles.actionsContainer}>
        <TouchableOpacity>
          <Icon name="heart" size={20} color="gray" />
        </TouchableOpacity>
        <TouchableOpacity>
          <Icon name="comment" size={20} color="gray" />
        </TouchableOpacity>
        <TouchableOpacity>
          <Icon name="share" size={20} color="gray" />
        </TouchableOpacity>
        <TouchableOpacity>
          <Icon name="bookmark" size={20} color="gray" />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
       <AppBar title="Home" />
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Doppulur</Text>
        <Icon name="search" size={20} color="black" />
      </View>
      <View style={styles.promoCard}>
        <Text style={styles.promoText}>Find look - alike</Text>
        <Text style={styles.promoSubText}>Discover people who look like you.</Text>
      </View>
      <FlatList
        data={posts}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
    marginBottom:50
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#fff',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
  },
  promoCard: {
    backgroundColor: '#8b5cf6',
    padding: 15,
    margin: 10,
    borderRadius: 10,
  },
  promoText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  promoSubText: {
    fontSize: 14,
    color: '#fff',
  },
  card: {
    backgroundColor: '#fff',
    padding: 15,
    marginVertical: 10,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  userDetails: {
    marginBottom: 10,
  },
  username: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  handle: {
    color: 'gray',
  },
  time: {
    color: 'gray',
    fontSize: 12,
  },
  postText: {
    marginBottom: 10,
  },
  reelsContainer: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  image: {
    width: 100,
    height: 100,
    marginRight: 10,
    borderRadius: 10,
  },
  actionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  }
});

const mapStateToProps = (state) => ({});
const mapDispatchToProps = {};
export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);