import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "../../Component/Axios/Axios";
import ServerLink from "../../Component/ServerLink/ServerLink";
import { ImCancelCircle } from "react-icons/im";
import { Icon } from "@iconify/react";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { IoIosCheckboxOutline } from "react-icons/io";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import LoadingSkeleton from "react-loading-skeleton";

import LoadingButton from "@mui/lab/LoadingButton";
const ThemeDetails = () => {
  const { id } = useParams();
  const naviagte = useNavigate();
  const [products, setProducts] = useState(null);
  const [regularPrice, setRegularPrice] = useState(0);
  const [premiumLogoPrice, setPremiumLogoPrice] = useState(0);
  const [open, setOpen] = useState(false);
  const [lodding, setLodding] = useState(false);
  const [moadalTitle, setModalTitle] = useState("");
  const [idTitle, setIdTitle] = useState("");
  const [modalPrice, setModalPrice] = useState("");
  const [supportPrice, setSupportPrice] = useState(0);
  const [logoPrice, setLogoPrice] = useState(0);
  const [security, setSecurity] = useState(0);
  const [domainHosting, setDomainHosting] = useState(0);
  const [loading, setLoading] = useState(true); // New loading state

  const selector = useSelector((state) => state);
  const email = selector?.user?.userValue?.data?.email;

  const handleSupportChange = (event) => {
    if (event.target.checked) {
      setSupportPrice(1000);
    } else {
      setSupportPrice(0);
    }
  };

  const handleLogoChange = (event) => {
    if (event.target.checked) {
      setLogoPrice(5000);
    } else {
      setLogoPrice(0);
    }
  };

  const handelSecurity = (event) => {
    if (event.target.checked) {
      setSecurity(2000);
    } else {
      setSecurity(0);
    }
  };

  const handelDomainHosting = (event) => {
    if (event.target.checked) {
      setDomainHosting(5000);
    } else {
      setDomainHosting(0);
    }
  };

  const totalAmount =
    regularPrice + supportPrice + logoPrice + security + domainHosting;

  console.log(totalAmount);

  let getTheme = async () => {
    try {
      let res = await axios.get("/api/themes/getThemes");
      const selectedProduct = res.data.find((p) => p._id === id);
      setProducts(selectedProduct);
      setRegularPrice(selectedProduct.price);
    } catch (e) {
      console.log(e.message);
    }
  };

  useEffect(() => {
    getTheme();
    setLoading(false);
  }, [id]);

  const [vShow, setVshow] = useState({
    show: false,
    link: "",
  });

  const handelPreview = async (product) => {
    let link = product.link;
    let kelo = product._id;
    console.log("ami dekhte chai:", product);

    const info = {
      email: email,
      productId: kelo,
    };

    try {
      const res = await axios.post("http://localhost:8000/api/ax/access", info);
      const accessTime = res.data.accessTime;
      const timeOver = res.data.message;

      console.log(accessTime ? accessTime : res.data.message);
      if (!timeOver) {
        setVshow({ show: true, link: link });
      } else {
        naviagte(`/items/${kelo}`);
      }

      if (accessTime) {
        setTimeout(() => {
          setVshow({ show: false, link: "" });
          naviagte(`/items/${kelo}`);
        }, 1000 * 60 * accessTime);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleClickOpen = (title, price, id) => {
    setOpen(true);
    setModalTitle(title);
    setModalPrice(price);
    setIdTitle(id);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleClosex = () => {
    setVshow({ show: false, link: "" });
  };

  const [info, setInfo] = useState({
    fullName: "",
    number: "",
    email: "",
    message: "",
    file: "",
    packagePrice: "",
    packageName: "",
    productId: "",
    category: "",
    webType: "",
    refWeb: "",
  });

  const hanelFileChange = (e) => {
    const file = e.target.files[0];

    if (file && e.target.name === "file") {
      console.log("file:", e.target.name);
      setInfo({ ...info, file: file });
    }
  };

  const handelChange = (e) => {
    const { name, value } = e.target;
    setInfo({ ...info, [name]: value });
    console.log(info);
  };

  const handelSubmit = async (e, pcname, price) => {
    e.preventDefault();
    try {
      setLodding(true);
      console.log("name:", pcname, price);
      const payment = await axios.post(
        "http://localhost:8000/api/payment/paymentSystem",
        {
          ...info,
          packagePrice: price,
          packageName: pcname,
          productId: idTitle,
          email: email,
          category: products.category,
        },
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setTimeout(() => {
        window.open(payment.data.url, "_blank");
        setOpen(false);
        setDomainHosting(0);
        setSecurity(0);
        setLogoPrice(0);
        setSupportPrice(0);
      }, 500);
    } catch (e) {
      console.log(e);
    } finally {
      setLodding(false);
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const featuresList = products?.features?.split(" | ");
  const templatesList = products?.templates?.split(" | ");

  if (loading) {
    // Render loading skeleton while data is being fetched
    return (
      <div>
        <LoadingSkeleton sx className="mt-28" height={1000} />
        {/* Add more loading skeletons as needed */}
      </div>
    );
  }

  return (
    <div className="bg-gray-100 py-10 ">
      <div className="bg-[#fafafa]  flex items-center h-[200px] mb-5">
        <div className="max-w-screen-2xl  relative md:px-20 px-5">
          <h1 className="md:px-0 px-5 md:text-[28px] text-[18px] text-[#333] text-left font-semibold">
            {products?.titel}
          </h1>

          <div className="flex md:px-0 px-5 flex-wrap !text-[14px] items-center ">
            <p className=" md:mr-[20px] mr-1">By AK TECH</p>
            <svg
              width="16px"
              height="16px"
              viewBox="0 0 14 14"
              class="item-header__envato-checkmark-icon"
              xmlns="http://www.w3.org/2000/svg"
              aria-labelledby="title"
              role="img"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M0.333252 7.00004C0.333252 3.31814 3.31802 0.333374 6.99992 0.333374C8.76803 0.333374 10.4637 1.03575 11.714 2.286C12.9642 3.53624 13.6666 5.23193 13.6666 7.00004C13.6666 10.6819 10.6818 13.6667 6.99992 13.6667C3.31802 13.6667 0.333252 10.6819 0.333252 7.00004ZM6.15326 9.23337L9.89993 5.48671C10.0227 5.35794 10.0227 5.15547 9.89993 5.02671L9.54659 4.67337C9.41698 4.54633 9.20954 4.54633 9.07993 4.67337L5.91993 7.83337L4.91993 6.84004C4.85944 6.77559 4.77498 6.73903 4.68659 6.73903C4.5982 6.73903 4.51375 6.77559 4.45326 6.84004L4.09993 7.19337C4.03682 7.25596 4.00133 7.34116 4.00133 7.43004C4.00133 7.51892 4.03682 7.60412 4.09993 7.66671L5.68659 9.23337C5.74708 9.29782 5.83154 9.33439 5.91993 9.33439C6.00832 9.33439 6.09277 9.29782 6.15326 9.23337Z"
                fill="#004282"
              ></path>
            </svg>
            <p className="md:mr-[20px] mr-1 text-[#004282]">Recently Updated</p>
            <svg
              width="16px"
              height="16px"
              viewBox="0 0 14 14"
              class="item-header__envato-checkmark-icon"
              xmlns="http://www.w3.org/2000/svg"
              aria-labelledby="title"
              role="img"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M0.333252 7.00004C0.333252 3.31814 3.31802 0.333374 6.99992 0.333374C8.76803 0.333374 10.4637 1.03575 11.714 2.286C12.9642 3.53624 13.6666 5.23193 13.6666 7.00004C13.6666 10.6819 10.6818 13.6667 6.99992 13.6667C3.31802 13.6667 0.333252 10.6819 0.333252 7.00004ZM6.15326 9.23337L9.89993 5.48671C10.0227 5.35794 10.0227 5.15547 9.89993 5.02671L9.54659 4.67337C9.41698 4.54633 9.20954 4.54633 9.07993 4.67337L5.91993 7.83337L4.91993 6.84004C4.85944 6.77559 4.77498 6.73903 4.68659 6.73903C4.5982 6.73903 4.51375 6.77559 4.45326 6.84004L4.09993 7.19337C4.03682 7.25596 4.00133 7.34116 4.00133 7.43004C4.00133 7.51892 4.03682 7.60412 4.09993 7.66671L5.68659 9.23337C5.74708 9.29782 5.83154 9.33439 5.91993 9.33439C6.00832 9.33439 6.09277 9.29782 6.15326 9.23337Z"
                fill="#004282"
              ></path>
            </svg>
            <p className="text-[#004282]"> Well Documented </p>
          </div>
        </div>
      </div>
      <div className="max-w-screen-2xl mx-auto relative md:px-20 px-5">
        {vShow.show ? (
          <div className="fixed  top-0 left-0 w-full h-full z-[10000] bg-black bg-opacity-70">
            <div className=" bg-white xl:w-full md:w-[80%] w-[30%] shadow-lg border-[#004282]  absolute top-[50%] left-[50%]  translate-x-[-50%] translate-y-[-50%] px-5 py-5">
              <ImCancelCircle
                className="absolute text-red-500 top-[5%] right-[5%] text-2xl cursor-pointer"
                onClick={handleClosex}
              />

              <iframe
                className="w-full h-screen p-5 "
                src={vShow.link}
              ></iframe>
            </div>
          </div>
        ) : (
          ""
        )}
        <div className="flex justify-between flex-col md:flex-row">
          <div className="md:w-[60%] w-full  overflow-y-hidden  bg-[#fafafa] border border-[#e1e8ed] rounded-md  p-5">
            <div>
              <div className="h-[400px] overflow-hidden">
                <img
                  onClick={() => handelPreview(products?.link)}
                  className="w-full   text-center cursor-pointer "
                  src={ServerLink + products?.thumbnail}
                  alt=""
                />
              </div>

              <div className="text-center">
                <button
                  onClick={() => handelPreview(products)}
                  className="py-2 px-10 rounded-md bg-[#004282] transition-all text-white hover:bg-gray-300 hover:text-[#004282] mt-5  "
                >
                  Live Preview
                </button>
              </div>
            </div>
            <div className="details mt-8">
              <p className="text-[14px] text-left text-[#666]">
                {products?.discription}
              </p>
              <h3 className="text-left text-base text-[#666] py-5 border-b">
                Features:
              </h3>
              <ul className="list-disc pl-[30px] text-sm mt-5 text-[#666]">
                {featuresList?.map((feature, index) => (
                  <li key={index}>{feature}</li>
                ))}
              </ul>

              <h3 className="text-left text-base text-[#666] py-5  border-b">
                Templates in Zip :
              </h3>
              <ul className="list-disc pl-[30px] text-sm mt-5 text-[#666]">
                {templatesList?.map((template, index) => (
                  <li key={index}>{template}</li>
                ))}
              </ul>
              <h3 className="text-left text-base text-[#666] py-5  border-b">
                How to Setup Forms:
              </h3>
              <ul className="list-disc text-[14px] pl-[30px] mt-5 text-[#666]">
                <li>
                  First, be sure you’ve Imported the form blocks from
                  Template-Kit.
                </li>
                <li>Click on “RomethemeForm” Forms in the admin menu</li>
                <li>Click “Add New”</li>
                <li>Enter a “Form Name” and then Click “Save and Edit”</li>
                <li>
                  On the Elementor canvas, Click the gray folder icon to access
                  “My Templates tab” and then choose the block of Forms you’d
                  like to import with Click Insert.
                </li>
                <li>
                  Next, you can customize the forms by setting the widget as you
                  like or just leave by default.
                </li>
                <li>Detailed Guide: https://rometheme.net/docs/</li>
              </ul>
            </div>
          </div>
          <div className="md:w-[36%] mt-[20px] md:mt-0 w-full max-h-[450px] flex-initial rounded-md bg-[#fafafa] border py-5 md:px-8 px-4 border-[#e1e8ed]">
            <div className="flex  justify-between border-b pb-4">
              <h1 className="font-medium">Regular Price</h1>
              <div className="flex items-center">
                <Icon icon="tabler:currency-taka" width={15} />
                <p>{totalAmount}</p>
                <div className="flex ml-1">
                  <Icon icon="tabler:currency-taka" width={15} />

                  <del className="font-medium flex px-[2px]  text-[12px] text-[#004282]">
                    <Icon icon="tabler:currency-taka" width={15} />
                    {products?.discountPrice}
                  </del>
                </div>
              </div>
            </div>
            <p className="text-[12px] mt-3 flex items-center">
              <IoIosCheckboxOutline /> Quality checked by AkTech
            </p>
            <p className="text-[12px] mt-2 flex items-center">
              <IoIosCheckboxOutline /> Future updates
            </p>
            <p className="text-[12px] mt-2 flex items-center">
              <IoIosCheckboxOutline /> 3 months support from Ak Tech
            </p>
            <FormControlLabel
              control={
                <Checkbox
                  size="10px"
                  sx={{ padding: "0 2px", marginLeft: "8px" }}
                  checked={supportPrice > 0}
                  onChange={handleSupportChange}
                />
              }
              label={
                <span style={{ fontSize: "12px" }}>
                  Mainteinent support 12 months 5000 Taka
                </span>
              }
            />
            <FormControlLabel
              control={
                <Checkbox
                  size="10px"
                  sx={{ padding: "0 2px", marginLeft: "8px" }}
                  checked={logoPrice > 0}
                  onChange={handleLogoChange}
                />
              }
              label={
                <span style={{ fontSize: "12px" }}>
                  With Brand Logo 5000 Taka
                </span>
              }
            />
            <FormControlLabel
              control={
                <Checkbox
                  size="10px"
                  sx={{ padding: "0 2px", marginLeft: "8px" }}
                  checked={domainHosting > 0}
                  onChange={handelDomainHosting}
                />
              }
              label={
                <span style={{ fontSize: "12px" }}>
                  Domain & Hosting 4999 Taka for one year
                </span>
              }
            />

            <FormControlLabel
              control={
                <Checkbox
                  size="10px"
                  sx={{ padding: "0 2px", marginLeft: "8px" }}
                  checked={security > 0}
                  onChange={handelSecurity}
                />
              }
              label={
                <span style={{ fontSize: "12px" }}>
                  Privacy your Data security 2000 Taka
                </span>
              }
            />
            <div className="mt-2 text-[16px] flex items-center">
              <h1>Total Price: </h1>
              <Icon icon="tabler:currency-taka" width={15} />
              <p>{totalAmount}</p>
            </div>

            <button
              onClick={() =>
                handleClickOpen(products.titel, products.price, products._id)
              }
              className="py-2 px-10 w-full  rounded-md bg-[#004282] transition-all text-white hover:bg-gray-300 hover:text-[#004282] mt-12  "
            >
              <AiOutlineShoppingCart
                size={20}
                className="inline-block mr-2 text-base"
              />
              Buy Now
            </button>
            <Link to="https://calendly.com/aklogic/30min" target="_blank">
              <button className="py-2 px-10 w-full  rounded-md bg-[#004282] transition-all text-white hover:bg-gray-300 hover:text-[#004282] mt-3  ">
                Let's Talk
              </button>
            </Link>
          </div>
        </div>
      </div>
      {/* modal */}
      <div>
        {open ? (
          <div className="fixed  top-0 left-0 w-full h-full z-[10000] bg-black bg-opacity-70">
            <div className=" bg-white xl:w-[30%] md:w-[80%] w-[80%] shadow-lg border-[#004282]  absolute top-[50%] left-[50%]  translate-x-[-50%] translate-y-[-50%] px-5 py-5">
              <ImCancelCircle
                className="absolute top-[5%] right-[5%] text-2xl cursor-pointer"
                onClick={handleClose}
              />

              <h1 className="md:text-lg text-base ">{moadalTitle}</h1>
              <p className="md:text-2xl text-base mt-4 flex items-center">
                <Icon icon="tabler:currency-taka" width={25} /> {totalAmount}
              </p>
              <form
                onSubmit={(e) => handelSubmit(e, moadalTitle, totalAmount)}
                className="mt-4"
              >
                <div className="flex flex-col gap-y-4">
                  <input
                    className="mt-4 relative m-0 block w-full border-2 border-solid border-neutral-300 px-3 py-3 border-x-0 border-t-0 rounded-none font-normal text-neutral-700 transition duration-300 ease-in-out focus:outline-none focus:border-[#004282]"
                    id="upload-photo"
                    placeholder="Full Name"
                    type="text"
                    name="fullName"
                    required
                    onChange={handelChange}
                  />
                  <input
                    className="mt-4 relative m-0 block w-full border-2 border-solid border-neutral-300 px-3 py-3 border-x-0 border-t-0 rounded-none font-normal text-neutral-700 transition duration-300 ease-in-out focus:outline-none focus:border-[#004282]"
                    id="upload-photo"
                    placeholder="Phone Number"
                    type="text"
                    name="number"
                    onChange={handelChange}
                    required
                  />
                  {/* <input
                    className="mt-4 relative m-0 block w-full border-2 border-solid border-neutral-300 px-3 py-3 border-x-0 border-t-0 rounded-none font-normal text-neutral-700 transition duration-300 ease-in-out focus:outline-none focus:border-[#004282]"
                    id="upload-photo"
                    placeholder="Email"
                    type="email"
                    name="email"
                    value={email}
                    required
                    disabled
                    onChange={handelChange}
                  /> */}
                  <textarea
                    className="px-3 py-3 border-x-0 border-t-0 border-2 font-normal text-neutral-700 focus:border-[#004282] focus:outline-none transition duration-300 ease-in-out"
                    placeholder="Your massage"
                    name="message"
                    id=""
                    cols="30"
                    rows="3"
                    onChange={handelChange}
                  ></textarea>
                </div>
                <label className="block">
                  <span className="sr-only">Choose profile photo</span>
                  <input
                    type="file"
                    accept={".pdf,image/*"}
                    name="file"
                    onChange={hanelFileChange}
                    className="block w-full text-sm text-slate-500 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-violet-50 file:text-violet-700 hover:file:bg-violet-100 mt-5"
                  />
                </label>
                <div className="flex justify-end">
                  {lodding ? (
                    <LoadingButton
                      className="rounded-md"
                      type="submit"
                      loading
                      variant="outlined"
                    >
                      <span>Submit</span>
                    </LoadingButton>
                  ) : (
                    <input
                      type="submit"
                      value="Confirm Order"
                      className="btn rounded-md bg-[#004282] px-3 py-2 text-white mt-5 cursor-pointer"
                    />
                  )}
                </div>
              </form>
            </div>
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default ThemeDetails;

// i need, when a new user see Live Preview link, this live link available  30 minutes , when over 30 minutes previous link not work , again a user after 30 minutes generate new link . how to this functionality in my this code . please modify my code  if need backend Then do it.
