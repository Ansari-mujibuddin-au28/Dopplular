import React, { useEffect,useState } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity,Modal } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import AppBar from './AppBar';
import { connect } from 'react-redux';
import { getSettings } from '../redux/settingsreducer';
import { useNavigate } from 'react-router-native';
import AntDesign from '@expo/vector-icons/AntDesign';

const SettingsScreen = (props) => {

  const navigate = useNavigate();
  const [themeModalVisible, setThemeModalVisible] = useState(false);
  const [profileModalVisible, setProfileModalVisible] = useState(false);
  const [selectedTheme, setSelectedTheme] = useState("System Default");
  const [isProfileVisible, setIsProfileVisible] = useState(true);

  useEffect(() => {
    props.getSettings();
  }, []);

  const handleThemeSelection = (theme) => {
    setSelectedTheme(theme);
    setThemeModalVisible(false);
  };

  const toggleProfileVisibility = () => {
    setIsProfileVisible(!isProfileVisible);
    setProfileModalVisible(false);
  };

  const { settings } = props;
  const email = settings?.emailAddress || 'N/A';

  const handleLogout = () => {
    console.log("User logged out");
  };

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const getCapitalizedKey = (index) => {
    const key = Object.keys(settings)[index];
    return key ? capitalizeFirstLetter(key) : '';
  };

  return (
    <>
      <AppBar title="Settings" />
      <ScrollView style={styles.container}>
        <Text style={styles.header}>Settings</Text>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Your Account</Text>
          <TouchableOpacity  onPress={() => navigate('/personal-info')} style={styles.item}>
            <Text style={styles.itemText}>{getCapitalizedKey(0)}</Text>
            <Icon name="chevron-right" size={24} color="#666" />
          </TouchableOpacity>
          <TouchableOpacity  onPress={() => navigate('/email-edit')} style={styles.item}>
            <Text style={styles.itemText}>{getCapitalizedKey(1)}</Text>
            <View style={styles.itemValueContainer}>
              <Text style={styles.itemValue}>{email}</Text>
              <Icon name="chevron-right" size={24} color="#666" />
            </View>
          </TouchableOpacity>
          <TouchableOpacity  onPress={() => navigate('/change-password')} style={styles.item}>
            <Text style={styles.itemText}>{getCapitalizedKey(2)}</Text>
            <View style={styles.itemValueContainer}>
              <Text style={styles.linkText}>Change password</Text>
              <Icon name="chevron-right" size={24} color="#666" />
            </View>
          </TouchableOpacity>
             <TouchableOpacity style={styles.item} onPress={() => setThemeModalVisible(true)}>
            <Text style={styles.itemText}>{getCapitalizedKey(3)}</Text>
            <View style={styles.itemValueContainer}>
              <Text style={styles.itemValue}>{selectedTheme}</Text>
              <Icon name="chevron-right" size={24} color="#666" />
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.item} onPress={() => setProfileModalVisible(true)}>
            <Text style={styles.itemText}>{getCapitalizedKey(4)}</Text>
            <View style={styles.itemValueContainer}>
              <Text style={styles.itemValue}>{isProfileVisible ? "Visible" : "Hidden"}</Text>
              <Icon name="chevron-right" size={24} color="#666" />
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.item}>
            <Text style={styles.itemText}>{getCapitalizedKey(5)}</Text>
            <Icon name="chevron-right" size={24} color="#666" />
          </TouchableOpacity>
        </View>
       

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{getCapitalizedKey(6)}</Text>
          <TouchableOpacity style={styles.item}>
            <Text style={styles.itemText}>Invite friends</Text>
            <Icon name="chevron-right" size={24} color="#666" />
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{getCapitalizedKey(7)}</Text>
          {settings.Support?.map((item, index) => {
            const key = Object.keys(item)[0];
            const value = item[key];

            return (
              <TouchableOpacity
                key={index}
                style={styles.item}
                onPress={() => alert(value)}
              >
                <Text style={styles.itemText}>{capitalizeFirstLetter(key)}</Text>
                <Icon name="chevron-right" size={24} color="#666" />
              </TouchableOpacity>
            );
          })}
        </View>

        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutButtonText}>Log out</Text>
        </TouchableOpacity>
      </ScrollView>


      <Modal visible={themeModalVisible} transparent animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
          <TouchableOpacity onPress={() => setThemeModalVisible(false)} style={{ alignSelf: 'flex-end' }}>
                    <View style={{ backgroundColor: '#F7F7F7', borderRadius: 50, padding: 6 }}>
                      <AntDesign name="close" size={14} color="#000" />
                    </View>
        </TouchableOpacity>
            <Text style={styles.modalTitle}>Select App Theme</Text>
            {["Light Mode", "Dark Mode", "System Default"].map((theme, index) => (
              <TouchableOpacity key={index} style={styles.modalOption} onPress={() => handleThemeSelection(theme)}>
                <Text style={styles.modalOptionText}>{theme}</Text>
                {selectedTheme === theme && <Icon name="check" size={24} color="green" />}
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </Modal>

      <Modal visible={profileModalVisible} transparent animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
          <TouchableOpacity  onPress={() => setProfileModalVisible(false)}style={{ alignSelf: 'flex-end' }}>
                    <View style={{ backgroundColor: '#F7F7F7', borderRadius: 50, padding: 6 }}>
                      <AntDesign name="close" size={14} color="#000" />
                    </View>
        </TouchableOpacity>
            <Text style={styles.modalTitle}>Profile Visibility</Text>
            <TouchableOpacity style={styles.modalOption} onPress={toggleProfileVisibility}>
              <Text style={styles.modalOptionText}>{isProfileVisible ? "Disable Visibility" : "Enable Visibility"}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
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
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
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
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    width: '100%',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalOption: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
  },
  modalOptionText: {
    fontSize: 16,
  },
  closeButton: {
    marginTop: 20,
    alignSelf: 'center',
  },
  closeButtonText: {
    color: 'blue',
    fontSize: 16,
  },
});

const mapStateToProps = (state) => ({
  settings: state.settings?.settings || {},
});

const mapDispatchToProps = {
  getSettings,
};

export default connect(mapStateToProps, mapDispatchToProps)(SettingsScreen);