import React from "react";
import MainRouter from "./MainRouter";
import { BrowserRouter } from "react-router-dom";
import { hot } from "react-hot-loader";

const App = () => (
	<BrowserRouter>
		<MuiThemeProvider theme={theme}>
			<MainRouter/>
		</MuiThemeProvider>
	</BrowserRouter>
);

export default hot(module)(App);
