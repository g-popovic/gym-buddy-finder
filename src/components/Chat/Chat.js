import React from 'react';
import './Chat.scss';
import Avatar from '@material-ui/core/Avatar';
import { Link } from 'react-router-dom';

const Chat = ({ name, message, profilePic, timestamp, onClick, selected }) => {
	return (
		<div className={'chat ' + (selected ? ' chat-active' : '')} onClick={onClick}>
			<img className='chat_image' alt={name} src={profilePic} />
			<div className='chat_details'>
				<div className='d-flex justify-content-between'>
					<h5 className='mb-0'>{name}</h5>
					<p className='chat_timestamp mb-0'>{timestamp}</p>
				</div>
				<p className='mb-0'>{message}</p>
			</div>
		</div>
	);
};

export default Chat;
