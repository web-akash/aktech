import { TextField } from "@mui/material";
import React, { useState } from "react";
import { Input, Select, Space } from "antd";
const { TextArea } = Input;
import { ToastContainer, toast } from "react-toastify";
import axios from "../Axios/Axios";
import LoadingButton from "@mui/lab/LoadingButton";
import SendIcon from "@mui/icons-material/Send";
const UploadTheme = () => {
  const [data, setData] = useState({
    titel: "",
    link: "",
    thumbnail: null,
    price: "",
    discountPrice: "",
    discription: "",
    category: "All WebSite",
    features: "",
    templates: "",
  });
  const handleChange = (e) => {
    if (e.target.name === "thumbnail") {
      setData({ ...data, thumbnail: e.target.files[0] });
    } else {
      const { name, value } = e.target;
      setData({ ...data, [name]: value });
      console.log(data);
    }
  };
  const handleOption = (value) => {
    console.log(value);
  };
  const [loading, setLoading] = useState(false);

  const handelSubmit = async () => {
    try {
      setLoading(true);
      let res = await axios.post("/api/themes/upload", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      // Reset the form and show success toast
      setData({
        titel: "",
        link: "",
        thumbnail: null,
        price: "",
        discountPrice: "",
        discription: "",
        category: "All WebSite",
        features: "",
        templates: "",
      });

      document.getElementById("formFileSm").value = null;

      toast.success("Uploaded Successfully", {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } catch (error) {
      console.error(error);
      toast.error("Upload Failed", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } finally {
      setLoading(false);
    }
  };

  console.log(data);
  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={1000}
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
      <div className="flex flex-wrap items-center gap-2 justify-between">
        <Input
          name="link"
          size="large"
          onChange={handleChange}
          placeholder="Link"
          value={data.link}
          style={{ width: "30%" }}
        />
        <Input
          name="titel"
          size="large"
          onChange={handleChange}
          style={{ width: "30%" }}
          value={data.titel}
          placeholder="Titel"
        />
        <Input
          onChange={handleChange}
          size="large"
          placeholder="Price"
          name="price"
          style={{ width: "30%" }}
          value={data.price}
        />
        <Input
          name="discountPrice"
          onChange={handleChange}
          size="large"
          placeholder="Discount Price"
          style={{ width: "30%" }}
          value={data.discountPrice}
        />
        <Select
          defaultValue="All WebSite"
          style={{
            width: "30%",
          }}
          size="large"
          onChange={(value) => setData({ ...data, category: value })}
          options={[
            {
              value: "All WebSite",
              label: "All WebSite",
            },
            {
              value: "eCommerce",
              label: "eCommerce",
            },
            {
              value: "business",
              label: "business",
            },
            {
              value: "portfolio",
              label: "portfolio",
            },
            {
              value: "Blog&NewsWebsite",
              label: "Blog & News Website",
            },
            {
              value: "Health&WebSite",
              label: "Health WebSite",
            },
            {
              value: "ResturentWebSite",
              label: "Resturent WebSite",
            },
            {
              value: "Travel&Tourism",
              label: "Travel & Tourism",
            },
            {
              value: "RealStateWebSite",
              label: "Real State WebSite",
            },
            {
              value: "Education&WebSite",
              label: "Education WebSite",
            },
            {
              value: "Entertainment",
              label: "Entertainment",
            },
            {
              value: "Hotel&Resort",
              label: "Hotel & Resort",
            },
            {
              value: "Managment-Web-App",
              label: "Managment web app",
            },
          ]}
        />
        <div className="flex  items-center justify-center w-[30%] ">
          <div className=" flex items-center w-full">
            <label
              for="formFileSm"
              className="mb-2 inline-block text-neutral-700 dark:text-neutral-200"
            ></label>
            <input
              className="relative m-0 block w-full min-w-0 flex-auto cursor-pointer rounded border border-solid border-neutral-300 bg-clip-padding px-3 py-[0.32rem] text-xs font-normal text-neutral-700 transition duration-300 ease-in-out file:-mx-3 file:-my-[0.32rem] file:cursor-pointer file:overflow-hidden file:rounded-none file:border-0 file:border-solid file:border-inherit file:bg-neutral-100 file:px-3 file:py-[0.32rem] file:text-neutral-700 file:transition file:duration-150 file:ease-in-out file:[border-inline-end-width:1px] file:[margin-inline-end:0.75rem] hover:file:bg-neutral-200 focus:border-primary focus:text-neutral-700 focus:shadow-te-primary focus:outline-none dark:border-neutral-600 dark:text-neutral-200 dark:file:bg-neutral-700 dark:file:text-neutral-100 dark:focus:border-primary"
              id="formFileSm"
              type="file"
              name="thumbnail"
              onChange={handleChange}
            />
          </div>
        </div>
      </div>

      <div>
        <TextArea
          style={{ marginTop: "20px" }}
          placeholder="Theme Discription"
          rows={6}
          value={data.discription}
          name="discription"
          onChange={handleChange}
        />
        <TextArea
          onChange={handleChange}
          name="features"
          style={{ marginTop: "20px" }}
          value={data.features}
          placeholder="Theme Features"
          rows={6}
        />
        <TextArea
          onChange={handleChange}
          name="templates"
          style={{ marginTop: "20px" }}
          placeholder="Theme Templates in Zip"
          value={data.templates}
          rows={6}
        />
      </div>
      <div className="text-center">
        {loading ? (
          <LoadingButton
            sx={{ marginTop: "20px" }}
            size="medium"
            loading={loading}
            endIcon={<SendIcon />}
            loadingPosition="end"
            variant="contained"
          >
            <span>Uploading</span>
          </LoadingButton>
        ) : (
          <button
            onClick={handelSubmit}
            className="py-2 px-10 rounded-md bg-[#004282] transition-all text-white hover:bg-gray-300 hover:text-[#004282] mt-5  "
          >
            Upload
          </button>
        )}
      </div>
    </>
  );
};

export default UploadTheme;
