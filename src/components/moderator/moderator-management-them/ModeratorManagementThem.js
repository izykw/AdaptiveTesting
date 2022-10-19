import React, { useState } from 'react';
import { Container, Row } from 'reactstrap';
import WrapperFluid from '../../second-components/wrapper-fluid/WrapperFluid';
import Header from '../../header/Header';
import ModeratorEditTheme from './moderator-edit-theme/ModeratorEditTheme';
import NavButton from '../../second-components/nav-button/NavButton';
import ModeratorEditCompetence
	from './moderator-edit-competence/ModeratorEditCompetence';
import SvgIcons from '../../second-components/svg-icons/SvgIcons';


export default function ModeratorManagementThem({header: {title, isFluid}}) {
	const [activeBtn, setActiveBtn] = useState('competencies');

	const isCompetencies = activeBtn === 'competencies';
	return (
		<WrapperFluid>
			<Header title={title} isFluid={isFluid}/>
			<Container fluid
								 className="d-flex flex-column justify-content-start flex-grow-1 bg-light border border-2 rounded-3">
				<Row className="mb-5">
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
				{isCompetencies ? <ModeratorEditCompetence/> : <ModeratorEditTheme/>}
			</Container>
		</WrapperFluid>
	);
}