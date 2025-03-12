import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigate } from 'react-router-native';

const AppBar = ({ title }) => {
  const navigate = useNavigate();

  return (
    <View style={styles.appBar}>
      <TouchableOpacity onPress={() => navigate(-1)} style={styles.backButton}>
        <Text style={styles.backText}>←</Text>
      </TouchableOpacity>
      <Text style={styles.title}>{title}</Text>
      <View style={styles.rightSpace} />
    </View>
  );
};

const styles = StyleSheet.create({
  appBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#6200ee',
    paddingHorizontal: 12,
    height: 50,
  },
  backButton: {
    paddingHorizontal: 10,
  },
  backText: {
    color: 'white',
    fontSize: 25,
  },
  title: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    flex: 1,
    textAlign: 'center',
  },
  rightSpace: {
    width: 32,
  },
});

export default AppBar;
