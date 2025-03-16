import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Modal } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import AppBar from './AppBar';
import { connect } from 'react-redux';
import { getSettings } from '../redux/settingsreducer';
import { sendRequest } from '../redux/profilereducer';

const ShareProfile = (props) => {
    const [modalVisible, setModalVisible] = useState(false);
    const [successModalVisible, setSuccessModalVisible] = useState(false);
    const [selectedProfile, setSelectedProfile] = useState(null);
    const [successMessage, setSuccessMessage] = useState(null);

    useEffect(() => {
        props.getSettings();
    }, []);

    useEffect(() => {
        if (props.sendRequestResponse?.success) {
            setSuccessMessage(`${props.sendRequestResponse.result.senderMsg.msg} ${props.sendRequestResponse.result.receiverMsg.username}`);
            setModalVisible(false);
            setSuccessModalVisible(true);
            setTimeout(() => {
                setSuccessModalVisible(false);
            }, 2000);

        }
        if(successMessage == null) {
        setSuccessModalVisible(false);}
    }, [props.sendRequestResponse]);

    const handleSendRequest = () => {
        if (selectedProfile) {
            props.sendRequest(selectedProfile._id, selectedProfile.user._id);
        }
    };

    const { settings } = props;
    const shareProfiles = settings?.shareProfile || [];

    return (
        <>
            <AppBar title="Share Profile" />
            <ScrollView style={styles.container}>
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Shared Profiles</Text>
                    {shareProfiles.length > 0 ? (
                        shareProfiles.map((profile) => (
                            <TouchableOpacity key={profile._id} style={styles.item} onPress={() => {
                                setSelectedProfile(profile);
                                setModalVisible(true);
                            }}>
                                <Text style={styles.itemText}>{profile.username}</Text>
                                <Icon name="chevron-right" size={24} color="#666" />
                            </TouchableOpacity>
                        ))
                    ) : (
                        <Text style={styles.itemValue}>No shared profiles</Text>
                    )}
                </View>
            </ScrollView>


            <Modal visible={modalVisible} transparent animationType="slide">
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>Confirm Request</Text>
                        <Text>Send follow request to {selectedProfile?.username}?</Text>
                        <View style={styles.modalButtons}>
                            <TouchableOpacity style={styles.cancelButton} onPress={() => setModalVisible(false)}>
                                <Text style={styles.cancelButtonText}>Cancel</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.confirmButton} onPress={handleSendRequest}>
                                <Text style={styles.confirmButtonText}>Confirm</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>

            <Modal visible={successModalVisible} transparent animationType="fade">
                <View style={styles.modalContainer}>
                    <View style={styles.successModalContent}>
                        <Text style={styles.successMessage}>{successMessage}</Text>
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
    itemValue: {
        fontSize: 16,
        color: '#666',
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        backgroundColor: '#fff',
        padding: 20,
        width: '80%',
        borderRadius: 10,
        alignItems: 'center',
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    modalButtons: {
        flexDirection: 'row',
        marginTop: 20,
    },
    cancelButton: {
        marginRight: 10,
        padding: 10,
        backgroundColor: '#ddd',
        borderRadius: 5,
    },
    cancelButtonText: {
        color: '#000',
    },
    confirmButton: {
        padding: 10,
        backgroundColor: '#007bff',
        borderRadius: 5,
    },
    confirmButtonText: {
        color: '#fff',
    },
    successModalContent: {
        backgroundColor: '#4CAF50',
        padding: 15,
        borderRadius: 8,
    },
    successMessage: {
        fontSize: 16,
        color: '#fff',
        textAlign: 'center',
    },
});

const mapStateToProps = (state) => ({
    settings: state.settings?.settings || {},
    sendRequestResponse: state.profile?.sendRequestResponse || {},
});

const mapDispatchToProps = {
    getSettings,
    sendRequest,
};

export default connect(mapStateToProps, mapDispatchToProps)(ShareProfile);