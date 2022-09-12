export type Item = {
    id: string;
    title: string;
    imageUrlPage: string;
    types: number[];
    ingredients: string;
    description: string;
    details: {[key: string]: {price: number; weight: number}};
}
export enum Status {
    LOADING = 'loading',
    SUCCESS = 'completed',
    ERROR = 'error',
}
export interface ItemSliceState {
    item: Item;
    status: Status;
}