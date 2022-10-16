import React, { useState } from 'react';
import { Container, Row } from 'reactstrap';
import WrapperFluid from '../../second-components/wrapper-fluid/WrapperFluid';
import Header from '../../header/Header';
import ModeratorEditTheme from './moderator-edit-theme/ModeratorEditTheme';
import NavButton from '../../second-components/nav-button/NavButton';
import ModeratorAddQuestion
	from './moderator-add-question/ModeratorAddQuestion';
import SvgIcons from '../../second-components/svg-icons/SvgIcons';

import styles from './moderatorManagementThem.module.css';
import { Link } from 'react-router-dom';

const {text_field} = styles;

export default function ModeratorManagementThem({header: {title, isFluid}}) {
	const [activeBtn, setActiveBtn] = useState('competencies');

	const isCompetencies = activeBtn === 'competencies';
	return (
		<WrapperFluid>
			<Header title={title} isFluid={isFluid}/>
			<Container fluid
								 className="d-flex flex-column justify-content-between flex-grow-1 bg-light border border-2 rounded-3">
				<Row className="mb-xxl-0 mb-4">
					<NavButton text="Редактирование компетенций"
										 icon={<SvgIcons id="bookmark-dash"
																		 color="primary"
																		 size="24"/>}
										 handler={() => setActiveBtn('competencies')}
										 isActive={isCompetencies}/>
					<NavButton text="Редактирование тем"
										 icon={<SvgIcons id="file-plus" color="primary" size="24"/>}
										 handler={() => setActiveBtn('themes')}
										 isActive={!isCompetencies}/>
				</Row>
				{isCompetencies ? <ModeratorAddQuestion/> : <ModeratorEditTheme/>}
				<Row className="mx-0 mb-4 mt-2">
					<textarea
						id="full-text-question"
						className={`${text_field} border border-secondary rounded-3 p-2 w-100`}
						placeholder="Кликните на вопрос, чтобы увидеть его полностью"
						disabled
					/>
				</Row>
			</Container>
		</WrapperFluid>
	);
}