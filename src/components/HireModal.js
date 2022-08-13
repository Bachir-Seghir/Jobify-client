import { Fragment, useContext, useEffect, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { CheckIcon } from "@heroicons/react/outline";
import { BriefcaseIcon } from "@heroicons/react/solid";
import axios from "axios";
import { API_URL } from "../utils/urls";
import { UserContext } from "../contexts/userContext";

export default function HireModal({ condidate, open, setOpen }) {
  const { user, jwt } = useContext(UserContext);
  const [message, setMessage] = useState("");
  const [title, setTitle] = useState("");

  const cancelButtonRef = useRef(null);

  const handleSendInvitation = () => {
    if (title && message) {
      axios
        .put(
          `${API_URL}/hire`,
          {
            id: condidate.id,
            subject: `Hello,${condidate.fullname}. ${user.username} send you a Hire invitation`,
            message: message,
            date: new Date().toISOString(),
          },
          {
            headers: {
              Authorization: `Bearer ${jwt}`,
            },
          }
        )
        .then((res) => {
          setOpen(false);
        });
    }
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
              <Dialog.Panel className="relative bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:max-w-lg sm:w-full sm:p-6">
                <div>
                  <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100">
                    <BriefcaseIcon
                      className="h-6 w-6 text-green-600"
                      aria-hidden="true"
                    />
                  </div>
                  <div className="mt-3 text-center sm:mt-5">
                    <Dialog.Title
                      as="h3"
                      className="text-lg leading-6 font-medium text-gray-900"
                    >
                      Hire Invitation
                    </Dialog.Title>

                    <div className="mt-2">
                      <input
                        type="text"
                        name="title"
                        id="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="block w-full border-0 pt-2.5 text-lg font-medium placeholder-gray-500 focus:ring-0"
                        placeholder="Senior Frontend Engineer"
                      />

                      <textarea
                        rows={3}
                        name="message"
                        id="message"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        className="block w-full py-4 rounded-sm resize-none placeholder-gray-500 border-1 border-gray-100 focus-within:border-sky-200 focus-within:ring-1 focus-within:ring-sky-200 sm:text-sm"
                        placeholder="Write a brief description of the Job Post..."
                      />
                    </div>
                  </div>
                </div>
                <div className="mt-5 sm:mt-6 sm:grid sm:grid-cols-2 sm:gap-3 sm:grid-flow-row-dense">
                  <button
                    type="button"
                    className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-sky-600 text-base font-medium text-white hover:bg-sky-700  sm:col-start-2 sm:text-sm"
                    onClick={handleSendInvitation}
                  >
                    send
                  </button>
                  <button
                    type="button"
                    className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 sm:mt-0 sm:col-start-1 sm:text-sm"
                    onClick={() => setOpen(false)}
                    ref={cancelButtonRef}
                  >
                    Cancel
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
