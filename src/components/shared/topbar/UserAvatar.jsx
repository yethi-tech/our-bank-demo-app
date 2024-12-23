import { Menu, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { FaUser } from "react-icons/fa";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const UserAvatar = ({ onSignOut, user }) => {
  return (
    <Menu as="div" className="user-avatar-container relative ml-2">
      <Menu.Button
        id="tjn-user-profile-button"
        className="relative flex focus:outline-none focus:ring-2 focus:bg-gray-200 rounded-sm hover:bg-gray-100 px-3 py-2"
      >
        <div className="flex flex-row items-center">
          <div className="mr-2 text-sm text-tenjin-primary">
            <FaUser />
          </div>
          <p className="font-semibold text-sm text-tenjin-primary">
            {user.name}
          </p>
        </div>
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
                href="/me/api-keys"
                className={classNames(
                  active ? "bg-gray-100" : "",
                  "block px-4 py-2 text-sm text-gray-700"
                )}
              >
                API Keys
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
