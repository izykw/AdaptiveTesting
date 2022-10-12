import React from 'react';
import {Button} from 'reactstrap';

export default function LightButton({text, handler, type = 'button'}) {
	return (
		<Button type={type}
				color="light"
				className="shadow_element bg-transparent btn text-dark border border-2"
				onClick={handler}>
			{text}
		</Button>
	)
}