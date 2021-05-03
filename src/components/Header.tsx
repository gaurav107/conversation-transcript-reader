import React, { useEffect, useRef, useState } from 'react'
import { ReactComponent as Play } from '../assets/icons/play.svg'
import { ReactComponent as Pause } from '../assets/icons/pause.svg'
import { ReactComponent as Forward } from '../assets/icons/forward.svg'
import ShareIcon from '../assets/icons/share.svg'
import { ReactComponent as Rewind } from '../assets/icons/rewind.svg'
import recording from '../assets/data/recording.wav'
import { formatDuration } from '../utils'

const Header = () => {
	const audioRef = useRef<HTMLAudioElement>(null)
	const [playing, setPlaying] = useState(false)
	const [duration, setDuration] = useState(0)
	const handlePlayPause = () => {
		playing ? audioRef.current?.pause() : audioRef.current.play()
		setPlaying(!playing)
	}
	const handleForward = () => {
		audioRef.current.currentTime += 5
	}
	const handleRewind = () => {
		audioRef.current.currentTime -= 5
	}

	const handleShare = () => alert('Share')

	useEffect(() => {
		const handleDuration = () => {
			setDuration(audioRef.current?.duration)
		}
		audioRef.current?.addEventListener('loadedmetadata', handleDuration)
		return () => {
			audioRef.current?.removeEventListener('loadedmetadata', handleDuration)
		}
	}, [audioRef])
	return (
		<div className={'Header'}>
			<div className={'HeaderLeft'}>
				<div onClick={handleRewind}>
					<Rewind className="Button SecondaryButton" />
				</div>
				<div onClick={handlePlayPause}>
					{playing ? (
						<Pause className="Button PrimaryButton" />
					) : (
						<Play className="Button PrimaryButton" />
					)}
				</div>
				<div onClick={handleForward}>
					<Forward className="Button SecondaryButton" />
				</div>
			</div>
			<audio ref={audioRef} className="player">
				<source src={recording} />
			</audio>
			<div className={'Duration'}>{`${formatDuration(
				audioRef.current?.currentTime || 0
			)}/${formatDuration(duration)}`}</div>
			<div className={'Button HeaderRight'} onClick={handleShare}>
				<img src={ShareIcon} alt="share" style={{ marginRight: 4 }} />
				Share
			</div>
		</div>
	)
}

export default Header
