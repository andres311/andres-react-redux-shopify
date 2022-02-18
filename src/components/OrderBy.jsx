import React, { Fragment, useState } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { useSelector, useDispatch } from 'react-redux';

//redux
import { setProducts } from '../redux';

export default function ProductDetailPageOrderBy() {

  const dispatch = useDispatch();

  const { products } = useSelector((state) => state.shop);

  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [currentIcon, setCurrentIcon] = useState("bi bi-arrow-down-up");
  const [menuTitle] = useState("Sort by");

  //sort: every item in this array need to be implemented in handleSortClick
  const menuItems = [
    {index:-1, title: 'Sort by Default', icon: 'bi bi-arrow-down-up', action: () => handleSortClick(-1), active: false},
    {index: 0, title: 'Sort by price: low to high', icon: 'bi bi-sort-numeric-down', action: () => handleSortClick(0), active: false},
    {index: 1, title: 'Sort by price: high to low', icon: 'bi bi-sort-numeric-up', action: () => handleSortClick(1), active: false},
    {index: 2, title: 'Sort by title: A to Z', icon: 'bi bi-sort-alpha-down', action: () => handleSortClick(2), active: false},
    {index: 3, title: 'Sort by title: Z to A', icon: 'bi bi-sort-alpha-up', action: () => handleSortClick(3), active: false},
  ]

  //WIP this is not working very well
  const handleSortClick = (index) => {
    setSelectedIndex(index);
    const sortedProducts = [...products];
    switch (index) {
      case -1:
        sortedProducts.sort((a, b) => parseFloat(a.variants[0].createdAt) <= parseFloat(b.variants[0].createdAt) ? 1 : -1);
        break;          
      case 0:
        sortedProducts.sort((a, b) => parseFloat(a.variants[0].priceV2.amount) > parseFloat(b.variants[0].priceV2.amount) ? 1 : -1);
        //add: if is equal, sort by title too (so the same price don't appear in diferrent order)
        break;      
      case 1:
        sortedProducts.sort((a, b) => parseFloat(a.variants[0].priceV2.amount) < parseFloat(b.variants[0].priceV2.amount) ? 1 : -1);
        //add: if is equal, sort by title too (so the same price don't appear in diferrent order)
        break;
      case 2:
        sortedProducts.sort((a, b) => (a.title > b.title) ? 1 : -1);
        break;
      case 3:
        sortedProducts.sort((a, b) => (a.title < b.title) ? 1 : -1);
        break;        
      default:
        break;
    }
    menuItems.forEach(item => item.index === index ? setCurrentIcon(item.icon) : false);
    dispatch(setProducts(sortedProducts));
  }

  return (
    <Menu as="div" className="relative inline-block text-left float-right">
      <div>
        <Menu.Button className="mt-4 inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500">
          {menuTitle}
          <i className={`ml-2 ${currentIcon}`}></i>
        </Menu.Button>
      </div>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-1">
            {menuItems.map(({title, icon, action, index}) => (
              <Menu.Item key={index}>
                <button onClick={action} className={`${(selectedIndex === -1 && index === -1) ? 'hidden' : ''} block px-4 py-2 text-sm ${selectedIndex === index ? 'bg-gray-100 text-gray-900' : 'text-gray-700'}`} >
                  {title} <i className={`${icon} ml-2`}></i>
                </button>
              </Menu.Item>
            ))}
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  )
}
