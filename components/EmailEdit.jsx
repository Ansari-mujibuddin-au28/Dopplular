import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Modal, TextInput, Button } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import AppBar from './AppBar';
import { connect } from 'react-redux';
import { getSettings, updateEmail } from '../redux/settingsreducer';
import AntDesign from '@expo/vector-icons/AntDesign';

const EmailEdit = (props) => {
    const [modalVisible, setModalVisible] = useState(false);
    const [email, setEmail] = useState('');

    useEffect(() => {
        props.getSettings();
    }, []);

    useEffect(() => {
        setEmail(props.settings.emailAddress || '');
    }, [props.settings]);

    const handleSave = () => {
        props.updateEmail(email);
        setModalVisible(false);
    };

    return (
        <>
            <AppBar title="Edit Email" />
            <ScrollView style={styles.container}>
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Edit Email</Text>
                    <TouchableOpacity style={styles.item} onPress={() => setModalVisible(true)}>
                        <Text style={styles.itemText}>Email</Text>
                        <View style={styles.itemValueContainer}>
                            <Text style={styles.itemValue}>{props.settings.emailAddress}</Text>
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

                        <Text style={styles.modalTitle}>Edit Email</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Enter new email"
                            value={email}
                            onChangeText={(text) => setEmail(text)}
                            keyboardType="email-address"
                        />
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
    modalContent: { width: "100%", padding: 20, backgroundColor: 'white', borderTopLeftRadius: 20, borderTopRightRadius: 20, },
    modalTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 10 },
    input: { width: '100%', borderBottomWidth: 1, borderBottomColor: '#ccc', padding: 8, fontSize: 16, marginBottom: 20 }
});

const mapStateToProps = (state) => ({
    settings: state.settings?.settings || {},
});

const mapDispatchToProps = {
    getSettings,
    updateEmail,
};

export default connect(mapStateToProps, mapDispatchToProps)(EmailEdit);