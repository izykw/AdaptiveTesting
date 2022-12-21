import React, { useState, useRef } from 'react';
import { ListGroup, ListGroupItem, Row } from 'reactstrap';
import PhoneInput from 'react-phone-number-input/input';
import SvgIcons from '../svg-icons/SvgIcons';
import TestingApi from '../../../services/testingApi';
import { ListItemInput } from './ListItemInput';
import { isObjectEmpty } from './personalInfo.service';
import { deepEqual, linkChangeTextContent } from './personalInfo.service';
import { getToken } from '../../../services/getToken';

export default function PersonalInfo({ info, updateInfo }) {
	const [isEdit, setIsEdit] = useState(false);
	const initInfo = useRef({});

	if (isObjectEmpty(initInfo.current) && !isObjectEmpty(info)) {
		initInfo.current = JSON.parse(JSON.stringify(info));
	}

	const postNewInfo = () => {
		if (deepEqual(initInfo.current, info)) return;
		const api = new TestingApi();
		const requestData = JSON.parse(JSON.stringify(info));
		delete requestData['current_level'];
		try {
			const token = getToken();
			api.updateUser(requestData, token)
				.then(() => initInfo.current = {})
				.catch(e => console.error(e.message));
		} catch (e) {
			console.error(e.message);
		}
	};

	const editInfo = (e) => {
		e.preventDefault();
		linkChangeTextContent(isEdit);
		postNewInfo();
		setIsEdit((prevState) => !prevState);
	};

	const undoEdit = (e) => {
		e.preventDefault();
		linkChangeTextContent(isEdit);
		updateInfo(initInfo.current);
		setIsEdit((prevState) => !prevState);
	};

	const {
		email,
		first_name,
		last_name,
		current_level,
		phone_number,
		post,
		address
	} = info;

	return (<Row className="mb-md-5 mb-sm-3">
		<h4 className="my-2 fs-2">
			<ListItemInput width="25"
				value={first_name}
										 handler={(e) => updateInfo({ first_name: e.target.value })}
										 isEdit={isEdit}/>
			<ListItemInput width="25"
				value={last_name}
										 handler={(e) => updateInfo({ last_name: e.target.value })}
										 isEdit={isEdit}/>
		</h4>
		<ListGroup className="fs-5">
			<ListGroupItem className="bg-transparent border-0">
				<SvgIcons id="arrow-right" size="20"/>
				<span className="ms-1">Должность:</span>
				<ListItemInput value={post}
											 handler={(e) => updateInfo({ post: e.target.value })}
											 isEdit={isEdit}/>
			</ListGroupItem>
			<ListGroupItem className="bg-transparent border-0">
				<SvgIcons id="arrow-right" size="20"/>
				<span className="ms-1">Текущий уровень:</span>
				<ListItemInput value={current_level}/>
			</ListGroupItem>
			<ListGroupItem className="bg-transparent border-0">
				<SvgIcons id="arrow-right" size="20"/>
				<span className="ms-1">Электронная почта:</span>
				<ListItemInput
					value={email}
					handler={(e) => updateInfo({ email: e.target.value })}
					isEdit={isEdit}/>
			</ListGroupItem>
			<ListGroupItem className="bg-transparent border-0">
				<SvgIcons id="arrow-right" size="20"/>
				<span className="ms-1">Номер телефона:</span>
				<PhoneInput
					className="d-inline-block bg-transparent border-0 w-25 form-control text-primary"
					style={{ fontSize: 'inherit' }}
					country="RU"
					international
					withCountryCallingCode
					value={phone_number}
					onChange={(e) => {
						updateInfo({ phone_number: e });
					}}
					disabled={!isEdit}
					placeholder="Неизвестно"/>
			</ListGroupItem>
			<ListGroupItem className="bg-transparent border-0">
				<SvgIcons id="arrow-right" size="20"/>
				<span className="ms-1">Адрес:</span>
				<ListItemInput
					value={address}
					handler={(e) => updateInfo({ address: e.target.value })}
					isEdit={isEdit}/>
			</ListGroupItem>
		</ListGroup>
		<a
			id="edit-data"
			href="/"
			onClick={editInfo}
			className="link-secondary w-50 ms-2">
			<SvgIcons id="pencil" size="20"/>
			<span>Редактировать данные</span>
		</a>
		<a href="/"
			 style={{ display: isEdit ? 'inline' : 'none' }}
			 className="link-secondary w-25"
			 onClick={undoEdit}>
			<span>Отменить изменения</span>
		</a>
	</Row>);
};