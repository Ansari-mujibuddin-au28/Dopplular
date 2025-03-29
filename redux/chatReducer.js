import apiClient from '../api/apiClient';


const initialState = {
  chats: [],
  messages: {},
  loading: false,
  error: null,
};

const GET_CHATS = 'chat/GET_CHATS';
const GET_MESSAGES = 'chat/GET_MESSAGES';
const SEND_MESSAGE = 'chat/SEND_MESSAGE';
const CREATE_CHAT = 'chat/CREATE_CHAT';

export const fetchUserChats = (profileId) => async (dispatch) => {
  try {
    const response = await apiClient.get(`https://doppular.vercel.app/api/chat/getChats?profileId=${profileId}`);
    console.log(response,"response")
    if (response) {
      dispatch({ type: GET_CHATS, payload: response.data });
    }
  } catch (error) {
    console.error('Fetch Chats API Error:', error);
  }
};

export const fetchMessages = (chatId) => async (dispatch) => {
  try {
    const response = await apiClient.get(`https://doppular.vercel.app/api/messages/getMessages?chatId=${chatId}`);
    if (response) {
      dispatch({ type: GET_MESSAGES, payload: { chatId, messages: response.data } });
    }
  } catch (error) {
    console.error('Fetch Messages API Error:', error);
  }
};

export const sendMessage = ({ chatId, message }) => async (dispatch) => {
  try {
    const response = await apiClient.post(`https://doppular.vercel.app/api/messages/createMessage`, { chatId, message });
    if (response) {
      dispatch({ type: SEND_MESSAGE, payload: { chatId, message: response.data } });
    }
  } catch (error) {
    console.error('Send Message API Error:', error);
  }
};

export const createChat = ({ firstId, secondId }) => async (dispatch) => {
    console.log("Creating chat with:", firstId, secondId);
  
    if (!firstId || !secondId) {
      console.error('Invalid user IDs:', { firstId, secondId });
      return;
    }
  
    try {
      const response = await apiClient.post(
        'https://doppular.vercel.app/api/chat/createChat', 
        { firstId, secondId }
      );
  
      console.log("Create Chat API Response:", response);
  
      if (response?.success) {
        dispatch({ type: CREATE_CHAT, payload: response.response });
      } else {
        console.error("API returned failure response:", response);
      }
    } catch (error) {
      console.error('Create Chat API Error:', error);
    }
  };
  
  

const chatReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_CHATS:
      return { ...state, chats: action.payload };
    case GET_MESSAGES:
      return { ...state, messages: { ...state.messages, [action.payload.chatId]: action.payload.messages } };
    case SEND_MESSAGE:
      return {
        ...state,
        messages: {
          ...state.messages,
          [action.payload.chatId]: [...(state.messages[action.payload.chatId] || []), action.payload.message],
        },
      };
    case CREATE_CHAT:
      return { ...state, chats: [...state.chats, action.payload] };
    default:
      return state;
  }
};

export default chatReducer;
