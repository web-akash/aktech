import { Icon } from "@iconify/react";
import { useEffect, useState } from "react";
import { ImCancelCircle } from "react-icons/im";
import { Link, useNavigate } from "react-router-dom";
import ServerLink from "../../Component/ServerLink/ServerLink";
import axios from "../../Component/Axios/Axios";
import LoadingButton from "@mui/lab/LoadingButton";
import { ToastContainer, toast } from "react-toastify";
import { useSelector } from "react-redux";
const EcommerceCategories = ({ searchQuery }) => {
  const naviagte = useNavigate();
  const [products, setProducts] = useState([]);
  const [visibleProducts, setVisibleProducts] = useState([]);
  const [open, setOpen] = useState(false);
  const [moadalTitle, setModalTitle] = useState("");
  const [moadalPrice, setModalPrice] = useState("");

  const productsPerPage = 8;

  const gettheme = async () => {
    try {
      let res = await axios.get("/api/themes/getThemes");
      const filter = res.data.filter(
        (product) => product.category === "eCommerce"
      );
      console.log(filter);
      setProducts(filter.reverse());
      setVisibleProducts(filter.slice(0, productsPerPage));
    } catch (e) {
      console.log(e.message);
    }
  };
  useEffect(() => {
    gettheme();
  }, []);

  const handleShowMore = () => {
    const nextPageStartIndex = visibleProducts.length;
    const nextPageEndIndex = nextPageStartIndex + productsPerPage;
    setVisibleProducts([
      ...visibleProducts,
      ...products.slice(nextPageStartIndex, nextPageEndIndex),
    ]);
  };

  const handleClickOpen = (title, price) => {
    setOpen(true);
    setModalTitle(title);
    setModalPrice(price);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handelDetails = (id) => {
    console.log(id);
    naviagte(`/items/${id}`);
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

  const [lodding, setLodding] = useState(false);
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
      .post("/api/payment/paymentSystem", {
        ...info,
        packagePrice: price,
        packageName: pcname,
      })
      .then(async (payment) => {
        const response = await axios.post(
          "/send-order-email",
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

  const selector = useSelector((state) => state);
  const email = selector?.user?.userValue?.data?.email;

  const [vShow, setVshow] = useState({
    show: false,
    link: "",
  });
  const handleClosex = () => {
    setVshow({ show: false, link: "" });
  };
  const handelPreview = async (product) => {
    let link = product.link;
    let kelo = product._id;
    console.log("ami dekhte chai:", product);
    if (!email) {
      naviagte("/login");
    }
    const info = {
      email: email,
      productId: kelo,
    };

    try {
      const res = await axios.post("/api/ax/access", info);
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
  const truncateText = (text, maxCharacters) => {
    if (text.length <= maxCharacters) {
      return text;
    }
    return text.slice(0, maxCharacters) + "...";
  };

  return (
    <>
      <div
        className={`grid grid-cols-1 md:grid-cols-2  lg:grid-cols-2 xl:grid-cols-4 gap-x-5 md:gap-8 xl:gap-x-8 gap-y-6 mt-14 `}
      >
        {visibleProducts.map((product, index) => (
          <div
            key={index}
            className="bg-white  w-full rounded-[4px]  h-[292px] group shadow hover:scale-105 duration-300 px-1"
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
                {truncateText(product.titel, 32)}
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

                <div className="flex justify-between gap-x-8 items-center ">
                  <div className="flex gap-1">
                    <Link
                      to=""
                      onClick={() => handelDetails(product._id)}
                      className="border w-10 h-10 flex items-center justify-center hover:bg-[#CCCCCC] duration-300 hover:text-white text-[#666] rounded-[2px]"
                    >
                      <Icon icon="mdi:cart" width={30} className="p-1 " />
                    </Link>
                    <button
                      onClick={() => handelPreview(product)}
                      className="border  px-3 rounded-[2px] !text-[10px] border-[#004282] text-[#004282] font-semibold hover:bg-[#004282] transition-colors hover:text-white"
                    >
                      Live Preview
                    </button>
                  </div>
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

      {vShow.show ? (
        <div className="fixed  top-0 left-0 w-full h-full z-[10000] bg-black bg-opacity-70">
          <div className=" bg-white xl:w-full md:w-[80%] w-[30%] shadow-lg border-[#004282]  absolute top-[50%] left-[50%]  translate-x-[-50%] translate-y-[-50%] px-5 py-5">
            <ImCancelCircle
              className="absolute text-red-500 top-[5%] right-[5%] text-2xl cursor-pointer"
              onClick={handleClosex}
            />

            <iframe className="w-full h-screen p-5 " src={vShow.link}></iframe>
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
};

export default EcommerceCategories;
