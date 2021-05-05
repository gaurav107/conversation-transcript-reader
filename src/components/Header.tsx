import React, { FC, useCallback } from 'react'
import styled from 'styled-components'
import { ReactComponent as PlayIcon } from '../assets/icons/play.svg'
import { ReactComponent as PauseIcon } from '../assets/icons/pause.svg'
import { ReactComponent as ForwardIcon } from '../assets/icons/forward.svg'
import { ReactComponent as ShareIcon } from '../assets/icons/share.svg'
import { BACKWARD_SEEK_INTERVAL, FORWARD_SEEK_INTERVAL, playbackRates } from '../helpers/constants'

type Props = {
	isPlaying: boolean
	playbackRate: number
	seekBy: (seconds: number) => void
	handlePlayPause: () => void
	onPlaybackRateUpdate: (rate: number) => void
}

const Header: FC<Props> = ({
	isPlaying,
	playbackRate,
	handlePlayPause,
	seekBy,
	onPlaybackRateUpdate,
}) => {
	const seekForward = useCallback(() => seekBy(FORWARD_SEEK_INTERVAL), [seekBy])
	const seekBackward = useCallback(() => seekBy(BACKWARD_SEEK_INTERVAL), [seekBy])

	const handleShare = () => alert('Share')
	return (
		<Container>
			<HeaderLeft>
				<Rewind onClick={seekBackward} />
				<div onClick={handlePlayPause}>{isPlaying ? <Pause /> : <Play />}</div>

				<Forward onClick={seekForward} />
				<Select
					value={playbackRate}
					onChange={(e) => onPlaybackRateUpdate(parseFloat(e.target.value))}
				>
					{playbackRates.map(({ value, label }) => (
						<option value={value}>{label}</option>
					))}
				</Select>
			</HeaderLeft>
			<HeaderRight onClick={handleShare}>
				<Share />
			</HeaderRight>
		</Container>
	)
}

const horizontalMargin = '16px'

const Container = styled.div`
	display: flex;
	align-items: center;
	background-color: ${({ theme }) => theme.colors.headerBackground};
	padding: 10px 20px;
`

const HeaderLeft = styled.div`
	display: flex;
	align-items: center;
`

const HeaderRight = styled.div`
	margin-left: auto;
	cursor: pointer;
	border: 1px solid ${({ theme }) => theme.colors.primaryText};
	color: ${({ theme }) => theme.colors.secondaryText};
	font-weight: bold;
	display: flex;
	align-items: center;
	border-radius: 4px;
	padding: 4px;
	background-color: white;
	&::after {
		content: 'Share';
		margin: 0 4px;
	}
`

const Select = styled.select`
	background: white;
	color: ${({ theme }) => theme.colors.primaryText};
	font-size: 14px;
	border-radius: 4px;
	border: 1px solid ${({ theme }) => theme.colors.primaryText};
	margin-left: 32px;
	font-weight: bold;
	padding: 2px;

	option {
		color: black;
		background: white;
		display: flex;
		font-size: 12px;
		font-family: 'Proxima Nova',
		text-align: center;
	}
`

const Share = styled(ShareIcon)`
	margin-left: 2px;
`

const Forward = styled(ForwardIcon)`
	cursor: pointer;
	margin-left: ${horizontalMargin};
	&:hover {
		> path {
			fill: ${({ theme }) => theme.colors.primary} !important;
		}
	}
`

const Play = styled(PlayIcon)`
	cursor: pointer;
	path {
		fill: ${({ theme }) => theme.colors.primary};
	}
`

const Pause = styled(PauseIcon)`
	cursor: pointer;
	path {
		fill: ${({ theme }) => theme.colors.primary};
	}
`

const Rewind = styled(Forward)`
	transform: scale(-1, 1);
	margin-left: 0;
	margin-right: ${horizontalMargin};
`

export default Header
