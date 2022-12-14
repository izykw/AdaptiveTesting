import React from 'react';
import { HandySvg } from 'handy-svg';
import oneStar from '../../../icons/one-star.svg';
import twoStar from '../../../icons/two-star.svg';
import threeStar from '../../../icons/three-star.svg';
import arrowRight from '../../../icons/arrow-right-square.svg';
import bookmarkDash from '../../../icons/bookmark-dash.svg';
import bookmarkTwoDash from '../../../icons/bookmark-two-dash.svg';
import clock from '../../../icons/clock.svg';
import pencil from '../../../icons/pencil.svg';
import cancel from '../../../icons/x-square.svg';
import gear from '../../../icons/gear.svg';
import fileText from '../../../icons/file-earmark-text.svg';
import filePlus from '../../../icons/file-earmark-plus.svg';
import person from '../../../icons/person-circle.svg';
import timeCircle from '../../../icons/time-circle.svg';
import arrowLeft from '../../../icons/arrow-left.svg';

export default function SvgIcons({ id, color, size }) {
	const colors = {
		primary: '#3D5499FF',
		secondary: '#6c757d'
	};

	switch (id) {
		case '1-star': {
			return <HandySvg src={oneStar}
											 width={size}
											 height="24"
											 fill={colors[color]}/>;
		}
		case '2-star': {
			return <HandySvg src={twoStar}
											 width={size}
											 height="24"
											 fill={colors[color]}/>;
		}
		case '3-star': {
			return <HandySvg src={threeStar}
											 width={size}
											 height="24"
											 fill={colors[color]}/>;
		}
		case 'arrow-right': {
			return <HandySvg src={arrowRight}
											 width={size}
											 height={size}
											 fill={colors[color]}/>;
		}
		case 'bookmark-dash': {
			return <HandySvg src={bookmarkDash}
											 width={size}
											 height={size}
											 fill={colors[color]}/>;
		}
		case 'bookmark-two-dash': {
			return <HandySvg src={bookmarkTwoDash}
											 width={size}
											 height={size}
											 fill={colors[color]}/>;
		}
		case 'clock': {
			return <HandySvg src={clock}
											 width={size}
											 height={size}
											 fill={colors[color]}/>;
		}
		case 'pencil': {
			return <HandySvg src={pencil}
											 width={size}
											 height={size}
											 fill={colors[color]}/>;
		}
		case 'cancel': {
			return <HandySvg src={cancel}
											 width={size}
											 height={size}
											 fill={colors[color]}/>;
		}
		case 'gear': {
			return <HandySvg src={gear}
											 width={size}
											 height={size}
											 fill={colors[color]}
											 className="text-dark"/>;
		}
		case 'file-text': {
			return <HandySvg src={fileText}
											 width={size}
											 height={size}
											 fill={colors[color]}/>;
		}
		case 'file-plus': {
			return <HandySvg src={filePlus}
											 width={size}
											 height={size}
											 fill={colors[color]}/>;
		}
		case 'person': {
			return <HandySvg src={person}
											 width={size}
											 height={size}
											 fill={colors[color]}/>;
		}
		case 'time-circle': {
			return <HandySvg src={timeCircle}
											 width={size}
											 height={size}
											 fill={colors[color]}/>;
		}
		case 'arrow-left': {
			return <HandySvg src={arrowLeft}
											 width={size}
											 height={size}
											 fill={colors[color]}/>;
		}
		default: {
			return null;
		}
	}
}