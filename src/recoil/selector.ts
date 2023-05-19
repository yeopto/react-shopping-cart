import { selector } from 'recoil';
import { checkedArrayState } from './atom';
import type { CartItem, Product } from '../types/types';
import { CART_ITEMS_BASE_URL, PRODUCTS_BASE_URL } from '../constant';

export const productsQuery = selector<Product[]>({
  key: 'products',
  get: async () => {
    const response = await fetch(PRODUCTS_BASE_URL);

    if (!response.ok) throw new Error(`${response.status} 에러 발생`);

    const products = await response.json();

    return products;
  },
});

export const cartListQuery = selector<CartItem[]>({
  key: 'cartList',
  get: async () => {
    const response = await fetch(CART_ITEMS_BASE_URL);

    if (!response.ok) throw new Error(`${response.status} 에러 발생`);

    const cartList = await response.json();

    return cartList;
  },
});

export const totalPriceState = selector({
  key: 'totalprice',
  get: ({ get }) => {
    const checkedArray = get(checkedArrayState);

    return checkedArray.reduce((acc, cur) => {
      return acc + cur.quantity * cur.product.price;
    }, 0);
  },
});
