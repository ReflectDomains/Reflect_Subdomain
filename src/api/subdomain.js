import http from '../utils/http';

export const searchSubdomain = async (data) => {
	const res = await http({
		url: '/api/v1/subdomain/search',
		data: {
			...data,
		},
		method: 'post',
	});
	return res;
};
