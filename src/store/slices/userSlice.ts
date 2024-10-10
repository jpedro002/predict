import { api } from '@/lib/axios'
import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit'

interface UserState {
	id: number
	name: string
	email: string
	roles: string[]
	isLoadingUser: boolean
	statusAthlete?: boolean
}

const initialState: UserState = {
	id: 0,
	name: '',
	email: '',
	roles: [],
	isLoadingUser: true,
	statusAthlete: false,
}

export const fetchUser = createAsyncThunk('user/fetchUser', async () => {
	const response = await api.get('/users/me')

	return response.data
})

const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		setUser: (state, action: PayloadAction<UserState>) => {
			const { name, email, roles, id, statusAthlete, isLoadingUser } =
				action.payload

			state.name = name
			state.email = email
			state.roles = roles
			state.id = id
			state.isLoadingUser = isLoadingUser
			if (statusAthlete) {
				state.statusAthlete = statusAthlete
			}
		},
		setIsLoadingUser: (state, action: PayloadAction<boolean>) => {
			state.isLoadingUser = action.payload
		},
		clearUser: (_state) => {
			_state = initialState
		},
		setStatusAthlete: (state, action: PayloadAction<boolean>) => {
			state.statusAthlete = action.payload
		},
	},
	extraReducers: (builder) => {
		builder.addCase(
			fetchUser.fulfilled,
			(
				state,
				action: PayloadAction<{
					id: number
					name: string
					email: string
					role: string[]
					status?: boolean
				}>,
			) => {
				const { name, email, role, id, status } = action.payload

				state.name = name
				state.email = email
				state.roles = role
				state.id = id

				if (status) {
					state.statusAthlete = status
				}
			},
		)
	},
})

export const { setUser, clearUser, setIsLoadingUser, setStatusAthlete } =
	userSlice.actions
export default userSlice.reducer
