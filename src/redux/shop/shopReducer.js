import Cookies from 'js-cookie';

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

const paginationInit = {
  currentPage: 0
, totalPages: 0
, totalProducts: 0
, productsPerPage: process.env.REACT_APP_DEFAULT_PRODUCTS_PER_PAGE
, productsFrom: 0
, productsTo: 0
, pages: []
}

const filtersInit = {
    productType: false
  , searchInputText: ''
}

const initialState = {
  products: [],
  product: {},
  checkout: Cookies.get('checkout') ? JSON.parse(Cookies.get('checkout')) : {},
  isCartOpen: false,
  pagination: paginationInit,
  categories: [],
  filters: filtersInit,
  productQuickView: false,
};

const shopReducer = (state = initialState, action) => {

  switch (action.type) {

    case SET_PRODUCTS:
      return {
        ...state,
        products: action.details,
      };

    case SET_PRODUCT:
      return {
        ...state,
        product: action.details,
      };

    case SET_CHECKOUT:
      return {
        ...state,
        checkout: action.details,
      };

    case SET_CART:
      return {
        ...state,
        isCartOpen: true,
      };

    case REMOVE_CART:
      return {
        ...state,
        isCartOpen: false,
      };

    case SET_CATEGORIES:
      return {
        ...state,
        categories: action.details,
      };      

    case SET_PAGINATION:
      return {
        ...state,
        pagination: action.details,
      };

    case SET_FILTERS:
      return {
        ...state,
        filters: action.details,
      };

    case SET_PRODUCT_QUICK_VIEW:
      return {
        ...state,
        productQuickView: action.details,
      };

    default:
      return state;
  }
};

export default shopReducer;
