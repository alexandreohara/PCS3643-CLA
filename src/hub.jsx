import React, { Component } from 'react';
import faker from 'faker'
import _  from 'lodash'
import logo from './logo.svg';
import './App.css';
import {Search,Button,Accordion,Modal,Icon,Grid,Reveal,List,Segment,Header,Image,Label,Container,Statistic,Item} from 'semantic-ui-react'

const getResults = () =>
	{
	return({
		name: faker.name.findName(),
		desc: faker.company.catchPhrase(),
		image: faker.internet.avatar(),
		price: faker.finance.amount(100, 1000, 2, 'R$'),
		ofertas: _.times(5, () => ({
			icone: faker.internet.avatar(),
			projeto: faker.company.catchPhrase(),
			desc: faker.lorem.paragraph(),
			empresa: faker.company.companyName(),
			prazo: faker.date.month(),
			valor: faker.finance.amount(1000,100000,2,'R$'),
		})),
		projetos: _.times(5, () => ({
			icone: faker.internet.avatar(),
			projeto: faker.company.catchPhrase(),
			desc: faker.lorem.paragraph(),
			empresa: faker.company.companyName(),
			prazo: faker.date.month(),
			integrador: {nome : faker.name.findName(), img: faker.internet.avatar()},
			valor: faker.finance.amount(1000,100000,2,'R$'),
		}))	
	})
	}	


class HubCentral extends Component{
	render(){
		const square = { width: 375, height: 375};
		return(
	
		<Grid columns='equal'>
			<Grid.Column>
				<Button index={0} basic circular className='botaoHub' onClick={this.props.func}>
					<Segment circular raised textAlign='center' color='teal' inverted style={square}>
						<Header as='h1'> Crie um projeto!</Header>
					</Segment>
				</Button>
			</Grid.Column>
			<Grid.Column>
				<Button index={1} basic circular className='botaoHub' onClick={this.props.func}>
					<Segment circular raised textAlign='center' color='blue' inverted style={square}>
						<Header as='h1'> Monte uma equipe!</Header>
					</Segment>
				</Button>

			</Grid.Column>
			<Grid.Column>
				<Button index={2} basic circular className='botaoHub' onClick={this.props.func}>
					<Segment circular raised textAlign='center' color='green' inverted style={square}>
						<Header as='h1'> Trabalhe em um projeto!</Header>
					</Segment>
				</Button>
			</Grid.Column>
		</Grid>
		);
		}
}
class ListaProjetos extends Component{
	constructor(props){
		super(props);
		this.state={
			modal: false,
			activeIndex:0,
		}
	}
	open = (e,props) => {
		let index = props.id;
		let {activeIndex} = this.state;
		let newIndex = activeIndex === index ? 0 : index;
		this.setState({ modal: true, activeIndex: newIndex });
	}
	close = () => this.setState({ modal: false, activeIndex:0 })
	render(){
		const projetos= this.props.projetos.map((projeto,index) => {
		return(
			<List.Item id={index}  key={index} onClick={this.open}>
				<Image avatar src={projeto.icone} floated='left'/>
			     <List.Content floated='left'>
				<List.Header as='a'>{projeto.projeto}</List.Header>
				<List.Description>
				  Previsão de entrega em{' '}
				  <a>
				    <b>{projeto.prazo}</b>
				  </a>
				  </List.Description>
			      </List.Content>
		      </List.Item>
		)})
		const ind = this.state.activeIndex;
		return(
			<div>
			<List divided verticalAlign='middle' items={projetos} size='huge' className='ListaProjetos'/>
			<div>
			<Modal dimmer={'blurring'} open={this.state.modal} onClose={this.close}>
			  <Modal.Header>Resumo do Projeto</Modal.Header>
			  <Modal.Content image>
				  <Image wrapped size='medium' src={this.props.projetos[ind].icone} />
			    <Modal.Description>
			      <Header>{this.props.projetos[this.state.activeIndex].projeto}</Header>
			      <p>Empresa contratante: {this.props.projetos[this.state.activeIndex].empresa}</p>
			      <p>Descrição: {this.props.projetos[this.state.activeIndex].desc}</p>
			      <p>
				      Responsável:{" "} 
				      {this.props.projetos[this.state.activeIndex].integrador? 
						      (<Label as='a' image>
							<img src={this.props.projetos[this.state.activeIndex].integrador.img} />
						       {this.props.projetos[this.state.activeIndex].integrador.nome}
						       </Label>): "Ainda não contratado"}
				</p>
			      <p>Valor do projeto: {this.props.projetos[this.state.activeIndex].valor}</p>
			      <p>Prazo de entrega: {this.props.projetos[this.state.activeIndex].prazo}</p>
			    </Modal.Description>
			  </Modal.Content>
			  <Modal.Actions>
			    <Button
			      color='teal'
			      icon='checkmark'
			      labelPosition='right'
			      content="Finalizar"
			      onClick={this.close}
			    />
			    <div/>
			    {this.props.botao}
			  </Modal.Actions>
		  	</Modal>
			</div></div>
		);
	}
}


class HubCliente extends  Component{
	render(){
		const spc = { width: 35, height: 35};
		const botao = (<Button color='green' icon='tasks' labelPosition='right' content="Monitorar"/>)

		return(
			<Grid columns='equal'>
				<Grid.Row>
				<Grid.Column>
					<div style={spc}></div>
					<Button circular onClick={this.props.func} color='blue'>
						<Header as='h1' inverted> <Icon name='plus'/>Crie um projeto!</Header>							
					</Button>
					<div/>
				
				</Grid.Column>
				<Grid.Column>
					<Header as='h1'> Projetos em aberto:</Header>
					<ListaProjetos projetos={this.props.perfil.ofertas}/>
				</Grid.Column>
				<Grid.Column>
					<Header as='h1'> Projetos em andamento:</Header>
					<ListaProjetos projetos={this.props.perfil.projetos} botao={botao}/>	 
				</Grid.Column>
				</Grid.Row>
				<Grid.Row>	
					<Grid.Column>
						<Button floated='left' circular onClick={this.props.voltar} color='black'><Icon name='undo'/>Voltar</Button>
					</Grid.Column>
				</Grid.Row>
			</Grid>
	);
	}
}

class HubIntegrador extends  Component{
	render(){
		const spc = { width: 35, height: 35};
		const botaoOferta =(
				<div>
				<Button color='green' icon='thumbs up' labelPosition='right' content="Aceitar"/>
				<Button color='orange' icon='handshake' labelPosition='right' content="Negociar"/>	
				</div>
			);
		const botaoAnd =(
				<div>
				<Button color='blue' icon='info' labelPosition='right' content="Reportar"/>
				<Button color='green' icon='tasks' labelPosition='right' content="Monitorar"/>
				</div>
			);		
		return(
			<Grid columns='equal'>
				<Grid.Row>
				<Grid.Column>
					<Header as='h1'> Ofertas de Projetos:</Header>
					<ListaProjetos botao={botaoOferta} projetos={this.props.perfil.ofertas}/>
				</Grid.Column>
				<Grid.Column>
					<Header as='h1'> Projetos em andamento:</Header>
					<ListaProjetos botao={botaoAnd} projetos={this.props.perfil.projetos}/>	 
				</Grid.Column>
				</Grid.Row>
				<Grid.Row>	
					<Grid.Column>
						<Button floated='left' circular onClick={this.props.voltar} color='black'><Icon name='undo'/>Voltar</Button>
					</Grid.Column>
				</Grid.Row>
			</Grid>
	);
	}
}

class HubPrestador extends  Component{
	render(){
		const spc = { width: 35, height: 35};
		const botaoOferta = (
				<div>
				<Button color='green' icon='thumbs up' labelPosition='right' content="Aceitar"/>
				<Button color='red' icon='x' labelPosition='right' content="Recusar"/>
				</div>
			);
		
		const botaoAnd = (<Button color='blue' icon='info' labelPosition='right' content="Reportar"/>);

		return(

			<Grid columns='equal'>
				<Grid.Row>
				<Grid.Column>
					<Header as='h1'>Convites de Projetos:</Header>
					<ListaProjetos botao={botaoOferta} projetos={this.props.perfil.ofertas}/>
				</Grid.Column>
				<Grid.Column>
					<Header as='h1'> Projetos em andamento:</Header>
					<ListaProjetos botao={botaoAnd} projetos={this.props.perfil.projetos}/>	 
				</Grid.Column>
				</Grid.Row>
				<Grid.Row>	
					<Grid.Column>
						<Button floated='left' circular onClick={this.props.voltar} color='black'><Icon name='undo'/>Voltar</Button>
					</Grid.Column>
				</Grid.Row>
			</Grid>

	);
	}
}
class Hub extends Component{
	constructor(props){
		super(props);
		this.state = {
			activeIndex: -1,
			user: getResults(),
		}
	}
	handleClick = (e, buttonProps)=>{
		const index = buttonProps.index;
		const activeIndex = this.state.activeIndex;
		const newIndex = activeIndex === index ? -1 : index;
		this.setState({ activeIndex: newIndex });
	}
	voltar = (e, p)=>{
		this.setState({activeIndex:-1});
	}

	render(){
		let page;
		if(this.state.activeIndex === -1){
			page =(<HubCentral func={this.handleClick}/>);
		}
		else if(this.state.activeIndex === 0){
			page = (<HubCliente perfil={this.state.user} voltar={this.voltar}/>);
		}
		else if(this.state.activeIndex === 1){
			page = (<HubIntegrador perfil={this.state.user} voltar={this.voltar}/>);
		}
		else if(this.state.activeIndex === 2){
			page = (<HubPrestador perfil={this.state.user} voltar={this.voltar}/>);
		}
		return(
				<div className="App">
					<header className='App-header'>
						<div><h1>CLA</h1></div>
					</header>
					<div>
					</div>
					{page}
				</div>
		);
	}
}

export default Hub;
