import React, { useState } from "react";
import axios from "../Axios/Axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Import the Toastify CSS
import { Input, Select, Space } from "antd";
import LoadingButton from "@mui/lab/LoadingButton";
import ThankYou from "./ThankYou";
const { TextArea } = Input;

const CustomeWebsite = () => {
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    fullName: "",
    number: "",
    email: "",
    message: "",
    file: null,
    type: "",
    reference: "",
  });

  const [formErrors, setFormErrors] = useState({
    fullName: "",
    number: "",
    email: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    // Clear previous error message when user starts typing
    setFormErrors({ ...formErrors, [name]: "" });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, file: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const isFormValid = validateForm();

    if (isFormValid) {
      const formDataToSend = new FormData();
      formDataToSend.append("fullName", formData.fullName);
      formDataToSend.append("number", formData.number);
      formDataToSend.append("email", formData.email);
      formDataToSend.append("message", formData.message);
      formDataToSend.append("file", formData.file);
      formDataToSend.append("type", formData.type);
      formDataToSend.append("reference", formData.reference);

      try {
        setLoading(true);
        const response = await axios.post("/send-order-email", formDataToSend, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        toast.success("Successfully submitted", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });

        setFormData({
          fullName: "",
          number: "",
          email: "",
          message: "",
          file: null,
        });
        setShow(true);
      } catch (error) {
        console.error("Error sending order:", error);
        setLoading(false);
      }
    }
  };

  const validateForm = () => {
    const errors = {};

    if (formData.fullName.trim() === "") {
      errors.fullName = "Full Name is required";
    }

    if (formData.number.trim() === "") {
      errors.number = "Phone Number is required";
    }

    const emailPattern = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
    if (!formData.email.match(emailPattern)) {
      errors.email = "Invalid email address";
    }

    setFormErrors(errors);

    return Object.values(errors).every((error) => error === "");
  };

  return (
    <div className="max-w-screen-2xl mx-auto">
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />

      <ToastContainer />
      {show ? (
        <ThankYou />
      ) : (
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              placeholder="Full Name"
              className={`w-full p-2 rounded ${
                formErrors.fullName && "border-red-500"
              }`}
            />
            {formErrors.fullName && (
              <p className="text-red-500 text-sm mt-1">{formErrors.fullName}</p>
            )}
          </div>
          <div className="mb-4">
            <input
              type="text"
              name="number"
              value={formData.number}
              onChange={handleChange}
              placeholder="Phone Number"
              className={`w-full p-2 rounded ${
                formErrors.number && "border-red-500"
              }`}
            />
            {formErrors.number && (
              <p className="text-red-500 text-sm mt-1">{formErrors.number}</p>
            )}
          </div>
          <div className="mb-4">
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email"
              className={`w-full p-2 rounded ${
                formErrors.email && "border-red-500"
              }`}
            />
            {formErrors.email && (
              <p className="text-red-500 text-sm mt-1">{formErrors.email}</p>
            )}
          </div>
          <div className="mb-4">
            <input
              type="type"
              name="type"
              value={formData.type}
              onChange={handleChange}
              placeholder="What is  your website type ?"
              className={`w-full p-2 rounded `}
            />
          </div>
          <div className="mb-4">
            <TextArea
              onChange={handleChange}
              name="message"
              style={{ marginTop: "20px" }}
              value={formData.message}
              placeholder="Your Requirement Description"
              rows={6}
            />
          </div>
          <div className="mb-4">
            <div className="flex items-center justify-center md:w-[20%] w-1/2">
              <div className="flex items-center w-full">
                <label
                  htmlFor="formFileSm"
                  className="mb-2 inline-block text-neutral-700 dark:text-neutral-200"
                ></label>
                <input
                  className="relative m-0 block w-full min-w-0 flex-auto cursor-pointer rounded border border-solid border-neutral-300 bg-clip-padding px-3 py-[0.32rem] text-xs font-normal text-neutral-700 transition duration-300 ease-in-out file:-mx-3 file:-my-[0.32rem] file:cursor-pointer file:overflow-hidden file:rounded-none file:border-0 file:border-solid file:border-inherit file:bg-neutral-100 file:px-3 file:py-[0.32rem] file:text-neutral-700 file:transition file:duration-150 file:ease-in-out file:[border-inline-end-width:1px] file:[margin-inline-end:0.75rem] hover:file:bg-neutral-200 focus:border-primary focus:text-neutral-700 focus:shadow-te-primary focus:outline-none dark:border-neutral-600 dark:text-neutral-200 dark:file:bg-neutral-700 dark:file:text-neutral-100 dark:focus:border-primary"
                  id="formFileSm"
                  type="file"
                  name="file"
                  onChange={handleFileChange}
                />
              </div>
            </div>
          </div>
          <div className="mb-4">
            <input
              type="type"
              name="reference"
              value={formData.type}
              onChange={handleChange}
              placeholder="You have any webSite Reference ?"
              className={`w-full p-2 rounded `}
            />
          </div>
          <div className="flex ">
            {loading ? (
              <LoadingButton type="submit" loading variant="outlined">
                <span>Submit</span>
              </LoadingButton>
            ) : (
              <input
                type="submit"
                value="Confirm Order"
                className="btn bg-[#004282] rounded-md px-3 py-2 text-white mt-5 cursor-pointer"
              />
            )}
          </div>
        </form>
      )}
    </div>
  );
};

export default CustomeWebsite;
