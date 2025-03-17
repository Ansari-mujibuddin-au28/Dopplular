import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet,ActivityIndicator } from 'react-native';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-native';
import { postSignUp } from '../redux/signupreducer';
import AppBar from './AppBar';

const SignUpComponent = ({ signupId, postSignUp }) => {
  const [email, setEmail] = useState('');
  const [fullname, setFullname] = useState('');
  const [password, setPassword] = useState('');
  const [number, setNumber] = useState('');
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const navigate = useNavigate();

  useEffect(() => {
    if (signupId && signupId.success) {
      setIsLoading(false);
      navigate('/walkthrough/login');
    } else if (signupId?.message) {
      setIsLoading(false);
      setErrorMessage(signupId.message);
    }
  }, [signupId, navigate]);

  const handleSignup = async () => {
    let newErrors = {};

    if (!fullname.trim()) newErrors.fullname = 'Full Name is required';
    if (!number.trim()) newErrors.number = 'Number is required';
    if (!email.trim()) newErrors.email = 'Email is required';
    if (!password.trim()) newErrors.password = 'Password is required';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    setErrorMessage('');
    const signupData = { email, fullname, password, number };
    setIsLoading(true);

    try {
      await postSignUp(signupData);
    } catch (error) {
      console.error('Signup Error:', error);
    }
  };

  return (
    <> 
      <AppBar title="SignUp" />
      <View style={styles.container}>
        <Text style={styles.title}>Create Your Doppular Account</Text>
        
        {errorMessage ? (
          <View style={styles.errorContainer}>
            <Text style={styles.errorText}>{errorMessage}</Text>
            <TouchableOpacity style={styles.button} onPress={() => navigate(-1)}>
              <Text style={styles.buttonText}>Go Back</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <>
            <TextInput
              style={styles.input}
              placeholder="Full Name"
              value={fullname}
              onChangeText={setFullname}
            />
            {errors.fullname && <Text style={styles.errorText}>{errors.fullname}</Text>}

            <TextInput
              style={styles.input}
              placeholder="Number"
              keyboardType="numeric"
              value={number}
              onChangeText={setNumber}
            />
            {errors.number && <Text style={styles.errorText}>{errors.number}</Text>}

            <TextInput
              style={styles.input}
              placeholder="Email"
              keyboardType="email-address"
              value={email}
              onChangeText={setEmail}
            />
            {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}

            <View style={styles.passwordContainer}>
              <TextInput
                style={styles.passwordInput}
                placeholder="Password"
                secureTextEntry={!showPassword}
                value={password}
                onChangeText={setPassword}
              />
              <TouchableOpacity onPress={() => setShowPassword(!showPassword)} style={styles.eyeIcon}>
                <Text>{showPassword ? '🙈' : '👁️'}</Text>
              </TouchableOpacity>
            </View>
            {errors.password && <Text style={styles.errorText}>{errors.password}</Text>}

            <TouchableOpacity style={styles.button} onPress={handleSignup}>
               {isLoading ? 
               (
                  <ActivityIndicator size="small" color="#ffffff" />
              )  : (
                  <Text style={styles.buttonText}>Signup</Text>
                  )}
            </TouchableOpacity>
          </>
        )}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f7f7f7',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: '#3f51b5',
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 5,
    borderBottomWidth: 1,
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    borderBottomWidth: 1,
    borderColor: '#3f51b5',
    marginBottom: 5,
  },
  passwordInput: {
    flex: 1,
    height: 40,
    paddingHorizontal: 10,
  },
  eyeIcon: {
    padding: 10,
  },
  errorText: {
    color: 'red',
    fontSize: 14,
    marginBottom: 10,
    alignSelf: 'flex-start',
  },
  errorContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  button: {
    width: '100%',
    height: 40,
    backgroundColor: '#3f51b5',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

const mapStateToProps = (state) => ({
  signupId: state.signup?.signup || {},
});

const mapDispatchToProps = {
  postSignUp,
};

export default connect(mapStateToProps, mapDispatchToProps)(SignUpComponent);
