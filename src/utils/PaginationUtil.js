//IMPROVE THIS CODE!
//IT WORKS BUT IT IS UGLY AF!
export default class PaginationUtil {

  static initializePagination (pagination, totalProducts) {
    let paginationNew = {...pagination};
    paginationNew.productsFrom = 0;
    paginationNew.totalProducts = totalProducts;
    paginationNew.totalPages = Math.ceil(paginationNew.totalProducts / paginationNew.productsPerPage);
    paginationNew.productsTo = paginationNew.productsPerPage < paginationNew.totalProducts ? paginationNew.productsPerPage : paginationNew.totalProducts;
    let p = [];
    for (let i = 0; i < paginationNew.totalPages; i++) { p.push({index: i, pageNumber: i + 1}); }
    paginationNew.pages = p; 
    return paginationNew;
  }

  static paginate (pagination, products, filtersNew, cleanFiltersText) {
    let paginationNew = {...pagination};
    filtersNew.productType !== cleanFiltersText ? paginationNew.totalProducts = products.filter((x) => filtersNew.productType ? x.productType === filtersNew.productType : true).length: paginationNew.totalProducts = products.length;
    paginationNew.totalPages = Math.ceil(paginationNew.totalProducts / paginationNew.productsPerPage);
    paginationNew.currentPage = 0;
    paginationNew.productsFrom = 0;
    paginationNew.productsTo = paginationNew.productsPerPage < paginationNew.totalProducts ? paginationNew.productsPerPage : paginationNew.totalProducts;
    let p = [];
    for (let i = 0; i < paginationNew.totalPages; i++) { p.push({index: i, pageNumber: i + 1}); }
    paginationNew.pages = p;
    return paginationNew;    
  }

}