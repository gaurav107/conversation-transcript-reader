import { ReduxAction, ActionNames, ReduxState } from './types'
import recording from '../assets/data/recording.wav'
import transcript from '../assets/data/transcript.json'

const INITIAL_STATE: ReduxState = {
	recording,
	transcript,
	currentTime: 0,
	duration: 0,
	isPlaying: false,
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
		default:
			return state
	}
}

export default reducer
