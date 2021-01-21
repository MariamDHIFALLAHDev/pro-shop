import { createSelector } from "reselect";

const cartSelector = (state) => state.cart;

export const cartItemsSelector = createSelector(
  cartSelector,
  (cart) => cart.cartItems
);

export const shippingAddressSelector = createSelector(
  cartSelector,
  (cart) => cart.shippingAddress
);

export const paymentMethodSelector = createSelector(
  cartSelector,
  (cart) => cart.paymentMethod
);

export const fullCartSelector = createSelector(cartSelector, (cart) => cart);
