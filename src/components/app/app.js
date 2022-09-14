import React from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import SelectRole from '../select-role/select-role';
import UserCabinet from '../user-cabinet/user-cabinet';
import ModeratorCabinet from '../moderator/moderator-cabinet/moderator-cabinet';
import ModeratorManagementThem
	from '../moderator/moderator-management-them/moderator-management-them';
import ModeratorCreateQuestion
	from '../moderator/moderator-management-them/moderator-create-question/moderator-create-question';


export default function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route index path="/" element={<SelectRole/>}/>
				<Route path="user-cabinet"
					   element={
						   <UserCabinet header={{title: 'Кабинет пользователя', isFluid: false}}/>}/>
				<Route path="moderator-cabinet"
					   element={
						   <ModeratorCabinet header={{title: 'Кабинет модератора', isFluid: false}}/>}/>
				<Route path="moderator-cabinet/management-theme"
					   element={
						   <ModeratorManagementThem header={{title: 'Кабинет модератора', isFluid: true}}/>}/>
				<Route path="/moderator-cabinet/create-question"
					   element={
						   <ModeratorCreateQuestion header={{title: 'Кабинет модератора', isFluid: true}}/>}>
				</Route>
			</Routes>
		</BrowserRouter>
	);
}