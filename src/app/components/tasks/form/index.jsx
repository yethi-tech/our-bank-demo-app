"use client";

import { createTodo } from "@/app/actions/tasks";
import { CONFIRM_CANCEL } from "@/app/utils/messages";
import Button from "@/components/shared/button";
import { useRouter } from "next/navigation";
import { useFormState, useFormStatus } from "react-dom";
import Success from "./Success";

const SubmitButton = () => {
  const { pending } = useFormStatus();
  return (
    <Button
      type="submit"
      disabled={pending}
      loading={pending}
      loadingText="Please wait..."
      variant="contained"
      icon="save"
    >
      Save
    </Button>
  );
};

const initialState = {
  message: "",
  success: false,
};

const AddForm = ({ onCancel }) => {
  const router = useRouter();
  const [state, formAction] = useFormState(createTodo, initialState);

  const handleCancel = () => {
    if (window.confirm(CONFIRM_CANCEL)) {
      router.push(`/branch/tasks`);
    }
  };

  const handleSuccessClose = () => {
    router.push("/branch/tasks");
  };

  const { success, message } = state;
  return (
    <div id="form">
      {success ? (
        <Success message={message} onClose={handleSuccessClose} />
      ) : (
        <form action={formAction}>
          <div className="space-y-12">
            <div className="border-b border-gray-900/10 pb-12">
              <h2 className="text-base font-semibold leading-7 text-gray-900">
                New Task
              </h2>
              <p className="mt-1 text-sm leading-6 text-gray-600">
                Create a new task here
              </p>

              <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                {state && !state.success && state.message ? (
                  <div className="mt-5 col-span-full">
                    <p className="text-tenjin-error">{state.message}</p>
                  </div>
                ) : (
                  <></>
                )}

                <div className="col-span-full">
                  <label
                    htmlFor="taskSummary"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Task Summary
                  </label>
                  <div className="mt-2">
                    <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 w-full">
                      <input
                        type="text"
                        name="taskSummary"
                        id="taskSummary"
                        autoComplete="none"
                        className="block  flex-1 border-0 bg-transparent py-1.5 pl-2 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                        placeholder="Summarize your task"
                      />
                    </div>
                  </div>
                </div>
                <div className="col-span-2">
                  <label
                    htmlFor="user"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    User
                  </label>
                  <div className="mt-2">
                    <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 w-full">
                      <input
                        id="user"
                        name="user"
                        type="text"
                        autoComplete="none"
                        className="block  flex-1 border-0 bg-transparent py-1.5 pl-2 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                        placeholder="Who is this..."
                      />
                    </div>
                  </div>
                </div>
                <div className="col-span-2">
                  <label
                    htmlFor="purpose"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Purpose
                  </label>
                  <div className="mt-2">
                    <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 w-full">
                      <input
                        id="purpose"
                        name="purpose"
                        type="text"
                        autoComplete="none"
                        className="block  flex-1 border-0 bg-transparent py-1.5 pl-2 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                        placeholder="Purpose of life..."
                      />
                    </div>
                  </div>
                </div>

                <div className="col-span-full">
                  <label
                    htmlFor="description"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Description
                  </label>
                  <div className="mt-2">
                    <textarea
                      id="description"
                      name="description"
                      rows={3}
                      className="block w-full rounded-md border-0 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      defaultValue={""}
                    />
                  </div>
                  <p className="mt-3 text-sm leading-6 text-gray-600">
                    Describe your task in detail
                  </p>
                </div>
                <div className="sm:col-span-full col-span-2">
                  <label
                    htmlFor="priority"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Priority
                  </label>
                  <div className="mt-2">
                    <select
                      id="priority"
                      name="priority"
                      className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                    >
                      <option>High</option>
                      <option>Medium</option>
                      <option>Low</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 flex items-center justify-end gap-1">
            <Button type="button" onClick={handleCancel}>
              Cancel
            </Button>
            <SubmitButton />
          </div>
        </form>
      )}
    </div>
  );
};

export default AddForm;
