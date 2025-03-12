import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { getProfile, editName, editUsername, editBio,} from '../redux/profilereducer';
import { updateGender,updateDOB,getSettings } from '../redux/settingsreducer';
import AppBar from './AppBar';
import EditablePopup from './EditablePopup';
import Icon from 'react-native-vector-icons/MaterialIcons';

const EditProfile = ({ profile, getProfile, editName, editUsername, editBio, updateGender, updateDOB,loginResponse ,settings,getSettings}) => {
  const [isPopupVisible, setPopupVisible] = useState(false);
  const [currentField, setCurrentField] = useState('');
  const [fieldValue, setFieldValue] = useState('');
  useEffect(() => {
    getProfile(loginResponse?.result?.profileId);
    getSettings();
  }, []);

  const handleEditField = (fieldName, currentValue) => {
    setCurrentField(fieldName);
    setFieldValue(currentValue);
    setPopupVisible(true);
  };

  const handleSaveField = () => {
    switch (currentField) {
      case 'name':
        editName(fieldValue).then(() => {
          setPopupVisible(false);
          getProfile(loginResponse?.result?.profileId);
        });
        break;
      case 'username':
        editUsername(fieldValue).then(() => {
          setPopupVisible(false);
          getProfile(loginResponse?.result?.profileId);
        });
        break;
      case 'bio':
        editBio(fieldValue).then(() => {
          setPopupVisible(false);
          getProfile(loginResponse?.result?.profileId);
        });
        break;
      case 'gender':
        updateGender(fieldValue).then(() => {
          setPopupVisible(false);
          getProfile(loginResponse?.result?.profileId);
        });
        break;
      case 'dob':
        updateDOB(fieldValue).then(() => {
          setPopupVisible(false);
          getProfile(loginResponse?.result?.profileId);
        });
        break;
      default:
        break;
    }
  };

  return (
    <>
      <AppBar title="Edit Profile" />
      <View style={styles.container}>
        <Text style={styles.header}>Edit Profile</Text>

        <View style={styles.fieldContainer}>
          <Text style={styles.fieldLabel}>Name</Text>
          <View style={styles.fieldValueContainer}>
            <Text style={styles.fieldValue}>{profile.user?.fullname}</Text>
            <TouchableOpacity onPress={() => handleEditField('name', profile.user?.fullname)}>
              <Icon name="edit" size={20} color="#007BFF" />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.fieldContainer}>
          <Text style={styles.fieldLabel}>Username</Text>
          <View style={styles.fieldValueContainer}>
            <Text style={styles.fieldValue}>{profile.username}</Text>
            <TouchableOpacity onPress={() => handleEditField('username', profile.username)}>
              <Icon name="edit" size={20} color="#007BFF" />
            </TouchableOpacity>
          </View>
        </View>

      
        <View style={styles.fieldContainer}>
          <Text style={styles.fieldLabel}>Bio</Text>
          <View style={styles.fieldValueContainer}>
            <Text style={styles.fieldValue}>{profile.bio}</Text>
            <TouchableOpacity onPress={() => handleEditField('bio', profile.bio)}>
              <Icon name="edit" size={20} color="#007BFF" />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.fieldContainer}>
          <Text style={styles.fieldLabel}>Gender</Text>
          <View style={styles.fieldValueContainer}>
            <Text style={styles.fieldValue}>{settings.personalInformation.Gender}</Text>
            <TouchableOpacity onPress={() => handleEditField('gender', settings.personalInformation.Gender)}>
              <Icon name="edit" size={20} color="#007BFF" />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.fieldContainer}>
          <Text style={styles.fieldLabel}>Date of Birth</Text>
          <View style={styles.fieldValueContainer}>
            <Text style={styles.fieldValue}>{settings.personalInformation.DateOfBirth}</Text>
            <TouchableOpacity onPress={() => handleEditField('dob', settings.personalInformation.DateOfBirth)}>
              <Icon name="edit" size={20} color="#007BFF" />
            </TouchableOpacity>
          </View>
        </View>
      </View>

    
      <EditablePopup
        visible={isPopupVisible}
        onClose={() => setPopupVisible(false)}
        fieldName={currentField}
        fieldValue={fieldValue}
        onChangeText={setFieldValue}
        onSave={handleSaveField}
      />
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
  fieldContainer: {
    marginBottom: 16,
  },
  fieldLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  fieldValueContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  fieldValue: {
    fontSize: 16,
    color: '#555',
  },
});

const mapStateToProps = (state) => ({
  loginResponse: state.login?.loginResponseData || {},
  profile: state.profile?.profile?.result || {},
  settings: state.settings?.settings || {},
});

const mapDispatchToProps = {
  getProfile,
  editName,
  editUsername,
  editBio,
  updateGender,
  updateDOB,
  getSettings,
};

export default connect(mapStateToProps, mapDispatchToProps)(EditProfile);