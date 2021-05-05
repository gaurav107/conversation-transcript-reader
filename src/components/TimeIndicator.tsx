import React, { FC } from 'react'
import styled from 'styled-components'
import { formatDuration } from '../helpers/utils'

type Props = {
	currentTime: number
	duration: number
}

const Container = styled.div`
	display: inline-block;
	padding: 0.5em;
	margin: 1em 0;
	font-size: ${(p) => p.theme.fontSize};
	border-radius: 4px;
	background-color: ${(p) => p.theme.headerBackground};
`

const CurrentTime = styled.span`
	font-weight: bold;
	color: ${(p) => p.theme.secondaryText};
`

const Duration = styled.span`
	color: ${(p) => p.theme.primaryText};
`

const TimeIndicator: FC<Props> = ({ currentTime, duration }) => (
	<Container>
		<CurrentTime>{formatDuration(currentTime || 0)}</CurrentTime>
		<Duration> / {formatDuration(duration)}</Duration>
	</Container>
)

export default TimeIndicator
