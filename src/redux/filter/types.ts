import {SortItemType} from "../../assets/utils/componentDataType";

export type FilterParamsType = {
    category: number;
    sort: SortItemType;
    currentPage: number;
}
export interface FilterSliceState {
    searchValue: string;
    currentPage: number;
    category: number;
    sort: SortItemType;
    isToHomePage: boolean
}