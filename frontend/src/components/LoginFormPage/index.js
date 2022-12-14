import React, { useState } from 'react';
import * as sessionActions from '../../store/session.js';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import './LoginForm.css';
import '../Spots/Spots.css'


function LoginFormPage() {
  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user);
  const [credential, setCredential] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState([]);

  if (sessionUser) return (
    <Redirect to="/" />
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors([]);
    return dispatch(sessionActions.login({ credential, password }))
      .catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) setErrors(data.errors);
      });
  }

  return (
    <form onSubmit={handleSubmit}>
      <ul>
        {errors.map((error, idx) => <li key={idx}>{error}</li>)}
      </ul>
      <label className='login123'>
        Username or Email:
        <input className='login1234'
          type="text"
          value={credential}
          onChange={(e) => setCredential(e.target.value)}
          required
          />
      </label>
      <label className='login123'>
        Password:
        <input className='login1234'
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          />
      </label>
      <div>
      <button className='logIn' type="submit">Log In</button>
      </div>
    </form>
  );
}

export default LoginFormPage;
