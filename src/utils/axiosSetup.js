import axios from 'axios';

export default axios.create({
	baseURL: process.env.REACT_APP_ORIGIN || 'http://localhost:5000',
	withCredentials: true
});
