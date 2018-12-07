import * as React from 'react';
import { Button, Checkbox, Form, Segment, Grid } from 'semantic-ui-react';
import '../App.css';

export class ServiceForm extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      checked: false,
    };
  }

  render() {
    return (
      <div className='myDiv'>
        <div className='bg'></div>
        <Grid columns='2' padded centered>
          <Grid.Column>
            <Form>
              <Segment raised>
                <Form.Input
                  value={this.props.client.readOnly ? this.props.client.name : undefined}
                  label='Nome do Cliente'
                  placeholder={this.props.client.name}
                  readOnly={this.props.client.readOnly}
                  required
                />
                <Form.Input
                  value={this.props.client.readOnly ? this.props.client.serviceTitle : undefined}
                  placeholder={this.props.client.serviceTitle}
                  label='Título da Demanda'
                  readOnly={this.props.client.readOnly}
                  required
                />
                <Form.Input
                  value={this.props.client.readOnly ? this.props.client.price : undefined}
                  placeholder={this.props.client.price}
                  label='Preço proposto pela demanda'
                  readOnly={this.props.client.readOnly}
                  required
                />
                <Form.Input
                  value={this.props.client.readOnly ? this.props.client.limitDate : undefined}
                  placeholder={this.props.client.limitDate}
                  label='Prazo máximo para o fim da demanda'
                  readOnly={this.props.client.readOnly}
                  required
                />
                <Form.TextArea
                  rows='5'
                  value={this.props.client.readOnly ? this.props.client.description : undefined}
                  placeholder={this.props.client.description}
                  label='Descrição do serviço e condições'
                  readOnly={this.props.client.readOnly}
                  required
                />
                <Form.Field>
                  <Checkbox label='Eu li e concordo com os termos e condições' onClick={this.onChecked} />
                </Form.Field>
                <Button primary type='submit' disabled={!this.state.checked}>{this.props.client.buttonTextPrimary}</Button>
                <Button secondary>{this.props.client.buttonTextSecondary}</Button>
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
