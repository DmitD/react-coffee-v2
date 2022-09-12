import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {FilterParamsType, FilterSliceState} from "./types";
import {SortItemType} from "../../assets/utils/componentDataType";

const initialState: FilterSliceState = {
	searchValue: '',
	currentPage: 1,
	category: 0,
	isToHomePage: false,
	sort: {
		name: 'популярности',
		type: 'rating',
		order: 'desc',
	}
}

export const slice = createSlice({
	name: 'filter',
	initialState,
	reducers: {
		setSearchValue(state, action: PayloadAction<string>) {
			state.searchValue = action.payload
		},
		setCurrentPage(state, action: PayloadAction<number>) {
			state.currentPage = action.payload
		},
		setCategory(state, action: PayloadAction<number>) {
			state.category = action.payload
		},
		setSort(state, action: PayloadAction<SortItemType>) {
			state.sort = action.payload
		},
		setFiltersParams(state, action: PayloadAction<FilterParamsType>) {
			state.category = Number(action.payload.category)
			state.sort = action.payload.sort
			state.currentPage = Number(action.payload.currentPage)
		},
		resetFiltersParams(state) {
			state.searchValue = ''
			state.currentPage = 1
			state.category = 0
			state.sort.name = 'популярности'
			state.sort.type = 'rating'
			state.sort.order = 'desc'
			state.isToHomePage = true
		},
		resetToHomePage(state, action: PayloadAction<boolean>) {
			state.isToHomePage = action.payload
		},
	},
})

export const {
	setSearchValue,
	setCurrentPage,
	setCategory,
	setSort,
	setFiltersParams,
	resetFiltersParams,
	resetToHomePage
} = slice.actions

export default slice.reducer
