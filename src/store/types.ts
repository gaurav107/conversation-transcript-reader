export enum ActionNames {
	PLAY = 'PLAY',
	SET_DURATION = 'SET_DURATION',
	SET_PLAYBACK_RATE = 'SET_PLAYBACK_RATE',
	UPDATE_CURRENT_TIME = 'UPDATE_CURRENT_TIME',
}

export type ReduxAction = {
	type: ActionNames
	data: any
}

export interface ReduxState {
	recording: any
	transcript: Array<Array<WordTimestamp>>
	currentTime: number
	duration: number
	isPlaying: boolean
	playbackRate: number
}

export interface WordTimestamp {
	startTime: number
	endTime: number
	word: string
}
