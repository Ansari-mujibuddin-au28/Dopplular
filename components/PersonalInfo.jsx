import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Modal, Button } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import AppBar from './AppBar';
import { connect } from 'react-redux';
import { getSettings, updateGender, updateDOB, updateCountry, updateLanguage } from '../redux/settingsreducer';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { Picker } from '@react-native-picker/picker';
import AntDesign from '@expo/vector-icons/AntDesign';

const PersonalInfo = (props) => {
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedField, setSelectedField] = useState(null);
    const [tempValue, setTempValue] = useState('');
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

    useEffect(() => {
        props.getSettings();
    }, []);

    const handleFieldPress = (field, value) => {
        setSelectedField(field);
        setTempValue(value || '');
        setModalVisible(true);
    };

    const handleSave = () => {
        if (selectedField === 'DateOfBirth') {
            props.updateDOB(tempValue);
        } else if (selectedField === 'Gender') {
            props.updateGender(tempValue);
        } else if (selectedField === 'Country') {
            props.updateCountry(tempValue);
        } else if (selectedField === 'Language') {
            props.updateLanguage(tempValue);
        }
        setModalVisible(false);
    };

    const showDatePicker = () => {
        setDatePickerVisibility(true);
    };

    const hideDatePicker = () => {
        setDatePickerVisibility(false);
    };

    const handleConfirm = (date) => {
        setTempValue(date.toISOString().split('T')[0]);
        hideDatePicker();
    };

    return (
        <>
            <AppBar title="Personal Information" />
            <ScrollView style={styles.container}>
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Your Personal Information</Text>
                    <TouchableOpacity style={styles.item} onPress={() => handleFieldPress('DateOfBirth', props.settings.personalInformation.DateOfBirth)}>
                        <Text style={styles.itemText}>Date of Birth</Text>
                        <View style={styles.itemValueContainer}>
                            <Text style={styles.itemValue}>{props.settings.personalInformation.DateOfBirth}</Text>
                            <Icon name="chevron-right" size={24} color="#666" />
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.item} onPress={() => handleFieldPress('Gender', props.settings.personalInformation.Gender)}>
                        <Text style={styles.itemText}>Gender</Text>
                        <View style={styles.itemValueContainer}>
                            <Text style={styles.itemValue}>{props.settings.personalInformation.Gender}</Text>
                            <Icon name="chevron-right" size={24} color="#666" />
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.item} onPress={() => handleFieldPress('Country', props.settings.personalInformation.Country)}>
                        <Text style={styles.itemText}>Country</Text>
                        <View style={styles.itemValueContainer}>
                            <Text style={styles.itemValue}>{props.settings.personalInformation.Country}</Text>
                            <Icon name="chevron-right" size={24} color="#666" />
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.item} onPress={() => handleFieldPress('Language', props.settings.personalInformation.Language)}>
                        <Text style={styles.itemText}>Language</Text>
                        <View style={styles.itemValueContainer}>
                            <Text style={styles.itemValue}>{props.settings.personalInformation.Language}</Text>
                            <Icon name="chevron-right" size={24} color="#666" />
                        </View>
                    </TouchableOpacity>
                </View>
            </ScrollView>

            <Modal visible={modalVisible} animationType="slide" transparent>
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <TouchableOpacity onPress={() => setModalVisible(false)} style={{ alignSelf: 'flex-end' }}>
                            <View style={{ backgroundColor: '#F7F7F7', borderRadius: 50, padding: 6 }}>
                                <AntDesign name="close" size={14} color="#000" />
                            </View>
                        </TouchableOpacity>

                        {selectedField === 'DateOfBirth' && (
                            <>
                                <Button title="Pick a Date" onPress={showDatePicker} />
                                <DateTimePickerModal isVisible={isDatePickerVisible} mode="date" onConfirm={handleConfirm} onCancel={hideDatePicker} />
                            </>
                        )}

                        {selectedField === 'Gender' && (
                            <Picker
                                selectedValue={tempValue}
                                onValueChange={(itemValue) => setTempValue(itemValue)}
                                style={styles.picker}
                            >
                                <Picker.Item label="Male" value="Male" />
                                <Picker.Item label="Female" value="Female" />
                                <Picker.Item label="Other" value="Other" />
                            </Picker>
                        )}

                        {selectedField === 'Country' && (
                            <Picker
                                selectedValue={tempValue}
                                onValueChange={(itemValue) => setTempValue(itemValue)}
                                style={styles.picker}
                            >
                                <Picker.Item label="India" value="India" />
                                <Picker.Item label="USA" value="USA" />
                                <Picker.Item label="UK" value="UK" />
                            </Picker>
                        )}

                        {selectedField === 'Language' && (
                            <Picker
                                selectedValue={tempValue}
                                onValueChange={(itemValue) => setTempValue(itemValue)}
                                style={styles.picker}
                            >
                                <Picker.Item label="English" value="English" />
                                <Picker.Item label="Hindi" value="Hindi" />
                                <Picker.Item label="Telugu" value="Telugu" />
                            </Picker>
                        )}

                        <Button title="Save" onPress={handleSave} />
                    </View>
                </View>
            </Modal>
        </>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, padding: 16, backgroundColor: '#fff' },
    section: { marginBottom: 24 },
    sectionTitle: { fontSize: 15, fontWeight: '600', marginBottom: 16, color: '#72777A' },
    item: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 12 },
    itemText: { fontSize: 16, color: '#212121' },
    itemValueContainer: { flexDirection: 'row', alignItems: 'center' },
    itemValue: { fontSize: 16, color: '#666', marginRight: 8 },
    modalContainer: { flex: 1, justifyContent: 'flex-end', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.5)' },
    modalContent: { width: "100%", padding: 20, backgroundColor: 'white', borderTopLeftRadius: 20, borderTopRightRadius: 20, gap: 10 },
    picker: { width: '100%', height: 50 }
});

const mapStateToProps = (state) => ({ settings: state.settings?.settings || {} });
const mapDispatchToProps = { getSettings, updateGender, updateDOB, updateCountry, updateLanguage };
export default connect(mapStateToProps, mapDispatchToProps)(PersonalInfo);
