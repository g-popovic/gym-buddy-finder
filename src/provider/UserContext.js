import React, { createContext, useState, useEffect } from 'react';
import axios from '../utils/axiosSetup';

export const UserContext = createContext();

export function UserProvider({ children }) {
	const [user, setUser] = useState({
		id: null
		// later we could add their name or something else, if required
	});

	useEffect(async () => {
		try {
			const { data } = await axios.get('/auth/status');
			setUser(data);
			if (data.user.id) setUser(await axios.get('/profile-info'));
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
