import { ReduxAction, ActionNames } from './types'

export const play = (): ReduxAction => ({
	type: ActionNames.PLAY,
	data: true,
})

export const pause = (): ReduxAction => ({
	type: ActionNames.PLAY,
	data: false,
})

export const setDuration = (duration: number): ReduxAction => ({
	type: ActionNames.SET_DURATION,
	data: duration,
})

export const updateCurrentTime = (time: number): ReduxAction => ({
	type: ActionNames.UPDATE_CURRENT_TIME,
	data: time,
})
