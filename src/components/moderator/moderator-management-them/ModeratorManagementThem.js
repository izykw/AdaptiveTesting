import React, { useState } from 'react';
import { Container, Row } from 'reactstrap';
import WrapperFluid from '../../second-components/wrapper-fluid/WrapperFluid';
import Header from '../../header/Header';
import NavButton from '../../second-components/nav-button/NavButton';
import ModeratorEdit
	from './moderator-edit/ModeratorEdit';
import ModeratorCreateQuestion
	from './moderator-create-question/ModeratorCreateQuestion';
import SvgIcons from '../../second-components/svg-icons/SvgIcons';


export default function ModeratorManagementThem({ header }) {
	const [activeBtn, setActiveBtn] = useState('competencies');

	const isCompetencies = activeBtn === 'competencies';
	const { title, isFluid } = header;
	return (
		<WrapperFluid>
			<Header title={title} isFluid={isFluid}/>
			<Container fluid
								 className="d-flex flex-column justify-content-start flex-grow-1 bg-light border border-2 rounded-3">
				<Row className="mb-5">
					<NavButton text="Редактирование"
										 icon={<SvgIcons id="bookmark-dash"
																		 color="primary"
																		 size="24"/>}
										 handler={() => setActiveBtn('competencies')}
										 isActive={isCompetencies}/>
					<NavButton text="Создание вопроса"
										 icon={<SvgIcons id="bookmark-two-dash"
																		 color="primary"
																		 size="22"/>}
										 handler={() => setActiveBtn('themes')}
										 isActive={!isCompetencies}/>
				</Row>
				{isCompetencies
					? <ModeratorEdit/>
					: <ModeratorCreateQuestion/>}
			</Container>
		</WrapperFluid>
	);
}