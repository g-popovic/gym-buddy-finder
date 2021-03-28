import React, { useContext } from 'react';
import './profile.scss';
import { UserContext } from '../../provider/UserContext';

export default function Profile() {
	const [data] = useContext(UserContext);

	return (
		<div className='profile-container'>
			<div className='mb-4'>
				<img className='avatar' src={data.imgUrl} />
				<h1 className='text-center'>{data.username}</h1>
			</div>

			<div>
				<p className='text-secondary mb-0'>Goal:</p>
				<h4 className='mt-0'>{data.fitnessGoal}</h4>
			</div>
		</div>
	);
}
