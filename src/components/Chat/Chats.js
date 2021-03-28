import React from 'react';
import Chat from './Chat';

const Chats = ({ current, select, friends }) => {
	return (
		<div className='chats'>
			{friends.map(el => {
				console.log({ id: el._id });

				return (
					<Chat
						selected={current === el._id}
						onClick={() => select(el._id)}
						name={el.username}
						message={el.fitnessGoal}
						timestamp={'Click to chat'}
						profilePic={el.imgUrl}
					/>
				);
			})}
		</div>
	);
};

export default Chats;
