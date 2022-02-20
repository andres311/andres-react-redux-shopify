import React, { useEffect, useState, useRef } from 'react'
import { useParams, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {isMobile} from 'react-device-detect';

//ShopifyProvider
import ShopifyProvider from '../services/ShopifyBuyManager';

//constants
import { productDetailsText, freeShippingText, addToCartButtonText } from "../constants/texts";

//components
import Loading from "../components/Loading";

//carousel
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';

//redux
import { setProduct, setCart, setCheckout } from '../redux';

//Utils
import PriceUtil from '../utils/PriceUtil';
import ProductUtil from '../utils/ProductUtil';

const ProductDetail = () => {

  const { id } = useParams();
  const { checkout, product } = useSelector((state) => state.shop);
  const dispatch = useDispatch();
  const history = useHistory();

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

  //navigate to productList
  const backToProductList = () => {
    history.push('/');
  };

  useEffect(() => {
  
    const fetchProduct = async () => {
      const res = await ShopifyProvider.fetchAllProductWithId(id);
      dispatch(setProduct(res));
      setPrice(PriceUtil.getPriceRange(res));
      setOptions(ProductUtil.getOptions(res));
    };

    if(product && product.id === id){
      //do nothing
    }else{
      fetchProduct();
    }

    fetchProduct();

    if(!isMobile){
      setIsDisplayProductDetail(true);
    }
   
  }, [id, dispatch]);

  if (!product) return <Loading />

  return (
    <div className="md:container md:mx-auto bg-gray-100">

      <div className="bg-black text-white text-center text-xs font-sans p-2">
        {freeShippingText}
      </div>

      <div className="md:flex md:flex-row">
          
        <div className="bg-gray-100 p-6 md:basis-1/2">
          
          <button className="bg-blue-900 text-white text-center text-xs font-sans p-2 mb-2" onClick={backToProductList}>
            <i className="bi bi-arrow-left"></i> Back to shop
          </button>   

          <div className="carousel slide" data-mdb-ride="carousel">
            <Carousel>
              {product.images && product.images.map(image => (
                <div key={image.id}><img src={image.src} alt={image.altText} /></div>
              ))}
            </Carousel>
          </div>
        </div>

        <div className="bg-white p-6 pt-0 pb-0 md:basis-1/2">
        
          <h1 className="text-2xl font-bold p-1 md:mt-8 text-center">
            {product.title}
          </h1>

          <div className="text-xl p-1 mb-2">
            <span>{variant ? (variant.priceV2.currencyCode + " " + variant.priceV2.amount) : price}</span>
          </div>

          <div className="p-1 mb-4 underline md:hidden" onClick={() => handleGoToProductDetailClick()}>
            {productDetailsText}
          </div>
          
          <div className={`flex justify-center rounded-lg bg-gray-100 mb-4 max-w-xl `}>
            <select className="flex justify-center p-4 rounded-lg bg-gray-100 min-w-[90%] pr-8" onChange={handleOptionsOnChange}>
              <option key="-1" value="-1"> - Select Size - </option>
              {product.variants && product.variants.map(variant => (
                <option key={variant.id} value={variant.id}> {variant.title} </option>
              ))}
            </select>
          </div>

          <span className="hidden wip">
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
          </span>       

          <div className="flex justify-center p-3 rounded-lg bg-gray-100 max-w-xl">
            <button className="bg-gray-100 text-lg w-1/3 rounded-full" onClick={() => handleSetProductQuantityClick(-1)}><i className="bi bi-dash-lg"></i></button>
            <input value={quantity} className="text-center bg-gray-100 w-1/3" disabled />
            <button className="bg-gray-100 text-lg w-1/3 rounded-full" onClick={() => handleSetProductQuantityClick(+1)}><i className="bi bi-plus-lg"></i></button>
          </div>
          
          <div className="text-center p-8 max-w-xl">
            <button className="text-white shadow-lg p-4 pl-8 pr-8 rounded-full bg-blue-800 md:hover:scale-110 transition duration-300 ease-in-out" onClick={handleAddItemToCartClick}>
              {addToCartButtonText}
            </button>
          </div>

          <hr/>
          <div ref={productDetailRef} className="font-medium p-4 pl-0" onClick={handleShowHiddeProductDetailsClick}>
            {productDetailsText}
            <span className="float-right"><i className={`bi ${isDisplayProductDetail ? "bi-dash-lg" : "bi-plus-lg"}`}></i></span>
          </div>
          <div className={`show-animated mb-2 ${isDisplayProductDetail ? "" : "hidden"}`}>
            <p>{product.description}</p>
          </div>
          <hr/>

        </div>
      </div>

    </div>
  );
};

export default ProductDetail;