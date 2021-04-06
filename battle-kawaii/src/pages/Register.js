import React, { useState } from "react";

import AuthModel from "../models/AuthModel";

function Register(props) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleSubmit(event) {
    event.preventDefault();
    // TODO: Complete Auth Model functions and then use one
    //       here to register a new user.
  }

  return (
    <div>
      <h2>Register for an Account!</h2>
      <form onSubmit={handleSubmit}>
        <div className='form-input'>
          <label htmlFor='username'>Username</label>
          <input
            type='text'
            name='username'
            onChange={e => setUsername(e.target.value)}
            value={username}
          />
        </div>
        <div className='form-input'>
          <label htmlFor='email'>Email</label>
          <input
            type='text'
            name='email'
            onChange={e => setEmail(e.target.value)}
            value={email}
          />
        </div>
        <div className='form-input'>
          <label htmlFor='password'>Password</label>
          <input
            type='password'
            name='password'
            onChange={e => setPassword(e.target.value)}
            value={password}
          />
        </div>

        <input type='submit' value='Register' />
      </form>
    </div>
  );
}

export default Register;