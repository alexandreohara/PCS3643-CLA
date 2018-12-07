import React from 'react';
import '../App.css';
import { Button, Form, Grid, Header, Icon, Segment } from 'semantic-ui-react';

export const LoginForm = () => (
  <div className='myDiv'>
    <div className='bg'></div>
    <Grid padded textAlign='center' columns='3' >
      <Grid.Column>
        <Form size='large'>
          <Segment raised>
            <Header as='h2' color='black' textAlign='center'>
              Entre ou cadastre-se
            </Header>
            <Form.Input
              fluid icon='user'
              iconPosition='left'
              placeholder='E-mail ou nome de usuário'
            />
            <Form.Input
              fluid
              icon='lock'
              iconPosition='left'
              placeholder='Senha'
              type='password'
            />
            <Button secondary animated>
              <Button.Content visible>Inscrever-se</Button.Content>
              <Button.Content hidden>
                <Icon name='signup' />
              </Button.Content>
            </Button>
            <Button primary animated>
              <Button.Content visible>Entrar</Button.Content>
              <Button.Content hidden>
                <Icon name='sign in' />
              </Button.Content>
            </Button>
          </Segment>
        </Form>
      </Grid.Column>
    </Grid>
  </div>
);
