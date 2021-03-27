import React, {
	useContext,
	createContext,
	useState,
	useEffect
} from 'react';

export const UserContext = createContext({
	id: null
	// later we could add their name or something else, if required
});

export function UserProvider({ children }) {
	const [user, setUser] = useState(null);

	useEffect(async () => {
		// const { data } = await axios.get('/user-status');
		// setUser(data);
		setTimeout(
			() => setUser({ customer: { id: '123' } }),
			500
		);
	});

	return !user ? (
		<div className='center'>
			<div className='spinner-border' role='status'>
				<span className='visually-hidden'>
					Loading...
				</span>
			</div>
		</div>
	) : (
		<UserContext.Provider value={[user, setUser]}>
			{children}
		</UserContext.Provider>
	);
}
