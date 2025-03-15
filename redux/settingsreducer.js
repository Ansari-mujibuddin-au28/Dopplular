import apiClient from '../api/apiClient';

const initialState = {
  settings: {
    personalInformation: {},
    emailAddress: '',
    password: '',
    appTheme: {},
    profileVisibility: false,
    shareProfile: [],
    Invite: [],
    Support: [],
  },
  updateResponse: '',
  logoutResponse: '',
};

const GET_SETTINGS = 'settings/GET_SETTINGS';
const UPDATE_SETTING = 'settings/UPDATE_SETTING';
const LOGOUT = 'settings/LOGOUT';

export const getSettings = () => async (dispatch) => {
  try {
    const response = await apiClient.get('https://doppular.vercel.app/api/settings');

    if (response) {
      const { "Your Account": yourAccount = [] } = response;

      const personalInformation = yourAccount.find((item) => item.PersonalInformation)?.PersonalInformation || {};
      const emailAddress = yourAccount.find((item) => item.EmailAddress)?.EmailAddress || '';
      const password = yourAccount.find((item) => item.Password)?.Password || '';
      const appTheme = yourAccount.find((item) => item.AppTheme)?.AppTheme || {};
      const profileVisibility = yourAccount.find((item) => item["Profile Visibility"])?.["Profile Visibility"] || false;
      const shareProfile = yourAccount.find((item) => item["Share Profile"])?.["Share Profile"] || [];
      const Invite = response.Invite || '';
      const Support= response.Support || [];    

      dispatch({
        type: GET_SETTINGS,
        payload: { 
          personalInformation,
          emailAddress,
          password,
          appTheme,
          profileVisibility,
          shareProfile,
          Invite,
          Support
        },
      });
    }
  } catch (error) {
    console.error('GET_SETTINGS API Error:', error);
  }
};


const updateSetting = (endpoint, data) => async (dispatch) => {
  try {
    const response = await apiClient.post(`https://doppular.vercel.app/api/settings/${endpoint}`, data);
    dispatch({
      type: UPDATE_SETTING,
      payload: response,
    });
  } catch (error) {
    console.error(`UPDATE_SETTING (${endpoint}) API Error:`, error);
  }
};

export const updateDOB = (dob) => updateSetting('dobUpdate', { dob });
export const updateGender = (gender) => updateSetting('genderUpdate', { gender });
export const updateCountry = (country) => updateSetting('countryRegion', { country });
export const updateLanguage = (language) => updateSetting('language', { language });
export const updateEmail = (email) => updateSetting('emailIdUpdate', { email });
export const updateTheme = (theme) => updateSetting('themeUpdate', { theme });
export const updatePassword = (oldPassword, newPassword) => updateSetting('passwordUpdate', { oldPassword, newPassword });
export const updateProfileVisibility = (visibility) => updateSetting('profileVisibilty', { visibility });
export const sendProfiles = (profiles) => updateSetting('sendProfiles', { profiles });

export const logout = () => async (dispatch) => {
  try {
    const response = await apiClient.post('https://doppular.vercel.app/api/settings/logout');
    dispatch({
      type: LOGOUT,
      payload: response,
    });
  } catch (error) {
    console.error('LOGOUT API Error:', error);
  }
};

const settingsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_SETTINGS:
      return { ...state, settings: { ...state.settings, ...action.payload } };
    case UPDATE_SETTING:
      return { ...state, updateResponse: action.payload };
    case LOGOUT:
      return { ...state, logoutResponse: action.payload };
    default:
      return state;
  }
};

export default settingsReducer;
