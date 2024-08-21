
import React, { useState } from 'react';

import './login.css';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function handleSubmit(event) {
    event.preventDefault();
    // Aquí puedes manejar el envío del formulario, por ejemplo, validando los campos
    console.log('Email:', email);
    console.log('Password:', password);
    // Puedes agregar la lógica para enviar los datos a una API o hacer alguna validación
  }

  const onButtonClick = () => {
 
  }

  return (
    <div className={'mainContainer'}>
    <form onSubmit={handleSubmit}>
     <div className={'titleContainer'}>
        <div> Library SM</div>
      </div>

      <div className={'inputContainer'}>
        
        <input className={'inputBox'}
        placeholder="Enter your email here"
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div className={'inputContainer'}>
        
        <input className={'inputBox'}
        placeholder="Enter your password here"
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      <div className={'inputContainer'}>
        <input className={'inputButton'} type="button" onClick={onButtonClick} value={'Log in'} />
      </div>
    </form>
    </div>
  );
}

export default Login;
