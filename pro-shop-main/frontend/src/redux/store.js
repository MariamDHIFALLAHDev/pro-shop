import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
  productListReducers,
  productDetailsReducers,
  productCreateReducer,
  productDeleteReducer,
  productReviewCreateReducer,
  productTopRatedReducer,
  productUpdateReducer,
} from "./product/prooductReducers";
import { cartReducer } from "./cart/cartReducers";
import {
  deleteUserReducer,
  updateUserProfileReducer,
  userAuthReducer,
  userDetailsReducer,
  userListReducer,
  userUpdateReducer,
} from "./user/userReducers";
import {
  orderCreateReducer,
  orderDeliverReducer,
  orderDetailsReducer,
  orderListMyReducer,
  orderListReducer,
  orderPayReducer,
} from "./order/orderReducers";

const reducer = combineReducers({
  productList: productListReducers,
  productDetails: productDetailsReducers,
  productDelete: productDeleteReducer,
  productCreate: productCreateReducer,
  productUpdate: productUpdateReducer,
  productReviewCreate: productReviewCreateReducer,
  productTopRated: productTopRatedReducer,
  cart: cartReducer,
  user: userAuthReducer,
  userDetails: userDetailsReducer,
  userDelete: deleteUserReducer,
  userUpdateProfile: updateUserProfileReducer,
  userUpdate: userUpdateReducer,
  userList: userListReducer,
  orderCreate: orderCreateReducer,
  orderDetails: orderDetailsReducer,
  orderPay: orderPayReducer,
  orderDeliver: orderDeliverReducer,
  orderListMy: orderListMyReducer,
  orderList: orderListReducer,
});

const cartItemsFromStorage = localStorage.getItem("cartItems")
  ? JSON.parse(localStorage.getItem("cartItems"))
  : [];

const paymentMethodFromStorage = localStorage.getItem("paymentMethod")
  ? JSON.parse(localStorage.getItem("paymentMethod"))
  : [];

const shippingAddressFromStorage = localStorage.getItem("shippingAddress")
  ? JSON.parse(localStorage.getItem("shippingAddress"))
  : [];

const userInfoFromStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

const initialStat = {
  cart: {
    cartItems: cartItemsFromStorage,
    shippingAddress: shippingAddressFromStorage,
    paymentMethod: paymentMethodFromStorage,
  },
  user: {
    userInfo: userInfoFromStorage,
  },
};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialStat,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
