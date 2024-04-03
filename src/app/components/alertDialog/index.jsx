"use client";

import React, { Fragment, useState } from "react";
import PropTypes from "prop-types";
import { Dialog as HuiDialog, Transition } from "@headlessui/react";
import Button from "@/components/shared/button";
import clsx from "clsx";

const AlertDialog = ({ type, title, message, onClose }) => {
  const [open, setOpen] = useState(true);

  const closeModal = () => {
    setOpen(false);
    if (onClose) {
      onClose();
    }
  };

  return (
    <Transition appear show={open} as={Fragment}>
      <HuiDialog
        as="div"
        className="relative z-10 tenjin-alert-dialog"
        onClose={closeModal}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <HuiDialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <HuiDialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-gray-900 tenjin-alert-dialog__title"
                >
                  {title}
                </HuiDialog.Title>
                <div
                  className={clsx("mt-2", "rounded-md", "p-4", {
                    "border-tenjin-error-light": type === "error",
                    border: type === "error",
                  })}
                >
                  <p
                    className={clsx("text-sm", {
                      "text-tenjin-error": type === "error",
                      "text-gray-700": type !== "error",
                    })}
                  >
                    {message}
                  </p>
                </div>

                <div className="mt-4 flex items-center justify-end">
                  <Button
                    size="tiny"
                    variant="contained"
                    color="primary"
                    onClick={closeModal}
                  >
                    Ok
                  </Button>
                </div>
              </HuiDialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </HuiDialog>
    </Transition>
  );
};

AlertDialog.propTypes = {};

export default AlertDialog;
