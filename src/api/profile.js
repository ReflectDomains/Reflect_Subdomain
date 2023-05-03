import http from '../utils/http';

export const getProfile = async (data) => {
	const res = await http({
		url: '/api/v1/account/profile',
		params: data,
		method: 'get',
	});
	return res;
};

export const setProfile = async (data) => {
	const res = await http({
		url: '/api/v1/account/profile',
		data: data,
		method: 'post',
	});
	return res;
};

export const earnDomainsList = async (data) => {
	const res = await http({
		url: '/api/v1/account/domains',
		method: 'get',
		params: {},
	});
	return res;
};
