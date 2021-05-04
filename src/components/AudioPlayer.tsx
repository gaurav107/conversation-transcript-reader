import React, { Component, createRef, RefObject } from 'react'

type Props = {
	audio: any
	setDuration: (duration: number) => void
	updateCurrentTime: (time: number) => void
}

class AudioPlayer extends Component<Props> {
	audioRef: RefObject<HTMLAudioElement>
	interval: NodeJS.Timeout

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

	handleDuration = () => this.props.setDuration(this.audioRef.current?.duration)

	playPause = () => {
		const { current } = this.audioRef
		if (!current) return
		current.paused ? current.play() : current.pause()
	}

	seekBy = (seconds: number) => {
		const { current } = this.audioRef
		current.currentTime += seconds
	}

	updateCurrentTime = () => {
		const { current } = this.audioRef
		if (!current) return
		if (current.paused && this.interval) clearInterval(this.interval)
		else this.interval = setInterval(() => this.props.updateCurrentTime(current.currentTime), 100)
	}

	render() {
		return (
			<audio ref={this.audioRef} onPlay={this.updateCurrentTime} onPause={this.updateCurrentTime}>
				<source src={this.props.audio} />
			</audio>
		)
	}
}

export default AudioPlayer
