export default async function apiProxy (method) {
	const jwt_token = localStorage.getItem('jwt_token');
	return method(jwt_token);
}