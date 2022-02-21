//IMPROVE THIS CODE!
export default class ProductUtil {

    //get product options (WIP), check out the css class wip (".wip")
    static getOptions (product) {
      const opts = [];
      if (product && product.options){
        product.options.forEach(option => {
          //console.log(option.name);
          let vals = [];
          option.values.forEach(value => {
            //console.log(value.value);
            vals.push(value.value);
          });
          opts.push({name: option.name, values: vals});
        });
      }
      //console.log(opts)
      return opts;
    }

    //recive the list of products and return the list of products ordered by the index of the option
    static sortProducts (products, index) {
      if(products && products.length > 0){
        switch (index) {
          case 0:
            products.sort((a, b) => parseFloat(a.variants[0].createdAt) <= parseFloat(b.variants[0].createdAt) ? 1 : -1);
            break;          
          case 1:
            products.sort((a, b) => parseFloat(a.variants[0].priceV2.amount) > parseFloat(b.variants[0].priceV2.amount) ? 1 : -1);
            //add: if is equal, sort by title too (so the same price don't appear in diferrent order)
            break;      
          case 2:
            products.sort((a, b) => parseFloat(a.variants[0].priceV2.amount) < parseFloat(b.variants[0].priceV2.amount) ? 1 : -1);
            //add: if is equal, sort by title too (so the same price don't appear in diferrent order)
            break;
          case 3:
            products.sort((a, b) => (a.title > b.title) ? 1 : -1);
            break;
          case 4:
            products.sort((a, b) => (a.title < b.title) ? 1 : -1);
            break;        
          default:
            break;
        }
      }
      return products;
    }

    static getCartQty (checkout) {
      let result = 0;
      if(checkout && checkout.lineItems){
        checkout.lineItems.forEach(lineItem => {
          result += lineItem.quantity;
        });
      }
      return result;
    }
}