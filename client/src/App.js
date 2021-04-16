import React, { Fragment, useState } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";

// Components
import Header from "./components/layout/Header";
import Home from "./components/pages/Home";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import AlertMsg from "./components/layout/AlertMsg";
import Dashboard from "./components/dashboard/Dashboard";
import VerifyUser from "./components/auth/VerifyUser";
import VerifyRoute from "./components/routing/VerifyRoute";
import LoadUser from "./components/auth/LoadUser";

// Routing
import PrivateRoute from "./components/routing/PrivateRoute";

// Actions
import { loadUser } from "./actions/userAction";

const App = () => {
	const [load, setLoad] = useState(true);
	if (load && localStorage.token) {
		store.dispatch(loadUser());
		setLoad(false);
	}
	return (
		<Provider store={store}>
			<LoadUser />
			<BrowserRouter>
				<Fragment>
					<Header />
					<AlertMsg />
					<Switch>
						<Route exact path="/" component={Home} />
						<Route path="/login" component={Login} />
						<Route path="/register" component={Register} />
						<PrivateRoute path="/dashboard" component={Dashboard} />
						<VerifyRoute
							path="/verify/:token"
							component={VerifyUser}
						/>
					</Switch>
				</Fragment>
			</BrowserRouter>
		</Provider>
	);
};

export default App;
