import { useEffect, useState } from "react";
import { Icon } from "@iconify/react";
import { ImCancelCircle } from "react-icons/im";

import { Link, useNavigate } from "react-router-dom";
import axios from "../../Component/Axios/Axios";
import ServerLink from "../../Component/ServerLink/ServerLink";
import { ToastContainer, toast } from "react-toastify";
import { useSelector } from "react-redux";
import LoadingButton from "@mui/lab/LoadingButton";
import { useLocation } from "react-router-dom";

const SearchThemes = () => {
  const selector = useSelector((state) => state);
  const [searchQuery, setSearchQuery] = useState("");
  console.log(selector);
  const location = useLocation();
  const datas = new URLSearchParams(location.search).get("query");

  useEffect(() => {
    setSearchQuery(datas);
  }, [datas]);

  const [products, setProducts] = useState([]);
  const [visibleProducts, setVisibleProducts] = useState([]);
  const [open, setOpen] = useState(false);
  const [lodding, setLodding] = useState(false);

  const [moadalTitle, setModalTitle] = useState("");
  const [moadalPrice, setModalPrice] = useState("");

  const naviagte = useNavigate();
  const productsPerPage = 24;

  let getTheme = async () => {
    try {
      let res = await axios.get("/api/themes/getThemes");

      setProducts(res.data);
      if (searchQuery) {
        const filteredProducts = res.data.filter((product) =>
          product.titel.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setVisibleProducts(filteredProducts.slice(0, productsPerPage));
      } else {
        setVisibleProducts(res.data.slice(0, productsPerPage));
      }
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    getTheme();
  }, [searchQuery]);

  const handleSearchInputChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchButtonClick = () => {
    getTheme();
  };
  const handleSearchInputKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearchButtonClick();
    }
  };
  // useEffect(() => {
  //   fetch("themes.json")
  //     .then((res) => res.json())
  //     .then((data) => {
  //       setProducts(data);
  //       if (searchQuery) {
  //         const filteredProducts = data.filter((product) =>
  //           product.title.toLowerCase().includes(searchQuery.toLowerCase())
  //         );
  //         setVisibleProducts(filteredProducts.slice(0, productsPerPage));
  //       } else {
  //         setVisibleProducts(data.slice(0, productsPerPage));
  //       }
  //     });
  // }, [searchQuery]);

  const handleShowMore = () => {
    const nextPageStartIndex = visibleProducts.length;
    const nextPageEndIndex = nextPageStartIndex + productsPerPage;
    setVisibleProducts([
      ...visibleProducts,
      ...products.slice(nextPageStartIndex, nextPageEndIndex),
    ]);
  };

  const handleClickOpen = (titel, price) => {
    setOpen(true);
    setModalTitle(titel);
    setModalPrice(price);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [info, setInfo] = useState({
    fullName: "",
    number: "",
    email: "",
    message: "",
    file: null,
    packagePrice: "",
    packageName: "",
  });
  const hanelFileChange = (e) => {
    const file = e.target.files[0];
    setInfo({ ...info, file: file });
  };
  const handelChange = (e) => {
    const { name, value } = e.target;
    setInfo({ ...info, [name]: value });
    console.log(info);
  };

  const handelSubmit = async (e, pcname, price) => {
    setLodding(true);
    e.preventDefault();

    const payment = await axios
      .post("http://localhost:8000/api/payment/paymentSystem", {
        ...info,
        packagePrice: price,
        packageName: pcname,
      })
      .then(async (payment) => {
        const response = await axios.post(
          "http://localhost:8000/send-order-email",
          {
            ...info,
            packagePrice: price,
            packageName: pcname,
          },
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        setOpen(false);
        setLodding(false);

        toast.success("Order placed successfully!", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        window.location.replace(payment.data.url);
      });
  };

  const handelPreview = (link) => {
    if (selector?.user?.userValue?.data) {
      if (!link.startsWith("http://") && !link.startsWith("https://")) {
        link = "http://" + link;
      }
      window.open(link, "_blank");
    } else {
      naviagte("/singup");
    }
  };

  const handelDetails = (id) => {
    console.log(id);
    naviagte(`/items/${id}`);
  };
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <div className=" max-w-screen-2xl mx-auto  md:px-20 px-3 pb-5 ">
        <div>
          <label
            class="mx-auto mt-[100px]  relative bg-white min-w-sm max-w-2xl flex flex-col md:flex-row items-center justify-center border py-2 px-2 rounded-lg gap-2 shadow-md focus-within:border-gray-300"
            for="search-bar"
          >
            <input
              id="search-bar"
              placeholder="your keyword here"
              onChange={handleSearchInputChange}
              onKeyDown={handleSearchInputKeyDown}
              autoFocus={true}
              value={searchQuery}
              class="px-6 py-2 w-full rounded-md flex-1 outline-none bg-white"
            />
            <button class="py-2 flex items-center absolute top-[50%] right-[3%] translate-y-[-50%] px-10 rounded-md bg-[#004282] hover:text-[#004282] transition-colors text-xs text-white hover:bg-gray-300">
              <div class="relative">
                <div class="flex items-center justify-center h-3 w-3 absolute inset-1/2 -translate-x-1/2 -translate-y-1/2 transition-all">
                  <svg
                    class="opacity-0 animate-spin w-full h-full"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      class="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      stroke-width="4"
                    ></circle>
                    <path
                      class="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                </div>

                <div class="flex items-center transition-all opacity-1 valid:">
                  <span class="text-sm font-semibold whitespace-nowrap truncate mx-auto">
                    Search
                  </span>
                </div>
              </div>
            </button>
          </label>
        </div>

        <div
          className={`grid grid-cols-1 md:grid-cols-2  lg:grid-cols-2 xl:grid-cols-4 gap-x-5 md:gap-8 xl:gap-x-8 gap-y-6 mt-14 `}
        >
          {visibleProducts.map((product, index) => (
            <div
              key={index}
              className="bg-white  w-full rounded-[4px]  min-h-[292px] group shadow hover:scale-105 duration-300 px-1"
            >
              <div className="window1 p-1">
                <img
                  onClick={() => {
                    handelDetails(product._id);
                  }}
                  className="cursor-pointer window-image"
                  src={ServerLink + product.thumbnail}
                  alt={product.title}
                />
              </div>
              <div className="py-2 px-2 ">
                <h1
                  onClick={() => {
                    handelDetails(product._id);
                  }}
                  className=" cursor-pointer text-[14px] font-semibold text-[#4d4d4d]"
                >
                  {product.titel}
                </h1>
                <small className="cursor-pointer italic text-xs text-[#999]">
                  Type: {product.category}
                </small>
                <div className="mt-5">
                  <del className="font-medium flex px-[2px]  text-[12px] text-[#004282]">
                    <Icon icon="tabler:currency-taka" width={15} />
                    {product.discountPrice}
                  </del>
                </div>
                <div className="flex justify-between gap-x-8 items-center ">
                  <div className="text-[#545454] flex justify-center items-center text-[16px]">
                    <Icon icon="tabler:currency-taka" width={20} />
                    <div className="flex  flex-col">
                      <p className="font-bold leading-[8px]">{product.price}</p>
                    </div>
                  </div>
                  <div className="flex gap-1">
                    <Link
                      to=""
                      onClick={() => handelDetails(product._id)}
                      className="border w-10 h-10 flex items-center justify-center hover:bg-[#CCCCCC] duration-300 hover:text-white text-[#666] rounded-[2px]"
                    >
                      <Icon icon="mdi:cart" width={30} className="p-1 " />
                    </Link>
                    <button
                      onClick={() => handelPreview(product.link)}
                      className="border px-3 rounded-[2px] !text-[10px] border-[#004282] text-[#004282] font-semibold hover:bg-[#004282] transition-colors hover:text-white"
                    >
                      Live Preview
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div>
          {open ? (
            <div className="fixed  top-0 left-0 w-full h-full z-[10000] bg-black bg-opacity-70">
              <div className=" bg-white xl:w-[30%] md:w-[80%] w-[80%] shadow-lg border-[#004282]  absolute top-[50%] left-[50%]  translate-x-[-50%] translate-y-[-50%] px-5 py-5">
                <ImCancelCircle
                  className="absolute top-[5%] right-[5%] text-2xl cursor-pointer"
                  onClick={handleClose}
                />

                <h1 className="md:text-base text-sm">{moadalTitle}</h1>
                <p className="md:text-2xl text-base mt-4 flex items-center">
                  <Icon icon="tabler:currency-taka" width={25} /> {moadalPrice}
                </p>
                <form
                  onSubmit={(e) => handelSubmit(e, moadalTitle, moadalPrice)}
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
                    <input
                      className="mt-4 relative m-0 block w-full border-2 border-solid border-neutral-300 px-3 py-3 border-x-0 border-t-0 rounded-none font-normal text-neutral-700 transition duration-300 ease-in-out focus:outline-none focus:border-[#004282]"
                      id="upload-photo"
                      placeholder="Email"
                      type="email"
                      name="email"
                      required
                      onChange={handelChange}
                    />
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
                      onChange={hanelFileChange}
                      className="block w-full text-sm text-slate-500 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-violet-50 file:text-violet-700 hover:file:bg-violet-100 mt-5"
                    />
                  </label>
                  <div className="flex justify-end">
                    {lodding ? (
                      <LoadingButton type="submit" loading variant="outlined">
                        <span>Submit</span>
                      </LoadingButton>
                    ) : (
                      <input
                        type="submit"
                        value="Confirm Order"
                        className="btn bg-[#004282] px-3 py-2 text-white mt-5 cursor-pointer"
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
        {visibleProducts.length < products.length && (
          <div className="flex justify-center my-10">
            <button
              onClick={handleShowMore}
              className="py-2 px-10 rounded-md bg-[#004282] transition-all text-white hover:bg-gray-300 hover:text-[#004282]"
            >
              View more new items
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default SearchThemes;
