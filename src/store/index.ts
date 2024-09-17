import { configureStore } from '@reduxjs/toolkit'
import { TypedUseSelectorHook, useSelector } from 'react-redux'

import counterSlice from './slices/counterSlice'
import predictRunSlice from './slices/predictRunSlice'

export const store = configureStore({
	reducer: {
		counterSlice,
		predictRunSlice,
	},
})

export type RootState = ReturnType<typeof store.getState>
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
