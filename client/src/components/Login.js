import React, { useState } from "react";
import { axiosWithAuth } from '../components/utils/axiosWithAuth';

const Login = props => {
  // make a post request to retrieve a token from the api
  // when you have handled the token, navigate to the BubblePage route
  const [credentials, setCredentials] = useState({
    username: '',
    password: ''
  });

  const handleChange = e => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const login = e => {
    e.preventDefault();

    axiosWithAuth()
      .post('/api/login', credentials)
      .then(res => {
        localStorage.setItem('token', res.data.payload);
        props.history.push('/protected');
        console.log('login post response', res)
      })
      .catch(err => {
        alert(err.response.data.error);
        console.log('login post error', err.response);
      });
  };

  return (
    <div className='login-form'>
      <h1>Login</h1>
      <form onSubmit={login}>
        <input type='text' name='username' onChange={handleChange} />
        <input type='password' name='password' onChange={handleChange} />
        <button type='submit'>Log In</button>
      </form>
    </div>
  );
};

export default Login;
