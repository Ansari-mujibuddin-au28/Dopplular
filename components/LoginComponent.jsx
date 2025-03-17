import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet,ActivityIndicator  } from 'react-native';
import { connect } from 'react-redux';
import { useNavigate } from "react-router-native";
import { postLogin, getOTP, verifyOTP, resetPassword } from '../redux/loginreducer';
import AppBar from './AppBar';

const LoginComponent = ({ loginResponse, postLogin, getOTP, verifyOTP, resetPassword }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [view, setView] = useState('login');
  const [errors, setErrors] = useState({});
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const navigate = useNavigate();

  useEffect(() => {
    if (loginResponse?.success) {
      setIsLoading(false);
      navigate('/home', { replace: true }); 
    } else if (loginResponse?.message) {
      setIsLoading(false);
      setErrorMessage(loginResponse.message);
    }
  }, [loginResponse]);

  const handleLogin = async () => {
    if (!email.trim()) return setErrors({ email: 'This field is required' });
    if (!password.trim()) return setErrors({ password: 'Password is required' });

    setErrors({});
    setErrorMessage('');
    setIsLoading(true);
    await postLogin({ email, password });
  };

  const handleGetOtp = async () => {
    if (!email.trim()) return setErrors({ email: 'This field is required' });
    await getOTP(email);
    setView('verifyOtp');
  };

  const handleVerifyOtp = async () => {
    if (!otp.trim()) return setErrors({ otp: 'OTP is required' });
    await verifyOTP(email, otp);
    setView('success');
  };

  const handleResetPassword = async () => {
    if (!email.trim()) return setErrors({ email: 'This field is required' });
    if (!newPassword.trim()) return setErrors({ newPassword: 'New password is required' });
    await resetPassword(email, newPassword);
    setView('success');
  };

  return (
    <>
      <AppBar title="Login" />
      <View style={styles.container}>
        {view === 'login' && (
          <>
            <Text style={styles.title}>Welcome to Doppular</Text>
            <TextInput style={styles.input} placeholder="Email" value={email} onChangeText={setEmail} />
            <TextInput style={styles.input} placeholder="Password" secureTextEntry value={password} onChangeText={setPassword} />
            {errorMessage && <Text style={styles.errorText}>{errorMessage}</Text>}
            <View style={styles.buttonContainer}>
              <TouchableOpacity onPress={() => setView('forgotPassword')} ><Text style={[styles.buttonText,{color:"#3f51b5"}]}>Forgot Password</Text></TouchableOpacity>
              <TouchableOpacity onPress={() => setView('resetPassword')} ><Text style={[styles.buttonText,{color:"#3f51b5"}]}>Reset Password</Text></TouchableOpacity>
            </View>
            <TouchableOpacity style={styles.button} onPress={handleLogin} disabled={isLoading}>
              {isLoading ? (
                <ActivityIndicator size="small" color="#ffffff" />
              ) : (
                <Text style={styles.buttonText}>Login</Text>
              )}
            </TouchableOpacity>
          </>
        )}

        {view === 'forgotPassword' && (
          <>
            <TextInput style={styles.input} placeholder="Enter your email" value={email} onChangeText={setEmail} />
            <TouchableOpacity style={styles.button} onPress={handleGetOtp}><Text style={styles.buttonText}>Continue</Text></TouchableOpacity>
          </>
        )}

        {view === 'verifyOtp' && (
          <>
            <TextInput style={styles.input} placeholder="Enter OTP" value={otp} onChangeText={setOtp} />
            <TouchableOpacity style={styles.button} onPress={handleVerifyOtp}><Text style={styles.buttonText}>Continue</Text></TouchableOpacity>
          </>
        )}

        {view === 'resetPassword' && (
          <>
            <TextInput style={styles.input} placeholder="Email" value={email} onChangeText={setEmail} />
            <TextInput style={styles.input} placeholder="New Password" secureTextEntry value={newPassword} onChangeText={setNewPassword} />
            <TouchableOpacity style={styles.button} onPress={handleResetPassword}><Text style={styles.buttonText}>Submit</Text></TouchableOpacity>
          </>
        )}

        {view === 'success' && (
          <>
            <Text style={styles.successText}>Successfully updated!</Text>
            <TouchableOpacity style={styles.button} onPress={() => setView('login')}><Text style={styles.buttonText}>Go to Login</Text></TouchableOpacity>
          </>
        )}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20, backgroundColor: '#f7f7f7' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  input: { width: '100%', height: 40, borderBottomWidth: 1, marginBottom: 10, paddingHorizontal: 10 },
  button: { width: '100%', height: 40, backgroundColor: '#3f51b5', justifyContent: 'center', alignItems: 'center', borderRadius: 5, marginTop: 10 },
  buttonContainer: { flexDirection: 'row', justifyContent: 'space-between', width: '100%', marginBottom: 10 },
  smallButton: { flex: 1, height: 40, backgroundColor: '#3f51b5', justifyContent: 'center', alignItems: 'center', borderRadius: 5, marginHorizontal: 5 },
  buttonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
  errorText: { color: 'red', fontSize: 14, marginBottom: 10 },
  successText: { color: 'green', fontSize: 16, marginBottom: 10 }
});

const mapStateToProps = (state) => ({
  loginResponse: state.login?.loginResponseData || {},
});

const mapDispatchToProps = {
  postLogin,
  getOTP,
  verifyOTP,
  resetPassword,
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginComponent);
