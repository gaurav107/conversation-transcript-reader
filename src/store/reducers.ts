import { ReduxAction, ActionNames, ReduxState } from './types'
import recording from '../assets/data/recording.wav'
import transcript from '../assets/data/transcript.json'

const extractTimeInSeconds = (time: string) => parseFloat(time.replace('s', ''))

const parsedTranscript = transcript.word_timings.map((timings) => {
	return timings.map(({ startTime, endTime, word }) => ({
		startTime: extractTimeInSeconds(startTime),
		endTime: extractTimeInSeconds(endTime),
		word,
	}))
})

const INITIAL_STATE: ReduxState = {
	recording,
	transcript: parsedTranscript,
	currentTime: 0,
	duration: 0,
	isPlaying: false,
	playbackRate: 1,
}

const reducer = (state = INITIAL_STATE, action: ReduxAction): ReduxState => {
	switch (action.type) {
		case ActionNames.PLAY: {
			return { ...state, isPlaying: action.data }
		}
		case ActionNames.UPDATE_CURRENT_TIME: {
			return { ...state, currentTime: action.data }
		}
		case ActionNames.SET_DURATION: {
			return { ...state, duration: action.data }
		}
		case ActionNames.SET_PLAYBACK_RATE: {
			return { ...state, playbackRate: action.data }
		}
		default:
			return state
	}
}

export default reducer
