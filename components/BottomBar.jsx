import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigate, useLocation } from 'react-router-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const BottomBar = (props,) => {
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
            <Ionicons 
              name={isActive ? tab.activeIcon : tab.icon} 
              size={24} 
              color={isActive ? '#007bff' : '#777'} 
            />
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
    borderTopWidth: 1,
    borderTopColor: '#ddd',
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: 60,
    paddingBottom: 5,
  },
  tab: {
    alignItems: 'center',
    flex: 1,
  },
  activeTab: {
    backgroundColor: '#e6f2ff', 
    borderRadius: 15,
  },
  text: {
    fontSize: 12,
    color: '#777',
    marginTop: 3,
  },
  activeText: {
    color: '#007bff',
    fontWeight: 'bold',
  },
});

export default BottomBar;
