import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Container, Row } from 'reactstrap';
import Wrapper from '../second-components/wrapper/Wrapper';
import Header from '../header/Header';
import UserInfo from './user-info/UserInfo';
import TestInfo from './test-info/TestInfo';
import NavButton from '../second-components/nav-button/NavButton';
import SvgIcons from '../second-components/svg-icons/SvgIcons';

export default function UserCabinet({header: {title, isFluid}}) {
	const [activeBtn, setActiveBtn] = useState('user-info');

	const isUserInfoActive = activeBtn === 'user-info';

	const userIcon = <SvgIcons id="person" color="primary" size="20"/>;
	const infoIcon = <SvgIcons id="bookmark-two-dash" color="primary" size="20"/>;

	return (
		<Wrapper>
			<Header title={title} isFluid={isFluid}></Header>
			<Container
				className="shadow_element bg-light border border-2 rounded-3 flex-grow-1">
				<Row>
					<NavButton text="Личная информация"
										 icon={userIcon}
										 handler={() => setActiveBtn('user-info')}
										 isActive={isUserInfoActive}/>
					<NavButton text="Сведения о тестах"
										 icon={infoIcon}
										 handler={() => setActiveBtn('test-info')}
										 isActive={!isUserInfoActive}/>
				</Row>
				{isUserInfoActive ? <UserInfo/> : <TestInfo/>}
				<Row className="d-flex justify-content-center mt-5">
					<div className="d-flex flex-column w-75">
						<Link to="/user/tests-info" className="btn bg-transparent border border-2 mb-3">
							Результаты тестирования компетенций
						</Link>
						<Link to="/user/test-list"
									className="btn bg-transparent border border-2 mb-3">
							Список тестов
						</Link>
						<Link to="/"
									className="btn bg-transparent border border-2">
							Выход
						</Link>
					</div>
				</Row>
			</Container>
		</Wrapper>
	);
}