import {ItemCartType} from "./componentDataType";

export const getTotalCount = (items: ItemCartType[]) => {
    return items.reduce((sum, obj) => sum + obj.count, 0);
};