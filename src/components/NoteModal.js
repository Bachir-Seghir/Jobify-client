import { Fragment, useRef } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { BellIcon } from "@heroicons/react/outline";
import { format } from "timeago.js";

export default function NoteModal({ note, open, setOpen }) {
  const cancelButtonRef = useRef(null);

  const handleClick = () => {
    setOpen(false);
  };

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        initialFocus={cancelButtonRef}
        onClose={setOpen}
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
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-end sm:items-center justify-center min-h-full p-4 text-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative bg-white rounded-lg px-4 pt-5 pb-4  overflow-hidden shadow-xl transform transition-all sm:my-8 sm:max-w-lg sm:w-full sm:p-6">
                <div>
                  <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-yellow-50">
                    <BellIcon
                      className="h-6 w-6 text-yellow-500"
                      aria-hidden="true"
                    />
                  </div>
                  <div className="mt-3 text-center sm:mt-5">
                    <Dialog.Title
                      as="h3"
                      className="text-lg leading-6 font-medium text-gray-900"
                    >
                      Notification
                    </Dialog.Title>
                  </div>
                </div>
                <div className="text-left mt-4 bg-white shadow overflow-hidden sm:rounded-lg">
                  <div className="border-t border-gray-200 px-4 py-5 sm:px-6">
                    <dl className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
                      <div className="sm:col-span-1">
                        <dt className="text-sm font-medium text-gray-500">
                          From
                        </dt>
                        <dd className="mt-1 text-sm text-gray-900">
                          {note?.from?.fullname}
                        </dd>
                      </div>
                      {note?.from?.company && (
                        <div className="sm:col-span-1">
                          <dt className="text-sm font-medium text-gray-500">
                            Company
                          </dt>
                          <dd className="mt-1 text-sm text-gray-900">
                            {note?.from?.company.name}
                          </dd>
                        </div>
                      )}

                      <div className="sm:col-span-1">
                        <dt className="text-sm font-medium text-gray-500">
                          Email
                        </dt>
                        <dd className="mt-1 text-sm text-gray-900">
                          {note?.from?.email}
                        </dd>
                      </div>
                      <div className="sm:col-span-1">
                        <dt className="text-sm font-medium text-gray-500">
                          Date
                        </dt>
                        <dd className="mt-1 text-sm text-gray-900">
                          {format(note?.date)}
                        </dd>
                      </div>
                      <div className="sm:col-span-2">
                        <dt className="text-sm font-medium text-gray-500">
                          Message
                        </dt>
                        <dd className="mt-1 text-sm text-gray-900">
                          {note?.message}
                        </dd>
                      </div>
                    </dl>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={handleClick}
                  className="w-30 rounded-md border border-transparent shadow-sm px-4 py-2 mt-3 bg-sky-600 text-base font-medium text-white hover:bg-sky-700 "
                >
                  Ok
                </button>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
