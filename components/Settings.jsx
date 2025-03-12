import React from 'react';
import { View, Text, StyleSheet, Switch } from 'react-native';
import AppBar from './AppBar';

const Settings = () => {
  return (
    <> 
    <AppBar title="Alerts" />
    <View style={styles.container}>
      <Text style={styles.header}>Settings</Text>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Your Account</Text>
        <View style={styles.settingItem}>
          <Text>Personal information</Text>
        </View>
        <View style={styles.settingItem}>
          <Text>Email address</Text>
          <Text style={styles.email}>Salagalaelya@gmail.com</Text>
        </View>
        <View style={styles.settingItem}>
          <Text>Password</Text>
          <Text style={styles.changePassword}>Change password</Text>
        </View>
      </View>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>App theme</Text>
        <View style={styles.settingItem}>
          <Text>System default</Text>
          <Switch />
        </View>
      </View>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Profile visibility</Text>
        <View style={styles.settingItem}>
          <Text>Share profile</Text>
          <Switch />
        </View>
      </View>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Invite</Text>
        <View style={styles.settingItem}>
          <Text>Invite friends</Text>
        </View>
      </View>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Support</Text>
        <View style={styles.settingItem}>
          <Text>Terms of use</Text>
        </View>
        <View style={styles.settingItem}>
          <Text>Privacy policy</Text>
        </View>
      </View>
      <View style={styles.section}>
        <Text style={styles.logout}>Log out</Text>
      </View>
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
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
  },
  email: {
    color: '#666',
  },
  changePassword: {
    color: '#007BFF',
  },
  logout: {
    color: '#FF0000',
    textAlign: 'center',
    marginTop: 20,
  },
});

export default Settings;