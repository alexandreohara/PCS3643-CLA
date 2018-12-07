import * as React from 'react';
import { ServiceForm } from '../View/service-form';

export class CreateActivityPage extends React.Component {
  render() {
    return (
      <div>
        <div className='App'>
          <header className='App-header'>
            <div><h1>CRIAR DEMANDA</h1></div>
          </header>
        </div>
        <ServiceForm />
      </div>
    );
  }
}