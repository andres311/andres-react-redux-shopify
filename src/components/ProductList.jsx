import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from "react-router-dom";

//components
import Loading from "../components/Loading";

//constants
import {cleanFiltersText} from '../constants/texts';

const ProductList = () => {

  const { products } = useSelector((state) => state.shop);
  const { pagination } = useSelector((state) => state.shop);
  const { filters } = useSelector((state) => state.shop);

  //price: is the price between the min price and the max price of the variants and is displayed when no variant is selected. (Example $100-$150)
  const getPriceRange = (product) => {
    let price;
    if (product){
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

  if (!products) return <Loading />
  
  return (
    <>
      {products
        .filter(x => filters.productType === x.productType || filters.productType === cleanFiltersText)
        .filter(x => !filters.searchInputText || x.title.toLowerCase().includes(filters.searchInputText.toLowerCase()))
        .slice(pagination.productsFrom, pagination.productsTo)
        .map((product) => (
        <div className="group text-center" key={product.id}>
          <Link to={`/product/${product.id}`} >
            <div className="w-full aspect-w-1 aspect-h-1 bg-gray-200 rounded-lg overflow-hidden xl:aspect-w-7 xl:aspect-h-8">
              <img
                src={product.images[0].src}
                alt={product.title}
                className="w-full h-full object-center object-cover group-hover:opacity-75"
                loading="lazy"
              />
            </div>
          </Link>

          <div className="">
            <Link to={`/product/${product.id}`} >
              <h3 className="mt-4 text-sm text-gray-700 pr-2 pl-2">{product.title}</h3>
            </Link>
            <p className="mt-1 text-lg font-medium text-gray-900 pr-2 pl-2">{getPriceRange(product)}</p>
            <button className="hidden mt-4 bg-range-blue text-white font-bold py-2 px-4 rounded-md shadow-lg">
              Add to cart
            </button>  
          </div>

        </div>
      ))}
    </>
  );
};

export default ProductList;