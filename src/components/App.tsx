import React, { FC, useCallback, useRef } from 'react'
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
	playbackRate,
	duration,
	setDuration,
	updateCurrentTime,
	setPlaybackRate,
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
	const handlePlaybackRate = useCallback(
		(rate) => {
			playerRef.current?.updatePlaybackRate(rate)
			setPlaybackRate(rate)
		},
		[setPlaybackRate]
	)
	return (
		<div>
			<Header
				isPlaying={isPlaying}
				seekBy={handleSeekBy}
				handlePlayPause={handlePlayPause}
				onPlaybackRateUpdate={handlePlaybackRate}
				playbackRate={playbackRate}
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
