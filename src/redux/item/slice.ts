import { createSlice } from '@reduxjs/toolkit'
import { fetchItem } from "./asyncAction";
import {Item, ItemSliceState, Status} from "./type";

const initialState: ItemSliceState = {
	item: {} as Item,
	status: Status.LOADING, // loading | success | error
}

export const itemSlice = createSlice({
	name: 'coffeeId',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(fetchItem.pending, (state) => {
			state.status = Status.LOADING;
			state.item = {} as Item;
		});

		builder.addCase(fetchItem.fulfilled, (state, action) => {
			state.status = Status.SUCCESS;
			state.item = action.payload;
		});

		builder.addCase(fetchItem.rejected, (state) => {
			state.status = Status.ERROR;
			state.item = {} as Item;
		});
	}

	// extraReducers: {
	// 	[fetchItem.pending]: state => {
	// 		state.status = 'loading'
	// 		state.item = []
	// 	},
	// 	[fetchItem.fulfilled]: (state, action) => {
	// 		state.status = 'success'
	// 		state.item = action.payload
	// 	},
	// 	[fetchItem.rejected]: state => {
	// 		state.status = 'error'
	// 		state.item = []
	// 	},
	// },
})

export default itemSlice.reducer
