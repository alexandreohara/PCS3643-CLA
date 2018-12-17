import * as React from 'react';
import { Button, Checkbox, Form, Segment, Grid } from 'semantic-ui-react';
import '../App.css';
import Link from 'react-router-dom/Link';

const axios = require('axios');

const headers = {
  'Content-Type': 'application/json' ,
  'Access-Control-Allow-Origin':'*'
}

export class ServiceForm extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      checked: false,
      name: '',
      project: '',
      price: '',
      prazo: '',
      desc: '',
    };
  }

  // handleChange = (e) => {
  //   const { name, project, price, prazo, desc } = this.state;
  // }

  handleChange = (e, { name, value }) => this.setState({ [name]: value })
  handleClick = () => {
    console.log(this.state); // aqui faz o post do projeto e coloca como demanda do cliente
    axios.post('https://pcs3643-cla.tk/projeto', {
      nome: this.state.project,
      valor: this.state.price,
      desc: this.state.desc,
      prazo: this.state.prazo,
      cliente: this.state.name,
    }, { headers: headers })
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });

  }

  render() {
    return (
      <div className='myDiv'>
        <div className='bg'></div>
        <Grid columns='2' padded centered>
          <Grid.Column>
            <Form onSubmit={this.handleSubmit}>
              <Segment raised>
                <Form.Input
                  name='name'
                  value={this.state.name}
                  onChange={this.handleChange}
                  label='Nome do Cliente'
                  placeholder={this.props.client.name}
                  readOnly={false}
                  required
                />
                <Form.Input
                  name='project'
                  value={this.props.client.readOnly ? this.props.client.serviceTitle : undefined}
                  onChange={this.handleChange}
                  placeholder={this.props.client.serviceTitle}
                  label='Título da Demanda'
                  readOnly={this.props.client.readOnly}
                  required
                />
                <Form.Input
                  name='price'
                  value={this.props.client.readOnly ? this.props.client.price : undefined}
                  placeholder={this.props.client.price}
                  onChange={this.handleChange}
                  label='Preço proposto pela demanda'
                  readOnly={this.props.client.readOnly}
                  required
                />
                <Form.Input
                  name='prazo'
                  value={this.props.client.readOnly ? this.props.client.limitDate : undefined}
                  placeholder={this.props.client.limitDate}
                  onChange={this.handleChange}
                  label='Prazo máximo para o fim da demanda'
                  readOnly={this.props.client.readOnly}
                  required
                />
                <Form.TextArea
                  name='desc'
                  rows='5'
                  value={this.props.client.readOnly ? this.props.client.description : undefined}
                  placeholder={this.props.client.description}
                  onChange={this.handleChange}
                  label='Descrição do serviço e condições'
                  readOnly={this.props.client.readOnly}
                  required
                />
                <Form.Field>
                  <Checkbox label='Eu li e concordo com os termos e condições' onClick={this.onChecked} />
                </Form.Field>

                {/*navega para o hub*/}
                <Button primary disabled={!this.state.checked} onClick={this.handleClick}>{this.props.client.buttonTextPrimary}</Button>

                {/*navega para o hub*/}
                <Link to='/'><Button secondary>{this.props.client.buttonTextSecondary}</Button></Link>
              </Segment>
            </Form>
          </Grid.Column>
        </Grid>
      </div >
    );
  }

  onChecked = (_event, data) => {
    this.setState({ checked: data.checked });
  }
}

ServiceForm.defaultProps = {
  client: {
    name: 'Nome Completo',
    serviceTitle: 'Título da demanda',
    description: 'Descreva resumidamente o serviço proposto',
    buttonTextPrimary: 'Salvar',
    buttonTextSecondary: 'Voltar',
    price: 'R$',
    limitDate: 'Ex.: 19/04/2019',
    readOnly: false
  },
};
