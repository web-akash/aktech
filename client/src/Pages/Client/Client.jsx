import weepoka from "../../assets/logo/weepoka.png";
import client1 from "../../assets/client/Untitled-1-01.png";
import client2 from "../../assets/client/Untitled-1-02.png";
import client3 from "../../assets/client/Untitled-1-03.png";
import client4 from "../../assets/client/Untitled-1-04.png";
import client5 from "../../assets/client/Untitled-1-05.png";
import client6 from "../../assets/client/Untitled-1-06.png";
import client7 from "../../assets/client/Untitled-1-07.png";
import client8 from "../../assets/client/Untitled-1-08.png";
import client9 from "../../assets/client/Untitled-1-09.png";
import client10 from "../../assets/client/Untitled-1-10.png";
import client11 from "../../assets/client/Untitled-1-11.png";
import client12 from "../../assets/client/Untitled-1-12.png";
import client13 from "../../assets/client/Untitled-1-13.png";
import client14 from "../../assets/client/Untitled-1-14.png";
import client15 from "../../assets/client/Untitled-1-15.png";
import client16 from "../../assets/client/Untitled-1-16.png";
import client17 from "../../assets/client/Untitled-1-17.png";
import client18 from "../../assets/client/Untitled-1-18.png";
import client19 from "../../assets/client/Untitled-1-19.png";
import client20 from "../../assets/client/jobexpert.png";
import client21 from "../../assets/client/offers360.png";
import client22 from "../../assets/client/okhor.png";
import { useEffect } from "react";

const Client = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className="pt-16">
      <div className="relative bg-white  bg-cover bg-center bg-no-repeat h-60">
        <h1 className="md:text-4xl text-2xl text-center font-semibold pt-24 text-[#333] ml-5">
          Our Client
        </h1>
        <img
          src={weepoka}
          alt=""
          className="absolute md:w-20 w-10 md:-left-52 left-[-122px] right-0 mx-auto md:top-16 top-[84px]"
        />
      </div>
      <div className="bg-[#F0F2F5]">
        <div className="max-w-screen-2xl mx-auto px-5 md:px-20 pb-20 ">
          <div className="grid justify-self-center grid-cols-3 md:grid-cols-4 xl:grid-cols-9 gap-5 md:gap-10 text-center pt-12">
            <img
              src={client1}
              alt=""
              className="w-36 border  rounded-md bg-white"
            />
            <img
              src={client2}
              alt=""
              className="w-36 border  rounded-md bg-white"
            />
            <img
              src={client3}
              alt=""
              className="w-36 border  rounded-md bg-white"
            />
            <img
              src={client4}
              alt=""
              className="w-36 border  rounded-md bg-white"
            />
            <img
              src={client5}
              alt=""
              className="w-36 border  rounded-md bg-white"
            />
            <img
              src={client6}
              alt=""
              className="w-36 border  rounded-md bg-white"
            />
            <img
              src={client7}
              alt=""
              className="w-36 border  rounded-md bg-white"
            />
            <img
              src={client8}
              alt=""
              className="w-36 border  rounded-md bg-white"
            />
            <img
              src={client9}
              alt=""
              className="w-36 border  rounded-md bg-white"
            />
            <img
              src={client10}
              alt=""
              className="w-36 border  rounded-md bg-white"
            />
            <img
              src={client11}
              alt=""
              className="w-36 border  rounded-md bg-white"
            />
            <img
              src={client12}
              alt=""
              className="w-36 border  rounded-md bg-white"
            />
            <img
              src={client13}
              alt=""
              className="w-36 border  rounded-md bg-white"
            />
            <img
              src={client14}
              alt=""
              className="w-36 border  rounded-md bg-white"
            />
            <img
              src={client15}
              alt=""
              className="w-36 border  rounded-md bg-white"
            />
            <img
              src={client16}
              alt=""
              className="w-36 border  rounded-md bg-white"
            />
            <img
              src={client17}
              alt=""
              className="w-36 border  rounded-md bg-white"
            />
            <img
              src={client18}
              alt=""
              className="w-36 border  rounded-md bg-white"
            />
            <img
              src={client20}
              alt=""
              className="w-36 border  rounded-md bg-white"
            />
            <img
              src={client21}
              alt=""
              className="w-36 border  rounded-md bg-white"
            />
            <img
              src={client22}
              alt=""
              className="w-36   border  rounded-md bg-white"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Client;
