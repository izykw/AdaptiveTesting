import React from 'react';
import { Button } from 'reactstrap';

export default function LightButton({
	text,
	handler = null,
	type = 'button',
	width = '',
	isShadow = false,
}) {

	return (
		<Button type={type}
						color="light"
						className={`${isShadow && 'shadow_element'} 
						bg-transparent btn text-dark border border-2 w-${width}`}
						onClick={handler}>
			{text}
		</Button>
	);

}