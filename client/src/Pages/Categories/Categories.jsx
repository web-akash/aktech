import { useEffect, useState } from "react";
import { Icon } from "@iconify/react";
import { ImCancelCircle } from "react-icons/im";
import EcommerceCategories from "./EcommerceCategories";
import BusinessCategories from "./BusinessCategories";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { useSelector } from "react-redux";
import LoadingButton from "@mui/lab/LoadingButton";
import CustomeWebsite from "../../Component/CustomeWebsite/CustomeWebsite";
import PortfolioCategories from "./PortfolioCategories";
import BlogCategories from "./BlogCategories";
import NewsCategories from "./NewsCategories";
import EducationCategories from "./EducationCategories";
import axios from "../../Component/Axios/Axios";
import ServerLink from "../../Component/ServerLink/ServerLink";
import ThemesCategoris from "../../Component/ThemeCategorys/ThemesCategoris";
const Categories = () => {
  const [activeTab, setActiveTab] = useState(1);
  const selector = useSelector((state) => state);
  console.log(selector);

  const handleTabChange = (event) => {
    const tabIndex = parseInt(event?.target?.value, 10);
    setActiveTab(tabIndex);
  };
  const handleTabChanges = (nm) => {
    setActiveTab(nm);
  };

  const [products, setProducts] = useState([]);
  console.log(products, "sdfsdf");
  const [visibleProducts, setVisibleProducts] = useState([]);

  const [open, setOpen] = useState(false);
  const [lodding, setLodding] = useState(false);

  const [moadalTitle, setModalTitle] = useState("");
  const [moadalPrice, setModalPrice] = useState("");
  const [grid, setGrid] = useState(true);
  const naviagte = useNavigate();
  const productsPerPage = 8;

  let getTheme = async () => {
    try {
      let res = await axios.get("/api/themes/getThemes");
      setProducts(res.data.reverse());
      setVisibleProducts(res.data.slice(0, productsPerPage));
    } catch (e) {
      console.log(e);
    }
  };

  const email = selector?.user?.userValue?.data?.email;

  useEffect(() => {
    getTheme();
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
      console.log("data", res);

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

  const handelDetails = (id) => {
    console.log(id);
    naviagte(`/items/${id}`);
  };

  const tabNames = [
    { id: 1, name: "All WebSite" },
    { id: 2, name: "eCommerce " },
    { id: 3, name: "Business " },
    { id: 4, name: "Portfolio " },
    { id: 5, name: "Blog & News " },
    { id: 6, name: "Health " },
    { id: 7, name: "Resturent " },
    { id: 8, name: "Travel & Tourism " },
    { id: 9, name: "Real State " },
    { id: 10, name: "Education " },
    { id: 11, name: "Entertainment " },
    { id: 12, name: "Hotel & Resort" },
    { id: 13, name: "Managment web app" },
    { id: 14, name: "Custom Order " },
  ];
  const [activeTabs, setActiveTabs] = useState(1);

  const handleTabChangesbutton = (tabNumber) => {
    setActiveTabs(tabNumber);
  };
  const truncateText = (text, maxCharacters) => {
    if (text.length <= maxCharacters) {
      return text;
    }
    return text.slice(0, maxCharacters) + "...";
  };

  return (
    <div className="bg-[#F4F5F9] pb-10 pt-[65px]">
      <div className="max-w-screen-2xl mx-auto md:px-20 px-4 ">
        <div>
          <ToastContainer
            position="top-right"
            autoClose={2000}
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
          <div className=" md:text-center mb-12">
            <h1 className="md:text-2xl  text-lg font-medium text-[#333] mb-[10px]">
              Check out our latest WEBSITE
            </h1>
            <p className="md:text-[14px] text-[#888888] text-[14px]  md:text-center text-justify">
              We carefully review new entries from our community one by one to
              make sure they meet high-quality design and functionality
              standards. From multipurpose themes to niche templates, you’ll
              always find something that catches your eye.
            </p>
          </div>

          <div className="">
            <select
              onChange={(event) => handleTabChange(event)}
              className="md:hidden py-2 px-4 text-sm bg-[white] rounded-[4px] hover:border-[#004182c9]  border-[2px] border-transparent font-medium text-[#333] w-full"
            >
              <option value={1}>All Themes</option>
              <option value={2}>eCommerce WebSite</option>
              <option value={3}>Business WebSite</option>
              <option value={4}>Portfolio WebSite</option>
              <option value={5}>Blog & News Website</option>
              <option value={6}>Health WebSite</option>
              <option value={7}>Resturent WebSite</option>
              <option value={8}>Travel & Tourism</option>
              <option value={9}>Real State WebSite</option>
              <option value={10}>Education WebSite</option>
              <option value={11}>Entertainment</option>
              <option value={12}>Hotel & Resort</option>
              <option value={13}>Managment web app</option>
              <option value={14}>Custom Order</option>
            </select>
            <div className="grid  hidden md:grid  grid-cols-1 md:grid-cols-7 gap-4">
              {tabNames.map((tab) => (
                <a
                  key={tab.id}
                  onClick={() => handleTabChanges(tab.id)}
                  className={`text-center cursor-pointer py-2 px-4 text-[12px] bg-[white] rounded-[4px] hover:border-[#004182c9] ${
                    activeTab === tab.id
                      ? "border-[2px] border-[#004282] font-medium text-[#333] active"
                      : "border-[2px] border-transparent font-medium text-[#333]"
                  }`}
                >
                  {tab.name}
                </a>
              ))}
            </div>

            <div className="mt-4 ">
              {activeTab == 1 && (
                <>
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
                                <p className="font-bold leading-[8px]">
                                  {product.price}
                                </p>
                              </div>
                            </div>

                            <div className="flex justify-between gap-x-8 items-center ">
                              <div className="flex gap-1">
                                <Link
                                  to=""
                                  onClick={() => handelDetails(product._id)}
                                  className="border w-10 h-10 flex items-center justify-center hover:bg-[#CCCCCC] duration-300 hover:text-white text-[#666] rounded-[2px]"
                                >
                                  <Icon
                                    icon="mdi:cart"
                                    width={30}
                                    className="p-1 "
                                  />
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

                          <h1 className="md:text-base text-sm">
                            {moadalTitle}
                          </h1>
                          <p className="md:text-2xl text-base mt-4 flex items-center">
                            <Icon icon="tabler:currency-taka" width={25} />{" "}
                            {moadalPrice}
                          </p>
                          <form
                            onSubmit={(e) =>
                              handelSubmit(e, moadalTitle, moadalPrice)
                            }
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
                              <span className="sr-only">
                                Choose profile photo
                              </span>
                              <input
                                type="file"
                                onChange={hanelFileChange}
                                className="block w-full text-sm text-slate-500 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-violet-50 file:text-violet-700 hover:file:bg-violet-100 mt-5"
                              />
                            </label>
                            <div className="flex justify-end">
                              {lodding ? (
                                <LoadingButton
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
                  </div>

                  {visibleProducts.length < products.length && (
                    <div className="flex justify-center my-10">
                      <button
                        onClick={handleShowMore}
                        className="py-2 px-10 rounded-md bg-[#004282] transition-all text-white hover:bg-white hover:text-[#004282]"
                      >
                        View more new items
                      </button>
                    </div>
                  )}
                </>
              )}

              {activeTab == 2 && <ThemesCategoris categoryName={"eCommerce"} />}

              {activeTab == 3 && <ThemesCategoris categoryName={"business"} />}
              {activeTab == 4 && <ThemesCategoris categoryName={"portfolio"} />}
              {activeTab == 5 && (
                <ThemesCategoris categoryName={"Blog&NewsWebsite"} />
              )}
              {activeTab == 6 && (
                <ThemesCategoris categoryName={"Health&WebSite"} />
              )}
              {activeTab == 7 && (
                <ThemesCategoris categoryName={"ResturentWebSite"} />
              )}
              {activeTab == 8 && (
                <ThemesCategoris categoryName={"Travel&Tourism"} />
              )}
              {activeTab == 9 && (
                <ThemesCategoris categoryName={"RealStateWebSite"} />
              )}
              {activeTab == 10 && (
                <ThemesCategoris categoryName={"Education&WebSite"} />
              )}
              {activeTab == 11 && (
                <ThemesCategoris categoryName={"Entertainment"} />
              )}
              {activeTab == 12 && (
                <ThemesCategoris categoryName={"Hotel&Resort"} />
              )}
              {activeTab == 13 && (
                <ThemesCategoris categoryName={"Managment-Web-App"} />
              )}

              {activeTab == 14 && <CustomeWebsite />}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Categories;
