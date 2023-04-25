const initialLoginState = {
	token: null,
};

const LoginReducer = (state = initialLoginState, action) => {
	switch (action.type) {
		case 'SET_TOKEN':
			return { ...state, token: action.value };
		case 'LOGOUT':
			return { ...initialLoginState };
		default:
			return state;
	}
};

export default LoginReducer;
