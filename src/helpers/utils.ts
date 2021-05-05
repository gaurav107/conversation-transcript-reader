export const formatDuration = (seconds: number) => {
	const res = new Date(seconds * 1000).toISOString().substr(11, 8)
	const splitTimeString = res.split(':')
	if (parseInt(splitTimeString[0]) > 0) return res
	splitTimeString.shift()
	return splitTimeString.join(':')
}
