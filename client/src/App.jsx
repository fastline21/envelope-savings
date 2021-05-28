import React, { Fragment } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import configureStore from './configureStore';

// Containers
import Home from './containers/Home';
import Login from './containers/Login';
import Envelope from './containers/Envelope';
import About from './containers/About';

// Components
import Header from './components/Header';
import Alert from './components/Alert';

// Routes
import PrivateRoute from './routes/PrivateRoute';

const App = () => {
	return (
		<Provider store={configureStore}>
			<BrowserRouter>
				<Fragment>
					<Alert />
					<Header />
					<Switch>
						<PrivateRoute exact path='/' component={Home} />
						<PrivateRoute exact path='/about' component={About} />
						<Route path='/login' component={Login} />
						<PrivateRoute path='/:id' component={Envelope} />
					</Switch>
				</Fragment>
			</BrowserRouter>
		</Provider>
	);
};

export default App;
