import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, Container, Row } from 'reactstrap';
import Wrapper from '../second-components/wrapper/wrapper';
import Header from '../header/header';
import UserInfo from './user-info/user-info';
import TestInfo from './test-info/test-info';
import NavButton from '../second-components/nav-button/nav-button';
import SvgIcons from '../second-components/svg-icons/svg-icons';

export default function UserCabinet({header: {title, isFluid}}) {
	const [activeBtn, setActiveBtn] = useState('user-info');

	const isUserInfoActive = activeBtn === 'user-info';
	return (
		<Wrapper>
			<Header title={title} isFluid={isFluid}></Header>
			<Container
				className="shadow_element bg-light border border-2 rounded-3"
				style={{flexGrow: 1}}>
				<Row>
					<NavButton text="Личная информация"

										 handler={() => setActiveBtn('user-info')}
										 isActive={isUserInfoActive}/>
					<NavButton text="Сведения о тестах"

										 handler={() => setActiveBtn('test-info')}
										 isActive={!isUserInfoActive}/>
				</Row>
				{isUserInfoActive ? <UserInfo/> : <TestInfo/>}
				<Row className="d-flex justify-content-center mt-5">
					<div className="d-flex flex-column w-75">
						<Link to="/testing"
									className="btn bg-transparent border border-2 mb-2">Начать
							тестирование</Link>
						<Link to="/"
									className="btn bg-transparent border border-2 mt-2">Выход</Link>
					</div>
				</Row>
			</Container>
		</Wrapper>
	);
}