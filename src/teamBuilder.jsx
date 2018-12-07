import React, { Component } from 'react';
import faker from 'faker'
import _  from 'lodash'
import logo from './logo.svg';
import './App.css';
import {Search,Button,Accordion,Icon,Grid,Segment,Header,Image,Label,Container,Statistic,Item} from 'semantic-ui-react'


const getResults = () =>
  _.times(5, () => ({
    title: faker.name.findName(),
    description: faker.company.catchPhrase(),
    image: faker.internet.avatar(),
    price: faker.finance.amount(100, 1000, 2, 'R$'),
  }))


const source = _.range(0, 3).reduce((memo) => {
		const name = faker.hacker.noun()
		// eslint-disable-next-line no-param-reassign
		memo[name] = {
			name,
			results: getResults(),
		}
		return memo
		}, {})

class FiltroPesquisa extends Component{
	 componentWillMount() {
	    this.resetComponent()
	 }

  resetComponent = () => this.setState({ isLoading: false, results: [], value: '' })

  handleResultSelect = (e, { result }) => this.setState({ value: result.title })

  handleSearchChange = (e, { value }) => {
    this.setState({ isLoading: true, value })

	  setTimeout(this.props.filtro(value), 300)
	  this.setState({isLoading : false})
	}
  render() {
    const { isLoading, value, results } = this.state

	  return (
		  <Container fluid>	  
			  <Search
				  className='pesquisa'
				  category
				  fluid
				  align='left'
				  placeholder='Procurar...'
				  loading={isLoading}
				  size='large'
				  minCharacters={2}
				  onResultSelect={this.handleResultSelect}
				  onSearchChange={_.debounce(this.handleSearchChange, 500, { leading: true })}
				  results={this.props.results}
				  value={value}		  
				  {...this.props}
			  />
		  </Container>
    )
  }
}

class Equipe extends Component{
	render(){
		return(
		<div>
			<div>
				<ListaPrestadores 
					prestadores={this.props.equipe} 
					botao='Remover'
					corBotao='red'
					funcBotao={this.props.funcBotao}></ListaPrestadores>	
			</div>		
			<div>
			<Statistic.Group>
				<Statistic>
					<Statistic.Value>{this.props.equipe.length}</Statistic.Value>
					<Statistic.Label>Profissionais</Statistic.Label>
				</Statistic>
				<Statistic>
					<Statistic.Value>R${this.props.equipe.reduce((total, item)=>{return (parseFloat(total) + parseFloat(item.price.slice(2,item.price.length-1))).toFixed(2)},0)}</Statistic.Value>
					<Statistic.Label>Custo Esperado</Statistic.Label>
				</Statistic>
			</Statistic.Group>
			</div>
			<div>
				<Button color='red' onClick={this.props.limpar}>Limpar</Button>
				<Button color='green'>Enviar Convites!</Button>
			</div>

		</div>
		)
	}

}

class ListaPrestadores extends Component{
	constructor(props){
		super(props);
		this.state = {
			activeIndex: null,
		}
	}
	handleClick = (e, titleProps)=>{
		const {index} = titleProps;
		const {activeIndex} = this.state;
		const newIndex = activeIndex === index ? -1 : index;

		this.setState({ activeIndex: newIndex })
	  }
	render(){
		const prestadores = this.props.prestadores.map((prestador, index) =>{
				if(prestador){
					return(
						<Accordion styled key={prestador.title}>
							<Accordion.Title 
								active={this.state.activeIndex === index} 
								index={index} 
								onClick={this.handleClick}
							>
								<Icon name='dropdown'/>
								{prestador.title}
    							</Accordion.Title>
							<Accordion.Content active={this.state.activeIndex === index}>
								<Grid columns='equal' relaxed>
									<Grid.Column>
										<Image src={prestador.image}/>
									</Grid.Column>
									<Grid.Column>
										<p> Nome: {prestador.title}</p>
										<p> Especialidade: {prestador.cat}</p>
										<p> Função: {prestador.description}</p>
										<p> Custo: {prestador.price}</p>
									</Grid.Column>
									<Grid.Column>
										<Button fluid color={this.props.corBotao}
											indice={this.state.activeIndex}
											onClick={this.props.funcBotao}>
											{this.props.botao}	
										</Button>
									</Grid.Column>
								</Grid>
							</Accordion.Content>
						</Accordion>
					)	
				}});

		return (
			<div className="Lista">
				{prestadores}
			</div>	
		);
	}
}
	
class TeamBuilder extends Component {
	constructor(props){
		super(props)
		this.state = {
			source: source,
			results: null,
			prestadores: [] ,
			equipe: [],
		}
	}
	selecionar = (e, buttonProps) =>{
		let i = buttonProps.indice;
		var obj={};
		var x;
		const equipe = this.state.equipe.slice();
		const lista = this.state.prestadores.slice();
		const source = this.state.source
		obj = lista.splice(i,1);
		equipe.push(obj[0]);
		for(x in source){
			source[x].results = source[x].results.filter((item)=>{return item.title != obj[0].title}); 
		}
		
		this.setState({equipe : equipe, prestadores : lista, source : source });		
		return;
	}	

	remover = (e, buttonProps) =>{
		let i = buttonProps.indice;
		let obj={};
		const equipe = this.state.equipe.slice();
		const lista = this.state.prestadores.slice();
		const source = JSON.parse(JSON.stringify(this.state.source))
		obj = equipe.splice(i,1);
		lista.push(obj[0]);
		let x;
		let aux={};
		for(x in source[obj[0].cat].results[0]){
			aux[x] = obj[0][x];
		}
		source[obj[0].cat].results.push(aux);
		console.log(source);
		this.setState({equipe : equipe, prestadores : lista, source : source});		
		return;
	}
	
	limpar = () =>{
		let lista = this.state.prestadores.slice();
		lista = lista.concat(this.state.equipe.slice());
		const source =  JSON.parse(JSON.stringify(this.state.source))
		const obj = this.state.equipe.slice();
		for(let i=0; i<this.state.equipe.length;i++){
			let x;
			let aux={};
			for(x in source[obj[i].cat].results[0]){
				aux[x] = obj[i][x];
			}
			source[obj[i].cat].results.push(aux);
		}
		this.setState({prestadores : lista, equipe : [], source : source});
		return;	
	}

	listar = (source) =>{
		var x;
		var str = JSON.stringify(source);
		const s = JSON.parse(str);
		let prestadores = [];
		if(source){
			for(x in s){
				let array = s[x].results;
				array.forEach((item)=>{item.cat = x});
				prestadores= prestadores.concat(array);
			}
		}
		this.setState({prestadores:prestadores});
	}
	filtro= (value) => {
	      if (value.length <= 1) return this.listar(this.state.source);

		const re = new RegExp(_.escapeRegExp(value), 'i')
		const isMatch = result =>  re.test(result.title)
		const filteredResults = _.reduce(
		this.state.source,
		(memo, data, name) => {
		  
		  let results = data.results.slice();	
			if (re.test(name)) {
				memo[name] = {name, results}
			}else  if (results.length){  
				results = _.filter(data.results, isMatch)
				memo[name] = { name, results } // eslint-disable-line no-param-reassign
			}	
		  return memo
		  
		},
		{},
	      )

	      this.setState({
		results: filteredResults,
	      })
		this.listar(filteredResults);
	}

	componentDidMount(){
		(this.state.prestadores.length > 0) ? null :this.listar(this.state.source);
	}
	
render() {
	let style= {backgroundColor : 'lightgrey',}; 
	
	return (
	      <div className="App">
		<header className='App-header'>
			<div className='App-logo'><h1>CLA</h1></div>
		</header>
		<div>
		</div>
		<Grid columns='equal'>
			<Grid.Column > 
				<div>
					<Label className='LabelTeamBuilder' size='massive'  color='teal'><p>Encontre profissionais!</p></Label>
				</div>
				<div className="pesquisa">
					<FiltroPesquisa source={this.state.source} results={this.state.results} filtro={this.filtro}/>
				</div>
			</Grid.Column>
			<Grid.Column> 
				<div>
					<Label className='LabelTeamBuilder' size='massive' color='blue'>Monte sua equipe!</Label>
				</div>
				<div className="listaPrest"  style={style}>
					<ListaPrestadores 
						prestadores= {this.state.prestadores} 
						funcBotao={this.selecionar}
						botao='Selecionar'
						corBotao='blue'
					/>
				</div>
			</Grid.Column>
			<Grid.Column > 
				<div>
					<Label className='LabelTeamBuilder' size='massive' color='green'>Confirme suas escolhas!</Label>
				</div>
				<div className="listaPrest"  style={style}>
					<Equipe equipe= {this.state.equipe} limpar={this.limpar}  funcBotao={this.remover}/>
				</div>
			</Grid.Column>
		</Grid>
	      </div>   
	    );
  }
}

export default TeamBuilder;

