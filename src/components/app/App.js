import { createBrowserRouter } from 'react-router-dom';

import SelectRole from '../select-role/SelectRole';
import UserCabinet from '../user/UserCabinet';
import ModeratorCabinet
	from '../moderator/moderator-cabinet/ModeratorCabinet';
import ModeratorManagementThem
	from '../moderator/moderator-management-them/ModeratorManagementThem';
import ModeratorCreateQuestion
	from '../moderator/moderator-management-them/moderator-create-question/ModeratorCreateQuestion';
import Testing from '../testing/testing/Testing';
import ErrorPage from '../error/ErrorPage';
import TestsList from '../testing/tests-list/TestsList';

export const router = createBrowserRouter([
	{
		path: '/',
		element: <SelectRole/>,
		errorElement: <ErrorPage/>
	},
	{
		path: '/moderator',
		element: <ModeratorCabinet header={{
			title: 'Кабинет модератора',
			isFluid: false
		}}/>,
	},
	{
		path: '/user',
		element: <UserCabinet header={{
			title: 'Кабинет пользователя',
			isFluid: false
		}}/>
	},
	{
		path: '/moderator/management-theme',
		element: <ModeratorManagementThem header={{
			title: 'Кабинет модератора',
			isFluid: true
		}}/>
	},
	{
		path: '/moderator/create-question',
		element: <ModeratorCreateQuestion header={{
			title: 'Кабинет модератора',
			isFluid: true
		}}/>,
	},
	{
		path: '/:role/tests-list',
		element: <TestsList header={{
			title: 'Выбор теста',
			isFluid: true
		}}/>
	},
	{
		path: '/testing',
		element: <Testing header={{
			title: 'Тестирование',
			isFluid: true,
		}}/>
	}
]);