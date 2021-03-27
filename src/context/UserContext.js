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
			3000
		);
	});

	return !user ? (
		<h1 className='center'>Loading...</h1>
	) : (
		<UserContext.Provider value={[user, setUser]}>
			{children}
		</UserContext.Provider>
	);
}
