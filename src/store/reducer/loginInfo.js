const initialLoginState = {
	token: null,
	preAccount: '',
};

const LoginReducer = (state = initialLoginState, action) => {
	switch (action.type) {
		case 'SET_TOKEN':
			return { ...state, token: action.value };
		case 'SET_PRE_ACCOUNT': {
			return { ...state, preAccount: action.value };
		}
		case 'LOGOUT':
			return { ...initialLoginState };
		default:
			return state;
	}
};

export default LoginReducer;
