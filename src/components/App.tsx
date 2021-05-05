import React, { FC, useCallback, useRef } from 'react'
import '../styles/App.css'
import * as actions from '../store/actions'
import { connect, ConnectedProps } from 'react-redux'
import Header from './Header'
import AudioPlayer from './AudioPlayer'
import TimeIndicator from './TimeIndicator'
import TranscriptList from './TranscriptList'
import { ReduxState } from '../store/types'
import styled from 'styled-components'

const BodyContainer = styled.div`
	padding: 0 16px;
`

const App: FC<ConnectedProps<typeof connector>> = ({
	recording,
	transcript,
	currentTime,
	isPlaying,
	duration,
	setDuration,
	updateCurrentTime,
	play,
	pause,
	stop,
}) => {
	const playerRef = useRef<AudioPlayer>(null)
	const handlePlayPause = useCallback(() => {
		playerRef.current?.playPause()
		isPlaying ? pause() : play()
	}, [isPlaying, play, pause])
	const handleSeekBy = useCallback((seconds) => {
		playerRef.current?.seekBy(seconds)
	}, [])
	const handleSeekTo = useCallback((seconds) => {
		playerRef.current?.seekTo(seconds)
	}, [])
	return (
		<div>
			<Header
				currentTime={currentTime}
				isPlaying={isPlaying}
				duration={duration}
				seekBy={handleSeekBy}
				handlePlayPause={handlePlayPause}
			/>
			<AudioPlayer
				audio={recording}
				setDuration={setDuration}
				updateCurrentTime={updateCurrentTime}
				onEnded={stop}
				ref={playerRef}
			/>
			<BodyContainer>
				<TimeIndicator currentTime={currentTime} duration={duration} />
				<TranscriptList transcript={transcript} currentTime={currentTime} seekTo={handleSeekTo} />
			</BodyContainer>
		</div>
	)
}

const mapStateToProps = (state: ReduxState) => state

const connector = connect(mapStateToProps, actions)

export default connector(App)
