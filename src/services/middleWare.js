export async function middleWare (method, params) {
	const token = localStorage.getItem('jwt_token');
	if(!token) {
		throw new Error('User not authorized');
	}
	return method(params, token);
}