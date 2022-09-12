import { SortItemType } from "../../assets/utils/componentDataType";

export type SearchParams = {
    sort: SortItemType;
    category: number;
    currentPage: number;
};
export type Items = {
    id: string;
    title: string;
    imageUrl: string;
    ingredients: string;
    details: {[key: string]: {price: number; weight: number}}
};
export enum Status {
    LOADING = 'loading',
    SUCCESS = 'completed',
    ERROR = 'error',
}
export interface ItemsSliceState {
    items: Items[];
    statusItems: Status;
    statusSearch: Status;
    notFound: boolean
}