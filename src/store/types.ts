export enum ActionNames {
	PLAY = 'PLAY',
	SET_DURATION = 'SET_DURATION',
	UPDATE_CURRENT_TIME = 'UPDATE_CURRENT_TIME',
}

export type ReduxAction = {
	type: ActionNames
	data: any
}

export interface ReduxState {
	recording: any
	transcript: Transcript
	currentTime: number
	duration: number
	isPlaying: boolean
}

interface Transcript {
	transcript_text: Array<string>
	word_timings: Array<Array<WordTimestamp>>
}

interface WordTimestamp {
	startTime: string
	endTime: string
	word: string
}
