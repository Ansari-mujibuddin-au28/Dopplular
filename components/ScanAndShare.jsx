import React, { useEffect, useState } from "react";
import { 
  View, Text, Image, TouchableOpacity, Linking, StyleSheet 
} from "react-native";
import QRCode from "react-native-qrcode-svg";
import { CameraView, CameraType, useCameraPermissions } from 'expo-camera';
import * as Sharing from "expo-sharing";
import { getProfile } from "../redux/profilereducer";
import { connect } from "react-redux";
import { Ionicons, FontAwesome,MaterialCommunityIcons,AntDesign } from "@expo/vector-icons";
import { useNavigate } from 'react-router-native';

const ScanAndShare = (props) => {
  const [scanning, setScanning] = useState(false);
  const [permission, requestPermission] = useCameraPermissions();
  const [facing, setFacing] = useState('back');
  const navigate = useNavigate();

  function toggleCameraFacing() {
    setFacing(current => (current === 'back' ? 'front' : 'back'));
  }

  useEffect(() => {
    props.getProfile(props.loginResponse?.result?.profileId);
  }, []);

  const { username, profileImg, _id } = props.profile.result || {};
  const profileLink = `https://yourapp.com/user/${_id}`;

  const handleShare = async () => {
    try {
      await Sharing.shareAsync(profileLink, {
        dialogTitle: `Share ${username}'s Profile`,
      });
    } catch (error) {
      console.log("Error sharing:", error);
    }
  };

  const handleScan = (event) => {
    setScanning(false);
    Linking.openURL(event.data);
  };

  return (
    <>
    <View style={{backgroundColor:'blue',flexDirection:'row',justifyContent:'space-between',padding:20}}>
    <TouchableOpacity onPress={() => navigate(-1)} >
     <AntDesign name="arrowleft" size={24} color="white" />
     </TouchableOpacity>
        <TouchableOpacity 
          style={styles.scanButton} 
          onPress={() => {
            if (!permission?.granted) {
              requestPermission();
            } else {
              setScanning(!scanning);
            }
          }}
        >
          <MaterialCommunityIcons name="line-scan" size={24} color="white" />
        </TouchableOpacity>
      </View>
    <View style={styles.container}>
      <View style={styles.qrContainer}>
        {scanning ? (
          permission?.granted ? (
            <CameraView onBarcodeScanned={handleScan} style={styles.camera} facing={facing}>
              <View style={styles.buttonContainer}>
                <TouchableOpacity onPress={toggleCameraFacing}>
                  <Ionicons name="camera-reverse-outline" size={24} color="white" />
                </TouchableOpacity>
              </View>
            </CameraView>
          ) : (
            <Text>Camera access is required to scan QR codes.</Text>
          )
        ) : (
        <View style={styles.profileContainer}>
        <Image source={{ uri: profileImg }} style={styles.profileImage} />
        <Text style={styles.username}>{username}</Text>
        <QRCode value={profileLink} size={200}  color="black" />
        <Text style={{marginTop:10,color:"blue",width:200,textAlign:'center'}}>Share your QR code so others can follow you</Text>
      </View>
         
        )}
      </View>
    </View>
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
  </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
    backgroundColor: "blue",
  },
  header: {
    position: "absolute",
    top: 40,
    right: 20,
  },
  scanButton: {
    padding: 10,
    borderRadius: 50,
    elevation: 5,
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

const mapStateToProps = (state) => ({
  loginResponse: state.login?.loginResponseData || {},
  profile: state.profile?.profile || {},
});

const mapDispatchToProps = {
  getProfile,
};

export default connect(mapStateToProps, mapDispatchToProps)(ScanAndShare);