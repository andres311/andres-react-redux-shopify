import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setPagination } from '../../redux';

//components
import Loading from "../../components/elements/Loading";

const Pagination = () => {

  const dispatch = useDispatch();

  const { products } = useSelector((state) => state.shop);
  const { pagination } = useSelector((state) => state.shop);

  const paginateAction = (paginationNew) => {
    paginationNew.productsFrom = (paginationNew.currentPage * paginationNew.productsPerPage);
    paginationNew.productsTo = (((paginationNew.currentPage+1) * paginationNew.productsPerPage) >= paginationNew.totalProducts) ? paginationNew.totalProducts : ((paginationNew.currentPage+1) * paginationNew.productsPerPage);
    dispatch(setPagination(paginationNew));
  }

  const paginate = (evt) => {
    let nextPage = evt.target.textContent - 1
    let paginationNew = {...pagination};
    paginationNew.currentPage = nextPage;
    paginateAction(paginationNew);
    window.scrollTo({top: 0, left: 0, behavior: 'smooth'});
  };

  const paginateByNumber = (nextPage) => {
    if((pagination.currentPage + nextPage) >= 0 && ((pagination.currentPage + nextPage) < pagination.totalPages)) {
      let paginationNew = {...pagination};
      paginationNew.currentPage = paginationNew.currentPage + nextPage;
      paginateAction(paginationNew);
      window.scrollTo({top: 0, left: 0, behavior: 'smooth'});
    }
  };

  if (!products) return <Loading />

  return (
    <div className="bg-gray-50 px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
      <div className="flex-1 flex justify-between sm:hidden">
        <button onClick={() => paginateByNumber(-1)} className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50" >
          Previous
        </button>
        <button onClick={() => paginateByNumber(+1)} className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50" >
          Next
        </button>
      </div>

      <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
        <div>
          <p className="text-sm text-gray-700"> 
            Showing{' '}
            <span className="font-medium">{pagination.productsFrom + 1}</span>
            {' '}to{' '} 
            <span className="font-medium">{pagination.productsTo}</span> 
            {' '}of{' '}
            <span className="font-medium">{pagination.totalProducts}</span> 
            {' '}results
          </p>
        </div>
        <div className={pagination.totalPages > 1 ? "" : "hidden"}>
          <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
            <button onClick={() => paginateByNumber(-1)}  className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
              <span className="sr-only">Previous</span>
              <i className="h-5 w-5 bi bi-arrow-left"></i>
            </button>
            {pagination.pages.map((p) => (
              <button
                key={p.index}
                aria-current="page"
                onClick={(e) => paginate(e)}
                className={`${p.index === pagination.currentPage ? "z-10 bg-indigo-50 border-indigo-500 text-indigo-600 relative inline-flex items-center px-4 py-2 border text-sm font-medium" : "bg-white border-gray-300 text-gray-500 hover:bg-gray-50 hidden md:inline-flex relative items-center px-4 py-2 border text-sm font-medium"}`}
              >
                {p.pageNumber}
            </button>
            ))}
            <button onClick={() => paginateByNumber(+1)}  className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50" >
              <span className="sr-only">Next</span>
              <i className="h-5 w-5 bi bi-arrow-right"></i>
            </button>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default Pagination;

