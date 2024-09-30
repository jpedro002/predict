import { PayloadAction, createSlice } from '@reduxjs/toolkit'

export interface User {
	id: number
	name: string
	email: string
	role: string[]
}

interface AppUsersState {
	users: User[]
	isLoading: boolean
}

const initialState: AppUsersState = {
	users: [],
	isLoading: false,
}

const appUsersSlice = createSlice({
	name: 'appUsers',
	initialState,
	reducers: {
		setLoadingState(state, action: PayloadAction<boolean>) {
			state.isLoading = action.payload
		},
		startUsers(state, action: PayloadAction<User[]>) {
			state.users = action.payload
		},
		addUser(state, action: PayloadAction<User>) {
			state.users.push(action.payload)
		},
		deleteUserFromStore(state, action: PayloadAction<number>) {
			state.users = state.users.filter((user) => user.id !== action.payload)
		},
		updateUser(state, action: PayloadAction<User>) {
			const index = state.users.findIndex(
				(user) => user.id === action.payload.id,
			)
			if (index !== -1) {
				state.users[index] = action.payload
			}
		},
	},
})

export const {
	setLoadingState,
	addUser,
	deleteUserFromStore,
	updateUser,
	startUsers,
} = appUsersSlice.actions

export default appUsersSlice.reducer
