import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from "react-router-dom";

//ShopifyProvider
import ShopifyProvider from '../services/ShopifyBuyManager';

//redux
import { setCart, setCheckout } from '../redux';

const Navbar = () => {
  
  const { checkout } = useSelector((state) => state.shop);
  const dispatch = useDispatch();

  const openCart = () => {
    dispatch(setCart());
  };

  useEffect(() => {



  }, [dispatch]);

  return (
    <>
      <nav className="p-4">
        <div className="md:container md:mx-auto border-sm pr-6 pl-6">
          <Link to="/" className="text-2xl float-left text-blue-600 hover:text-blue-800">
            <i className="bi bi-shop"></i>
          </Link>
          <Link to="/" className="ml-4 text-2xl text-blue-600 hover:text-blue-800">
            Sample Store
          </Link>
          <button onClick={openCart} className={`text-2xl float-right text-blue-600 hover:text-blue-800`}>
            <i className={`bi bi-bag${(checkout && checkout.lineItems && checkout.lineItems.length > 0) ? "-fill" : ""}`}></i>
          </button>
        </div>
      </nav>
    </>
  )
}

export default Navbar;