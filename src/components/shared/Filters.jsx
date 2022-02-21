import React, { Fragment, useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setPagination, setFilters } from '../../redux';
import { Dialog, Transition } from '@headlessui/react'

//constants
import {cleanFiltersText} from '../../constants/texts';

//Utils
import PaginationUtil from '../../utils/PaginationUtil';

const Filters = () => {

  const dispatch = useDispatch();
  const ref = useRef(null)

  const { products } = useSelector((state) => state.shop);
  const { pagination } = useSelector((state) => state.shop);
  const { filters } = useSelector((state) => state.shop);
  const { categories } = useSelector((state) => state.shop);
  
  const [ isOpenFIlters, setIsOpenFilters ] = useState(false);

  const handdleSetCategoryClick = (evt) => {

    let productType = evt.target.textContent

    let filtersNew = {...filters};
    filtersNew.productType = productType;
    const paginationNew = PaginationUtil.paginate(pagination, products, filtersNew, cleanFiltersText);
    dispatch(setPagination(paginationNew));
    dispatch(setFilters(filtersNew));
    closeFilters();
  };

  useEffect(() => {
    
    const filtersInit = async () => {
      let filtersNew = {...filters};
      filtersNew.productType = cleanFiltersText;
      filtersNew.searchInputText = ''
      dispatch(setFilters(filtersNew));
    };

    filtersInit();

  }, [dispatch]);

  const closeFilters = () => {
    setIsOpenFilters(false);
  }

  const openFilters = () => {
    setIsOpenFilters(true);
  }

  return (
    <>
      <Transition.Root show={isOpenFIlters} as={Fragment}>
        <Dialog initialFocus={ref} as="div" className="fixed inset-0 overflow-hidden z-10" onClose={closeFilters}>
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

            <div className="fixed inset-y-0 left-0 pr-10 max-w-full flex">
              <Transition.Child
                as={Fragment}
                enter="transform transition ease-in-out duration-500 sm:duration-900"
                enterFrom="translate-x-[-100%]"
                enterTo="translate-x-0"
                leave="transform transition ease-in-out duration-500 sm:duration-900"
                leaveFrom="translate-x-full"
                leaveTo="translate-x-[-100%]"
              >
                <div className="w-screen max-w-md">
                  <div className="h-full flex flex-col bg-white shadow-xl overflow-y-scroll">
                    <div className="flex-1 py-6 overflow-y-auto px-4 sm:px-6">
                      <div className="flex items-start justify-between">
                        <Dialog.Title className="text-lg font-medium text-gray-900 text-center w-full">
                          Categories
                        </Dialog.Title>
                        <div className="ml-3 h-7 flex items-center">
                          <button type="button" className="p-2 text-gray-400 hover:text-gray-500" onClick={closeFilters} >
                            <span className="sr-only">Close panel</span>
                            <i className="bi bi-x-lg"></i>
                          </button>
                        </div>
                      </div>

                        <div className="mt-8">
                          <div className="flow-root">
                            <div className="grid ">
                            <button 
                                type="button"
                                onClick={(e) => handdleSetCategoryClick(e)}
                                className={`rounded-md border border-gray-300 text-gray-900 hover:text-gray-500 p-2 m-2 ${filters.productType === cleanFiltersText ? 'bg-gray-100' : ''}`} 
                              >  
                                {cleanFiltersText}
                            </button>
                            {categories.map((productType) => (
                              <button 
                                key={productType}
                                type="button"
                                onClick={(e) => handdleSetCategoryClick(e)}
                                className={`rounded-md border border-gray-300 text-gray-900 hover:text-gray-500 p-2 m-2 ${filters.productType === productType ? 'bg-gray-100' : ''}`} 
                              >{productType}</button>
                            ))}
                          </div>

                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>

      <div 
        onClick={openFilters}
        className="mr-2 w-12 inline-flex rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500">
        <i className={`bi bi-funnel${filters.productType === cleanFiltersText ? '' : '-fill'}`}></i>
      </div>
    </>
  );
};

export default Filters;