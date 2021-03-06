import React, { useContext } from 'react';
import { Redirect, useHistory } from 'react-router';
import { UserContext } from '../../provider/UserContext';
import axios from '../../utils/axiosSetup';

export default function UserMiniProfile({ user, request }) {
	const [userContext] = useContext(UserContext);
	const history = useHistory();

	async function addFriend() {
		if (!userContext || !userContext.id) {
			history.push('/register');
			return;
		}

		try {
			await axios.post('/friend-request/send', { id: user._id });
			alert('Success');
		} catch (err) {
			alert((err.response && err.response.data) || 'Something went wrong');
		}
	}

	// These could be combined into 1 for optimization but who cares
	async function acceptFriend() {
		try {
			await axios.post('/friend-request/accept', { id: user._id });
			alert('Success');
		} catch (err) {
			alert((err.response && err.response.data) || 'Something went wrong');
		}
	}

	async function declineFriend() {
		try {
			await axios.post('/friend-request/decline', { id: user._id });
			alert('Success');
		} catch (err) {
			alert((err.response && err.response.data) || 'Something went wrong');
		}
	}

	return (
		<div className='column'>
			<div className='card'>
				<img src={user.imgUrl} className='search-avatar' />
				<h1>{user.username}</h1>
				<div className='d-flex justify-content-center align-items-center mb-4'>
					<p className='text-secondary mb-0 mr-2 mt-0'>Goal:</p>
					<h5 className='mt-0 mb-1'>{user.fitnessGoal}</h5>
				</div>
				{request ? (
					<div className='d-flex accept-decline-btns'>
						<button className='btn btn-dark ml-4' onClick={acceptFriend}>
							Accept
						</button>
						<button className='btn btn-outline-dark ml-1 mr-4' onClick={declineFriend}>
							Decline
						</button>
					</div>
				) : (
					<button
						disabled={
							!!userContext.id &&
							(user.friends.includes(userContext.id) ||
								user.friendRequests.find(el => el.id === userContext.id) ||
								userContext.friendRequests.includes(user._id))
						}
						className='btn btn-dark ml-4 mr-4'
						onClick={addFriend}>
						Add friend
					</button>
				)}
			</div>
		</div>
	);
}
