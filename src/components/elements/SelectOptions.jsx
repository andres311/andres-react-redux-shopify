import React, { Fragment, useState } from 'react'
import { Menu, Transition } from '@headlessui/react'

export default function SelectOptions(props) {

  const [selectedIndex, setSelectedIndex] = useState(0);
 
  return (
    <Menu as="div" className="relative inline-block text-left float-right">
      <div>
        <Menu.Button className="mt-4 inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500">
          {props.title}
          <i className={`ml-2 ${props.options[selectedIndex].icon}`}></i>
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
        <Menu.Items className="z-20 origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-1">
            {props.options.map(({title, icon, action, index}) => (
              <Menu.Item key={index}>
                <button onClick={action} className={`${(selectedIndex === 0 && index === 0) ? 'hidden' : ''} block px-4 py-2 text-sm ${selectedIndex === index ? 'bg-gray-100 text-gray-900' : 'text-gray-700'}`} >
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