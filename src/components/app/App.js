import React from 'react';
import { RouterProvider } from 'react-router-dom';
import { router } from '../../router/router';

const AuthorizedUser = {
	token: '',
	changeToken(newToken) {
		this.token = newToken;
	},
};

export const UserContext = React.createContext(AuthorizedUser);

export default function App() {
	return (
		<UserContext.Provider value={AuthorizedUser}>
			<RouterProvider router={router}/>
		</UserContext.Provider>
	)
}