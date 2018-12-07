import * as React from 'react';
import { LoginForm } from '../View/login-form';

export class LoginPage extends React.Component {
  render() {
    return (
      <div>
        <div className='App'>
          <header className='App-header'>
            <div><h1>LOGIN</h1></div>
          </header>
        </div>
        <LoginForm />
      </div>
    );
  }
}