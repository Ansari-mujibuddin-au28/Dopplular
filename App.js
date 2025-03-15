import React, { useEffect, useState } from 'react';
import { NativeRouter, useLocation } from 'react-router-native';
import { Provider } from 'react-redux';  
import { PersistGate } from 'redux-persist/integration/react'; 
import { store, persistor } from './redux/store';
import Router from './navigation/Routers';
import * as SplashScreen from 'expo-splash-screen';
import BottomBar from './components/BottomBar';
import { View, StyleSheet, Text } from 'react-native';

export default function App() {

  

  useEffect(() => {
    async function hideSplash() {
      await SplashScreen.preventAutoHideAsync();
      setTimeout(async () => {
        await SplashScreen.hideAsync();
      }, 2000);
    }
    hideSplash();
  }, []);

  return (
    <Provider store={store}>  
      <PersistGate loading={null} persistor={persistor}>  
        <NativeRouter>
          <MainLayout />
        </NativeRouter>
      </PersistGate>
    </Provider>
  );
}

const MainLayout = () => {
  const location = useLocation();
  const [hideBottomBar, setHideBottomBar] = useState(false);

  useEffect(() => {
    const path = location.pathname.toLowerCase();
    const allowedPaths = ["/home", "/trending", "/chat", "/profile", "/alerts"];
    setHideBottomBar(!allowedPaths.includes(path));
  }, [location.pathname]);

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Router />
      </View>
      {!hideBottomBar && <BottomBar />}
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
  },
});

