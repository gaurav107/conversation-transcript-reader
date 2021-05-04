import React, { FC, useCallback } from 'react'
import { formatDuration } from '../helpers/utils'
import { ReactComponent as Play } from '../assets/icons/play.svg'
import { ReactComponent as Pause } from '../assets/icons/pause.svg'
import { ReactComponent as Forward } from '../assets/icons/forward.svg'
import ShareIcon from '../assets/icons/share.svg'
import { ReactComponent as Rewind } from '../assets/icons/rewind.svg'

type Props = {
	isPlaying: boolean
	currentTime: number
	duration: number
	seekBy: (seconds: number) => void
	handlePlayPause: () => void
}

const Header: FC<Props> = ({ isPlaying, currentTime, duration, handlePlayPause, seekBy }) => {
	const seekForward = useCallback(() => seekBy(5), [seekBy])
	const seekBackward = useCallback(() => seekBy(-5), [seekBy])

	const handleShare = () => alert('Share')
	return (
		<div className={'Header'}>
			<div className={'HeaderLeft'}>
				<div onClick={seekBackward}>
					<Rewind className="Button SecondaryButton" />
				</div>
				<div onClick={handlePlayPause}>
					{isPlaying ? (
						<Pause className="Button PrimaryButton" />
					) : (
						<Play className="Button PrimaryButton" />
					)}
				</div>
				<div onClick={seekForward}>
					<Forward className="Button SecondaryButton" />
				</div>
			</div>
			<div className={'Duration'}>{`${formatDuration(currentTime || 0)}/${formatDuration(
				duration
			)}`}</div>
			<div className={'Button HeaderRight'} onClick={handleShare}>
				<img src={ShareIcon} alt="share" style={{ marginRight: 4 }} />
				Share
			</div>
		</div>
	)
}

export default Header
