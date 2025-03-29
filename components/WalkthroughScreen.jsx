import React, { useRef, useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Dimensions, ActivityIndicator } from 'react-native';
import Swiper from 'react-native-swiper';
import { useDispatch, useSelector } from 'react-redux';
import { getWalkThrough } from '../redux/walkthrough';
import {
  useNavigate,
} from "react-router-native";
import AppBar from './AppBar';

const { width } = Dimensions.get('window');

export default function WalkthroughScreen( ) {


  const dispatch = useDispatch();
  const swiperRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
   const navigate = useNavigate();

  useEffect(() => {
    dispatch(getWalkThrough());
  }, [dispatch]);
  
  const walkthroughData = useSelector(state => state.walkthrough?.walkthroughSlice || []);

  if (!walkthroughData.length) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#fcb900" />
      </View>
    );
  }

  return (
    <>
     <AppBar title={"Walkthrough"}/>
    <Swiper
      ref={swiperRef}
      style={styles.wrapper}
      loop={false}
      index={0}
      onIndexChanged={(index) => setCurrentIndex(index)}
      dot={<View style={styles.dot} />}
      activeDot={<View style={[styles.dot, styles.activeDot]} />}
    >
      {walkthroughData.map((item, index) => (
        <View key={index} style={styles.slide}>
          <Image
            source={item.walkthroughImage ? { uri: item.walkthroughImage } : require('../assets/Image1.png')}
            style={styles.image}
            resizeMode="contain"
          />
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.subtitle}>{item.description}</Text>

          <TouchableOpacity
            style={styles.nextButton}
            onPress={() => {
              if (currentIndex < walkthroughData.length - 1) {
                swiperRef.current.scrollBy(1, true);
              } else {
                navigate('Login');
              }
            }}
          >
            <Text style={styles.nextButtonText}>
              {currentIndex < walkthroughData.length - 1 ? item.ctaText : item.ctaText}
            </Text>
          </TouchableOpacity>

          {currentIndex < walkthroughData.length - 1 ? null : (
            <TouchableOpacity style={styles.nextButton2}   
            onPress={() => {navigate('Signup');}} >
              <Text style={styles.nextButtonText2}>{item.ctaText2}</Text>
            </TouchableOpacity>
          )}
        </View>
      ))}
    </Swiper>
    </>
  );
}


const styles = StyleSheet.create({
  wrapper: {},
  slide: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    paddingHorizontal: 20,
  },
  image: {
    width: width * 0.8,
    height: width * 0.8,
    marginBottom: 30,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#333',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    color: '#666',
    marginBottom: 30,
  },
  nextButton: {
    backgroundColor: '#FFD54F',
    paddingVertical: 12,
    borderRadius: 5,
    marginTop: 30,
    width: 280,
  },
  nextButton2: {
    backgroundColor: 'white',
    paddingVertical: 12,
    borderRadius: 5,
    marginTop: 30,
    width: 280,
    borderColor: '#FFD54F',
    borderWidth: 1,
  },
  nextButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  nextButtonText2: {
    color: '#FFD54F',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#cccccc',
    marginHorizontal: 3,
    marginBottom: 15,
  },
  activeDot: {
    backgroundColor: '#FFD54F',
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  ctaContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 30,
    width: '80%',
  },
  ctaButton: {
    flex: 1,
    backgroundColor: '#fcb900',
    paddingVertical: 12,
    borderRadius: 5,
    marginHorizontal: 5,
    alignItems: 'center',
  },
  signupButton: {
    backgroundColor: '#555',
  },
  ctaButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

