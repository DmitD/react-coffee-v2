import { createAsyncThunk } from "@reduxjs/toolkit";
import { Items, SearchParams } from "./type";
import axios from "axios";

export const fetchItems = createAsyncThunk<Items[], SearchParams>(
    'coffee/fetchItemsStatus',
    async (params) => {
        const { category, sort, currentPage } = params
        const res =
            await axios.get<Items[]>(`https://62aa17f7371180affbcf437d.mockapi.io/items
				?page=${currentPage}&limit=6
				&sortBy=${sort.type}&order=${sort.order}
				${category > 0 ? `&category=${category}` : ''}`)
        return res.data
    }
)

export const fetchSearchItems = createAsyncThunk<Items[], string>(
    'coffee/fetchItemsSearchStatus',
    async (searchValue) => {
        const res =
            await axios.get<Items[]>(`https://62aa17f7371180affbcf437d.mockapi.io/items?page=1&limit=6&search=${searchValue}`)
        return res.data
    }
)