import React, { Fragment } from 'react'
import { Dialog, Transition } from '@headlessui/react'

import { useSelector, useDispatch } from 'react-redux';

//componentes
import ProductDetail from '../../pages/ProductDetail';

//redux
import { setProductQuickView } from '../../redux';

export default function ProductQuickView(props) {
  
  const dispatch = useDispatch();
  const { product, productQuickView } = useSelector((state) => state.shop);

  const closeProductQuickView = () => {
    dispatch(setProductQuickView(false));
  }

  if (product){
    return (
      <Transition.Root show={productQuickView} as={Fragment}>
        <Dialog as="div" className="fixed z-10 inset-0 overflow-y-auto" onClose={closeProductQuickView}>
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
                    className="absolute p-2 top-4 right-4 text-gray-400 hover:text-gray-500 sm:top-7 md:top-7 lg:top-7 sm:right-6 md:right-6 lg:right-8"
                    onClick={closeProductQuickView}
                  >
                    <span className="sr-only">Close</span> 
                    <i className="bi bi-x-lg" aria-hidden="true"></i>
                  </button>

                  <div className="w-full">
                    <ProductDetail product={props.product} isQuicView={true}/>
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