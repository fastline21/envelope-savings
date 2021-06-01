import React, { Fragment } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import configureStore from './configureStore';

// Containers
import Home from './containers/Home';
import Login from './containers/Login';
import Envelope from './containers/Envelope';
import About from './containers/About';
import Dashboard from 'containers/Dashboard';

// Components
import Header from './components/Header';
import Alert from './components/Alert';
import NotFound from 'components/NotFound';

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
						<Route exact path='/' component={Home} />
						<Route path='/about' component={About} />
						<Route path='/login' component={Login} />
						<PrivateRoute
							exact
							path='/dashboard'
							component={Dashboard}
						/>
						<PrivateRoute
							path='/dashboard:id'
							component={Envelope}
						/>
						<Route path='*' component={NotFound} />
					</Switch>
				</Fragment>
			</BrowserRouter>
		</Provider>
	);
};

export default App;
