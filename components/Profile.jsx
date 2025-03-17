import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Modal, Button } from 'react-native';
import { connect } from 'react-redux';
import { getProfile, updateProfilePic } from '../redux/profilereducer';
import { useNavigate } from 'react-router-native';
import AppBar from './AppBar';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import AntDesign from '@expo/vector-icons/AntDesign';
import Feather from '@expo/vector-icons/Feather';
import Octicons from '@expo/vector-icons/Octicons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import SimpleLineIcons from '@expo/vector-icons/SimpleLineIcons';
import Ionicons from '@expo/vector-icons/Ionicons';
import * as ImagePicker from 'expo-image-picker';

const Profile = (props) => {
  const [activeTab, setActiveTab] = useState('Home');
  const [showPopup, setShowPopup] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    props.getProfile(props.loginResponse?.result?.profileId);
  }, []);

  const { username, followersCount, followingCount,profileImg,bio } = props.profile.result || {};

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaType,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
  
    console.log(result);
  
    if (!result.canceled && result.assets && result.assets.length > 0) {
      setSelectedImage(result.assets[0].uri);
    }
  };
  
  const handleImageUpload = () => {
    if (selectedImage) {
      props.updateProfilePic(selectedImage); 
      props.getProfile(props.loginResponse?.result?.profileId);
      setShowPopup(false);
    }
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'Settings':
        return (
          <View style={styles.tabContent}>
           <View style={{ flexDirection: 'row', gap: 10,}}>
            <View style={{ flexDirection: 'row', gap: 10,backgroundColor: '#F3F5FB',padding: 20,borderRadius: 10 }}>
            <Ionicons name="person-outline" size={50} color="#D0D4ED" />
            </View>
            <View style={{ flexDirection: 'row', gap: 10,backgroundColor: '#F3F5FB',padding: 20,borderRadius: 10 }}>
            <Ionicons name="person-outline" size={50} color="#D0D4ED" />
            </View>
            </View>
            <Text style={styles.tabText}>Trending is coming soon</Text>
            <Text style={styles.tabSubText}>
              Trending a project is still in its beta stage and will be
            </Text>
          </View>
        );
      case 'Alerts':
        return (
          <View style={styles.tabContent}>
            <View style={{ flexDirection: 'row', gap: 10,backgroundColor: '#F3F5FB',padding: 20,borderRadius: 10 }}>
            <SimpleLineIcons name="people" size={50} color="#D0D4ED" />
            </View>
            <Text style={styles.tabText}>Doppod is coming soon</Text>
            <Text style={styles.tabSubText}>
              A new virtual space exclusively for look-alikes to create and share content together. Stay tuned!
            </Text>
          </View>
        );
      case 'Home':
        return (
          <View style={styles.lookAlikeContainer}>
            <SimpleLineIcons name="grid" size={50} color="#D0D4ED" />
            <Text style={styles.lookAlikeText}>Take a picture and Find your look a like</Text>
            <TouchableOpacity style={styles.addButton}>
              <Text style={styles.addButtonText}>Add</Text>
            </TouchableOpacity>
        </View>
        );
      default:
        return null;
    }
  };

  return (
    <>
     <AppBar title="Profile" />
      <View style={styles.topBar}>
      <Text style={styles.topBarTitle}>Profile</Text>
        <View style={styles.topBarButtons}>
          <TouchableOpacity style={styles.iconButton}>
          <AntDesign name="plussquareo" size={24} color="black" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton}>
          <Feather name="bookmark" size={24} color="black" />
          </TouchableOpacity>
          <TouchableOpacity  onPress={() => navigate('/setting')} style={styles.iconButton}>
          <Feather name="settings" size={24} color="black" />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.container}>
        <View style={styles.profileHeader}>
          <View style={styles.profileImageContainer}>
              {profileImg ?
                <Image source={{ uri: profileImg }} style={styles.profileImage} />
                :
                <Image source={{ uri: 'https://picsum.photos/202' }} style={styles.profileImage} />
                }
            <TouchableOpacity style={styles.editIcon} onPress={() => setShowPopup(true)}>
              <MaterialIcons name="edit" size={24} color="#4A64FE" />
            </TouchableOpacity>
          </View>
          <Text style={styles.username}>{username}</Text>
          <Text style={styles.bio}>
           {bio}
          </Text>
        </View>

        <View style={styles.stats}>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>10</Text>
            <Text style={styles.statLabel}>Daps</Text>
            <Text style={{ color: '#D9D9D9', fontSize: 18, marginLeft: 8 }}>|</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>{followingCount || 0}</Text>
            <Text style={styles.statLabel}>Following</Text>
            <Text style={{ color: '#D9D9D9', fontSize: 18, marginLeft: 8 }}>|</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>{followersCount || 0}</Text>
            <Text style={styles.statLabel}>Followers</Text>
          </View>
        </View>

        <View style={{ flexDirection: 'row', justifyContent: 'center', gap: 10 }}>
          <TouchableOpacity style={styles.editButton}
            onPress={() => navigate('/edit')}>
            <Text style={styles.editButtonText}>Edit profile</Text>
          </TouchableOpacity>
          <TouchableOpacity  onPress={() => navigate('/scan-and-share')} style={styles.shareButton}>
            <MaterialCommunityIcons name="share-outline" size={24} color="black" />
          </TouchableOpacity>
        </View>

        <View style={styles.tabsContainer}>
          <TouchableOpacity
            style={[styles.tabItem, activeTab === 'Home' && styles.activeTab]}
            onPress={() => setActiveTab('Home')}
          >
            <Octicons name="book" size={24} color="black" />
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tabItem, activeTab === 'Alerts' && styles.activeTab]}
            onPress={() => setActiveTab('Alerts')}
          >
            <Octicons name="people" size={24} color="black" />
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tabItem, activeTab === 'Settings' && styles.activeTab]}
            onPress={() => setActiveTab('Settings')}
          >
          <MaterialIcons name="filter-frames" size={24} color="black" />
          </TouchableOpacity>
        </View>

        {renderTabContent()}

        <Modal
          visible={showPopup}
          animationType="slide"
          transparent={true}
          onRequestClose={() => setShowPopup(false)}
        >
          <View style={styles.popupContainer}>
            <View style={styles.popupContent}>
                <TouchableOpacity onPress={() => {setShowPopup(false)}} style={{ alignSelf: 'flex-end' }}>
                    <View style={{ backgroundColor: '#F7F7F7', borderRadius: 50, padding: 6 }}>
                      <AntDesign name="close" size={14} color="#000" />
                    </View>
                </TouchableOpacity>
              <Text style={styles.popupTitle}>Update Profile Picture</Text>
              <Button style={{ backgroundColor: '#007BFF',}} title="Choose Image" onPress={pickImage} />
              {selectedImage && (
                <View style={{ alignItems: 'center' }}>
                <Text style={{ fontSize: 16, color: '#333', marginTop: 10 }}>Selected Image</Text>
                <Image source={{ uri: selectedImage }} style={styles.selectedImage} />
                <Button style={{ backgroundColor: '#007BFF',}} title="Upload" onPress={handleImageUpload} />
                </View>
              )}
            </View>
          </View>
        </Modal>
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
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  topBarButtons: {
    flexDirection: 'row',
    gap: 5,
  },
  iconButton: {
    padding: 8,
  },
  topBarTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  profileHeader: {
    alignItems: 'center',
    marginBottom: 20,
  },
  profileImageContainer: {
    position: 'relative',
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 8,
  },
  editIcon: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 4,
  },
  username: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  bio: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginTop: 4,
    paddingHorizontal: 20,
  },
  editButton: {
    marginTop: 10,
    paddingVertical: 9,
    paddingHorizontal: 20,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 7,
    width: 150,
    alignItems: 'center',
    alignSelf: 'center',
  },
  shareButton: {
    marginTop: 10,
    paddingVertical: 6,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 7,
    width: 50,
    alignItems: 'center',
    alignSelf: 'center',
  },
  editButtonText: {
    fontSize: 14,
    color: '#333',
  },
  stats: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 20,
    marginBottom: 20,
  },
  statItem: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 5,
  },
  statNumber: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  statLabel: {
    fontSize: 12,
    color: '#666',
  },
  tabsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 10,
    paddingVertical: 10,
  },
  tabItem: {
    alignItems: 'center',
    paddingVertical: 10,
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: '#4A64FE',
    width: 40,
  },
  activeRadius: {
    borderRadius: 50,padding: 20,borderWidth: 1,borderColor: '#F3F5FB',
  },
  tabText: {
    fontSize: 14,
    color: '#333',
    fontWeight: 'bold',
    width: 150,
    textAlign: 'center',
  },
  tabContent: {
    marginTop: 20,
    paddingHorizontal: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabSubText: {
    fontSize: 12,
    color: '#666',
    marginTop: 4,
  },
  lookAlikeContainer: {
    alignItems: 'center',
    marginTop: 20,
    padding: 16,
    borderRadius: 8,
  },
  lookAlikeText: {
    fontSize: 14,
    color: '#1A1A1A',
    textAlign: 'center',
    marginBottom: 10,
    marginTop: 10,
    fontWeight: 'bold',
    width: 150,
    textAlign: 'center',
  },
  addButton: {
    backgroundColor: '#4A64FE',
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 10,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  popupContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  popupContent: {
    backgroundColor: 'white',
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    gap:10
  },
  popupTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  selectedImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginVertical: 10,
  },
});

const mapStateToProps = (state) => ({
  loginResponse: state.login?.loginResponseData || {},
  profile: state.profile?.profile || {},
  settings: state.settings?.settings || {},
});

const mapDispatchToProps = {
  getProfile,
  updateProfilePic,
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);