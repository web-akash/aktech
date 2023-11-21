import { Link } from "react-router-dom";

import { Icon } from "@iconify/react";
const Services = () => {
  return (
    <div className="bg-white ">
      <div className=" max-w-screen-2xl mx-auto  md:px-20 px-3 ">
        {/* services */}

        <div>
          <div className="w-full pb-10 ">
            <div className="w-full h-px rounded-md my-8 " />
            <span className=" rounded-md px-1 font-medium p-1 md:text-2xl text-xl   text-[#333] border-black">
              Creative Graphic Solutions
            </span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2  xl:grid-cols-3 gap-10 2xl:gap-14 px-2  2xl:px-0 justify-between pb-4">
            <Link
              to=""
              onClick={() => {
                window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
              }}
            >
              <div className="h-[390px] rounded-md card duration-300 hover:scale-105  drop-shadow-xl border border-[#e3e3e358] w-full p-5 border-b-[3px] border-b-[#004282] overflow-hidden group bg-[#fcfcfd] ">
                <div className="flex items-center justify-center">
                  <img
                    src="https://drive.google.com/thumbnail?id=1TIajtlxhYXMEjenZQp18IQncMemB7otQ"
                    className="md:w-36 w-20 mb-5"
                    alt="blog"
                  />
                </div>
                <div>
                  <h5 className="md:text-base text-base text-center group-hover:text-[#004282] text-gray-800 font-bold tracking-widest mb-2 uppercase ">
                    Brand & Logo Identity
                  </h5>
                  <p className="text-justify pt-3 tracking-tighter md:text-[14px] text-sm font-normal text-gray-600 ">
                    Brand identity is the visual, verbal, and emotional
                    representation of a brand, including amazing style. A logo,
                    serves as the primary visual identifier for the brand,
                    contributing to brand recognition and communicating its
                    values and personality.
                  </p>

                  <button className="flex items-center justify-center gap-1 pt-3 pb-2 group">
                    <span className="text-gray-800 group-hover:text-[#004282] text-sm font-semibold">
                      Read More
                    </span>{" "}
                    <Icon
                      icon="typcn:arrow-right-outline"
                      width={22}
                      className="text-[#004282] -translate-x-5 group-hover:translate-x-0 duration-300 opacity-0 group-hover:opacity-100"
                    />
                  </button>
                </div>
              </div>
            </Link>

            <Link
              to=""
              onClick={() => {
                window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
              }}
            >
              <div className="h-[390px] rounded-md card duration-300 hover:scale-105  drop-shadow-xl border border-[#e3e3e358] p-5 border-b-[3px] border-b-[#004282] overflow-hidden group bg-[#fcfcfd]">
                <div className="flex items-center justify-center">
                  <img
                    src="https://drive.google.com/thumbnail?id=1cnCskhJJvPK7wCmTDDQlW603E1Dw8g_j"
                    className="w-36 mb-5"
                    alt="blog"
                  />
                </div>
                <div>
                  <h5 className=" text-base text-center text-gray-800 group-hover:text-[#004282] font-bold tracking-widest mb-2 uppercase">
                    3D & Motion Design
                  </h5>
                  <p className="text-justify pt-3 tracking-tighter md:text-[14px] text-sm font-normal text-gray-600">
                    We provide 3D & Motion Design services to meet the visual
                    communication needs of our clients. The services will aim to
                    create captivating and engaging visual content that
                    effectively communicates their brand, products, or
                    services..
                  </p>

                  <button className="flex items-center justify-center gap-1 pt-3 pb-2 group">
                    <span className="text-gray-800 text-sm group-hover:text-[#004282] font-semibold">
                      Read More
                    </span>{" "}
                    <Icon
                      icon="typcn:arrow-right-outline"
                      width={22}
                      className="text-[#004282] -translate-x-5 group-hover:translate-x-0 duration-300 opacity-0 group-hover:opacity-100"
                    />
                  </button>
                </div>
              </div>
            </Link>

            <Link
              to=""
              onClick={() => {
                window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
              }}
            >
              <div className="h-[390px] rounded-md card duration-300 hover:scale-105  drop-shadow-xl border border-[#e3e3e358] p-5 border-b-[3px] border-b-[#004282] overflow-hidden group bg-[#fcfcfd] ">
                <div className="flex items-center justify-center">
                  <img
                    src="https://drive.google.com/thumbnail?id=1vTlOqdrOxJg_HTyCfKfxmaM3ytnhFXw1"
                    className="w-36 mb-5"
                    alt="blog"
                  />
                </div>
                <div>
                  <h5 className=" text-base group-hover:text-[#004282]  text-center text-gray-800 font-bold tracking-widest mb-2 uppercase">
                    Static content
                  </h5>
                  <p className="text-justify pt-3 tracking-tighter md:text-[14px] text-sm font-normal text-gray-600">
                    We provide Graphics Design services to meet the visual
                    communication needs of our clients. The services will aim to
                    create captivating and engaging visual content that
                    effectively communicates their brand, products, or services.
                  </p>

                  <button className="flex items-center justify-center gap-1 pt-3 pb-2 group">
                    <span className="text-gray-800 group-hover:text-[#004282] text-sm font-semibold">
                      Read More
                    </span>{" "}
                    <Icon
                      icon="typcn:arrow-right-outline"
                      width={22}
                      className="text-[#004282] -translate-x-5 group-hover:translate-x-0 duration-300 opacity-0 group-hover:opacity-100"
                    />
                  </button>
                </div>
              </div>
            </Link>
          </div>
        </div>

        <div className="pb-[100px] ">
          <div className="w-full pb-14 ">
            <div className="w-full h-px rounded-md my-8 " />
            <span className=" rounded-md   px-1 font-medium p-1  text-xl md:text-2xl  text-[#333] border-black">
              Digital Marketing
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2  xl:grid-cols-3 gap-10 2xl:gap-14 ">
            <Link
              to=""
              onClick={() => {
                window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
              }}
            >
              <div className="h-[480px] rounded-md card duration-300 hover:scale-105  drop-shadow-xl border border-[#e3e3e358] border-b-[3px] border-b-[#004282] overflow-hidden group bg-[#FDFDFD] px-4">
                <div className="flex items-center justify-center">
                  <img
                    src="https://drive.google.com/thumbnail?id=1YMZmduJXm3_7fWDiafyzU7vN4UWnLuVk"
                    className="w-36 mb-5"
                    alt="socail media add"
                  />
                </div>
                <div>
                  <h5 className="text-base text-center group-hover:text-[#004282] text-gray-800 font-bold tracking-widest mb-2 uppercase">
                    Social Media Advertising
                  </h5>
                  <p className="text-justify pt-3 tracking-tighter text-[14px] font-normal text-gray-600">
                    A Social Media Advertising website offers targeted ad
                    campaign creation, audience targeting, ad design, budget
                    management, performance tracking, and customized solutions
                    to help businesses maximize their online presence and reach
                    their target audience effectively.
                  </p>

                  <button className="flex items-center justify-center gap-1 pt-3 pb-2 group">
                    <span className="text-gray-800 group-hover:text-[#004282] font-semibold">
                      Read More
                    </span>{" "}
                    <Icon
                      icon="typcn:arrow-right-outline"
                      width={22}
                      className="text-[#004282] -translate-x-5 group-hover:translate-x-0 duration-300 opacity-0 group-hover:opacity-100"
                    />
                  </button>
                </div>
              </div>
            </Link>

            <Link
              to=""
              onClick={() => {
                window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
              }}
            >
              <div className="h-[480px]  rounded-md card duration-300 hover:scale-105  drop-shadow-xl border border-[#e3e3e358] p-5 border-b-[3px] border-b-[#004282] overflow-hidden group bg-[#FDFDFD]">
                <div className="flex items-center justify-center">
                  <img
                    src="https://drive.google.com/thumbnail?id=1R70GSgOlwSvax0ga9OTCQ8lLR0QRMFeK"
                    className="w-36 mb-5"
                    alt="gdn & seo"
                  />
                </div>
                <div>
                  <h5 className="text-base text-center group-hover:text-[#004282] text-gray-800 font-bold tracking-widest mb-2 uppercase">
                    GDN / SEO
                  </h5>
                  <p className="text-justify pt-3 tracking-tighter text-[14px] font-normal text-gray-600">
                    GDN (Google Display Network) is Google's ad platform,
                    targeting a broad audience with visual content on websites
                    and apps. SEO improves website visibility on Google, driving
                    organic traffic through optimization. Both GDN and SEO are
                    vital for reaching and engaging audiences effectively.
                  </p>

                  <button className="flex items-center justify-center gap-1 pt-3 pb-2 group">
                    <span className="text-gray-800 group-hover:text-[#004282] font-semibold">
                      Read More
                    </span>{" "}
                    <Icon
                      icon="typcn:arrow-right-outline"
                      width={22}
                      className="text-[#004282] -translate-x-5 group-hover:translate-x-0 duration-300 opacity-0 group-hover:opacity-100"
                    />
                  </button>
                </div>
              </div>
            </Link>

            <Link
              to=""
              onClick={() => {
                window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
              }}
            >
              <div className="h-[480px]  rounded-md card duration-300 hover:scale-105  drop-shadow-xl border border-[#e3e3e358] p-5 border-b-[3px] border-b-[#004282] overflow-hidden group bg-[#FDFDFD]">
                <div className="flex items-center justify-center">
                  <img
                    src="https://drive.google.com/thumbnail?id=1fpwNrWHIZZjDNrecrVbyCe1LNLoEieMt"
                    className="w-36 mb-5"
                    alt="dsp"
                  />
                </div>
                <div>
                  <h5 className="text-base text-center group-hover:text-[#004282] text-gray-800 font-bold tracking-widest mb-2 uppercase">
                    DSP
                  </h5>
                  <p className="text-justify pt-3 tracking-tighter text-[14px] font-normal text-gray-600">
                    DSP (Demand-Side Platform) is digital ad technology for
                    buying ad space across exchanges, providing advanced
                    targeting and real-time bidding for optimized
                    campaigns.Newly Customer add and show own activities.
                    Advertisers efficiently manage diverse ad formats to reach
                    relevant audiences .
                  </p>

                  <button className="flex items-center justify-center gap-1 pt-3 pb-2 group">
                    <span className="text-gray-800 group-hover:text-[#004282] font-semibold">
                      Read More
                    </span>{" "}
                    <Icon
                      icon="typcn:arrow-right-outline"
                      width={22}
                      className="text-[#004282] -translate-x-5 group-hover:translate-x-0 duration-300 opacity-0 group-hover:opacity-100"
                    />
                  </button>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Services;
