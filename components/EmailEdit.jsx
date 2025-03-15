import React, { useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import AppBar from './AppBar';
import { connect } from 'react-redux';
import { getSettings } from '../redux/settingsreducer';

const EmailEdit = (props) => {
    useEffect(() => {
        props.getSettings();
    }, []);

    const capitalizeFirstLetter = (string) => {
      return string.charAt(0).toUpperCase() + string.slice(1);
    };
  
    const getCapitalizedKey = (index) => {
      const key = Object.keys(props.settings)[index];
      return key ? capitalizeFirstLetter(key) : '';
    };

  return (
    <>
      <AppBar title="Edit Email"/>
      <ScrollView style={styles.container}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Edit Email</Text>
          <TouchableOpacity style={styles.item}>
            <Text style={styles.itemText}>{getCapitalizedKey(1)}</Text>
              <View style={styles.itemValueContainer}>
                <Text style={styles.itemValue}>{props.settings.emailAddress}</Text>
                 <Icon name="chevron-right" size={24} color="#666" />
              </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
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
    marginBottom: 24,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: '600',
    marginBottom: 16,
    color: '#72777A',
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
  },
  itemText: {
    fontSize: 16,
    color: '#212121',
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
    backgroundColor: '#FFF1F3',
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 20,
  },
  logoutButtonText: {
    fontSize: 16,
    color: '#B71C1C',
    fontWeight: '600',
  },
});

const mapStateToProps = (state) => ({
  settings: state.settings?.settings || {},
});

const mapDispatchToProps = {
  getSettings,
};

export default connect(mapStateToProps, mapDispatchToProps)(EmailEdit);