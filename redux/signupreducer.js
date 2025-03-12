import apiClient from '../api/apiClient';

const initialState = {
  signup:{},
};

const POST_SIGN_UP = 'signup/POST_SIGN_UP';

export const postSignUp = (signupData) => async (dispatch) => {
  try {
    const response = await apiClient.post("https://doppular.vercel.app/api/signup", signupData);
    console.log('POST_SIGN_UP Response:', response);

    if (response?.success) {
      dispatch({
        type: POST_SIGN_UP,
        payload: response,
      });
    } else {
      console.log('Signup failed:', response.message);
    }
  } catch (error) {
    console.error('POST_SIGN_UP API Error:', error);
  }
};



const postSignUpReduser = (state = initialState, action) => {
  switch (action.type) {
      case POST_SIGN_UP: {
          return {
              ...state,
              signup:  action.payload, 
          }
      }
      default: return state;
  }
}

export default postSignUpReduser
