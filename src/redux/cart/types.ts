import {ItemCartType} from "../../assets/utils/componentDataType";

export interface CartSliceState {
    totalCount: number;
    totalPrice: number;
    totalItems: ItemCartType[];
}