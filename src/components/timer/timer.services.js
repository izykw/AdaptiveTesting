export function getTimeRemaining(endtime) {
	const seconds = Math.floor(endtime) % 60;
	const minutes = Math.floor((endtime / 60) % 60);
	const hours = Math.floor(endtime / 3600) % 24;

	return {
		seconds: `${Math.floor(seconds / 10)}${Math.floor(seconds % 10)}`,
		minutes: `${Math.floor(minutes / 10)}${Math.floor(minutes % 10)}`,
		hours: `${Math.floor(hours / 10)}${Math.floor(hours % 10)}`,
	};
}