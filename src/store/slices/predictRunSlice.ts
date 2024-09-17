import type { PayloadAction } from '@reduxjs/toolkit'
import { createSlice } from '@reduxjs/toolkit'

export interface PredictRunStats {
	nome: string
	right_knee_angle_mean: number
	right_knee_angle_min: number
	right_knee_angle_max: number
	left_knee_angle_mean: number
	left_knee_angle_min: number
	left_knee_angle_max: number
	velocity_mean: number
	velocity_max: number
	asymmetry_mean: number
	asymmetry_max: number
	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	asymmetry_json: any
	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	hip_movement_json: any
	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	knee_angle_json: any
	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	velocity_json: any
}

export interface predictData {
	output_gif: string
	predict: PredictRunStats
}

const initialState: predictData = {
	output_gif: '',
	predict: {} as PredictRunStats,
}

export const predictRunSlice = createSlice({
	name: 'counter',
	initialState,
	reducers: {
		startPredictData: (state, action: PayloadAction<predictData>) => {
			state.output_gif = action.payload.output_gif
			state.predict = action.payload.predict
		},
	},
})

// Action creators are generated for each case reducer function
export const { startPredictData } = predictRunSlice.actions

export default predictRunSlice.reducer
