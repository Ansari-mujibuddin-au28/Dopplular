import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigate, useLocation } from 'react-router-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const BottomBar = (props) => {
  const navigate = useNavigate();
  const location = useLocation();

  const tabs = [
    { name: 'Home', path: '/home', icon: 'home-outline', activeIcon: 'home' },
    { name: 'Trending', path: '/trending', icon: 'flame-outline', activeIcon: 'flame' },
    { name: 'Chat', path: '/chat', icon: 'chatbubble-outline', activeIcon: 'chatbubble' },
    { name: 'Profile', path: '/profile', icon: 'person-outline', activeIcon: 'person' },
    { name: 'Alerts', path: '/alerts', icon: 'notifications-outline', activeIcon: 'notifications' },
  ];

  return (
    <View style={styles.container}>
      {tabs.map((tab, index) => {
        const isActive = location.pathname === tab.path;
        return (
          <TouchableOpacity
            key={index}
            style={[styles.tab, isActive && styles.activeTab]}
            onPress={() => navigate(tab.path)}
          >
            <View style={[styles.iconContainer, isActive && styles.activeIconContainer]}>
              <Ionicons 
                name={isActive ? tab.activeIcon : tab.icon} 
                size={isActive ? 28 : 24}
                color={isActive ? 'white' : '#777'} 
              />
            </View>
            <Text style={[styles.text, isActive && styles.activeText]}>{tab.name}</Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#fff',
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: 80,
    paddingBottom: 5,
  },
  tab: {
    alignItems: 'center',
    flex: 1,
  },
  iconContainer: {
    padding: 8,
  },
  activeIconContainer: {
    backgroundColor: '#3F51B5',
    borderRadius: 50, 
    marginBottom: 5,
    marginTop: 3,
  },
  text: {
    fontSize: 12,
    color: '#777',
    marginTop: 3,
  },
  activeText: {
    color: '#3F51B5',
    fontWeight: 'bold',
   
  },
  activeTab:{
    borderTopWidth: 1,
    borderTopColor: '#3F51B5'
  }
});

export default BottomBar;