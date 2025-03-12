import apiClient from '../api/apiClient';

const initialState = {
  walkthroughSlice:[],
};

const GET_WALKTHROUGH = 'walkthrough/GET_WALKTHROUGH';

export const getWalkThrough = () => async (dispatch) => {
  try {
    const response = await apiClient.get(apiClient.Urls.walkthrough);
    if (response) { 
      dispatch({
        type: GET_WALKTHROUGH,
        payload: response, 
      });
    } else {
      console.log('Empty Response:', response);
    }
  } catch (error) {
    console.error('Walkthrough API Error:', error);
  }
};


const getWalkThroughReducer = (state = initialState, action) => {
  switch (action.type) {
      case GET_WALKTHROUGH: {
          return {
              ...state,
              walkthroughSlice: action.payload 
          }
      }
      default: return state;
  }
}

export default getWalkThroughReducer
