import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/logo/weepoka-logo-01.png";
import { useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import { styled, alpha } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import { CgProfile } from "react-icons/cg";
import { useSelector } from "react-redux";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));
const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = () => {
    navigate(`/searchThemes?query=${searchQuery}`);
  };
  const selecotor = useSelector((state) => state);
  return (
    <div className="fixed top-0 w-full z-[9999] ">
      <nav className="bg-[#F5F5F5] border-b border-[#e2e9ee]">
        <div className="max-w-screen-2xl mx-auto relative px-2 md:px-20">
          <div className="flex items-center justify-between h-16">
            <div className="flex-shrink-0">
              <Link to="/">
                <h1 className="text-2xl font-bold text-[#004282]">Ak Tech</h1>
              </Link>
            </div>
            {/* <div className="md:block hidden">
              <Search onClick={handleSearch}>
                <SearchIconWrapper>
                  <SearchIcon />
                </SearchIconWrapper>
                <StyledInputBase
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search…"
                  sx={{ border: "1px solid black", borderRadius: "25px" }}
                  inputProps={{ "aria-label": "search" }}
                />
              </Search>
            </div> */}

            {/* Large Devices */}
            <div className="hidden md:block">
              <div className="ml-10 flex items-center space-x-1">
                <Link to="/">
                  <button
                    className="btn2 text-xs  px-3 py-2 relative border rounded-md text-[#545454] border-[#F5F5F5]  tracking-wider leading-none overflow-hidden hover:text-white"
                    type="button"
                  >
                    <span className="absolute inset-0 bg-[#004282]"></span>
                    <span className="absolute inset-0 flex justify-center items-center">
                      Home
                    </span>
                    Home
                  </button>
                </Link>

                <Link to="/Services">
                  <button
                    className="btn2 text-xs px-3 py-2 relative rounded-md border text-[#545454] border-[#F5F5F5]  tracking-wider leading-none overflow-hidden hover:text-white"
                    type="button"
                  >
                    <span className="absolute inset-0 bg-[#004282]"></span>
                    <span className="absolute inset-0 flex justify-center items-center ">
                      Services
                    </span>
                    Services
                  </button>
                </Link>

                <Link to="/Our_Work">
                  <button
                    className="btn2 text-xs px-3 rounded-md py-2 relative border text-[#545454] border-[#F5F5F5]  tracking-wider leading-none overflow-hidden hover:text-white"
                    type="button"
                  >
                    <span className="absolute inset-0 bg-[#004282]"></span>
                    <span className="absolute inset-0 flex justify-center items-center">
                      Our Work
                    </span>
                    Our Work
                  </button>
                </Link>

                <Link to="/Clients">
                  <button
                    className="btn2 text-xs px-3 py-2 rounded-md relative border text-[#545454] border-[#F5F5F5]  tracking-wider leading-none overflow-hidden hover:text-white"
                    type="button"
                  >
                    <span className="absolute inset-0 bg-[#004282]"></span>
                    <span className="absolute inset-0 flex justify-center items-center ">
                      Clients
                    </span>
                    Clients
                  </button>
                </Link>

                {/* <Link to="/about_us">
                  <button
                    className="btn2 text-xs px-3 py-2 rounded-md relative border text-[#545454] border-[#F5F5F5]  tracking-wider leading-none overflow-hidden hover:text-white"
                    type="button"
                  >
                    <span className="absolute inset-0 bg-[#004282]"></span>
                    <span className="absolute inset-0 flex justify-center items-center ">
                      About Us
                    </span>
                    About Us
                  </button>
                </Link> */}

                <Link to="/Contact_us">
                  <button
                    className="btn2 text-xs px-3 rounded-md py-2 relative border text-[#545454] border-[#F5F5F5]  tracking-wider leading-none overflow-hidden hover:text-white"
                    type="button"
                  >
                    <span className="absolute inset-0 bg-[#004282]"></span>
                    <span className="absolute inset-0 flex justify-center items-center ">
                      Contact Us
                    </span>
                    Contact Us
                  </button>
                </Link>
                <Link to="/login">
                  <button
                    className="btn2 text-xs px-3 py-2 rounded-md relative border text-[#545454] border-[#F5F5F5]  tracking-wider leading-none overflow-hidden hover:text-white"
                    type="button"
                  >
                    <span className="absolute inset-0 bg-[#004282]"></span>
                    <span className="absolute inset-0 flex justify-center items-center ">
                      Login
                    </span>
                    Login
                  </button>
                </Link>
                {selecotor.user.userValue?.success ? (
                  <Link to={"/profile"}>
                    <CgProfile size={25} className="text-[#333]" />
                  </Link>
                ) : null}
              </div>
            </div>
          </div>

          {/* Toogle */}
          <div className="-mr-2 flex md:hidden absolute right-5 top-3">
            <button
              onClick={toggleNavbar}
              type="button"
              className="text-[#333] inline-flex items-center justify-center p-2 rounded-md  hover:text-[#333]  focus:outline-none    "
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className={`${isOpen ? "hidden" : "block"} h-6 w-6`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                ></path>
              </svg>
              <svg
                className={`${isOpen ? "block" : "hidden"} h-6 w-6`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                ></path>
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Devices */}
        <div className={`${isOpen ? "block" : "hidden"} md:hidden `}>
          <div className="px-2 pt-2 pb-3 space-y-1  sm:px-3 h-[100vh] text-center mt-20">
            <Link
              onClick={() => setIsOpen(!isOpen)}
              to="/"
              className="text-[#545454] hover:border-b block px-3 py-2 rounded-md  text-lg font-medium"
            >
              Home
            </Link>
            <Link
              onClick={() => setIsOpen(!isOpen)}
              to="/Services"
              className="text-[#545454] hover:border-b block px-3 py-2 rounded-md  text-lg font-medium"
            >
              Services
            </Link>
            <Link
              onClick={() => setIsOpen(!isOpen)}
              to="/Our_Work"
              className="text-[#545454] hover:border-b block px-3 py-2 rounded-md  text-lg font-medium"
            >
              Our Work
            </Link>
            <Link
              onClick={() => setIsOpen(!isOpen)}
              to="/Clients"
              className="text-[#545454] hover:border-b block px-3 py-2 rounded-md  text-lg font-medium"
            >
              Client
            </Link>
            <Link
              to="/Contact_us"
              onClick={() => setIsOpen(!isOpen)}
              className="text-[#545454] hover:border-b block px-3 py-2 rounded-md  text-lg font-medium"
            >
              Contact Us
            </Link>
            <Link
              to="/login"
              className="text-[#545454] hover:border-b block px-3 py-2 rounded-md  text-lg font-medium"
            >
              Login
            </Link>
            {selecotor.user.userValue?.success ? (
              <Link
                to={"/profile"}
                onClick={() => setIsOpen(!isOpen)}
                className="text-[#545454] hover:border-b block px-3 py-2 rounded-md  text-lg font-medium"
              >
                Proifle
              </Link>
            ) : null}
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
