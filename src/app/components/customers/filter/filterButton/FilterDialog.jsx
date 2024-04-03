"use client";

import Button from "@/components/shared/button";
import { Dialog as HuiDialog, Transition } from "@headlessui/react";
import { Fragment, useEffect, useState } from "react";
import React from "react";
import FilterForm from "./FilterForm";

const FilterDialog = ({ onClose, onSubmit, searchCriteria }) => {
  const [criteria, setCriteria] = useState(
    searchCriteria || {
      customerId: null,
      authStatus: null,
      udid: null,
      branchCode: null,
    }
  );
  const handleSubmit = () => {
    onSubmit(criteria);
  };

  const handleReset = () => {
    let newCriteria = {
      customerId: null,
      authStatus: null,
      udid: null,
      branchCode: null,
    };

    setCriteria(newCriteria);
    onSubmit(newCriteria);
  };

  useEffect(() => {
    setCriteria(searchCriteria);
  }, [searchCriteria]);

  return (
    <>
      <Transition appear show={true} as={Fragment}>
        <HuiDialog as="div" className="relative z-10" onClose={onClose}>
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
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    Filters
                  </HuiDialog.Title>
                  <div className="mt-2">
                    <FilterForm criteria={criteria} setCriteria={setCriteria} />
                  </div>

                  <div className="mt-4 flex items-center justify-end">
                    <Button
                      size="tiny"
                      variant="text"
                      color="info"
                      onClick={handleReset}
                    >
                      Reset
                    </Button>
                    <Button
                      size="tiny"
                      variant="contained"
                      color="primary"
                      onClick={handleSubmit}
                    >
                      Apply
                    </Button>
                  </div>
                </HuiDialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </HuiDialog>
      </Transition>
    </>
  );
};

export default FilterDialog;
