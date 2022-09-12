import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import { fetchItems, fetchSearchItems } from "./asyncActions";
import { ItemsSliceState, Status } from "./type";

const initialState: ItemsSliceState = {
	items: [],
	statusItems: Status.LOADING, // loading | success | error
	statusSearch: Status.LOADING, // loading | success | error
	notFound: false
}

export const itemsSlice = createSlice({
	name: 'coffee',
	initialState,
	reducers: {
		resetNotFound(state, action: PayloadAction<boolean>) {
			state.notFound = action.payload
		},
	},
	extraReducers: (builder) => {
		builder.addCase(fetchItems.pending, (state) => {
			state.statusItems = Status.LOADING;
			state.items = [];
		});

		builder.addCase(fetchItems.fulfilled, (state, action) => {
			state.statusItems = Status.SUCCESS;
			state.items = action.payload;
		});

		builder.addCase(fetchItems.rejected, (state) => {
			state.statusItems = Status.ERROR;
			state.items = [];
		});

		builder.addCase(fetchSearchItems.pending, (state) => {
			state.statusSearch = Status.LOADING;
			state.items = [];
		});

		builder.addCase(fetchSearchItems.fulfilled, (state, action) => {
			state.statusSearch = Status.SUCCESS;
			state.items = action.payload;
			if (state.items.length === 0) {
				state.notFound = true
			}
		});

		builder.addCase(fetchSearchItems.rejected, (state) => {
			state.statusSearch = Status.ERROR;
			state.items = [];
		});
	}
	// Для js норм, в ts не работает
	// extraReducers: {
	// 	[fetchItems.pending]: state => {
	// 		state.status = Status.LOADING
	// 		state.items = []
	// 	},
	// 	[fetchItems.fulfilled]: (state, action) => {
	// 		state.status = Status.SUCCESS
	// 		state.items = action.payload
	// 	},
	// 	[fetchItems.rejected]: state => {
	// 		state.status = Status.ERROR
	// 		state.items = []
	// 	},
	// },
})
export const {resetNotFound} = itemsSlice.actions
export default itemsSlice.reducer
