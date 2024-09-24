import { configureStore } from '@reduxjs/toolkit'
import { TypedUseSelectorHook, useSelector } from 'react-redux'

import appHeaderTitleSlice from './slices/appHeaderTitleSlice'
import counterSlice from './slices/counterSlice'
import predictRunSlice from './slices/predictRunSlice'

export const store = configureStore({
	reducer: {
		counterSlice,
		predictRunSlice,
		appHeaderTitleSlice,
	},
})

export type RootState = ReturnType<typeof store.getState>
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
