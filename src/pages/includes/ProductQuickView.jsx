import React, {useEffect, Fragment, useState, useRef } from 'react'
import { Dialog, RadioGroup, Transition } from '@headlessui/react'

import { useParams, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {isMobile} from 'react-device-detect';

//ShopifyProvider
import ShopifyProvider from '../../services/ShopifyBuyManager';

//constants
import { productDetailsText, freeShippingText, addToCartButtonText } from "../../constants/texts";

//components
import Loading from "../../components/Loading";

//redux
import { setProduct, setCart, setCheckout, setProductQuickView } from '../../redux';

//Utils
import PriceUtil from '../../utils/PriceUtil';
import ProductUtil from '../../utils/ProductUtil';

//
// import ProductQuickView from "./components/ProductQuickView"; //          
// <ProductQuickView />
//

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function ProductQuickView() {
  
  const { checkout, product, productQuickView } = useSelector((state) => state.shop);

  const dispatch = useDispatch();

  const [ quantity, setQuantity ] = useState(1);
  const [ variant, setVariant ] = useState(null);
  const [ isDisplayProductDetail, setIsDisplayProductDetail] = useState(false);
  const [ price, setPrice ] = useState("");
  const [ options, setOptions] = useState([]);

  const productDetailRef = useRef(null);
  
  //add to cart (action)
  const handleAddItemToCartClick = async () => {
    if(variant){
      const res = await ShopifyProvider.addItemToCheckout(variant.id, quantity, checkout.id)
      dispatch(setCheckout(res));
      dispatch(setCart());
    }else{
      alert("Select Size");
    }    
  }

  //product option on change (event)
  const handleOptionsOnChange = (evt) => {
    const variant_id = evt.target.value;
    const variant = product.variants.find(variant => variant.id === variant_id);
    variant ? setVariant(variant) : setVariant(null);
  }

  //scroll go to product detail (link)
  const handleGoToProductDetailClick = () => {
    setIsDisplayProductDetail(true);
    productDetailRef.current.scrollIntoView({ behavior: 'smooth' });
  }

  //acordion, show/hidde product details
  const handleShowHiddeProductDetailsClick = () => {
    isDisplayProductDetail ? setIsDisplayProductDetail(false) : setIsDisplayProductDetail(true);
  }

  //set product quantity
  const handleSetProductQuantityClick = (qty) => {
    if(quantity === 1 && qty < 0){
      //do nothing
    }else{
      setQuantity(quantity + qty);
    }
  }    

  useEffect(() => {
        
    if(!isMobile){
      setIsDisplayProductDetail(true);
    }

    setPrice(PriceUtil.getPriceRange(product));
    setOptions(ProductUtil.getOptions(product));
    
  }, [dispatch]);

  if (product){
    return (
      <Transition.Root show={productQuickView} as={Fragment}>
        <Dialog as="div" className="fixed z-10 inset-0 overflow-y-auto" onClose={() => setProductQuickView(false)}>
          <div className="flex min-h-screen text-center md:block md:px-2 lg:px-4" style={{ fontSize: 0 }}>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="hidden fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity md:block" />
            </Transition.Child>

            {/* This element is to trick the browser into centering the modal contents. */}
            <span className="hidden md:inline-block md:align-middle md:h-screen" aria-hidden="true">
              &#8203;
            </span>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 md:translate-y-0 md:scale-95"
              enterTo="opacity-100 translate-y-0 md:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 md:scale-100"
              leaveTo="opacity-0 translate-y-4 md:translate-y-0 md:scale-95"
            >
              <div className="flex text-base text-left transform transition w-full md:inline-block md:max-w-2xl md:px-4 md:my-8 md:align-middle lg:max-w-4xl">
                <div className="w-full relative flex items-center bg-white px-4 pt-14 pb-8 overflow-hidden shadow-2xl sm:px-6 sm:pt-8 md:p-6 lg:p-8">
                  <button
                    type="button"
                    className="absolute top-4 right-4 text-gray-400 hover:text-gray-500 sm:top-8 sm:right-6 md:top-6 md:right-6 lg:top-8 lg:right-8"
                    onClick={() => setProductQuickView(false)}
                  >
                    <span className="sr-only">Close</span>
                    <i className="bi bi-x-lg" aria-hidden="true"></i>
                  </button>

                  <div className="w-full grid grid-cols-1 gap-y-8 gap-x-6 items-start sm:grid-cols-12 lg:gap-x-8">
                    <div className="aspect-w-2 aspect-h-3 rounded-lg bg-gray-100 overflow-hidden sm:col-span-4 lg:col-span-5">
                      <img src={product.images[0].src} alt={product.title} className="object-center object-cover" />
                    </div>                  
                    <div className="sm:col-span-8 lg:col-span-7">
                      <h2 className="text-2xl font-extrabold text-gray-900 sm:pr-12">{}</h2>

                      <section aria-labelledby="information-heading" className="mt-2">

                        <h3 id="information-heading" className="sr-only">
                          Product information
                        </h3>

                        <p className="text-2xl text-gray-900">
                          <span>{variant ? (variant.priceV2.currencyCode + " " + variant.priceV2.amount) : price}</span>
                        </p>

                        {/* Reviews */}
                        
                      </section>

                      <section aria-labelledby="options-heading" className="mt-10">
                        
                        <h3 id="options-heading" className="sr-only">
                          Product options
                        </h3>

                        <div>
                          {options.map(opt => (
                            <div key={opt.name} className={`flex justify-center rounded-lg bg-gray-100 mb-4 max-w-xl `}>
                              <select className="flex justify-center p-4 rounded-lg bg-gray-100 min-w-[90%] pr-8" onChange={handleOptionsOnChange}>
                                <option key="-1" value="-1"> - Select {opt.name} - </option>
                                {opt.values.map(val => (
                                  <option key={val} value={val}> {val} </option>
                                ))}
                              </select>
                            </div> 
                          ))}
                        </div>

                        <button
                          className="mt-6 w-full bg-indigo-600 border border-transparent rounded-md py-3 px-8 flex items-center justify-center text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                          onClick={handleAddItemToCartClick}
                          >
                            {addToCartButtonText}
                        </button>
                        
                      </section>
                    </div>
                  </div>
                  
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>
    )
  }
  return;
}

/*
Reviews 
<div className="mt-6">
<h4 className="sr-only">Reviews</h4>
<div className="flex items-center">
  <div className="flex items-center">
    {[0, 1, 2, 3, 4].map((rating) => (
      <i
        key={rating}
        className={`bi bi-star {classNames(
          product.rating > rating ? 'text-gray-900' : 'text-gray-200',
          'h-5 w-5 flex-shrink-0'
        )}`}
        aria-hidden="true"
      />
    ))}
  </div>
  <p className="sr-only">{product.rating} out of 5 stars</p>
  <a href="#" className="ml-3 text-sm font-medium text-indigo-600 hover:text-indigo-500">
    {product.reviewCount} reviews
  </a>
</div>
</div>
*/