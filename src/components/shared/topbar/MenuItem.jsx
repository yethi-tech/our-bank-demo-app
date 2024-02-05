"use client";
import React, { Fragment, cloneElement } from "react";
import { Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/24/solid";

const MenuItem = ({ item }) => {
  return item.subItems ? (
    <Menu as="div" className="relative">
      <Menu.Button className="relative font-semibold items-center flex rounded-md bg-white hover:bg-gray-100 text-tenjin-primary text-sm px-3 py-2 ">
        {item.icon && (
          <span className="button-icon mr-2">
            {cloneElement(item.icon, { className: "w-5 h-5" })}
          </span>
        )}
        {item.text}
        {item.subItems && (
          <span className="button-menu-trigger ml-2">
            <ChevronDownIcon />
          </span>
        )}
      </Menu.Button>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute p-2 left-0 z-10 mt-1 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none flex flex-col">
          {item.subItems.map((s, index) => (
            <Menu.Item key={index} className="py-1 px-2 rounded-md">
              {({ active }) => (
                <a
                  className={`${active && "bg-gray-100 text-gray-700"}`}
                  href={s.href}
                >
                  {s.text}
                </a>
              )}
            </Menu.Item>
          ))}
        </Menu.Items>
      </Transition>
    </Menu>
  ) : (
    <a
      className={
        "relative flex items-center rounded-md bg-white hover:bg-gray-100 text-tenjin-primary text-sm px-3 py-2 font-semibold"
      }
      href={item.href}
    >
      {item.icon && <span className="button-icon mr-2">{item.icon}</span>}
      {item.text}
    </a>
  );
};

export default MenuItem;
