import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Cookies from 'js-cookie';

//ShopifyProvider
import ShopifyProvider from '../services/ShopifyBuyManager';

//redux
import { setProducts, setPagination, setCategories, setCheckout } from '../redux';

//components
import Loading from "../components/Loading";
import OrderBy from '../components/OrderBy';
import Pagination from "../components/Pagination";
import Filters from "../components/Filters";
import ProductList from "../components/ProductList";
import Search from "../components/Search";

const Products = () => {

  const dispatch = useDispatch();

  const { products } = useSelector((state) => state.shop);
  const { pagination } = useSelector((state) => state.shop);

  useEffect(() => {

    const allProducts = async () => {
      const res = await ShopifyProvider.fetchAllProducts();
      dispatch(setProducts(res));
      let cats = [];
      res.forEach((p) => {
        if(!cats.includes(p.productType)) cats.push(p.productType);
      });
      dispatch(setCategories(cats));
      dispatch(setPagination(initializePagination(res)));
    };

    const initializePagination = (res) => {
      let paginationNew = {...pagination};
      paginationNew.productsFrom = 0;
      paginationNew.totalProducts = res.length;
      paginationNew.totalPages = Math.ceil(paginationNew.totalProducts / paginationNew.productsPerPage);
      paginationNew.productsTo = paginationNew.productsPerPage < paginationNew.totalProducts ? paginationNew.productsPerPage : paginationNew.totalProducts;
      let p = [];
      for (let i = 0; i < paginationNew.totalPages; i++) { p.push({index: i, pageNumber: i + 1}); }
      paginationNew.pages = p; 
      return paginationNew;
    };
    
    const createCheckout = async () => {
      const res = await ShopifyProvider.createCheckout();
      Cookies.set('checkout', res);
      dispatch(setCheckout(res));
    };

    createCheckout();

    allProducts();

  }, [dispatch]);


  if (!products) return <Loading />

  return (
    <>
    <div className="bg-gray-100">

      <div className="max-w-2xl mx-auto py-4 px-2 sm:py-6 sm:px-3 lg:max-w-7xl lg:px-4">

        <h2 className="w-full text-4xl flex justify-center mb-4 test">
          Sample Store
        </h2>

        <div className="mb-2 grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
          <Filters />
          <Search />
        </div>

        <div className="w-full flex justify-end mb-2">
          <OrderBy title="Sort by" icon="bi bi-chevron-compact-down" />
        </div>

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