import {
    SET_PRODUCTS
  , SET_PRODUCT
  , SET_CHECKOUT
  , SET_CART
  , REMOVE_CART
  , SET_PAGINATION
  , SET_CATEGORIES
  , SET_FILTERS
  , SET_PRODUCT_QUICK_VIEW
} from './type';

export const setProducts = (x) => {
  return {
    type: SET_PRODUCTS,
    details: x,
  };
};

export const setProduct = (x) => {
  return {
    type: SET_PRODUCT,
    details: x,
  };
};

export const setCheckout = (x) => {
  return {
    type: SET_CHECKOUT,
    details: x,
  };
};

export const setCart = () => {
  return {
    type: SET_CART,
  };
};

export const removeCart = () => {
  return {
    type: REMOVE_CART,
  };
};

export const setPagination = (x) => {
  return {
    type: SET_PAGINATION,
    details: x,
  };
};

export const setCategories = (x) => {
  return {
    type: SET_CATEGORIES,
    details: x,
  };
};

export const setFilters = (x) => {
  return {
    type: SET_FILTERS,
    details: x,
  };
};

export const setProductQuickView = (x) => {
  return {
    type: SET_PRODUCT_QUICK_VIEW,
    details: x,
  };
};