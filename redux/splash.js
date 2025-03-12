import apiClient from '../api/apiClient';

const initialState = {
  splash:{},
};

const GET_SPLASH = 'splash/GET_SPLASH';

export const getSplash = () => async (dispatch) => {
  try {
    const response = await apiClient.get(apiClient.Urls.splash);
    if (response) { 
      dispatch({
        type: GET_SPLASH,
        payload: response, 
      });
    } else {
      console.log('Empty Response:', response);
    }
  } catch (error) {
    console.error('Walkthrough API Error:', error);
  }
};


const getSplashReduser = (state = initialState, action) => {
  switch (action.type) {
      case GET_SPLASH: {
          return {
              ...state,
              splash: action.payload 
          }
      }
      default: return state;
  }
}

export default getSplashReduser
