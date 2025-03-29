import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity,Linking } from 'react-native';
import AppBar from './AppBar';
import { FontAwesome } from "@expo/vector-icons";

const InviteAndConnectComponent = () => {
  return (
    <>
    <AppBar title="Invite And Connect" />
    <View style={{flex:1,justifyContent:'space-between'}}>
    <Text style={styles.title}>
          Find similar faces, make new connections, and grow your Doppular circle!
    </Text>
      <Image
          source={require('../assets/Connecting with people.png')} 
          style={styles.image}
        />
        <View style={{  backgroundColor:'white',alignItems:'center'}}>
            <Text style={styles.buttonText}>Share to</Text>
            <View style={styles.socialContainer}>
            <TouchableOpacity style={styles.socialButton} onPress={() => Linking.openURL("https://whatsapp.com")}>
            <FontAwesome name="whatsapp" size={24} color="#4267B2" />
            <Text style={styles.socialText}>Whatsapp</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.socialButton} onPress={() => Linking.openURL("https://facebook.com")}>
            <FontAwesome name="facebook" size={24} color="#4267B2" />
            <Text style={styles.socialText}>Facebook</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.socialButton} onPress={() => Linking.openURL("https://twitter.com")}>
            <FontAwesome name="twitter" size={24} color="#1DA1F2" />
            <Text style={styles.socialText}>Twitter</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.socialButton} onPress={() => Linking.openURL("https://linkedin.com")}>
            <FontAwesome name="linkedin" size={24} color="#2867B2" />
            <Text style={styles.socialText}>LinkedIn</Text>
            </TouchableOpacity>
        </View>
        </View>
        </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#ffffff',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  content: {
    alignItems: 'center',
    marginBottom: 20,
  },
  image: {
    width: 320,
    height: 330,
    marginBottom: 15,
  },
  title: {
    fontSize: 16,
    color: '#333',
    padding:20
  },
  shareOptions: {
    width: '100%',
  },
  shareTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  shareButtons: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  shareButton: {
    backgroundColor: '#6c757d',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
    width: '48%',
    alignItems: 'center',
  },
  shareButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },

  profileContainer: {
    alignItems: "center",
    position:'relative'
  },
  profileImage: {
    width: 70,
    height: 70,
    borderRadius: 50,
    position:'absolute',
    top:-70,
    bottom:0
  },
  username: {
    fontSize: 20,
    fontWeight: "bold",
    paddingBottom:20
  },
  qrContainer: {
    backgroundColor: "white",
    padding: 30,
    borderRadius: 20,
    elevation: 5,
    marginBottom: 20,
    width:"100%",
    alignItems:'center'
  },
  camera: {
    width: 200,
    height: 200,
  },
  button: {
    backgroundColor: "#007AFF",
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 8,
    marginBottom: 20,
  },
  buttonText: {
    color: "black",
    fontSize: 16,
    fontWeight: "bold",
  },
  socialContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    padding:20
  },
  socialButton: {
    alignItems: "center",
  },
  socialText: {
    marginTop: 5,
    fontSize: 14,
    color: "#007AFF",
  },
});

export default InviteAndConnectComponent;