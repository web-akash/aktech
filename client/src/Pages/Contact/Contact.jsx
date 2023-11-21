import { Icon } from "@iconify/react";
import weepoka from "../../assets/logo/weepoka.png";
import { useEffect } from "react";

const Contact = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className="pt-16">
      <div className="relative bg-white  bg-cover bg-center bg-no-repeat h-60">
        <h1 className="md:text-4xl text-2xl text-center font-semibold pt-24 text-[#333] ml-5">
          Contact us
        </h1>
        <img
          src={weepoka}
          alt=""
          className="absolute md:w-20 w-10 md:left-[-240px] left-[-141px] right-0 mx-auto md:top-16 top-[84px]"
        />
      </div>
      <div className="bg-[#F0F2F5]">
        <div className="max-w-screen-2xl mx-auto md:px-20 px-4  py-20  ">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 xl:gap-20 px-8 md:px-0  ">
            <div className="flex justify-center ">
              <div className="text-center border bg-white w-full py-14 rounded-md shadow px-4 ">
                <div className="bg-[#EEF0FF] w-16 h-16 flex items-center mx-auto rounded-full mb-10 drop-shadow">
                  <Icon
                    icon="wpf:phone"
                    width={40}
                    className="mx-auto text-[#004282]"
                  />
                </div>
                <h2 className="md:text-xl text-base mb-2 font-bold">Phone</h2>
                <a
                  href="tel:01608371608"
                  className="text-center md:text-base text-sm font-semibold text-gray-500 hover:text-[#004282] duration-300"
                >
                  01608371608
                </a>
              </div>
            </div>

            <div className="flex justify-center ">
              <div className="text-center border bg-white w-full py-14 rounded-md shadow px-4">
                <div className="bg-[#EEF0FF] w-16 h-16 flex items-center mx-auto rounded-full mb-10 drop-shadow">
                  <Icon
                    icon="dashicons:email"
                    width={38}
                    className="text-[#004282] mx-auto"
                  />
                </div>
                <h2 className="md:text-xl text-lg mb-2 font-bold">Email</h2>
                <a
                  href="mailto:dev.mhakash@gmail.com"
                  rel="noreferrer"
                  className="text-center md:text-base text-sm font-semibold text-gray-500 hover:text-[#004282] duration-300"
                >
                  dev.mhakash@gmail.com
                </a>
              </div>
            </div>

            <div className="flex justify-center">
              <div className="text-center bg-white border w-full py-14 rounded-md shadow px-4">
                <div className="bg-[#EEF0FF] w-16 h-16 flex items-center mx-auto rounded-full mb-10 drop-shadow">
                  <Icon
                    icon="entypo:address"
                    width={38}
                    className="text-[#004282] mx-auto"
                  />
                </div>
                <h2 className="md:text-xl text-lg mb-2 font-bold">Address</h2>
                <a
                  href="mailto:dev.mhakahs@gmail.com.com"
                  rel="noreferrer"
                  className="text-center md:text-base text-xs font-semibold text-gray-500 "
                >
                  Block # C, House # 2, 1 Road-2, Dhaka 1216
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
