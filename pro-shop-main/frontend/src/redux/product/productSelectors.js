import { createSelector } from "reselect";

const selectProductsList = (state) => state.productList;
const selectProductDetails = (state) => state.productDetails;

export const productsListSelector = createSelector(
  selectProductsList,
  (productList) => ({
    products: productList.products,
    isLoading: productList.isLoading,
    error: productList.errorMsg,
    pages: productList.pages,
    page: productList.page,
  })
);

export const productsDetailsSelector = createSelector(
  selectProductDetails,
  (productDetails) => ({
    product: productDetails.product,
    isLoading: productDetails.isLoading,
    error: productDetails.errorMsg,
  })
);

export const isLoadingSelector = createSelector(
  selectProductsList,
  (productList) => productList.isLoading
);

export const errorSelector = createSelector(
  selectProductsList,
  (productList) => productList.errorMsg
);
