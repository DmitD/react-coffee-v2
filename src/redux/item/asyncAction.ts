import {createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";
import { Item } from "./type";

export const fetchItem = createAsyncThunk<Item, string>(
    'coffeeId/fetchItemStatus',
    async id => {
        const res = await axios.get<Item>(
            `https://62aa17f7371180affbcf437d.mockapi.io/items/${id}`
        )
        return res.data
    }
)