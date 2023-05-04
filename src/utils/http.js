import axios from 'axios';
import { toast } from 'react-toastify';
import store from '../store';

const errorCode = [500, 400, 551, 560, 800];

// create axios instance
const http = axios.create({
	// request connect timeout
	timeout: 2 * 60 * 1000,
	// withCredentials: true,
});

http.interceptors.request.use(
	(config) => {
		// token
		if (store.getState().reflect_subdomain_loginInfo.token) {
			config.headers.Authorization = `Bearer ${
				store.getState().reflect_subdomain_loginInfo.token
			}`;
		}
		// config.headers.Authorization = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJBZGRyZXNzIjoiMHhkNTVkNDMwMjIyZTY2ZDY4MDIwMTViNjYwNjc0NWYxOTk3NDA1ODFjIiwiU291cmNlIjoiZW5zLXRvb2wiLCJTdGFuZGFyZENsYWltcyI6eyJleHAiOjE2ODc4MzYwMzgsImlzcyI6InJlZmxlY3QifX0.WFDbKQJkppjgf8LXeFC5ut8gqqeGzcLzdOqLpSMIu48"
		if (config.method === 'get') {
			config.data = {};
		}

		return config;
	},
	(error) => {
		console.warn(error);
		return Promise.reject(error);
	}
);

http.interceptors.response.use(
	(response) => {
		// const { data, config } = response;
		const { data } = response;
		const { code, message } = data;

		if (errorCode.includes(code)) {
			toast.error(message);
		}
		if (code === 800) {
			store.dispatch({ type: 'LOGOUT' });
		}

		return data;
	},
	(error) => {
		return Promise.reject(error);
	}
);

export default http;
