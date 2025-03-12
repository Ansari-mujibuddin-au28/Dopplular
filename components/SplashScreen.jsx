import React, { useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet, ImageBackground, Dimensions } from 'react-native';
import * as SplashScreen from 'expo-splash-screen';
import { useDispatch, useSelector } from 'react-redux';
import { getSplash } from '../redux/splash';
import {
  useNavigate,
} from "react-router-native";

SplashScreen.preventAutoHideAsync();
const { width, height } = Dimensions.get('window');

export default function SplashScreenComponent(props) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const splashData = useSelector(state => state.splash.splash || {});

  const [progress, setProgress] = useState(0);
  const progressBarWidth = useRef(0);
  const intervalTime = 2000;

  useEffect(() => {
    dispatch(getSplash());
}, [dispatch]);

  useEffect(() => {
    let interval;
        interval = setInterval(() => {
            progressBarWidth.current += (1000 / intervalTime);
            setProgress(progressBarWidth.current);

            if (progress >= 100) {
                clearInterval(interval);
                SplashScreen.hideAsync();
                requestAnimationFrame(() => navigate('Walkthrough'));
            }
        });

    return () => interval && clearInterval(interval);
}, [progress]);

  return (
    <ImageBackground
      style={styles.container}
      source={splashData.image ? { uri: splashData.image } : require('../assets/splash.png')}
    >
      <View style={styles.textWrapper}>
        <Text style={styles.title}>{splashData.title}</Text>
        <Text style={styles.description}>{splashData.description}</Text>
      </View>
      <View style={styles.progressBarContainer}>
        <View style={[styles.progressBar, { width: `${progress}%` }]} />
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'blue',
  },
  textWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    width: '80%',
  },
  title: {
    fontWeight: '900',
    fontSize: 30,
    color: 'white',
    textAlign: 'center',
    marginBottom: 10,
  },
  description: {
    fontWeight: '600',
    fontSize: 16,
    color: 'white',
    textAlign: 'center',
  },
  progressBarContainer: {
    width: '80%',
    height: 8,
    backgroundColor: 'white',
    borderRadius: 5,
    marginBottom: height * 0.1,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    backgroundColor: 'blue',
  },
});
