import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {CartSliceState} from "./types";
import {HandleItemCartType, ItemCartType} from "../../assets/utils/componentDataType";
import {getCartFromLS} from "../../assets/utils/getCartFromLS";

const initialState: CartSliceState = getCartFromLS()

export const slice = createSlice({
	name: 'cart',
	initialState,
	reducers: {
		addItem(state, action: PayloadAction<ItemCartType>) {
			const newItemCartIndex = state.totalItems.findIndex(
				item =>
					item.id === action.payload.id && item.weight === action.payload.weight && item.type === action.payload.type
			)
			const newItemInCart = state.totalItems[newItemCartIndex]
			if (newItemInCart) {
				const { price, count } = newItemInCart
				state.totalItems[newItemCartIndex].price = price + action.payload.price
				state.totalItems[newItemCartIndex].count = count + action.payload.count
			}
			if (!newItemInCart) {
				state.totalItems.push(action.payload)
			}
			state.totalCount = state.totalItems.reduce((sum, { count }) => sum + count, 0)
			state.totalPrice = state.totalItems.reduce((sum, { price }) => sum + price, 0)
		},
		plusItem(state, action: PayloadAction<HandleItemCartType>) {
			const plusItemCartIndex = state.totalItems.findIndex(
				item =>
					item.id === action.payload.id && item.weight === action.payload.weight && item.type === action.payload.type
			)
			const plusItemCart = state.totalItems[plusItemCartIndex]
			const { price, count } = plusItemCart
			//const plusItemPrise = (price / count) * (count + 1)
			state.totalItems[plusItemCartIndex].price = (price / count) * (count + 1)
			state.totalItems[plusItemCartIndex].count = count + 1
			state.totalCount = state.totalItems.reduce((sum, { count }) => sum + count, 0)
			state.totalPrice = state.totalItems.reduce((sum, { price }) => sum + price, 0)
		},
		minusItem(state, action: PayloadAction<HandleItemCartType>) {
			const minusItemCartIndex = state.totalItems.findIndex(
				item =>
					item.id === action.payload.id && item.weight === action.payload.weight && item.type === action.payload.type
			)
			const minusItemCart = state.totalItems[minusItemCartIndex]
			if (minusItemCart.count > 1) {
				const { count, price } = minusItemCart
				//const minusItemPrise = (price / count) * (count - 1)
				state.totalItems[minusItemCartIndex].price = (price / count) * (count - 1)
				state.totalItems[minusItemCartIndex].count = count - 1
				state.totalCount = state.totalItems.reduce(
					(sum, { count }) => sum + count,
					0
				)
				state.totalPrice = state.totalItems.reduce(
					(sum, { price }) => sum + price,
					0
				)
			}
		},
		removeItem(state, action: PayloadAction<HandleItemCartType>) {
			const removeItemCartIndex = state.totalItems.findIndex(
				item =>
					item.id === action.payload.id && item.weight === action.payload.weight && item.type === action.payload.type
			)
			state.totalItems.splice(removeItemCartIndex, 1)
			state.totalCount = state.totalItems.reduce((sum, { count }) => sum + count, 0)
			state.totalPrice = state.totalItems.reduce((sum, { price }) => sum + price, 0)
		},
		clearCart(state) {
			state.totalItems = []
			state.totalCount = 0
			state.totalPrice = 0
		},
	},
})

export const { addItem, plusItem, minusItem, removeItem, clearCart } =
	slice.actions

export default slice.reducer
