import React from 'react';
import { Container } from 'reactstrap';

function Header({ title, isFluid }) {
	return (
		<Container fluid={isFluid}
							 className="shadow_element bg-light border border-2 rounded-3 p-3 mb-4">
			<h1 className="fs-1 text-primary text-center">{title}</h1>
		</Container>
	);
}

export default Header;
