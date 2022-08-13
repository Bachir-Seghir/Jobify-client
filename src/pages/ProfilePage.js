import React, { useContext, useEffect, useState } from "react";
import { Disclosure } from "@headlessui/react";
import {
  BellIcon,
  BookmarkAltIcon,
  BriefcaseIcon,
  KeyIcon,
  OfficeBuildingIcon,
  SaveAsIcon,
  UserCircleIcon,
} from "@heroicons/react/outline";

import { UserContext } from "../contexts/userContext";
import UpdateCompany from "../components/UpdateCompany";
import ManagePassword from "../components/ManagePassword";
import UpdateProfile from "../components/UpdateProfile";
import CreateCompany from "../components/CreateCompany";
import PageNotFound from "../components/PageNotFound";
import AddJob from "../components/AddJob";
import MyJobs from "../components/MyJobs";
import Applications from "../components/Applications";
import SavedJobs from "../components/SavedJobs";
import { Notifications } from "../components/Notifications";
import { useLocation } from "react-router-dom";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}
const subNavigation = [
  { name: "Profile", icon: UserCircleIcon, current: false },
  { name: "Password", icon: KeyIcon, current: false },
  { name: "Company", icon: OfficeBuildingIcon, current: false },
  { name: "Create Company", icon: OfficeBuildingIcon, current: false },
  { name: "Add Job", icon: BriefcaseIcon, current: false },
  { name: "Posted Jobs", icon: BriefcaseIcon, current: false },
  { name: "Applications", icon: SaveAsIcon, current: false },
  { name: "Saved Jobs", icon: BookmarkAltIcon, current: false },
  { name: "Notifications", icon: BellIcon, current: false },
];
const checkNewNotif = (arr) => {
  return arr.some((item) => !item.read);
};
export default function ProfilePage() {
  const location = useLocation();
  const defaultSection = location.state;
  const { user } = useContext(UserContext);
  const [section, setSection] = useState("");

  const handleNavigation = (e, item) => {
    e.preventDefault();
    setSection(item.name);
    subNavigation.map((link) => (link.current = false));
    item.current = true;
  };
  useEffect(() => {
    setSection(defaultSection);
  }, [defaultSection]);

  if (!user) return <PageNotFound />;
  return (
    <div className="pt-16">
      <Disclosure
        as="div"
        className="relative bg-sky-700 pb-32 overflow-hidden"
      >
        {({ open }) => (
          <>
            <div
              aria-hidden="true"
              className={classNames(
                open ? "bottom-0" : "inset-y-0",
                "absolute inset-x-0 left-1/2 transform -translate-x-1/2 w-full overflow-hidden lg:inset-y-0"
              )}
            >
              <div className="absolute inset-0 flex">
                <div
                  className="h-full w-1/2"
                  style={{ backgroundColor: "#0a527b" }}
                />
                <div
                  className="h-full w-1/2"
                  style={{ backgroundColor: "#065d8c" }}
                />
              </div>
              <div className="relative flex justify-center">
                <svg
                  className="flex-shrink-0"
                  width={1750}
                  height={308}
                  viewBox="0 0 1750 308"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M284.161 308H1465.84L875.001 182.413 284.161 308z"
                    fill="#0084c7"
                  />
                  <path
                    d="M1465.84 308L16.816 0H1750v308h-284.16z"
                    fill="#065d8c"
                  />
                  <path
                    d="M1733.19 0L284.161 308H0V0h1733.19z"
                    fill="#0a527b"
                  />
                  <path
                    d="M875.001 182.413L1733.19 0H16.816l858.185 182.413z"
                    fill="#0a4f76"
                  />
                </svg>
              </div>
            </div>
            <header className="relative py-10">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h1 className="text-3xl font-bold text-white">Settings</h1>
              </div>
            </header>
          </>
        )}
      </Disclosure>

      <main className="relative -mt-32">
        <div className="max-w-screen-xl mx-auto pb-6 px-4 sm:px-6 lg:pb-16 lg:px-8">
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="divide-y divide-gray-200 lg:grid lg:grid-cols-12 lg:divide-y-0 lg:divide-x">
              <aside className="py-6 lg:col-span-3">
                <nav className="space-y-1">
                  {subNavigation.map((item) => {
                    if (
                      user.accountType === "employer" &&
                      (item.name === "Applications" ||
                        item.name === "Saved Jobs")
                    ) {
                      return;
                    }
                    if (
                      user.accountType === "condidate" &&
                      (item.name === "Company" ||
                        item.name === "Create Company" ||
                        item.name === "Add Job" ||
                        item.name === "Posted Jobs")
                    ) {
                      return;
                    }
                    if (
                      user.accountType === "employer" &&
                      !user.company &&
                      item.name === "Company"
                    ) {
                      return;
                    }

                    return (
                      <button
                        onClick={(e) => handleNavigation(e, item)}
                        key={item.name}
                        className={classNames(
                          item.current
                            ? "bg-sky-50 border-sky-500 text-sky-700 hover:bg-sky-50 hover:text-sky-700"
                            : "border-transparent text-gray-900 hover:bg-gray-50 hover:text-gray-900",
                          "group border-l-4 px-3 py-2 flex items-center text-sm font-medium w-full relative"
                        )}
                        aria-current={item.current ? "page" : undefined}
                      >
                        <item.icon
                          className={classNames(
                            item.current
                              ? "text-sky-500 group-hover:text-sky-500"
                              : "text-gray-400 group-hover:text-gray-500",
                            "flex-shrink-0 -ml-1 mr-3 h-6 w-6"
                          )}
                          aria-hidden="true"
                        />
                        <span className="truncate">{item.name}</span>
                        {item.name === "Notifications" &&
                          checkNewNotif(user.notifications) && (
                            <span className=" h-3 w-3 absolute right-2 top-3">
                              <span className="left-0 top-0.5 animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-300 opacity-75"></span>
                              <span className="relative inline-flex rounded-full h-3 w-3 bg-sky-400"></span>
                            </span>
                          )}
                      </button>
                    );
                  })}
                </nav>
              </aside>
              {section === "Profile" && <UpdateProfile />}
              {section === "Applications" && <Applications />}
              {section === "Saved Jobs" && <SavedJobs />}
              {section === "Company" && <UpdateCompany />}
              {section === "Create Company" && <CreateCompany />}
              {section === "Add Job" && <AddJob />}
              {section === "Posted Jobs" && <MyJobs />}
              {section === "Password" && <ManagePassword />}
              {section === "Notifications" && <Notifications />}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
