import React, { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';

import './ChatScreen.css';

const ChatScreen = () => {
	const [userContext] = useContext(UserContext);
	const [input, setInput] = useState('');
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

	useEffect(() => {
		socket = io(process.env.REACT_APP_ORIGIN, {
			withCredentials: true,
			query: {
				id: userContext.id
			}
		});

		socket.on('new-message', message => {
			setMessages(prev => [...prev, message]);
		});

		return () => {
			socket.emit('disconnect');

			socket.off();
		};
	}, []);

	useEffect(() => {}, []);

	// useEffect(() => {
	// 	setMessages("loading");
	// 	async function getOldMessages() {
	// 		setMessages(
	// 			(
	// 				await axiosApp.get("/chat/get-messages/" + props.id, {
	// 					withCredentials: true
	// 				})
	// 			).data.messages
	// 		);
	// 	}

	// 	getOldMessages();
	// }, [props.id]);

	function sendMessage(e) {
		e.preventDefault();

		if (input.length) {
			socket.emit('send-message', {
				message: input,
				recipient: 'RECIPIENT'
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
		<div className='row chats-container'>
			<div className='col-3'>
				<Chats />
			</div>
			<div className='chatScreen col-9'>
				<p className='chatScreen_timestamp'>YOU MATCHED WITH ELLEN ON 10/08/20</p>
				{messages.map(message =>
					message.name ? (
						<div className='chatScreen_message'>
							<p className='chatScreen_text'>{message.message}</p>
						</div>
					) : (
						<div className='chatScreen_message'>
							<p className='chatScreen_text text_user'>{message.message}</p>
						</div>
					)
				)}
				<form onSubmit={sendMessage} className='input-group'>
					<input
						type='text'
						className='form-control'
						placeholder="Recipient's username"
						aria-label="Recipient's username"
						aria-describedby='button-addon2'
					/>
					<button
						className='btn btn-outline-dark search-btn'
						type='button'
						id='button-addon2'>
						SEND
					</button>
				</form>
			</div>
		</div>
	);
};

export default ChatScreen;
