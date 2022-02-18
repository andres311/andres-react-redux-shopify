import Client from 'shopify-buy';

const client = Client.buildClient({
  storefrontAccessToken: process.env.REACT_APP_SHOPIFY_STOREFRONT_ACCESS_TOKEN,
  domain: process.env.REACT_APP_SHOPIFY_STOREFRONT_URL,  
});

export default class ShopifyProvider {

  static async createCheckout() {
    const checkoutId = localStorage.checkout
    if(checkoutId){
      const res = client.checkout.fetch(checkoutId);
      return res;
    } else {
      const res = await client.checkout.create();
      return res;
    }
  }

  static async fetchAllProducts() {
    const res = await client.product.fetchAll(250);
    return res;
  }

  static async fetchAllCategories() {
    const res = await client.collection.fetchAll();
    return res;
  }

  static async fetchAllProductWithId(id) {
    const res = await client.product.fetch(id);
    return res;
  }

  static async addItemToCheckout(variantId, quantity, checkout) {
    const lineItemsToAdd = [
      {
        variantId,
        quantity,
      },
    ];
    const res = await client.checkout.addLineItems(checkout, lineItemsToAdd);
    return res;
  }

  static async removeItemsFromCheckout(checkoutId, linesToRemove) {
    const res = await client.checkout.removeLineItems(checkoutId, linesToRemove);
    return res;
  }

}
