import apiClient from '../api/apiClient';

const initialState = {
  profile: {},
  editNameResponse: '',
  editUserNameResponse: '',
  editBioResponse: '',
  updateImageResponse: '',
  sendRequestResponse: '',
  unFollowRequestResponse: '',
  unBlockProfileResponse: '',
};

const GET_PROFILE = 'profile/GET_PROFILE';
const EDIT_NAME = 'profile/EDIT_NAME';
const EDIT_USERNAME = 'profile/EDIT_USERNAME';
const EDIT_BIO = 'profile/EDIT_BIO';
const UPDATE_IMAGE = 'profile/UPDATE_IMAGE';
const SEND_REQUEST = 'profile/SEND_REQUEST';
const UNFOLLOW_REQUEST = 'profile/UNFOLLOW_REQUEST';
const UNBLOCK_PROFILE = 'profile/UNBLOCK_PROFILE';

export const getProfile = (targetProfileId) => async (dispatch) => {
  try {
    const response = await apiClient.post('https://doppular.vercel.app/api/profile/openProfile',{ targetProfileId });
    if (response?.success) {
      dispatch({
        type: GET_PROFILE,
        payload: response,
      });
    }
  } catch (error) {
    console.error('GET_PROFILE API Error:', error.message);
  }
};

export const editName = (name) => async (dispatch) => {
  try {
    const response = await apiClient.post('https://doppular.vercel.app/api/profile/editName', { name });
    if (response) {
      dispatch({
        type: EDIT_NAME,
        payload: response,
      });
    }
  } catch (error) {
    console.error('EDIT_NAME API Error:', error);
  }
};

export const editUsername = (username) => async (dispatch) => {
  try {
    const response = await apiClient.post('https://doppular.vercel.app/api/profile/editUserName', { username });
    if (response) {
      dispatch({
        type: EDIT_USERNAME,
        payload: response,
      });
    }
  } catch (error) {
    console.error('EDIT_USERNAME API Error:', error);
  }
};

export const editBio = (bio) => async (dispatch) => {
  try {
    const response = await apiClient.post('https://doppular.vercel.app/api/profile/editBio', { bio });
    if (response) {
      dispatch({
        type: EDIT_BIO,
        payload: response,
      });
    }
  } catch (error) {
    console.error('EDIT_BIO API Error:', error);
  }
};

export const updateProfilePic = (image) => async (dispatch) => {
  try {
    const response = await apiClient.post('https://doppular.vercel.app/api/profile/updateImage', { image });
    if (response) {
      dispatch({
        type: UPDATE_IMAGE,
        payload: response,
      });
    }
  } catch (error) {
    console.error('UPDATE_IMAGE API Error:', error);
  }
};

export const sendRequest = (targetProfileId, targetUserName) => async (dispatch) => {
  try {
    const response = await apiClient.post('https://doppular.vercel.app/api/profile/sendRequest', { targetProfileId, targetUserName });
    if (response) {
      dispatch({
        type: SEND_REQUEST,
        payload: response,
      });
    }
  } catch (error) {
    console.error('SEND_REQUEST API Error:', error);
  }
};

export const unFollowRequest = (targetProfileId) => async (dispatch) => {
  try {
    const response = await apiClient.post('https://doppular.vercel.app/api/profile/unFollowRequest', { targetProfileId });
    if (response) {
      dispatch({
        type: UNFOLLOW_REQUEST,
        payload: response,
      });
    }
  } catch (error) {
    console.error('UNFOLLOW_REQUEST API Error:', error);
  }
};

export const unBlockProfile = (targetProfileId) => async (dispatch) => {
  try {
    const response = await apiClient.post('https://doppular.vercel.app/api/profile/unBlockProfile', { targetProfileId });
    if (response) {
      dispatch({
        type: UNBLOCK_PROFILE,
        payload: response,
      });
    }
  } catch (error) {
    console.error('UNBLOCK_PROFILE API Error:', error);
  }
};

const profileReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_PROFILE:{
      return { 
        ...state, 
        profile: action.payload }
      }
    case EDIT_NAME:
      return { ...state, editNameResponse: action.payload };
    case EDIT_USERNAME:
      return { ...state, editUserNameResponse: action.payload };
    case EDIT_BIO:
      return { ...state, editBioResponse: action.payload };
    case UPDATE_IMAGE:
      return { ...state, updateImageResponse: action.payload };
    case SEND_REQUEST:
      return { ...state, sendRequestResponse: action.payload };
    case UNFOLLOW_REQUEST:
      return { ...state, unFollowRequestResponse: action.payload };
    case UNBLOCK_PROFILE:
      return { ...state, unBlockProfileResponse: action.payload };
    default:
      return state;
  }
};

export default profileReducer;
