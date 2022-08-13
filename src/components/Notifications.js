import React, { useContext, useEffect, useState } from "react";

import { UserContext } from "../contexts/userContext";
import LoadingSpinner from "../components/LoadingSpinner";
import axios from "axios";
import { API_URL } from "../utils/urls";
import { ChevronRightIcon, EyeIcon } from "@heroicons/react/solid";
import SuccessFeedback from "./SuccessFeedback";
import { Link } from "react-router-dom";
import { levels, places, types } from "../utils/seedData";
import SelectList from "./SelectList";
import { format } from "timeago.js";
import NoteModal from "./NoteModal";

export const Notifications = () => {
  // States
  const [notifications, setNotifications] = useState([]);
  const [note, setNote] = useState(null);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  // Context invocation
  const { user, jwt, me } = useContext(UserContext);

  const readNotification = async (newNotes) => {
    axios
      .put(
        `${API_URL}/users/me`,
        {
          notifications: newNotes,
        },
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        }
      )
      .then((res) => {
        me();
      });
  };

  const handleNoteClick = (note) => {
    setNote(note);
    setOpen(true);
    if (!note.read) {
      const newNotes = notifications.map((item) => {
        if (item.id === note.id) {
          return { ...item, read: true };
        }
        return item;
      });
      readNotification(newNotes);
    }
  };

  useEffect(() => {
    user && setNotifications(user.notifications.reverse());
  }, [user]);

  return (
    <div className="py-6 px-4 sm:p-6 lg:pb-8 col-span-9">
      <NoteModal note={note} open={open} setOpen={setOpen} />
      <div>
        <h2 className="text-lg leading-6 font-medium text-gray-900">
          Notifications
        </h2>
      </div>

      <ul role="list" className="flex flex-col gap-y-2 ">
        {!notifications.length && (
          <h2 className="py-4 col-span-4 text-sm leading-6 font-medium text-yellow-500">
            You don't have notifications !
          </h2>
        )}
        {notifications.map((note) => (
          <li
            onClick={() => handleNoteClick(note)}
            key={note.id}
            className={`relative bg-white py-5 px-4 hover:bg-gray-100 border border-gray-100 rounded-md 
                ${
                  note.read
                    ? "bg-white"
                    : "bg-gradient-to-r from-sky-100 via-sky-50 to-white"
                }
                `}
          >
            <div className="flex justify-between space-x-3 ">
              <div className="min-w-0 flex-1">
                <a href="#" className="block focus:outline-none">
                  <span className="absolute inset-0" aria-hidden="true" />
                  <p className="text-sm font-medium text-gray-900 capitalize">
                    {note.from.fullname}
                  </p>
                </a>
              </div>
              <time
                dateTime={note.date}
                className="flex-shrink-0 whitespace-nowrap text-sm text-gray-500"
              >
                {format(note.date)}
              </time>
            </div>
            <div className="mt-1">
              <p className="line-clamp-2 text-sm text-gray-600">
                {note.subject}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};
