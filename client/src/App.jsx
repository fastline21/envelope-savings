import React, { Fragment } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import configureStore from './configureStore';

// Containers
import Home from './containers/Home';
import Login from './containers/Login';

// Components
import Header from './components/Header';

const App = () => {
	return (
		<Provider store={configureStore}>
			<BrowserRouter>
				<Fragment>
					<Header />
					<Switch>
						<Route exact path='/' component={Home} />
						<Route path='/login' component={Login} />
					</Switch>
				</Fragment>
			</BrowserRouter>
		</Provider>
	);
};

export default App;
