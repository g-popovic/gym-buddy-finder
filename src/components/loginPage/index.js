import React from 'react';
// import InputField from './inputField';
// import SubmitButton from './SubmitButton';
import UserStore from '../../StoreUserData/UserStore.js';

class LoginForm extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			username: '',
			password: '',
			buttonDisabled: false
		};
	}

	setInputValue(property, value) {
		value = value.trim();
		if (value.length > 12) {
			return;
		}
		this.setState({
			[property]: value
		});
	}

	resetForm() {
		this.setState({
			username: '',
			password: '',
			buttonDisabled: false
		});
	}

	async doLogin() {
		if (!this.state.username) {
			return;
		}
		if (!this.state.password) {
			return;
		}

		this.setState({ buttonDisabled: true });

		try {
			let res = await fetch('login/', {
				method: 'post',
				headers: {
					'Accept': 'application/json',
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					username: this.state.username,
					password: this.state.password
				})
			});

			let result = await res.json();
			if (result && result.success) {
				UserStore.isLoggedIn = true;
				UserStore.username = result.username;
			} else if (result && result.success === false) {
				this.resetForm();
				alert(result.msg);
			}
		} catch (e) {
			console.log(e);
			this.resetForm();
		}
	}

	render() {
		return (
			<div className='login-form center text-center'>
				<h2 className='mb-0'>LOGIN</h2>
				<h6 className='text-secondary mb-4'>GymBuddy</h6>
				<input
					className='form-control mb-2'
					type='text'
					placeholder='Username'
					value={this.state.username}
					onChange={e => this.setInputValue('username', e.target.value)}
				/>
				<input
					className='form-control'
					type='password'
					placeholder='Password'
					value={this.state.password}
					onChange={e => this.setInputValue('password', e.target.value)}
				/>
				{/* TODO: Change theme primary color */}
				<button
					className='mt-3 btn btn-primary w-100'
					disabled={this.state.buttonDisabled}
					onClick={() => this.doLogin()}>
					Login
				</button>
			</div>
		);
	}
}

export default LoginForm;
