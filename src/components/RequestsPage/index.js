import React, { useEffect, useState } from 'react';
import axios from '../../utils/axiosSetup';
import UserMiniProfile from '../Search/UserMiniProfile';

export default function RequestsPage() {
	const [users, setUsers] = useState([]);

	useEffect(loadUsers, []);

	async function loadUsers() {
		try {
			const { data } = await axios.get('/friend-request/incoming');
			console.log(data);
			setUsers(data);
		} catch (err) {
			alert((err.response && err.response.data) || 'Error!');
		}
	}

	return users.length ? (
		<div className='row m-0'>
			{users.map(el => (
				<UserMiniProfile key={el._id} user={el} request />
			))}
		</div>
	) : (
		<h2 className='center text-white'>No Friend Requests</h2>
	);
}
