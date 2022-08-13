import { Fragment, useEffect, useState } from "react";
import { Transition } from "@headlessui/react";
import { CheckCircleIcon } from "@heroicons/react/outline";
import { ExclamationCircleIcon, XIcon } from "@heroicons/react/solid";

const SuccessFeedback = ({ children, open, type, setFeedback }) => {
  const [show, setShow] = useState(false);
  useEffect(() => {
    setShow(open);
    setTimeout(() => {
      setShow(false);
      setFeedback((state) => ({ ...state, show: false }));
    }, 5000);
  }, [open]);

  return (
    <div
      aria-live="assertive"
      className="fixed inset-0 flex items-end px-4 py-24 pointer-events-none sm:items-start z-10"
    >
      <div className="w-full flex flex-col items-center space-y-4 sm:items-end">
        {/* Notification panel, dynamically insert this into the live region when it needs to be displayed */}
        <Transition
          show={show}
          as={Fragment}
          enter="transform ease-out duration-300 transition"
          enterFrom="translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-2"
          enterTo="translate-y-0 opacity-100 sm:translate-x-0"
          leave="transition ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="max-w-sm w-full bg-white shadow-lg rounded-lg pointer-events-auto ring-1 ring-black ring-opacity-5 overflow-hidden">
            <div className="p-4">
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  {type === "fail" && (
                    <ExclamationCircleIcon
                      className="h-6 w-6 text-red-500"
                      aria-hidden="true"
                    />
                  )}
                  {type === "success" && (
                    <CheckCircleIcon
                      className="h-6 w-6 text-green-400"
                      aria-hidden="true"
                    />
                  )}
                </div>
                <div className="ml-3 w-0 flex-1 pt-0.5">
                  <p
                    className={`text-sm font-medium ${
                      type === "success" ? "text-green-400" : "text-red-500"
                    }`}
                  >
                    {children}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Transition>
      </div>
    </div>
  );
};

export default SuccessFeedback;
