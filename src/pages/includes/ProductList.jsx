import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from "react-router-dom";
import {isMobile} from 'react-device-detect';

//components
import Loading from "../../components/Loading";

//constants
import { cleanFiltersText } from '../../constants/texts';
import { setProduct, setProductQuickView } from '../../redux';

//Utils
import PriceUtil from '../../utils/PriceUtil';

const ProductList = () => {

  const dispatch = useDispatch();

  const { products } = useSelector((state) => state.shop);
  const { pagination } = useSelector((state) => state.shop);
  const { filters } = useSelector((state) => state.shop);
 
  const openQuickView = (id) => {
    const productToView = products.find(product => product.id === id);
    dispatch(setProduct(productToView));
    dispatch(setProductQuickView(true));
  }

  if (!products) return <Loading />;
  
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
            <p className="mb-2 mt-1 text-lg font-medium text-gray-900 pr-2 pl-2">{ PriceUtil.getPriceRange(product)}</p>
            <button 
              onClick={() => openQuickView(product.id)}
              type="button" 
              className="underline md:float-left bg-opacity-75 py-2 px-4 rounded-md text-sm text-white-900"
            >
              Quick View
            </button>              
            <Link to={`/product/${product.id}`} 
              type="button" 
              className="underline md:float-right bg-opacity-75 py-2 px-4 rounded-md text-sm text-white-900"
            >
            Details
          </Link>                    
          </div>



        </div>
      ))}
    </>
  );
};

export default ProductList;