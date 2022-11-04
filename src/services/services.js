// time = seconds
import React from 'react';

export function convertToCorrectTime(time) {
	const hours = `${Math.floor(((time / 3600) % 24) / 10)}${Math.floor(
		((time / 3600) % 24) % 10)}`;
	const minutes = `${Math.floor(((time / 60) % 60) / 10)}${Math.floor(
		((time / 60) % 60) % 10)}`;
	const seconds = `${Math.floor((time % 60) / 10)}${Math.floor(
		(time % 60) % 10)}`;

	return `${hours}:${minutes}:${seconds}`;
}

export function convertTimeToSeconds(time) {
	if (!time) {
		return 0;
	}
	const temp = time.split(':');
	return Math.floor((temp[0] * 3600)) + Math.floor(temp[1] * 60) +
		Number.parseInt(temp[2]);
}

export function errorMessage(message) {
	return <span className="text-danger ms-2 fs-6">{message}</span>
}