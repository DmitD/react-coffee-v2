import {ItemCartType} from "./componentDataType";

export const getTotalPrice = (items: ItemCartType[]) => {
    return items.reduce((sum, obj) => sum + obj.price, 0);
};