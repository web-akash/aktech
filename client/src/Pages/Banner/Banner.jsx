import { useState } from "react";
import bannerImg from "../../assets/banner/weepoka_banner.png";
import { BiSearchAlt2 } from "react-icons/bi";
import SearchThemes from "../../Component/SearchThemes/SearchThemes";
import { useNavigate } from "react-router-dom";

const Banner = ({}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = () => {
    navigate(`/searchThemes?query=${searchQuery}`);
  };

  const handleSearchInputKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };
  return (
    <div>
      <div className="bg-[#F4F5F9]  bannard  pt-[100px]  flex items-center h-auto  md:pt-[130px] ">
        <div className="max-w-screen-2xl   mx-auto md:px-20 px-4 flex items-center justify-start">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 md:gap-20 gap-10">
            <div className="flex items-center justify-start ">
              <div className="overflow-hidden  text-[#333]">
                <h1 className="text-[#333] md:text-[28px] md:leading-10	 text-lg font-bold">
                  Best Themes & Website Templates for any project - Choose &
                  BUY!
                </h1>

                <div className="mt-5">
                  <p className="text-[#888888]  leading-6">
                    <span className="inline-block !text-xs font-semibold">
                      Discover thousands of easy-to-customize themes, templates,
                      by AK Tech.
                    </span>
                  </p>
                </div>
                <div className="relative mt-[10px]">
                  <input
                    type="text"
                    onKeyDown={handleSearchInputKeyDown}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search web templates"
                    className="src border focus:outline-none w-full py-4 rounded-lg px-4 text-base"
                  />
                  <button
                    onClick={handleSearch}
                    className="py-2 flex items-center absolute top-[50%] right-[3%] translate-y-[-50%] px-10 rounded-md bg-[#004282] hover:text-[#004282] transition-colors text-xs text-white hover:bg-gray-300"
                  >
                    <BiSearchAlt2 className="text-lg font-bold" />{" "}
                    <p className="font-semibold">Search</p>
                  </button>
                </div>
              </div>
            </div>
            <div>
              <img src={bannerImg} alt="" className="w-[90%]" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
