import React from 'react';
import LoginForm from './loginPage';
import { UserProvider } from '../provider/UserContext';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Homepage from './homePage';

export default function App() {
	return (
		<UserProvider>
			<Router>
				<Switch>
					<Route path='/' exact component={Homepage} />
					<Route path='/login' component={LoginForm} />
				</Switch>
			</Router>
		</UserProvider>
	);
}

// class App extends React.Component {
// 	//This function is to ensure that the user stays logged in if they refresh the page.
// 	async componentDidMount() {
// 		try {
// 			let res = await fetch('/isLoggedIn', {
// 				method: 'post',
// 				headers: {
// 					'Accept': 'application/json',
// 					'Content-Type': 'application/json'
// 				}
// 			});

// 			let result = await res.json();

// 			if (result && result.success) {
// 				UserStore.loading = false;
// 				UserStore.isLoggedIn = true;
// 				UserStore.username = result.username;
// 			} else {
// 				UserStore.loading = false;
// 				UserStore.isLoggedIn = false;
// 			}
// 		} catch (e) {
// 			UserStore.loading = false;
// 			UserStore.isLoggedIn = false;
// 		}
// 	}

// 	async doLogOut() {
// 		try {
// 			let res = await fetch('/logout', {
// 				method: 'post',
// 				headers: {
// 					'Accept': 'application/json',
// 					'Content-Type': 'application/json'
// 				}
// 			});

// 			let result = await res.json();

// 			if (result && result.success) {
// 				//UserStore.loading = false;
// 				UserStore.isLoggedIn = false;
// 				UserStore.username = '';
// 			}
// 		} catch (e) {
// 			//UserStore.loading = false;
// 			//UserStore.IsLoggedIn = true;
// 			console.log(e);
// 		}
// 	}

// 	render() {
// 		if (UserStore.loading) {
// 			return (
// 				<div className='app'>
// 					<div className='container'>
// 						Loading, please wait...
// 					</div>
// 				</div>
// 			);
// 		} else {
// 			if (UserStore.isLoggedIn) {
// 				return (
// 					<div className='app'>
// 						<div className='container'>
// 							Welcome, {UserStore.username}!
// 							<SubmitButton
// 								text={'Log out'}
// 								disabled={false}
// 								onClick={() =>
// 									this.doLogOut()
// 								}
// 							/>
// 						</div>
// 					</div>
// 				);
// 			}
// 		}

// 		return (
// 			<div className='app'>
// 				<div className='container'>
// 					{/* <SubmitButton text={"Login"} disabled={false} onClick={() => this.doLogOut()}/> */}
// 					<LoginForm />
// 				</div>
// 			</div>
// 		);
// 	}
// }

// export default observer(App);
