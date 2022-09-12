import { ItemCartType } from "./componentDataType";
import { getTotalPrice } from "./getTotalPrice";
import { getTotalCount } from "./getTotalCount";


export const getCartFromLS = () => {
    const data = localStorage.getItem('cart');
    const items = data ? JSON.parse(data) : [];
    const totalCount = getTotalCount(items)
    const totalPrice = getTotalPrice(items);

    return {
        totalItems: items as ItemCartType[],
        totalCount,
        totalPrice
    };
};
