import React, { useEffect, useState, useContext } from 'react';
import Avatar from '@material-ui/core/Avatar';
import io from 'socket.io-client';
import { UserContext } from '../../provider/UserContext';
import Chats from './Chats';
import './ChatScreen.scss';
import axiosSetup from '../../utils/axiosSetup';

let socket;

const ChatScreen = () => {
	const [userContext] = useContext(UserContext);
	const [input, setInput] = useState('');
	const [currentFriend, setCurrentFriend] = useState();
	const [friends, setFriends] = useState(null);
	const [messages, setMessages] = useState([
		{
			name: 'Ellen',
			image:
				'https://profile-images.xing.com/images/8a5c3a56f55741fabf8911d38469b737-5/nicole-distler.1024x1024.jpg',
			message: 'Whats up 💌'
		},
		{
			name: 'Ellen',
			image:
				'https://profile-images.xing.com/images/8a5c3a56f55741fabf8911d38469b737-5/nicole-distler.1024x1024.jpg',
			message: 'Hows it going!'
		},
		{
			message: 'Hi! How are you Nicole!'
		}
	]);

	useEffect(async () => {
		socket = io(process.env.REACT_APP_ORIGIN, {
			withCredentials: true,
			query: {
				id: userContext.id
			}
		});

		socket.on('new-message', message => {
			console.log('new message recieved: ', message);
			setMessages(prev => [...prev, message]);
		});

		socket.on('message-error', error => console.error(error));

		try {
			const { data } = await axiosSetup.get('/friends');
			console.log(data);
			setFriends(data);
		} catch (err) {
			console.error(err);
			alert(err.response ? err.repsonse.data : 'Error');
		}

		return () => {
			socket.emit('disconnect');

			socket.off();
		};
	}, []);

	useEffect(() => {}, []);

	useEffect(() => {
		if (!currentFriend) return;
		setMessages(null);
		console.log({ currentFriend });

		async function getOldMessages() {
			const { data } = await axiosSetup.get('/messages/' + currentFriend);
			console.log(data);
			setMessages(data);
		}
		getOldMessages();
	}, [currentFriend]);

	function sendMessage(e) {
		e.preventDefault();
		console.log('bruh');

		if (input.length) {
			socket.emit('send-message', {
				message: input,
				id: currentFriend
			});
			setInput('');
		}
	}

	// function renderMessages() {
	// 	return messages.map((message, index) => (
	// 		<p
	// 			className={
	// 				(message.author === props.myData.id ? 'my-message' : 'friend-message') +
	// 				(index === 0
	// 					? ''
	// 					: messages[index - 1].author !== message.author
	// 					? ' new-sender'
	// 					: '')
	// 			}>
	// 			{message.text}
	// 		</p>
	// 	));
	// }

	// function scrollToBottom(behavior) {
	// 	if (messagesEnd) messagesEnd.scrollIntoView({ behavior: behavior });
	// }

	return (
		<div className='row chats-container m-0'>
			<div className='col-3 p-relative'>
				{!friends ? (
					<div className='center'>
						<div className='spinner-border' role='status'>
							<span className='visually-hidden'>Loading...</span>
						</div>
					</div>
				) : (
					<Chats current={currentFriend} select={setCurrentFriend} friends={friends} />
				)}
			</div>
			<div className='chatScreen col-9'>
				<div className='messages-container'>
					<div className='messages'>
						{currentFriend ? (
							<>
								{' '}
								<p className='chatScreen_timestamp'>
									{'CONVERSATION WITH ' +
										friends.find(el => el._id === currentFriend).username}
								</p>
								{!messages ? (
									<h3 className='center text-secondary'>Loading...</h3>
								) : (
									messages.map(message =>
										message.name ? (
											<div className='chatScreen_message'>
												<p className='chatScreen_text'>{message.message}</p>
											</div>
										) : (
											<div className='chatScreen_message'>
												<p className='chatScreen_text text_user'>
													{message.message}
												</p>
											</div>
										)
									)
								)}
							</>
						) : (
							<h3 className='center text-secondary'>Select a friend</h3>
						)}
					</div>
				</div>
				{!currentFriend ? null : (
					<form onSubmit={sendMessage} className='input-group'>
						<input
							autoFocus
							type='text'
							className='form-control'
							placeholder="Recipient's username"
							aria-label="Recipient's username"
							aria-describedby='button-addon2'
							value={input}
							onChange={e => setInput(e.target.value)}
						/>
						<button className='btn btn-outline-dark search-btn' type='submit'>
							SEND
						</button>
					</form>
				)}
			</div>
		</div>
	);
};

export default ChatScreen;
