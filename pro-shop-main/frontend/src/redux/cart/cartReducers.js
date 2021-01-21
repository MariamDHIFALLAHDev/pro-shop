import {
  ADD_CART_ITEM,
  CART_SAVE_PAYMENT_METHOD,
  CART_SAVE_SHIPPING_ADDRESS,
  REMOVE_CART_ITEM,
  CART_CLEAR_ITEMS,
} from "./cartConstants";

export const cartReducer = (state = { cartItems: [] }, action) => {
  switch (action.type) {
    case ADD_CART_ITEM:
      const item = action.payload;
      const exist = state.cartItems.find(
        (cartItem) => cartItem.product === item.product
      );
      if (exist)
        return {
          ...state,
          cartItems: state.cartItems.map((cartItem) =>
            cartItem.product === item.product ? item : cartItem
          ),
        };

      return {
        ...state,
        cartItems: [...state.cartItems, item],
      };

    case REMOVE_CART_ITEM:
      return {
        ...state,
        cartItems: state.cartItems.filter((i) => i.product !== action.payload),
      };

    case CART_SAVE_SHIPPING_ADDRESS:
      return {
        ...state,
        shippingAddress: action.payload,
      };

    case CART_SAVE_PAYMENT_METHOD:
      return {
        ...state,
        paymentMethod: action.payload,
      };

    case CART_CLEAR_ITEMS:
      return {
        ...state,
        cartItems: [],
      };

    default:
      return state;
  }
};
