import React from 'react';
import { Button } from 'reactstrap';

export default function NavButton({ text, icon, handler, isActive }) {
	return (
		<Button
			onClick={handler}
			color="light"
			className={`${isActive ? 'bg-transparent border-0' : ' opacity-75'} 
			text-primary text-start border border-2 border-top-0 w-50`}>
			{icon}
			<span className="p-1">{text}</span>
		</Button>
	);
}