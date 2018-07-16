import axios from 'axios';

export function callLogin(payload) {
  console.log('payload in loginRequests', payload);
  
  const body = ({
    username: payload.username,
    password: payload.password,
    account_type: payload.account_type
  });

  const config = {
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true,
  };

  return axios.post('api/user/login', body, config)
    .then(response => response.data)
    .catch((error) => {
      throw error.response || error;
    });
}

export function callLogout() {
  const config = {
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true,
  };

  return axios.get('api/user/logout', config)
    .then(response => response.data)
    .catch((error) => {
      throw error.response || error;
    });
}
