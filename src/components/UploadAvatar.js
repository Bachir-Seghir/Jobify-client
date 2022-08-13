import React, { useEffect, useState, useContext } from "react";
import { UserContext } from "../contexts/userContext";
import axios from "axios";
import { API_URL } from "../utils/urls";
import SuccessFeedback from "../components/SuccessFeedback";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const UploadAvatar = () => {
  const { user, jwt, me } = useContext(UserContext);
  const [avatar, setAvatar] = useState(null);
  const [preview, setPreview] = useState(null);
  const [ImageId, setImageID] = useState(null);
  const [feedback, setFeedback] = useState({
    show: false,
    message: "",
    type: "",
  });
  const handleFileChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      const ImgFile = event.target.files[0];
      setAvatar(ImgFile);
      const objectUrl = URL.createObjectURL(ImgFile);
      setPreview(objectUrl);
    }
  };

  const handleApply = async (e) => {
    e.preventDefault();
    const formData = new FormData();

    formData.append("files", avatar);
    axios
      .post(`${API_URL}/upload`, formData, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      })
      .then((response) => {
        setFeedback((state) => ({
          ...state,
          show: true,
          message: "Avatar Uploaded Successfully",
          type: "success",
        }));
        const imgUrl = response.data[0].url;
        return axios
          .put(
            `${API_URL}/users/me`,
            {
              avatar: imgUrl,
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
      })

      .catch((error) => console.log(error.message));
  };
  return (
    <div className="mt-6 flex-grow lg:mt-0 lg:ml-6 lg:flex-grow-0 lg:flex-shrink-0 flex flex-col items-center justify-center">
      <SuccessFeedback
        open={feedback.show}
        type={feedback.type}
        setFeedback={setFeedback}
      >
        {feedback.message}
      </SuccessFeedback>
      <p
        className="text-sm font-medium text-gray-700 text-center mb-2"
        aria-hidden="true"
      >
        Photo
      </p>

      <div className="relative rounded-full overflow-hidden ">
        <img
          className="relative rounded-full w-40 h-40 object-cover object-top border border-1 border-gray-200"
          src={
            preview
              ? preview
              : user?.avatar ||
                "https://fromlittlethings.com/wp-content/plugins/wp-social-reviews/assets/images/template/review-template/placeholder-image.png"
          }
          alt=""
        />
        <label
          htmlFor="desktop-user-photo"
          className="absolute inset-0 w-full h-full bg-black bg-opacity-75 flex items-center justify-center text-sm font-medium text-white opacity-0 hover:opacity-100 focus-within:opacity-100"
        >
          <span>Change</span>
          <span className="sr-only"> user photo</span>
          <input
            type="file"
            id="desktop-user-photo"
            name="user-photo"
            onChange={handleFileChange}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer border-gray-300 rounded-md"
          />
        </label>
      </div>
      {avatar && (
        <button
          onClick={handleApply}
          className="mt-2 bg-sky-600 border border-transparent rounded-md shadow-sm py-1 px-4 inline-flex justify-center text-sm font-medium text-white hover:bg-sky-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500"
        >
          Apply
        </button>
      )}
    </div>
  );
};

export default UploadAvatar;
