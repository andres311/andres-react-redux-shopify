

//IMPROVE THIS CODE!
//IT WORKS BUT IT IS UGLY AF!
export default class PriceUtil {

  //price: is the price between the min price and the max price of the variants and is displayed when no variant is selected. (Example $100-$150)
  static getPriceRange (product) {
    let price;
    if (product && product.variants){
      let currency = product.variants[0].priceV2.currencyCode;
      let minPrice = 0;
      let maxPrice = 0;
      product.variants.forEach(variant => {
        if(minPrice === 0 || (minPrice > variant.priceV2.amount)){
          minPrice = parseFloat(variant.priceV2.amount).toFixed( 2 );
        }
        if(maxPrice < variant.priceV2.amount){
          maxPrice = parseFloat(variant.priceV2.amount).toFixed( 2 );
        }
      });
      maxPrice === minPrice ? price = (currency + ' ' + maxPrice) : price = (currency + ' ' + minPrice + " - " + currency + ' ' + maxPrice);
    }    
    return price;
  }
}