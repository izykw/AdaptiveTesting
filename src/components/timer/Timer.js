import React, { useEffect, useState } from 'react';
import { getTimeRemaining } from './timer.services';
import { Row } from 'reactstrap';
import SvgIcons from '../second-components/svg-icons/SvgIcons';

// Time comes in seconds
export default function Timer({ duration }) {
	const [time, setTime] = useState(duration);

	useEffect(() => {
		const timerId = setInterval(() => {
			if (time > 0) {
				setTime(time - 1);
			}
		}, 1000);
		return () => clearInterval(timerId);
	});

	const { seconds, minutes, hours } = getTimeRemaining(time);
	const progressFill = (100 - (100 * time) / duration);

	return (
		<div className="progress p-0"
				 style={{ height: '2rem' }}>
			<div className="progress-bar bg-primary p-0"
					 style={{
						 background: 'linear-gradient(90deg, #ACBAE6 99.89%, rgba(128, 255, 138, 0) 100%',
						 width: `${progressFill}%`
					 }}
					 role="progressbar">
			</div>
			<div className="position-absolute fs-5 pe-3" style={{ right: '0' }}>
				<SvgIcons id="clock" size="20" color="primary"/>
				<span className="text-primary">{`${hours}:${minutes}:${seconds}`}</span>
			</div>
		</div>
	);
}