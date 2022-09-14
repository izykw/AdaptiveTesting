import React, {useState} from 'react';
import {Input, ListGroup, ListGroupItem, Row} from 'reactstrap';
import PhoneInput from 'react-phone-number-input/input';
import SvgIcons from '../svg-icons/svg-icons';

export default function PersonalInfo({info, updateInfo}) {
	const [isEdit, setIsEdit] = useState(false);

	const onClick = (e) => {
		e.preventDefault();
		if (isEdit !== false) {
			e.target.textContent = 'Редактировать данные';
		} else {
			e.target.textContent = 'Отправить данные';
		}
		setIsEdit((prevState) => !prevState);
	};

	let {user, current_level, phone_number, post, address} = info;
	return (<Row className="mb-md-5 mb-sm-3">
		<h4 className="my-2 fs-2">
			{createInput({
				value: user?.first_name ?? '',
				handler: (e) => updateInfo(
					{user: {...user, first_name: e.target.value}}),
				isEdit
			})}
			{createInput({
				value: user?.last_name ?? '',
				handler: (e) => updateInfo(
					{user: {...user, last_name: e.target.value}}),
				isEdit
			})}
		</h4>
		<ListGroup className="fs-5">
			<ListGroupItem className="bg-transparent border-0">
				<SvgIcons id="arrow-right" size="20"/>
				<span className="ms-1">Должность:</span>
				{createInput({
					value: post,
					handler: (e) => updateInfo({post: e.target.value}),
					isEdit
				})}
			</ListGroupItem>
			<ListGroupItem className="bg-transparent border-0">
				<SvgIcons id="arrow-right" size="20"/>
				<span className="ms-1">Текущий уровень:</span>
				{createInput({
					value: current_level ?? '',
					handler: (e) => updateInfo(
						{current_level: e.target.value}),
					isEdit
				})}
			</ListGroupItem>
			<ListGroupItem className="bg-transparent border-0">
				<SvgIcons id="arrow-right" size="20"/>
				<span className="ms-1">Электронная почта:</span>
				{createInput({
					value: user?.email ?? '',
					handler: (e) => updateInfo(
						{user: {...user, email: e.target.value}}),
					isEdit
				})}
			</ListGroupItem>
			<ListGroupItem className="bg-transparent border-0">
				<SvgIcons id="arrow-right" size="20"/>
				<span className="ms-1">Номер телефона:</span>
				<PhoneInput
					className="d-inline-block bg-transparent border-0 w-25 form-control"
					style={{fontSize: 'inherit'}}
					country="RU"
					international
					withCountryCallingCode
					value={phone_number ?? ''}
					onChange={(e) => updateInfo({phone_number: e})}
					disabled={!isEdit}
					placeholder="Неизвестно"/>
			</ListGroupItem>
			<ListGroupItem className="bg-transparent border-0">
				<SvgIcons id="arrow-right" size="20"/>
				<span className="ms-1">Адрес:</span>
				{createInput({
					value: address ?? '',
					handler: (e) => updateInfo({address: e.target.value}),
					isEdit
				})}
			</ListGroupItem>
		</ListGroup>
		<a href="/"
		   onClick={onClick}
		   className="link-secondary w-50 ms-2">
			<SvgIcons id="pencil" size="20"/>
			<span>Редактировать данные</span>
		</a>
		<a href="/"
		   style={{display: isEdit ? 'inline' : 'none'}}
		   className="link-secondary w-25">
			<span>Отменить изменения</span>
		</a>
	</Row>);
}

function createInput({value, handler, isEdit}) {
	return (
		<Input
			onChange={handler}
			value={value ?? ''}
			placeholder="Неизвестно"
			style={{fontSize: 'inherit'}}
			className="d-inline-block bg-transparent border-0 w-25"
			disabled={!isEdit}
		/>);
}