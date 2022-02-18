import React, {} from 'react';
import { useSelector, useDispatch } from 'react-redux';

//redux
import { setPagination, setFilters } from '../redux';

const Search = () => {

  const dispatch = useDispatch();

  const { products } = useSelector((state) => state.shop);
  const { pagination } = useSelector((state) => state.shop);
  const { filters } = useSelector((state) => state.shop);

  const handleSearch = (evt) => {
    let searchText = evt.target.value.toLowerCase();
    let filtersNew = {...filters};
    filtersNew.searchInputText = searchText;

    let paginationNew = {...pagination};
    paginationNew.totalProducts = products.filter(x => !filters.searchInputText || x.title.toLowerCase().includes(filters.searchInputText.toLowerCase())).length;
    paginationNew.totalPages = Math.ceil(paginationNew.totalProducts / paginationNew.productsPerPage);
    paginationNew.currentPage = 0;
    paginationNew.productsFrom = 0;
    paginationNew.productsTo = paginationNew.productsPerPage < paginationNew.totalProducts ? paginationNew.productsPerPage : paginationNew.totalProducts;
    let p = [];
    for (let i = 0; i < paginationNew.totalPages; i++) { p.push({index: i, pageNumber: i + 1}); }
    paginationNew.pages = p; 

    dispatch(setPagination(paginationNew));
    dispatch(setFilters(filtersNew));    
  }  

  return (
    <>
      <input 
        name="search" 
        autoComplete="off"
        className="inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500" 
        type="text"
        placeholder="Search"
        onKeyUp={handleSearch}
      />
      <button className="" ></button>
    </>
  );
};

export default Search;