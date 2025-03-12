const BASE_URL = 'https://lookalike-backend.vercel.app/api/';
import AsyncStorage from '@react-native-async-storage/async-storage';

const URLS = {
  walkthrough: BASE_URL + "staticdata/walkthrough",
  splash: BASE_URL + "staticdata/splash",
  signup: BASE_URL + "signup",
  login: BASE_URL + "login",
};

const apiClient = {
  Urls: URLS,

  async getHeaders() {
    const token = await AsyncStorage.getItem('authToken');
    return {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      ...(token ? { Authorization: token } : {}),
    };
  },

  async make(url, method, params = {}) {
    console.log('API Request:', url, method, params);

    const reqUrl = method === 'GET' ? `${url}?${new URLSearchParams(params).toString()}` : url;

    try {
      const headers = await this.getHeaders();
      const response = await fetch(reqUrl, {
        method,
        headers,
        ...(method === 'GET' ? {} : { body: JSON.stringify(params) }),
      });

      if (!response.ok) {
        throw new Error(`API request failed with status ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error(`Error in API request: ${error.message}`, url);
      throw error;
    }
  },

  post(url, params) {
    return this.make(url, 'POST', params);
  },

  get(url, params) {
    return this.make(url, 'GET', params);
  },
};

export default apiClient;
