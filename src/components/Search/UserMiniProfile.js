import React from 'react';
import axios from '../../utils/axiosSetup';

export default function UserMiniProfile({ user }) {
	async function addFriend() {
		try {
			await axios.post('/friend-request/send', { id: user._id });
			alert('Success');
		} catch (err) {
			alert((err.response && err.response.data) || 'Something went wrong');
		}
	}

	return (
		<div className='column'>
			<div className='card'>
				<img src={user.imgUrl} />
				<h1>{user.username}</h1>
				<p className='title'>CEO & Founder</p>
				<p>Skill</p>
				<a href='#'>
					<i className='fa fa-instagram'></i>
				</a>
				<a href='#'>
					<i className='fa fa-twitter'></i>
				</a>
				<a href='#'>
					<i className='fa fa-dribbble'></i>
				</a>
				<a href='#'>
					<i className='fa fa-facebook'></i>
				</a>
				<button className='btn btn-dark ml-4 mr-4' onClick={addFriend}>
					Add friend
				</button>
			</div>
		</div>
	);
}
