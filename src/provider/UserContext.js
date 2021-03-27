import React, { createContext, useState, useEffect } from 'react';
import axios from '../utils/axiosSetup';

export const UserContext = createContext();

export function UserProvider({ children }) {
	const [user, setUser] = useState({});

	useEffect(async () => {
		try {
			const { data } = await axios.get('/auth/status');
			setUser(data);
		} catch (err) {
			console.error(err);
		}
	}, []);

	return !user ? (
		<div className='center'>
			<div className='spinner-border' role='status'>
				<span className='visually-hidden'>Loading...</span>
			</div>
		</div>
	) : (
		<UserContext.Provider value={[user, setUser]}>{children}</UserContext.Provider>
	);
}
