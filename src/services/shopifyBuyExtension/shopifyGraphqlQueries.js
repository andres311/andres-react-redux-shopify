//getAllProductTypes limit: 250
export const GET_ALL_PRODUCT_TYPES = `
{
  productTypes(first: 250) {
    edges {
      node
    }
  }
}`;

//blog limit: 250
export const GET_ALL_PRODUCT_TAGS = `
{
  productTags(first: 250) {
    edges {
      node
    }
  }
}`;

//GET_ALL_PRODUCTS LIMIT 250
export const GET_ALL_PRODUCTS = `
{
  products(first: 250) {
    edges {
      node{
        id
        title
      }
    }
  }
}`;

//GET_ALL_PAGES limt 250
export const GET_ALL_PAGES = `
{
  pages(first: 250) {
    edges {
      node{
        id
        title
      }
    }
  }
}`;