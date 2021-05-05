import React, { FC, useCallback } from 'react'
import styled from 'styled-components'
import { ReactComponent as PlayIcon } from '../assets/icons/play.svg'
import { ReactComponent as PauseIcon } from '../assets/icons/pause.svg'
import { ReactComponent as ForwardIcon } from '../assets/icons/forward.svg'
import { ReactComponent as ShareIcon } from '../assets/icons/share.svg'

type Props = {
	isPlaying: boolean
	currentTime: number
	duration: number
	seekBy: (seconds: number) => void
	handlePlayPause: () => void
}

const horizontalMargin = '16px'

const Header: FC<Props> = ({ isPlaying, handlePlayPause, seekBy }) => {
	const seekForward = useCallback(() => seekBy(5), [seekBy])
	const seekBackward = useCallback(() => seekBy(-5), [seekBy])

	const handleShare = () => alert('Share')
	return (
		<Container>
			<HeaderLeft>
				<Rewind onClick={seekBackward} />
				<div onClick={handlePlayPause}>{isPlaying ? <Pause /> : <Play />}</div>

				<Forward onClick={seekForward} />
			</HeaderLeft>
			<HeaderRight onClick={handleShare}>
				<Share />
			</HeaderRight>
		</Container>
	)
}

const Container = styled.div`
	display: flex;
	align-items: center;
	background-color: ${(p) => p.theme.headerBackground};
	padding: 10px 20px;
`

const HeaderLeft = styled.div`
	display: flex;
	align-items: center;
`

const HeaderRight = styled.div`
	margin-left: auto;
	cursor: pointer;
	border: 1px solid ${(p) => p.theme.primaryText};
	color: ${(p) => p.theme.secondaryText};
	display: flex;
	align-items: center;
	border-radius: 4px;
	padding: 2px;
	background-color: white;
	&::after {
		content: 'Share';
		margin: 0 4px;
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
			fill: ${(p) => p.theme.primary} !important;
		}
	}
`

const Play = styled(PlayIcon)`
	cursor: pointer;
	path {
		fill: ${(p) => p.theme.primary};
	}
`

const Pause = styled(PauseIcon)`
	cursor: pointer;
	path {
		fill: ${(p) => p.theme.primary};
	}
`

const Rewind = styled(Forward)`
	transform: scale(-1, 1);
	margin-left: 0;
	margin-right: ${horizontalMargin};
`

export default Header
