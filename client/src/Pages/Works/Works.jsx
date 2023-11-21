import weepoka from "../../assets/logo/weepoka.png";
import web1 from "../../Assets/works/website-demos/layout-1.png";
import web2 from "../../Assets/works/website-demos/layout-2.png";
import web3 from "../../Assets/works/website-demos/layout-3.png";
import web4 from "../../Assets/works/website-demos/layout-4.png";
import web5 from "../../Assets/works/website-demos/layout-5.png";
import web6 from "../../Assets/works/website-demos/layout-6.png";
import web7 from "../../Assets/works/website-demos/layout-7.png";
import web8 from "../../Assets/works/website-demos/layout-8.png";
import web9 from "../../Assets/works/website-demos/layout-9.png";
import web10 from "../../Assets/works/website-demos/layout-10.png";
import web11 from "../../Assets/works/website-demos/layout-11.webp";
import { useEffect } from "react";

const Works = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className="pt-16 bg-[#F0F2F5]">
      <div className="relative bg-white  bg-cover bg-center bg-no-repeat h-60">
        <h1 className="md:text-4xl text-2xl text-center font-semibold pt-24 text-[#333] ml-5">
          Our Work
        </h1>
        <img
          src={weepoka}
          alt=""
          className="absolute md:w-20 w-10 md:-left-52 left-[-122px] right-0 mx-auto md:top-16 top-[84px]"
        />
      </div>
      <div className="max-w-screen-2xl mx-auto px-5 md:px-20 pb-20">
        <div className="w-full pb-10 ">
          <div className="w-full h-px rounded-md my-8 " />
          <span className=" rounded-md px-1 font-medium p-1 md:text-2xl text-xl   text-[#333] border-black">
            Creative Web Project
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-3 gap-5 xl:gap-10">
          <div className="window10 h-[300px] md:w-full  w-full shadow-md rounded-md">
            <img
              className="window-image h-full drop-shadow-2xl rounded-md"
              src={web1}
              alt="blog website demo"
            />
          </div>

          <div className="window10   md:w-full w-full shadow-md rounded-md">
            <img
              className="window-image drop-shadow-2xl rounded-md"
              src={web2}
              alt="blog website demo"
            />
          </div>

          <div className="window10   md:w-full w-full shadow-md rounded-md">
            <img
              className="window-image drop-shadow-2xl rounded-md"
              src={web3}
              alt="blog website demo"
            />
          </div>

          <div className="window10   md:w-full w-full shadow-md rounded-md">
            <img
              className="window-image drop-shadow-2xl rounded-md"
              src={web4}
              alt="blog website demo"
            />
          </div>

          <div className="window10   md:w-full w-full shadow-md rounded-md">
            <img
              className="window-image drop-shadow-2xl rounded-md"
              src={web5}
              alt="blog website demo"
            />
          </div>

          <div className="window10    md:w-full w-full shadow-md rounded-md">
            <img
              className="window-image drop-shadow-2xl rounded-md"
              src={web6}
              alt="blog website demo"
            />
          </div>

          <div className="window10   md:w-full w-full shadow-md rounded-md">
            <img
              className="window-image drop-shadow-2xl rounded-md"
              src={web7}
              alt="blog website demo"
            />
          </div>

          <div className="window10    md:w-full w-full shadow-md rounded-md">
            <img
              className="window-image drop-shadow-2xl rounded-md"
              src={web8}
              alt="blog website demo"
            />
          </div>

          <div className="window10   md:w-full w-full shadow-md rounded-md">
            <img
              className="window-image drop-shadow-2xl rounded-md"
              src={web9}
              alt="blog website demo"
            />
          </div>

          <div className="window10   md:w-full w-full shadow-md rounded-md">
            <img
              className="window-image drop-shadow-2xl rounded-md"
              src={web10}
              alt="blog website demo"
            />
          </div>

          <div className="window10  md:w-full w-full shadow-md rounded-md">
            <img
              className="window-image drop-shadow-2xl rounded-md"
              src={web11}
              alt="blog website demo"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Works;
