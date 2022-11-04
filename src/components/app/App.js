import { createBrowserRouter } from 'react-router-dom';

import SelectRole from '../select-role/SelectRole';
import UserCabinet from '../user/UserCabinet';
import Testing from '../testing/testing/Testing';
import ErrorPage from '../error/ErrorPage';
import TestsList from '../testing/tests-list/TestsList';
import Authorization from '../authorization/Authorization';
import ModeratorEditTest
	from '../moderator/moderator-cabinet/moderator-edit-test/ModeratorEditTest';
import ModeratorCabinet
	from '../moderator/moderator-cabinet/ModeratorCabinet';
import ModeratorManagementThem
	from '../moderator/moderator-management-them/ModeratorManagementThem';
import ModeratorCreateQuestion
	from '../moderator/moderator-management-them/moderator-create-question/ModeratorCreateQuestion';
import Registration from '../registration/Registration';

export const router = createBrowserRouter([
	{
		path: '/',
		element: <Authorization/>,
		errorElement: <ErrorPage/>
	},
	{
		path: '/registration',
		element: <Registration/>,
	},
	{
		path: '/select-role',
		element: <SelectRole/>,
	},
	{
		path: '/moderator',
		element: <ModeratorCabinet header={{
			title: 'Кабинет модератора',
			isFluid: false
		}}/>,
	},
	{
		path: 'moderator/edit-test/:testSettingsId',
		element: <ModeratorEditTest/>
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
		path: '/testing/:testId',
		element: <Testing header={{
			title: 'Тестирование',
			isFluid: true,
		}}/>
	}
]);