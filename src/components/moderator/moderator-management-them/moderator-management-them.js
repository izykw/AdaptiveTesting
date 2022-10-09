import React, {useState} from 'react';
import {Container, Row} from 'reactstrap';
import WrapperFluid from '../../second-components/wrapper-fluid/wrapper-fluid';
import Header from '../../header/header';
import ModeratorEditTheme from './moderator-edit-theme/moderator-edit-theme';
import NavButton from '../../second-components/nav-button/nav-button';
import ModeratorAddQuestion
	from './moderator-add-question/moderator-add-question';
import SvgIcons from '../../second-components/svg-icons/svg-icons';

import styles from './moderator-management-them.module.css';

const {text_field} = styles;

export default function ModeratorManagementThem({header: {title, isFluid}}) {
	const [activeBtn, setActiveBtn] = useState('edit');

	const isEditActive = activeBtn === 'edit';
	return (
		<WrapperFluid>
			<Header title={title} isFluid={isFluid}/>
			<Container fluid
					   className="d-flex flex-column justify-content-between flex-grow-1 bg-light border border-2 rounded-3">
				<Row className="mb-xxl-0 mb-4">
					<NavButton text="Добавление вопросов в тему"
							   icon={<SvgIcons id="bookmark-dash" color="primary" size="24"/>}
							   handler={() => setActiveBtn('edit')}
							   isActive={isEditActive}/>
					<NavButton text="Добавление темы в компетенцию"
							   icon={<SvgIcons id="file-plus" color="primary" size="24"/>}
							   handler={() => setActiveBtn('add')}
							   isActive={!isEditActive}/>
				</Row>
				{isEditActive ? <ModeratorEditTheme/> : <ModeratorAddQuestion/>}
				<Row className="mx-0 mb-4 mt-2">
						<textarea
							id="full-text-question"
							className={`${text_field} border border-secondary rounded-3 p-2`}
							placeholder="Кликните на вопрос, чтобы увидеть его полностью"
							disabled
						/>
				</Row>
			</Container>
		</WrapperFluid>
	);
}