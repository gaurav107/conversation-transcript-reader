export const formatDuration = (seconds: number) => {
	if (Math.floor(seconds) === 0) return '0'
	const res = new Date(seconds * 1000).toISOString().substr(11, 8)
	return res
		.split(':')
		.filter((item) => parseInt(item) > 0)
		.join(':')
}
