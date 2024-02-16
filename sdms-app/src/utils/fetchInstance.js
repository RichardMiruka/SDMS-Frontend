import { jwtDecode } from 'jwt-decode';
import dayjs from 'dayjs';

const originalRequest = async (url, config) => {
  try {
    const response = await fetch(url, config);
    const data = await response.json();
    return { response, data };
  } catch (error) {
    // Handle API request error (e.g., logging, redirecting, etc.)
    console.error('API request error:', error);
    throw error; // rethrow the error to let the caller handle it
  }
};

const refreshToken = async (authTokens) => {
  try {
    const response = await fetch('http://127.0.0.1:5000/api/v1/token/refresh/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ refresh: authTokens.refresh }),
    });

    const data = await response.json();
    localStorage.setItem('authTokens', JSON.stringify(data));
    return data;
  } catch (error) {
    console.error('Refresh token error:', error);
    throw error;
  }
};

const customFetcher = async (url, config = {}) => {
  let authTokens = localStorage.getItem('authTokens')
    ? JSON.parse(localStorage.getItem('authTokens'))
    : null;

  if (!authTokens) {
    return { response: null, data: null };
  }

  const user = jwtDecode(authTokens.access);
  const isExpired = dayjs.unix(user.exp).diff(dayjs(), 'second') < 0;

  if (isExpired) {
    try {
      authTokens = await refreshToken(authTokens);
    } catch (error) {
      console.error('Token refresh failed:', error);
      return { response: null, data: null };
    }
  }

  config.headers = {
    ...config.headers,
    Authorization: `Bearer ${authTokens?.access}`,
  };

  const { response, data } = await originalRequest(url, config);
  return { response, data };
};

export default customFetcher;