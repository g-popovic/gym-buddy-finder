import React, { useState, useContext } from 'react';
import axios from '../../utils/axiosSetup';
import { UserContext } from '../../provider/UserContext';
import { useHistory } from 'react-router';

export default function LoginPage({ isLogin }) {
	const [email, setEmail] = useState('');
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');
	const [isLoading, setIsLoading] = useState(false);
	const [userContext, setUserContext] = useContext(UserContext);
	const history = useHistory();

	function validatePasswords() {
		if (password !== confirmPassword) {
			alert("Passwords don't match");
			return;
		}
		return true;
	}

	async function authenticate(e) {
		e.preventDefault();
		if (!isLogin && !validatePasswords()) return;

		try {
			let result;
			if (isLogin) {
				result = await axios.post('/auth/login', { email, password });
			} else {
				// TODO: Figure out coordinates. Right now I'm just passing in 0,0
				result = await axios.post('/auth/register', {
					email,
					username,
					password,
					location: { coordinates: [0, 0] }
				});
			}
			console.log(result);
			setUserContext(result.data);
			history.push('/');
		} catch (err) {
			console.error(err);
			alert((err.response && err.response.message) || 'Unexpected error');
		}
	}

	return (
		<form onSubmit={authenticate} className='login-form center text-center'>
			<h2 className='mb-0'>{isLogin ? 'LOGIN' : 'REGISTER'}</h2>
			<h6 className='text-secondary mb-4'>GymBuddy</h6>
			<input
				className='form-control mb-2'
				type='email'
				placeholder='Email'
				value={email}
				onChange={e => setEmail(e.target.value)}
			/>
			{isLogin ? null : (
				<input
					className='form-control mb-2'
					placeholder='Username'
					value={username}
					onChange={e => setUsername(e.target.value)}
				/>
			)}
			<input
				className='form-control mb-2'
				type='password'
				placeholder='Password'
				value={password}
				onChange={e => setPassword(e.target.value)}
			/>
			{/* TODO: Change theme primary color */}
			{isLogin ? null : (
				<input
					className='form-control mb-2'
					type='password'
					placeholder='Confirm Password'
					value={confirmPassword}
					onChange={e => setConfirmPassword(e.target.value)}
				/>
			)}
			<button type='submit' className='mt-3 btn btn-primary w-100' disabled={isLoading}>
				{isLogin ? 'Login' : 'Register'}
			</button>
		</form>
	);
}
