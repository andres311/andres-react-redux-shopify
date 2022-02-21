import React, {} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from "react-router-dom";

//redux
import { setCart, setFilters } from '../../redux';

//Utils
import ProductUtil from '../../utils/ProductUtil';

const Navbar = () => {
  
  const { checkout } = useSelector((state) => state.shop);
  const { filters } = useSelector((state) => state.shop);
  
  const dispatch = useDispatch();

  const openCart = () => {
    dispatch(setCart());
  };

  const openCategoty = () => {
    let filtersNew = {...filters};
    filtersNew.isOpenCategoty = true;
    dispatch(setFilters(filtersNew));
  }  

  return (
    <>
      <section className="sm:block hidden">
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
              <span className="text-lg">{ ProductUtil.getCartQty(checkout) }</span>
            </button>
          </div>
        </nav>
      </section>

      <section className="sm:hidden block fixed inset-x-0 bottom-0 z-10 bg-white shadow">
        <section className="block fixed inset-x-0 bottom-0 z-10 bg-white shadow">
          <div id="tabs" className="flex justify-between">
            <Link to="/"className="w-full text-blue-600 focus:text-blue-800 hover:text-blue-800 justify-center inline-block text-center pt-2 pb-1">
              <i className="text-2xl bi bi-shop"></i>
              <span className="tab tab-kategori block text-xs">Home</span>
            </Link>
            <button onClick={openCategoty} className="w-full text-blue-600 focus:text-blue-800 hover:text-blue-800 justify-center inline-block text-center pt-2 pb-1">
              <i className="text-2xl bi bi-funnel"></i>
              <span className="tab tab-kategori block text-xs">Category</span>
            </button>
            <button className="w-full text-blue-600 focus:text-blue-800 hover:text-blue-800 justify-center inline-block text-center pt-2 pb-1">
              
            </button>
            <button className="w-full text-blue-600 focus:text-blue-800 hover:text-blue-800 justify-center inline-block text-center pt-2 pb-1">

            </button>
            <button onClick={openCart} className="w-full text-blue-600 focus:text-blue-800 hover:text-blue-800 justify-center inline-block text-center pt-2 pb-1">
              <i className={`text-2xl bi bi-bag${(checkout && checkout.lineItems && checkout.lineItems.length > 0) ? "-fill" : ""}`}></i>
              <span className="text-lg">{ ProductUtil.getCartQty(checkout) }</span>
              <span className="tab tab-kategori block text-xs">Cart</span>
            </button>
          </div>
        </section>
      </section>
      
    </>
  )
}

export default Navbar;