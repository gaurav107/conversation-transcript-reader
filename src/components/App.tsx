import React, { FC, useCallback, useRef } from 'react'
import '../styles/App.css'
import Header from './Header'
import AudioPlayer from './AudioPlayer'
import { ReduxState } from '../store/types'
import * as actions from '../store/actions'
import { connect, ConnectedProps } from 'react-redux'

const App: FC<ConnectedProps<typeof connector>> = ({
	recording,
	currentTime,
	isPlaying,
	duration,
	setDuration,
	updateCurrentTime,
	play,
	pause,
}) => {
	const playerRef = useRef<AudioPlayer>(null)
	const handlePlayPause = useCallback(() => {
		isPlaying ? pause() : play()
		playerRef.current?.playPause()
	}, [isPlaying, play, pause])
	const handleSeek = useCallback((seconds) => {
		playerRef.current?.seekBy(seconds)
	}, [])
	return (
		<div>
			<Header
				currentTime={currentTime}
				isPlaying={isPlaying}
				duration={duration}
				seekBy={handleSeek}
				handlePlayPause={handlePlayPause}
			/>
			<AudioPlayer
				audio={recording}
				setDuration={setDuration}
				updateCurrentTime={updateCurrentTime}
				ref={playerRef}
			/>
		</div>
	)
}

const mapStateToProps = (state: ReduxState) => state

const connector = connect(mapStateToProps, actions)

export default connector(App)
