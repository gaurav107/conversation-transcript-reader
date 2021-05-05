import React, { FC, useCallback } from 'react'
import styled from 'styled-components'
import { formatDuration } from '../helpers/utils'
import { WordTimestamp } from '../store/types'

type Props = {
	transcript: Array<Array<WordTimestamp>>
	currentTime: number
	seekTo: (seconds: number) => void
}

const TranscriptList: FC<Props> = ({ transcript, currentTime, seekTo }) => {
	const handleTextClick = useCallback(
		(wordTimestamp: WordTimestamp) => {
			seekTo(wordTimestamp.startTime)
		},
		[seekTo]
	)
	const handleShareClick = useCallback((index: number) => {
		alert(`Share text at position: ${index}`)
	}, [])
	return (
		<>
			{transcript.map((wordTimings, index) => {
				const isProspect = index % 2 === 1
				const startTime = formatDuration(wordTimings[0].startTime)
				return (
					<Container>
						<Transcript isProspect={isProspect}>
							<StartTime isProspect={isProspect}>{startTime}</StartTime>
							<TranscriptText isProspect={isProspect}>
								{wordTimings.map((entry) => {
									const highlight = currentTime >= entry.startTime && currentTime < entry.endTime
									return (
										<>
											<TranscriptWord highlight={highlight} onClick={() => handleTextClick(entry)}>
												{entry.word}
											</TranscriptWord>
											<span> </span>
										</>
									)
								})}
								<Share isProspect={isProspect} onClick={() => handleShareClick(index)}>
									Share
								</Share>
							</TranscriptText>
						</Transcript>
					</Container>
				)
			})}
		</>
	)
}

type IsProspect = { isProspect: boolean }

const Container = styled.div`
	transition: all 0.5s;
	:hover {
		background-color: ${({ theme }) => theme.colors.primary5};
	}
	margin-top: 12px;
`

const Transcript = styled.div<IsProspect>`
	display: flex;
	align-items: baseline;
	font-size: ${({ theme }) => theme.fontSize};
	margin-left: ${({ isProspect }) => (isProspect ? '56px' : '0px')};
`

const StartTime = styled.div<IsProspect>`
	color: ${({ theme, isProspect }) => (isProspect ? theme.colors.secondary : theme.colors.primary)};
	margin-right: 2em;
	font-weight: bold;
`

const TranscriptText = styled.div<IsProspect>`
	border-left: 2px solid
		${({ theme, isProspect }) => (isProspect ? theme.colors.secondary25 : theme.colors.primary25)};
	color: ${({ theme }) => theme.colors.secondaryColor};
	padding: 12px;
	max-width: 80%;
`

const TranscriptWord = styled.span<{ highlight: boolean }>`
	cursor: pointer;
	transition: all 0.25s;
	background-color: ${({ theme, highlight }) => (highlight ? theme.colors.primary25 : 'inherit')};
	:hover {
		background-color: ${({ theme }) => theme.colors.primary25};
	}
`

const Share = styled.div<IsProspect>`
	display: none;
	margin-top: 4px;
	transition: all 0.5s;
	font-size: 12px;
	font-weight: bold;
	cursor: pointer;
	color: ${({ theme, isProspect }) => (isProspect ? theme.colors.secondary : theme.colors.primary)};
	${Container}: hover & {
		display: block;
	}
`

export default TranscriptList
