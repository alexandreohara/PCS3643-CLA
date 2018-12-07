import * as React from 'react';
import { Grid, Header, Icon } from 'semantic-ui-react';
import RevenueList from './View/revenue-list';
import './App.css';

const mockedActivity = {
    title: ['Web Service', 'Front-end', 'Cloud Service', 'Bot Service'],
    revenue: ['R$400.000', 'R$178.000', 'R$257.000', 'R$64.000']
  };
  
  class RevenueHistory extends React.Component {
    render() {
      return (
        <div>
          <div className='App'>
            <header className='App-header'>
              <div><h1>SERVIÇOS REALIZADOS</h1></div>
            </header>
          </div>
          {<HeaderExampleSettingsIcon></HeaderExampleSettingsIcon>}
          <RevenueList activityList={[mockedActivity]} />
        </div>
      );
    }
  }
  
  const HeaderExampleSettingsIcon = () => (
    <Grid padded>
    <br/>
      <Header as='h2'>
        <Icon name='history' />
        <Header.Content>
          Histórico
    <Header.Subheader>Veja os seus últimos serviços</Header.Subheader>
        </Header.Content>
      </Header>
    </Grid>
  )

  export default RevenueHistory