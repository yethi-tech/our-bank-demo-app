import { Menu, Transition } from "@headlessui/react";
import Image from "next/image";
import React, { Fragment } from "react";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const UserAvatar = ({ onSignOut }) => {
  return (
    <Menu as="div" className="user-avatar-container relative ml-2">
      <Menu.Button
        id="tjn-user-profile-button"
        className="relative flex rounded-full focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
      >
        <span className="absolute -inset-1.5" />
        <span className="sr-only">Open user menu</span>
        <Image
          className="h-8 w-8 rounded-full"
          src="https://s.gravatar.com/avatar/82865db71cb37bbd9e2753a3402c4058?s=480&r=pg&d=https%3A%2F%2Fcdn.auth0.com%2Favatars%2Fsr.png"
          alt="Profile Image for sriram sridharan"
          width={32}
          height={32}
        />
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
        <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <Menu.Item>
            {({ active }) => (
              <a
                href="#"
                className={classNames(
                  active ? "bg-gray-100" : "",
                  "block px-4 py-2 text-sm text-gray-700"
                )}
              >
                Your Profile
              </a>
            )}
          </Menu.Item>
          <Menu.Item>
            {({ active }) => (
              <a
                href="#"
                className={classNames(
                  active ? "bg-gray-100" : "",
                  "block px-4 py-2 text-sm text-gray-700"
                )}
              >
                Settings
              </a>
            )}
          </Menu.Item>
          <Menu.Item>
            {({ active }) => (
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  if (onSignOut) {
                    onSignOut();
                  }
                }}
                className={classNames(
                  active ? "bg-gray-100" : "",
                  "block px-4 py-2 text-sm text-gray-700"
                )}
              >
                Sign out
              </a>
            )}
          </Menu.Item>
        </Menu.Items>
      </Transition>
    </Menu>
  );
};

export default UserAvatar;
