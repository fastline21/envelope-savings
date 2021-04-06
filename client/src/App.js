import React, { Fragment } from "react";
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
import LoadUser from "./components/auth/LoadUser";
import VerifyUser from "./components/auth/VerifyUser";
import VerifyRoute from "./components/routing/VerifyRoute";

// Routing
import PrivateRoute from "./components/routing/PrivateRoute";

const App = () => {
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
