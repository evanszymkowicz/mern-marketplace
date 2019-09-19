import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./core/Home";
import Users from "./user/Users";
import SignUp from "./user/SignUp";
import Login from "./auth/Login";
import EditUser from "./user/EditUser";
import Profile from "./user/Profile";
import PrivateRoute from "./auth/PrivateRoute";
import Menu from "./core/Menu";
import NewStore from "./store/NewStore";
import Stores from "./store/Stores";
import MyStores from "./store/MyStores";
import Store from "./store/Store";
import EditStore from "./store/EditStore";
import NewProduct from "./product/NewProduct";
import EditProduct from "./product/EditProduct";
import Product from "./product/Product";
import Cart from "./cart/Cart";
import StripeConnect from "./user/StripeConnect";
import StoreOrders from "./order/StoreOrders";
import Order from "./order/Order";

class MainRouter extends Component {
	// Removes the server-side injected CSS when React component mounts
	componentDidMount() {
		const jssStyles = document.getElementById("jss-server-side");
		if (jssStyles && jssStyles.parentNode) {
			jssStyles.parentNode.removeChild(jssStyles);
		}
	}

	render() {
		return (<div>
			<Menu/>
			<Switch>
				<Route exact path="/" component={Home}/>
				<Route path="/users" component={Users}/>
				<Route path="/signup" component={SignUp}/>
				<Route path="/signin" component={Login}/>
				<PrivateRoute path="/user/edit/:userId" component={EditUser}/>
				<Route path="/user/:userId" component={Profile}/>

				<Route path="/cart" component={Cart}/>
				<Route path="/product/:productId" component={Product}/>
				<Route path="/stores/all" component={Stores}/>
				<Route path="/stores/:storeId" component={Store}/>

				<Route path="/order/:orderId" component={Order}/>
				<PrivateRoute path="/seller/orders/:store/:storeId" component={StoreOrders}/>

				<PrivateRoute path="/seller/stores" component={MyStores}/>
				<PrivateRoute path="/seller/store/new" component={NewStore}/>
				<PrivateRoute path="/seller/store/edit/:storeId" component={EditStore}/>
				<PrivateRoute path="/seller/:storeId/products/new" component={NewProduct}/>
				<PrivateRoute path="/seller/:storeId/:productId/edit" component={EditProduct}/>

				<Route path="/seller/stripe/connect" component={StripeConnect}/>
			</Switch>
		</div>);
	}
}

export default MainRouter;
