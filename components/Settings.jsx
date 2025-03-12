import React from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Linking } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const SettingsScreen = () => {
  const userData = {
    emailAddress: "Demo1@gmail.com",
    personalInformation: {
      "Country/region": "India",
      "DateOfBirth": "1995-07-07T00:00:00.000Z",
      "Gender": "Male",
      "Language": "English"
    },
    profileVisibility: true,
  };

  const handleLogout = () => {
    console.log("User logged out");
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Settings</Text>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Your Account</Text>
        <TouchableOpacity style={styles.item}>
          <Text style={styles.itemText}>Personal information</Text>
          <Icon name="chevron-right" size={24} color="#666" />
        </TouchableOpacity>
        <View style={styles.item}>
          <Text style={styles.itemText}>Email address</Text>
          <View style={styles.itemValueContainer}>
            <Text style={styles.itemValue}>{userData.emailAddress}</Text>
            <Icon name="chevron-right" size={24} color="#666" />
          </View>
        </View>
        <TouchableOpacity style={styles.item}>
          <Text style={styles.itemText}>Password</Text>
          <View style={styles.itemValueContainer}>
            <Text style={styles.linkText}>Change password</Text>
            <Icon name="chevron-right" size={24} color="#666" />
          </View>
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>App Theme</Text>
        <TouchableOpacity style={styles.item}>
          <Text style={styles.itemText}>System default</Text>
          <Icon name="chevron-right" size={24} color="#666" />
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Profile Visibility</Text>
        <TouchableOpacity style={styles.item}>
          <Text style={styles.itemText}>Share profile</Text>
          <Icon name="chevron-right" size={24} color="#666" />
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Invite</Text>
        <TouchableOpacity style={styles.item}>
          <Text style={styles.itemText}>Invite friends</Text>
          <Icon name="chevron-right" size={24} color="#666" />
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Support</Text>
        <TouchableOpacity style={styles.item} onPress={() => Linking.openURL('https://example.com/terms')}>
          <Text style={styles.itemText}>Terms of use</Text>
          <Icon name="chevron-right" size={24} color="#666" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.item} onPress={() => Linking.openURL('https://example.com/privacy')}>
          <Text style={styles.itemText}>Privacy policy</Text>
          <Icon name="chevron-right" size={24} color="#666" />
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutButtonText}>Log out</Text>
      </TouchableOpacity>
    </ScrollView>
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
    marginBottom: 24,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
    color: '#333',
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  itemText: {
    fontSize: 16,
    color: '#333',
  },
  itemValueContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  itemValue: {
    fontSize: 16,
    color: '#666',
    marginRight: 8,
  },
  linkText: {
    fontSize: 16,
    color: '#007bff',
    marginRight: 8,
  },
  logoutButton: {
    marginTop: 24,
    padding: 16,
    backgroundColor: '#dc3545',
    borderRadius: 8,
    alignItems: 'center',
  },
  logoutButtonText: {
    fontSize: 16,
    color: '#fff',
    fontWeight: '600',
  },
});

export default SettingsScreen;