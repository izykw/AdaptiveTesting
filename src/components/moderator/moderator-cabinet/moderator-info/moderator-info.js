import React from 'react';
import {Link} from 'react-router-dom';
import {Row} from 'reactstrap';
import PersonalInfo
	from '../../../second-components/personal-info/personal-info';
import usePersonInfo from '../../../../hooks/use-person-info/use-person-info';

export default function ModeratorInfo() {
	const [info, setInfo] = usePersonInfo(1);
	return (
		<>
			<PersonalInfo info={info} updateInfo={setInfo}/>
			<Row className="d-flex justify-content-center">
				<div className="d-flex flex-column w-75">
					<Link to="/moderator/management-theme"
						  className="btn bg-transparent border border-2 mb-2">
						Редактирование темы
					</Link>
					<Link to="/moderator/tests-list"
						  className="btn bg-transparent border border-2 my-2">
						Список тестов
					</Link>
					<Link to="/"
						  className="btn bg-transparent border border-2 mt-2">
						Выход
					</Link>
				</div>
			</Row>
		</>
	);
}