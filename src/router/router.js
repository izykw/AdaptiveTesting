import { createBrowserRouter } from 'react-router-dom';
import Authorization from '../components/authorization/Authorization';
import ErrorPage from '../components/error/ErrorPage';
import Registration from '../components/registration/Registration';
import SelectRole from '../components/select-role/SelectRole';
import ModeratorCabinet
	from '../components/moderator/moderator-cabinet/ModeratorCabinet';
import ModeratorEditTest
	from '../components/moderator/moderator-cabinet/moderator-edit-test/ModeratorEditTest';
import UserCabinet from '../components/user/UserCabinet';
import ModeratorManagementThem
	from '../components/moderator/moderator-management-them/ModeratorManagementThem';
import ModeratorCreateQuestion
	from '../components/moderator/moderator-management-them/moderator-create-question/ModeratorCreateQuestion';
import ModeratorEditQuestion
	from '../components/moderator/moderator-management-them/moderator-edit-question/ModeratorEditQuestion';
import TestList from '../components/testing/test-list/TestList';
import Testing from '../components/testing/testing/Testing';
import TestsInfo from "../components/user/tests-info/TestsInfo";

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
		path: '/user/tests-info',
		element: <TestsInfo header={{
			title: 'Результаты тестирования компетенций',
			isFluid: true,
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
		path: '/moderator/edit-question/:questionId',
		element: <ModeratorEditQuestion header={{
			title: 'Редактирование вопроса',
			isFluid: true
		}}/>,
	},
	{
		path: '/:role/test-list',
		element: <TestList header={{
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