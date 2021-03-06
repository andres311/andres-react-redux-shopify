import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

//ShopifyProvider
import ShopifyProvider from '../services/ShopifyBuyManager';

//redux
import { setProducts, setPagination, setCategories } from '../redux';

//components
import Loading from "../components/elements/Loading";
import SelectOptions from '../components/elements/SelectOptions';

import Pagination from "../components/shared/Pagination";
import Filters from "../components/shared/Filters";
import ProductList from "../components/shared/ProductList";
import Search from "../components/shared/Search";

//Utils
import PaginationUtil from '../utils/PaginationUtil';
import ProductUtil from '../utils/ProductUtil';

const Products = () => {

  const dispatch = useDispatch();

  const { products, pagination } = useSelector((state) => state.shop);

  const [selectedIndex, setSelectedIndex] = useState(0);
  
  useEffect(() => {

    const loadProducts = async () => {
      const res = await ShopifyProvider.fetchAllProducts();
      dispatch(setProducts(res));
      dispatch(setPagination(PaginationUtil.initializePagination(pagination, res.length)));
    };

    const loadProductTypes = async () => {
      const res = await ShopifyProvider.fetchAllProductTypes();
      dispatch(setCategories(res));      
    };

    loadProductTypes();
    loadProducts();

  }, [dispatch]);


  //WIP this is not working very well
  const handleSortClick = (index) => {
    setSelectedIndex(index);
    const sortedProducts = ProductUtil.sortProducts([...products], index);
    dispatch(setProducts(sortedProducts));
  }

  //sort: every item in this array need to be implemented in ProductUtil.sortProducts
  const sortByOptions = [
    {index: 0, title: 'Sort by Default', icon: 'bi bi-arrow-down-up', action: () => handleSortClick(0), active: false},
    {index: 1, title: 'Sort by price: low to high', icon: 'bi bi-sort-numeric-down', action: () => handleSortClick(1), active: false},
    {index: 2, title: 'Sort by price: high to low', icon: 'bi bi-sort-numeric-up', action: () => handleSortClick(2), active: false},
    {index: 3, title: 'Sort by title: A to Z', icon: 'bi bi-sort-alpha-down', action: () => handleSortClick(3), active: false},
    {index: 4, title: 'Sort by title: Z to A', icon: 'bi bi-sort-alpha-up', action: () => handleSortClick(4), active: false},
  ]

  if (!products) return <Loading />

  return (
    <>
    <div className="bg-gray-100">

      <div className="max-w-2xl mx-auto py-4 px-2 sm:py-6 sm:px-3 lg:max-w-7xl lg:px-4">

        <h2 className="w-full text-4xl flex justify-center mb-4 test">
          Sample Store
        </h2>

        <section className="sm:block hidden">
          <div className="mb-2 grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
            <Filters />
            <Search />
          </div>
          <div className="w-full flex justify-end mb-2">
            <SelectOptions title="Sort by" icon="bi bi-arrow-down-up" options={sortByOptions} selectedIndex={selectedIndex}/>
          </div>
        </section>

        <div className="mb-4 grid grid-cols-1 gap-y-10 sm:grid-cols-2 gap-x-6 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
          <ProductList />
        </div>        
      </div>
    </div>

    <Pagination />

    </>
  );
};

export default Products;