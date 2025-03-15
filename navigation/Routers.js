import React, { useEffect, useState } from 'react';
import { Platform, BackHandler } from 'react-native';
import { Routes, Route, useNavigate, useLocation, Navigate } from 'react-router-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SplashScreen from '../components/SplashScreen';
import WalkthroughScreen from '../components/WalkthroughScreen';
import LoginComponent from '../components/LoginComponent';
import SignUpComponent from '../components/SignUpComponent';
import Home from '../components/Home';
import Trending from '../components/Trending';
import Chat from '../components/Chat';
import Profile from '../components/Profile';
import Alerts from '../components/Alerts';
import EditProfile from '../components/EditProfile';
import Settings from '../components/Settings';
import PersonalInfo from '../components/PersonalInfo';
import EmailEdit from '../components/EmailEdit';
import ChangePassword from '../components/ChangePassword';


const Routers = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = await AsyncStorage.getItem('authToken');
        await new Promise(resolve => setTimeout(resolve, 1000));
        if (token) {
          setIsAuthenticated(true);
        } else {
          setIsAuthenticated(false);
        }
      } catch (error) {
        console.error('Error retrieving token:', error);
        setIsAuthenticated(false);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  useEffect(() => {
    if (Platform.OS === 'android') {
      const handleBackPress = () => {
        if (location.pathname === '/') {
          return false;
        }
        navigate(-1);
        return true;
      };

      BackHandler.addEventListener('hardwareBackPress', handleBackPress);

      return () => {
        BackHandler.removeEventListener('hardwareBackPress', handleBackPress);
      };
    }
  }, [navigate, location]);

  if (isLoading) {
    return null;
  }

  return (
    !isLoading && (
      <Routes key={isAuthenticated ? 'auth' : 'guest'}>
        {isAuthenticated ? (
          <>
            <Route path="/" element={<Navigate to="/home" replace />} />
            <Route path="/home" element={<Home />} />
            <Route path="/trending" element={<Trending />} />
            <Route path="/chat" element={<Chat />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/alerts" element={<Alerts />} />
            <Route path="/edit" element={<EditProfile />} />
            <Route path="/setting" element={<Settings />} />
            <Route path="/personal-info" element={<PersonalInfo />} />
            <Route path="/email-edit" element={<EmailEdit />} />
            <Route path="/change-password" element={<ChangePassword />} />
            
          </>
        ) : (
          <>
            <Route path="/" element={<SplashScreen />} />
            <Route path="/walkthrough" element={<WalkthroughScreen />} />
            <Route path="/walkthrough/login" element={<LoginComponent />} />
            <Route path="/walkthrough/signup" element={<SignUpComponent />} />
            <Route path="/home" element={<Home />} />
            <Route path="/trending" element={<Trending />} />
            <Route path="/chat" element={<Chat />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/alerts" element={<Alerts />} />
          </>
        )}
      </Routes>
    )
  );
  
};

export default Routers;
