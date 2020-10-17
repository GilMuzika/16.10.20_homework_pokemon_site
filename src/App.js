import React, { Component } from 'react';
import getPockemons from './components/getPockemon/getPockemons';
import getpockemonDetails from './components/getPockemon/getpockemonDetails';
import displayPockemon from './displayPockemon';
import Navbar from './components/Navbar';
import { BrowserRouter, Route } from 'react-router-dom';

class App extends Component {
constructor() {
	super()
}

	state = { pockemons: [] };

	componentDidMount() {
		const currentPockes = [];
		getPockemons('https://pokeapi.co/api/v2/pokemon', 8)
		.then(rez => {
		  for(let s in rez) {
			  const pockemon = {};
			console.log(rez[s]);
			const {name, url} = rez[s];
			console.log(url);
			 getpockemonDetails(url)
			 .then(poke => {
				   console.log(`getpockemonDetails - ${name} details:`);
				   console.log(poke);
				   pockemon[name] = poke;
				   
					currentPockes.push(pockemon);
					this.setState({
						pockemons: currentPockes
					});

			 })

		 }
		})
		.catch(err => {alert(`Cauth in App - from getPockemons:\n${err}`)});
	}

	render() {
		const ret_val = [];
		const onlyNamesArr = [];
		console.log('In App - render, pockemons');
		for(let s in this.state.pockemons) {
			onlyNamesArr.push(displayPockemon(this.state.pockemons[s], true));
			console.log(this.state.pockemons[s]);
			ret_val.push(
				<div className="container">
					<div>
						{ displayPockemon(this.state.pockemons[s], false) }
					<hr/>
					</div>
				</div>
			);
		}

		const routeElementsArr = [];
		for(let s in onlyNamesArr) {
			routeElementsArr.push(
				<Route exact path={`/${onlyNamesArr[s]}`} component={() => displayPockemon(this.state.pockemons[s], false)} />		
			);
		}
		//<Route exact path='/' component={Home} />
  		return (
   			 <div>
					<BrowserRouter>
					<table id="mainOutputTable">
						<tr>
							<td id="verticalAlignTop" valign="top">
								<Navbar items={onlyNamesArr}/>
							</td>
							<td style={{width: 200}}>
								
							</td>
							<td>
								{routeElementsArr}
							</td>
						</tr>	
					</table>
					</BrowserRouter>

				

				<br/>
 			</div>
  		);
	}



}

export default App;
