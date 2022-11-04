import React from 'react';
import Header from '../../../header/Header';
import WrapperFluid
	from '../../../second-components/wrapper-fluid/WrapperFluid';
import { Container } from 'reactstrap';
import ModeratorCreateQuestion
	from '../moderator-create-question/ModeratorCreateQuestion';

export default function ModeratorEditQuestion({ header: { title, isFluid } }) {
	return (
		<WrapperFluid>
			<Header title={title} isFluid={isFluid}></Header>
			<Container fluid
								 className="d-flex flex-column justify-content-start flex-grow-1 bg-light border border-2 rounded-3">
				<ModeratorCreateQuestion/>
			</Container>
		</WrapperFluid>
	);
}