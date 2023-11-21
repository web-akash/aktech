import { useEffect } from "react";
import weepoka from "../../assets/logo/weepoka.png";
const ServiceCategories = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className="pt-16 bg-[#F0F2F5]">
      <div className="relative bg-white  bg-cover bg-center bg-no-repeat h-60">
        <h1 className="md:text-4xl text-2xl text-center font-semibold pt-24 text-[#333] ml-5">
          Our Services
        </h1>
        <img
          src={weepoka}
          alt=""
          className="absolute md:w-20 w-10 md:left-[-270px] left-[-160px] right-0 mx-auto md:top-16 top-[84px]"
        />
      </div>

      <div className="max-w-screen-2xl mx-auto md:px-20 px-4 py-20">
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-10">
          <div className="shadow-md px-8 rounded-lg bg-[#FDFDFD] border-t-4 border-gray-700 ">
            <img
              src="https://drive.google.com/thumbnail?id=1TVHRHA-70m9FyRhuVsiuS_rxYgOWT4kW"
              alt=""
              className="w-48 mx-auto"
            />
            <article className="text-left">
              <h1 className="text-[#004282] font-semibold text-[16px] mb-5 text-center tracking-tight">
                Website , Mobile App Design & Development
              </h1>
              <p className="text-gray-500 text-[14px] text-justify">
                We offer excellent website and app development services,
                personalized for your business and audience. Our design and
                development teams create user-friendly interfaces, responsive
                layouts, and practical features, enhancing digital interactions
                and user satisfaction on websites and mobile apps.
              </p>
            </article>

            <a
              href="https://wa.me/+8801606104415"
              rel="noreferrer"
              target="_blank"
            >
              <button className="my-5 bg-[#004282] text-white px-5 py-1 rounded hover:scale-105 duration-300 font-semibold text-[14px]">
                Hire US
              </button>
            </a>
          </div>

          <div className="shadow-md px-8 rounded-lg bg-[#FDFDFD] border-t-4 border-gray-700 ">
            <img
              src="https://drive.google.com/thumbnail?id=1R70GSgOlwSvax0ga9OTCQ8lLR0QRMFeK"
              alt=""
              className="w-48 mx-auto"
            />
            <article className="text-left">
              <h1 className="text-[#004282] font-semibold text-[16px] mb-5 text-center tracking-tight">
                Seo And Website Management
              </h1>
              <p className="text-gray-500 text-[14px] text-justify">
                We provide expert digital marketing consultation, considering
                your business, location, and audience. Our services include
                website management and SEO to enhance online presence by
                improving search rankings, user experience, and overall website
                performance through targeted keywords, content updates, and
                technological advancements
              </p>
            </article>

            <a
              href="https://wa.me/+8801606104415"
              rel="noreferrer"
              target="_blank"
            >
              <button className="my-5 bg-[#004282] text-white px-5 py-1 rounded hover:scale-105 duration-300 font-semibold text-[14px]">
                Hire US
              </button>
            </a>
          </div>

          <div className="shadow-md px-8 rounded-lg bg-[#FDFDFD] border-t-4 border-gray-700 ">
            <img
              src="https://drive.google.com/thumbnail?id=1R6C1R8SwU6fBWouUyanH5AT4DgKZ1c77"
              alt=""
              className="w-48 mx-auto "
            />
            <article className="text-left">
              <h1 className="text-[#004282] font-semibold text-[16px] mb-5 text-center">
                Consultation On Digital Marketing
              </h1>
              <p className="text-gray-500 text-[14px] text-justify">
                Our expert digital marketing consultation is tailored to your
                business, location, and audience. We analyze techniques,
                audiences, and trends to optimize your marketing strategy. Our
                custom plans ensure efficient messaging, resource utilization,
                and online growth for your success. Hire us now!
              </p>
            </article>

            <a
              href="https://wa.me/+8801606104415"
              rel="noreferrer"
              target="_blank"
            >
              <button className="my-5 bg-[#004282] text-white px-5 py-1 rounded hover:scale-105 duration-300 font-semibold text-[14px]">
                Hire US
              </button>
            </a>
          </div>

          <div className="shadow-md px-10 rounded-lg bg-[#FDFDFD] border-t-4 border-gray-700">
            <img
              src="https://drive.google.com/thumbnail?id=1NEY_gZ9X1xaCF487hGnXDyWP_pU-Yjkd"
              alt=""
              className="w-48 mx-auto"
            />
            <article className="text-left">
              <h1 className="text-[#004282] font-semibold text-[16px] mb-5 text-center">
                Creative Graphic Solutions
              </h1>
              <p className="text-gray-500 text-[14px] text-justify">
                We enhance your online presence by combining creative graphics
                with your virtual venues. Our innovative graphic solutions
                deliver captivating visual concepts that effectively convey
                messages through inventive design, boosting brand identification
                and engagement.
              </p>
            </article>

            <a
              href="https://wa.me/+8801606104415"
              rel="noreferrer"
              target="_blank"
            >
              <button className="my-5 bg-[#004282] text-white px-5 py-1 rounded hover:scale-105 duration-300 font-semibold text-[14px]">
                Hire US
              </button>
            </a>
          </div>

          <div className="shadow-md px-8 rounded-lg bg-[#FDFDFD] border-t-4 border-gray-700 max-w-2xl">
            <img
              src="https://drive.google.com/thumbnail?id=1dErEmYJf30XiHBrliBxsngTC6jXri3fZ"
              alt=""
              className="w-48 mx-auto"
            />
            <article className="text-left">
              <h1 className="text-[#004282] font-semibold text-[16px] mb-5 text-center tracking-tight">
                Social Media Management
              </h1>
              <p className="text-gray-500 text-[14px] text-justify">
                We offer outstanding website and app development services
                tailored to your business, location, and audience. Our design
                and development teams work together to craft user-friendly
                interfaces, responsive layouts, and practical features that
                elevate digital interactions and user satisfaction on websites
                and mobile apps.
              </p>
            </article>

            <a
              href="https://wa.me/+8801606104415"
              rel="noreferrer"
              target="_blank"
            >
              <button className="my-5 bg-[#004282] text-white px-5 py-1 rounded hover:scale-105 duration-300 font-semibold text-[14px]">
                Hire US
              </button>
            </a>
          </div>
          <div className="shadow-md px-8 rounded-lg bg-[#FDFDFD] border-t-4 border-gray-700 max-w-2xl">
            <img
              src="https://drive.google.com/thumbnail?id=1R6C1R8SwU6fBWouUyanH5AT4DgKZ1c77"
              alt=""
              className="w-48 mx-auto"
            />
            <article className="text-left">
              <h1 className="text-[#004282] font-semibold text-[16px] mb-5 text-center tracking-tight">
                Digital Advertising and DSP
              </h1>
              <p className="text-gray-500 text-[14px] text-justify">
                Businesses may effectively target and manage online ad
                campaigns, optimize ad spend, and reach their target demographic
                with data-driven accuracy and real-time bidding techniques by
                utilizing digital advertising and DSP (Demand-Side Platform)
                services. We offer the greatest solution in Weepoka.
              </p>
            </article>

            <a
              href="https://wa.me/+8801606104415"
              rel="noreferrer"
              target="_blank"
            >
              <button className="my-5 bg-[#004282] text-white px-5 py-1 rounded hover:scale-105 duration-300 font-semibold text-[14px]">
                Hire US
              </button>
            </a>
          </div>
        </div>

        <div className="mt-20 flex justify-center"></div>
      </div>
    </div>
  );
};

export default ServiceCategories;
