import React, { Fragment } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Dialog, Transition } from '@headlessui/react'
import { Link } from "react-router-dom";

//ShopifyProvider
import ShopifyProvider from '../services/ShopifyBuyManager';

//redux
import { removeCart, setCart, setCheckout } from '../redux';

const Cart = () => {

  const dispatch = useDispatch();
  const { isCartOpen, checkout } = useSelector((state) => state.shop);
  
  const closeCart = () => {
    dispatch(removeCart());
  };

  const removeItemFromCheckout = async (variantId) => {
    const linesToRemove = [variantId];
    const res = await ShopifyProvider.removeItemsFromCheckout(checkout.id, linesToRemove);
    dispatch(setCheckout(res));
    dispatch(setCart());
  }

  if (checkout && checkout.lineItems) {

    return (
      <>
        <Transition.Root show={isCartOpen} as={Fragment}>
          <Dialog as="div" className="fixed inset-0 overflow-hidden z-10" onClose={closeCart}>
            <div className="absolute inset-0 overflow-hidden">
              <Transition.Child
                as={Fragment}
                enter="ease-in-out duration-500"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="ease-in-out duration-500"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <Dialog.Overlay className="absolute inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
              </Transition.Child>

              <div className="fixed inset-y-0 right-0 pl-10 max-w-full flex">
                <Transition.Child
                  as={Fragment}
                  enter="transform transition ease-in-out duration-500 sm:duration-700"
                  enterFrom="translate-x-full"
                  enterTo="translate-x-0"
                  leave="transform transition ease-in-out duration-500 sm:duration-700"
                  leaveFrom="translate-x-0"
                  leaveTo="translate-x-full"
                >
                  <div className="w-screen max-w-md">
                    <div className="h-full flex flex-col bg-white shadow-xl overflow-y-scroll">
                      <div className="flex-1 py-6 overflow-y-auto px-4 sm:px-6">
                        <div className="flex items-start justify-between">
                          <Dialog.Title className="text-lg font-medium text-gray-900">Shopping cart</Dialog.Title>
                          <div className="ml-3 h-7 flex items-center">
                            <button type="button" className="-m-2 p-2 text-gray-400 hover:text-gray-500" onClick={closeCart} >
                              <span className="sr-only">Close panel</span>
                              <i className="bi bi-x-lg"></i>
                            </button>
                          </div>
                        </div>

                        <div className="mt-8">
                          <div className="flow-root">
                            
                            <div className={`text-3xl text-gray-500 mt-6 text-center ${(checkout && checkout.lineItems && checkout.lineItems.length > 0) ? "hidden" : ""}`} >
                              Your cart is empty 
                              <button type="button" className="mt-6 text-indigo-600 hover:text-indigo-500" onClick={closeCart}>
                                Continue Shopping
                              </button>
                            </div>

                            <ul role="list" className="divide-y divide-gray-200">
                              {checkout.lineItems.map((item) => (
                                <li key={item.id} className="py-6 flex">
                                  <div className="flex-shrink-0 w-24 h-26 border border-gray-200 rounded-md overflow-hidden">
                                    <img src={item.variant.image.src} alt={item.variant.title} className="w-full h-full object-center object-cover" loading="lazy" />
                                  </div>
                                  <div className="ml-4 flex-1 flex flex-col">
                                    <div>
                                      <div className="flex justify-between text-base font-medium text-gray-900">
                                        <h3> {item.title} </h3>
                                        <p className="hidden ml-4">{item.variant.title}</p>
                                      </div>
                                      <p className="mt-1 text-sm text-gray-500">{item.variant.priceV2.currencyCode + " " + item.variant.priceV2.amount}</p>
                                      {item.variant.selectedOptions.map((options) => (
                                        <p key={options.name+"-"+options.value} className="text-sm text-gray-400 text-right">{options.name}: <span className="text-gray-600">{options.value}</span></p>
                                      ))}
                                    </div>
                                    <div className="flex-1 flex items-end justify-between text-sm">
                                      <p className="text-gray-400">Qty: <span className="text-gray-600">{item.quantity}</span></p>
                                      <div className="flex">
                                        <button onClick={() => removeItemFromCheckout(item.id)} type="button" className="font-medium text-indigo-600 hover:text-indigo-500"> Remove </button>
                                      </div>
                                    </div>
                                  </div>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>

                      <div className={`${(checkout && checkout.lineItems && checkout.lineItems.length > 0) ? "" : "hidden"} border-t border-gray-200 py-6 px-4 sm:px-6`}>
                        <div className="flex justify-between text-base font-medium text-gray-900">
                          <p>Subtotal</p>
                          <p>{checkout.totalPriceV2.currencyCode + " " + parseFloat(checkout.totalPriceV2.amount).toFixed(2)}</p>
                        </div>
                        <p className="mt-0.5 text-sm text-gray-500">
                          Shipping and taxes calculated at checkout.
                        </p>
                        <div className="mt-6">
                          <a w="100%" href={checkout.webUrl} target="_blank" rel="noopener noreferrer" className="flex justify-center items-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700">
                              Checkout
                          </a>                        
                        </div>
                        <div className="mt-6 flex justify-center text-sm text-center text-gray-500">
                          <p>
                            or {' '}
                            <Link to="/store"  type="button" className="text-indigo-600 font-medium hover:text-indigo-500" onClick={closeCart}>
                              Continue Shopping<span aria-hidden="true"> &rarr;</span>
                            </Link>
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </Transition.Child>
              </div>
            </div>
          </Dialog>
        </Transition.Root>
      </>
    );
  }
  return null;
};

export default Cart;