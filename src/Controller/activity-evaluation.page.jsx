import * as React from 'react';
import { ServiceForm } from '../View/service-form';

const mockedClient = {
  name: 'João da Silva Sauro',
  serviceTitle: 'Criar um website',
  description: 'Precisa ser bonito, eficiente e sem bugs.',
  price: 'R$ 1000,00',
  limitDate: '29/10/2018',
  buttonTextPrimary: 'Aceitar',
  buttonTextSecondary: 'Recusar',
  readOnly: true,
};

export class ActivityEvaluationPage extends React.Component {
  render() {
    return (
      <div>
        <div className='App'>
          <header className='App-header'>
            <div><h1>AVALIAÇÃO DA DEMANDA</h1></div>
          </header>
        </div>
        <ServiceForm client={mockedClient}/>
      </div>
    );
  }
}