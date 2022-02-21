import fetch from 'node-fetch';

import {
    GET_ALL_PRODUCT_TYPES
  , GET_ALL_PRODUCT_TAGS
  , GET_ALL_PRODUCTS
  , GET_ALL_PAGES
} from './shopifyGraphqlQueries.js';

const client = async (query) => {
  const res = await fetch('https://'+process.env.REACT_APP_SHOPIFY_STOREFRONT_URL+'/api/2022-01/graphql.json', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/graphql',
        'X-Shopify-Storefront-Access-Token': process.env.REACT_APP_SHOPIFY_STOREFRONT_ACCESS_TOKEN
    },
    body: query
  });
  return res.json();
};

export default class shopifyUtil {

  static async generyc(queryName) {
    const res = await client(queryName);
    return res;
  }

  static async fetchAllProductTypes() {
    const result = [];
    const res = await client(GET_ALL_PRODUCT_TYPES);
    res.data.productTypes.edges.forEach(edge => {
      result.push(edge.node);
    });
    return result;
  }

  static async fetchAllProductTags() {
    return await client(GET_ALL_PRODUCT_TAGS);
  }

  static async fetchAllProducts() {
    return await client(GET_ALL_PRODUCTS);
  }
 
  static async fetchAllPages() {
    return await client(GET_ALL_PAGES);
  }
  
}
