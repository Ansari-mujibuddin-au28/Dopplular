import React from 'react';
import { View, Text, Image, FlatList, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/FontAwesome';
import AppBar from './AppBar';
import { useNavigate } from 'react-router-native';

const { width } = Dimensions.get('window');

const posts = [
  {
    id: '1',
    username: 'Raju',
    handle: '@mjri142',
    text: 'Hey this one is so cool I have find the similar person...\nJoin the world!',
    images: [
      'https://picsum.photos/500/500',
      'https://picsum.photos/501/501',
      'https://picsum.photos/502/502',
    ],
    likes: 124,
    comments: 23,
    time: '2h ago'
  },
  {
    id: '2',
    username: 'Priya',
    handle: '@priya143',
    text: 'Hey this one is so cool I have find the similar person...\nJoin the world!',
    images: [
      'https://picsum.photos/503/503',
      'https://picsum.photos/504/504',
      'https://picsum.photos/505/505',
    ],
    likes: 89,
    comments: 12,
    time: '4h ago'
  },
  {
    id: '3',
    username: 'Ovara Whiter',
    handle: '@ovara139',
    text: 'Hey this one is so cool I have find the similar person...\nJoin the world!',
    images: [
      'https://picsum.photos/506/506',
      'https://picsum.photos/507/507',
      'https://picsum.photos/508/508',
    ],
    likes: 256,
    comments: 42,
    time: '6h ago'
  }
];

const HomeScreen = () => {
    
  const navigate = useNavigate();

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <View style={styles.userInfo}>
      <Image 
              source={{ uri: "https://picsum.photos/506/506"}} 
              style={{width:40,height:40,borderRadius:50, marginRight:10}} 
              resizeMode="cover"
            />
        <View style={styles.userText}>
          <Text style={styles.username}>{item.username}</Text>
          <Text style={styles.handle}>{item.handle}</Text>
        </View>
        <TouchableOpacity style={styles.moreButton}>
          <Icon name="ellipsis-h" size={16} color="black" />
        </TouchableOpacity>
      </View>
      
      <View style={styles.imageContainer}>
        <FlatList
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          data={item.images}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item: img }) => (
            <Image 
              source={{ uri: img }} 
              style={styles.image} 
              resizeMode="cover"
            />
          )}
        />
      </View>
      
      <View style={styles.actionButtons}>
        <TouchableOpacity style={styles.actionButton}>
          <Icon name="heart-o" size={24} color="black" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton}>
          <Icon name="comment-o" size={24} color="black" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton}>
          <Icon name="share" size={24} color="black" />
        </TouchableOpacity>
        <View style={styles.spacer} />
        <TouchableOpacity style={styles.actionButton}>
          <Icon name="bookmark-o" size={24} color="black" />
        </TouchableOpacity>
      </View>
      
      <Text style={styles.likes}>{item.likes} likes</Text>
      
      <Text style={styles.postText}>
        <Text style={styles.usernameInline}>{item.username}</Text> {item.text}
      </Text>
      
      <TouchableOpacity>
        <Text style={styles.viewComments}>View all {item.comments} comments</Text>
      </TouchableOpacity>
      
      <Text style={styles.time}>{item.time}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <AppBar title="Home" />
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Doppular</Text>
        <TouchableOpacity  onPress={() => navigate('/search')}>
        <Icon name="search" size={20} color="black" />
        </TouchableOpacity>
      </View>
      
      <View style={styles.promoCard}>
        <View>
        <Text style={styles.promoText}>Find look - alike</Text>
        <Text style={styles.promoSubText}>Discover people who look like you.</Text>
        </View>
        <Image 
              source={require('../assets/rb_29901.png')} 
              style={{width:60,height:60}} 
              resizeMode="cover"
            />
      </View>
      
      <FlatList
        data={posts}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
    marginBottom:100
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
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
    marginBottom: 10,
    flexDirection:'row',
    justifyContent:'space-between'
  },
  promoText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 5,
  },
  promoSubText: {
    fontSize: 14,
    color: '#fff',
  },
  card: {
    backgroundColor: '#fff',
    marginBottom: 15,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
  avatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#ddd',
    marginRight: 10,
  },
  userText: {
    flex: 1,
  },
  username: {
    fontWeight: 'bold',
    fontSize: 14,
  },
  usernameInline: {
    fontWeight: 'bold',
  },
  handle: {
    color: 'gray',
    fontSize: 12,
  },
  moreButton: {
    padding: 5,
  },
  imageContainer: {
    width: '100%',
    height: width, // Square images (width = height)
  },
  image: {
    width: width,
    height: width,
  },
  actionButtons: {
    flexDirection: 'row',
    padding: 10,
    alignItems: 'center',
  },
  actionButton: {
    marginRight: 15,
  },
  spacer: {
    flex: 1,
  },
  likes: {
    fontWeight: 'bold',
    paddingHorizontal: 10,
    marginBottom: 5,
  },
  postText: {
    paddingHorizontal: 10,
    marginBottom: 5,
  },
  viewComments: {
    color: 'gray',
    paddingHorizontal: 10,
    marginBottom: 5,
  },
  time: {
    color: 'gray',
    fontSize: 10,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
});

const mapStateToProps = (state) => ({});
const mapDispatchToProps = {};
export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);