import { createBrowserRouter } from 'react-router-dom';

import SelectRole from '../../components/select-role/select-role';
import UserCabinet from '../../components/user/user-cabinet';
import ModeratorCabinet
	from '../../components/moderator/moderator-cabinet/moderator-cabinet';
import ModeratorManagementThem
	from '../../components/moderator/moderator-management-them/moderator-management-them';
import ModeratorCreateQuestion
	from '../../components/moderator/moderator-management-them/moderator-create-question/moderator-create-question';
import ErrorPage from '../error/ErrorPage';
import TestsList from '../testing/tests-list/tests-list';

import {
	action as actionCreateQuestion
} from '../../components/moderator/moderator-management-them/moderator-create-question/moderator-create-question';

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
		}}/>
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
		action: actionCreateQuestion,
	},
	{
		path: '/:role/tests-list',
		element: <TestsList header={{
			title: 'Выбор теста',
			isFluid: true
		}}/>
	}
]);