import React, { Component, createRef, RefObject } from 'react'

type Props = {
	audio: any
	onEnded: () => void
	setDuration: (duration: number) => void
	updateCurrentTime: (time: number) => void
}

class AudioPlayer extends Component<Props> {
	audioRef: RefObject<HTMLAudioElement>
	interval: NodeJS.Timeout
	duration: number

	constructor(props) {
		super(props)
		this.audioRef = createRef<HTMLAudioElement>()
	}

	componentDidMount() {
		this.audioRef.current.addEventListener('loadedmetadata', this.handleDuration)
	}

	componentWillUnmount() {
		const { current } = this.audioRef
		current && current.removeEventListener('loadedmetadata', this.handleDuration)
		this.interval && clearInterval(this.interval)
	}

	handleDuration = () => {
		this.duration = this.audioRef.current?.duration
		this.props.setDuration(this.duration)
	}

	playPause = () => {
		const { current } = this.audioRef
		if (!current) return
		current.paused ? current.play() : current.pause()
	}

	seekBy = (seconds: number) => {
		const { current } = this.audioRef
		let targetTime = current.currentTime + seconds
		if (targetTime <= 0) targetTime = 0
		else if (targetTime >= this.duration) targetTime = this.duration
		else current.currentTime = targetTime
		this.props.updateCurrentTime(current.currentTime)
	}

	seekTo = (seconds: number) => {
		const { current } = this.audioRef
		current.currentTime = seconds
		this.props.updateCurrentTime(current.currentTime)
	}

	updatePlaybackRate = (rate: number) => {
		this.audioRef.current.playbackRate = rate
	}

	updateCurrentTime = () => {
		const { current } = this.audioRef
		if (!current) return
		if (current.paused && this.interval) clearInterval(this.interval)
		else this.interval = setInterval(() => this.props.updateCurrentTime(current.currentTime), 100)
	}

	render() {
		return (
			<audio
				ref={this.audioRef}
				onPlay={this.updateCurrentTime}
				onPause={this.updateCurrentTime}
				onEnded={this.props.onEnded}
			>
				<source src={this.props.audio} />
			</audio>
		)
	}
}

export default AudioPlayer
