// export enum SortTypeEnum {
//     RATING_DESC = 'rating',
//     TITLE_ASC = 'title',
//     PRICE_DESC = 'smPrice',
// }
export type SortItemType = {
    name: string;
    type: string; //SortTypeEnum
    order: string
}
export type ItemCartType = {
    id: string;
    title: string;
    imageUrlPage: string;
    type: string;
    weight: number;
    price: number;
    count: number
}
export type HandleItemCartType = {
    id: string;
    weight: number;
    type: string
}