import apiClient from '../api/apiClient';
import AsyncStorage from '@react-native-async-storage/async-storage';

const initialState = {
    loginResponseData:{},
    otpResponse: {},
    verifyResponse: {},
    resetResponse: {},
};

const POST_LOGIN = 'login/POST_LOGIN';
const POST_GET_OTP = 'login/POST_GET_OTP';
const POST_VERIFY_OTP = 'login/POST_VERIFY_OTP';
const POST_RESET_PASSWORD = 'login/POST_RESET_PASSWORD';

export const postLogin = (loginData) => async (dispatch) => {
  try {
    const response = await apiClient.post("https://doppular.vercel.app/api/login", loginData);

    if (response?.success) {
      const token = response?.result?.token;
      const id = response?.result?.profileId;
      if (token) {
        await AsyncStorage.setItem('authToken', token);
        await AsyncStorage.setItem('userId', id);

      }
      dispatch({
        type: POST_LOGIN,
        payload: response,
      });
    } else {
      console.log('Empty Response:', response);
    }
  } catch (error) {
    console.error('POST_SIGN_UP API Error:', error);
  }
};



export const getOTP = (email) => async (dispatch) => {
  try {
      const response = await apiClient.post("https://doppular.vercel.app/api/code/getcode", { email });
      dispatch({
          type: POST_GET_OTP,
          payload: response,
      });
  } catch (error) {
      console.error('GET_OTP API Error:', error);
  }
};

export const verifyOTP = (email, otp) => async (dispatch) => {
  try {
      const response = await apiClient.post("https://doppular.vercel.app/api/code/verifycode", { email, otp });
      dispatch({
          type: POST_VERIFY_OTP,
          payload: response,
      });
  } catch (error) {
      console.error('VERIFY_OTP API Error:', error);
  }
};

export const resetPassword = (email, newPassword) => async (dispatch) => {
  try {
      const response = await apiClient.post("https://doppular.vercel.app/api/code/resetPassword", { email, newPassword });
      dispatch({
          type: POST_RESET_PASSWORD,
          payload: response,
      });
  } catch (error) {
      console.error('RESET_PASSWORD API Error:', error);
  }
};


const postLoginReduser = (state = initialState, action) => {
  switch (action.type) {
      case POST_LOGIN: {
          return {
              ...state,
              loginResponseData: action.payload 
          }
      }

      case POST_GET_OTP:{
        return { 
          ...state, 
          otpResponse: action.payload 
        }
      }

    case POST_VERIFY_OTP:{
        return { 
          ...state, 
          verifyResponse: action.payload }
        }

    case POST_RESET_PASSWORD:{
        return { 
          ...state, 
          resetResponse: action.payload 
        }
      }
      case "persist/REHYDRATE":
        return {
          ...state,
          loginResponseData: action.payload?.login?.loginResponseData || {},
        };
  
      default: return state;
  }
}

export default postLoginReduser
