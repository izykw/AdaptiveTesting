import React, {useState} from 'react';
import {Container, Row} from 'reactstrap';
import Wrapper from '../../second-components/wrapper/wrapper';
import Header from '../../header/header';
import ModeratorInfo from './moderator-info/moderator-info';
import ModeratorCreateTest from './moderator-create-test/moderator-create-test';
import NavButton from '../../second-components/nav-button/nav-button';
import SvgIcons from '../../second-components/svg-icons/svg-icons';


export default function ModeratorCabinet({header: {title, isFluid}}) {
	const [activeBtn, setActiveBtn] = useState('moderator-info');

	const isModeratorInfoActive = activeBtn === 'moderator-info';
	return (
		<Wrapper>
			<Header title={title} isFluid={isFluid}></Header>
			<Container
				className="shadow_element flex-grow-1 bg-light border border-2 rounded-3">
				<Row>
					<NavButton handler={() => setActiveBtn('moderator-info')}
							   text="Личная информация"
							   icon={<SvgIcons id="person"
											   color="primary"
											   size="20"/>}
							   isActive={isModeratorInfoActive}/>
					<NavButton handler={() => setActiveBtn('create-test')}
							   text="Создание теста"
							   icon={<SvgIcons id="gear"
											   color="primary"
											   size="20"/>}
							   isActive={!isModeratorInfoActive}/>
				</Row>
				{isModeratorInfoActive
					? <ModeratorInfo/>
					: <ModeratorCreateTest/>}
			</Container>
		</Wrapper>
	);
}