import { configureStore } from '@reduxjs/toolkit'
import { useDispatch } from 'react-redux';
import filter from './filter/slice'
import cart from './cart/slice'
import coffee from './items/slice'
import coffeeId from './item/slice'

export const store = configureStore({
	reducer: {
		filter,
		coffee,
		coffeeId,
		cart,
	},
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch
export const useAppDispatch: () => AppDispatch = useDispatch
