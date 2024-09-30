import { PayloadAction, createSlice } from '@reduxjs/toolkit'

export interface Athlete {
	id: number
	name: string
	email: string
	status: boolean
}

interface AthletesState {
	athletes: Athlete[]
	isLoading: boolean
}

const initialState: AthletesState = {
	athletes: [],
	isLoading: false,
}

const athletesSlice = createSlice({
	name: 'athletes',
	initialState,
	reducers: {
		setLoadingState(state, action: PayloadAction<boolean>) {
			state.isLoading = action.payload
		},
		startAthletes(state, action: PayloadAction<Athlete[]>) {
			state.athletes = action.payload
		},
		addAthlete(state, action: PayloadAction<Athlete>) {
			state.athletes.push(action.payload)
		},
		deleteAthleteFromStore(state, action: PayloadAction<number>) {
			state.athletes = state.athletes.filter(
				(athlete) => athlete.id !== action.payload,
			)
		},
		updateAthlete(state, action: PayloadAction<Omit<Athlete, 'status'>>) {
			const index = state.athletes.findIndex(
				(athlete) => athlete.id === action.payload.id,
			)
			if (index !== -1) {
				state.athletes[index] = {
					...state.athletes[index],
					...action.payload,
				}
			}
		},
	},
})

export const {
	setLoadingState,
	addAthlete,
	deleteAthleteFromStore,
	updateAthlete,
	startAthletes,
} = athletesSlice.actions

export default athletesSlice.reducer
