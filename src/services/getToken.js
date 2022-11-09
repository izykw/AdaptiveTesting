export function getToken() {
	const token = localStorage.getItem('jwt_token');
	if(!token) {
		throw new Error('User no authorized');
	}
	return token;
}
