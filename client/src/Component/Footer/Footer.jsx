import { Icon } from "@iconify/react";
import { Link } from "react-router-dom";

const Footer = () => {
  const today = new Date();
  const year = today.getFullYear();
  return (
    <div className="bg-[#004282]">
      <div
        className=" max-w-screen-2xl mx-auto grid grid-cols-1 
        text-center md:text-start lg:text-start md:grid-cols-4 lg:grid-cols-4 xl:gap-5 p-10  text-white"
      >
        <div className="flex flex-col text-gray-300 ">
          <span className="footer-title border-b w-20 mb-5 text-white mx-auto md:mx-0">
            Services
          </span>
          <Link className="link link-hover hover:scale-105 scale-100 duration-500">
            Website Design & Development
          </Link>
          <Link className="link link-hover hover:scale-105 scale-100 duration-500">
            creative Graphics
          </Link>
          <Link className="link link-hover hover:scale-105 scale-100 duration-500">
            Digital Marketing
          </Link>
          <Link className="link link-hover hover:scale-105 scale-100 duration-500">
            Seo and Website Management
          </Link>
          <Link className="link link-hover hover:scale-105 scale-100 duration-500">
            Social Media Management
          </Link>
        </div>

        <div className="flex flex-col text-gray-300 my-10 md:my-0">
          <span className="footer-title border-b w-24 mb-5 text-white mx-auto md:mx-0">
            Company
          </span>
          <Link
            onClick={() => {
              window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
            }}
            to="/"
            className="link link-hover hover:scale-105 scale-100 duration-500"
          >
            Home
          </Link>
          <Link
            onClick={() => {
              window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
            }}
            to="/Services"
            className="link link-hover hover:scale-105 scale-100 duration-500"
          >
            Services
          </Link>
          <Link
            onClick={() => {
              window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
            }}
            to="Our_Work"
            className="link link-hover hover:scale-105 scale-100 duration-500"
          >
            Our Work
          </Link>
          <Link
            onClick={() => {
              window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
            }}
            to="/Clients"
            className="link link-hover hover:scale-105 scale-100 duration-500"
          >
            Clients
          </Link>

          <Link
            onClick={() => {
              window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
            }}
            to="/Contact_us"
            className="link link-hover hover:scale-105 scale-100 duration-500"
          >
            Contact Us
          </Link>
          <Link
            onClick={() => {
              window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
            }}
            to="/about_us"
            className="link link-hover hover:scale-105 scale-100 duration-500"
          >
            About Us
          </Link>
        </div>

        <div>
          <div className="text-gray-300">
            <h2 className="footer-title border-b w-20 mb-5 text-white mx-auto md:mx-0">
              Address
            </h2>
            <p>
              {" "}
              House#2/1, Road# 2, Block# C, Section# 2, Mirpur, Dhaka-1216.
            </p>

            <a href="mailto:dev.mhakash@gmail.com">
              <span className="font-bold footer-title mr-2 my-2">Email:</span>
              dev.mhakash@gmail.com
            </a>

            <p>
              <a href="tel:01608371608">
                <span className="font-bold footer-title my-2">Phone:</span>{" "}
                01608371608
              </a>
            </p>
          </div>
          <div className="mt-5">
            <span className="footer-title border-b w-32 mb-5 text-white">
              Social
            </span>
            <div className=" flex gap-2 mt-3 items-center justify-center md:justify-start">
              <a href="mailto:contact@weepoka.com" rel="noreferrer">
                <Icon
                  icon="dashicons:email"
                  width={38}
                  className="hover:scale-125 duration-500"
                />
              </a>

              <a
                href="https://www.facebook.com"
                rel="noreferrer"
                target="_blank"
              >
                <Icon
                  icon="ant-design:facebook-filled"
                  width={30}
                  className="hover:scale-125 duration-500"
                />
              </a>

              <a
                href="https://wa.me/01608371608"
                rel="noreferrer"
                target="_blank"
              >
                <Icon
                  icon="fa6-brands:square-whatsapp"
                  width={25}
                  className="hover:scale-125 duration-500"
                />
              </a>
            </div>
          </div>
        </div>

        {/* Map part */}
        <div className="md:ml-10 xl:ml-0 mt-10 md:mt-0">
          <div className="w-full h-[200px] bg-white ">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m1"
              allowfullscreen=""
              loading="lazy"
              referrerpolicy="no-referrer-when-downgrade"
              title="Ak Tech"
              className="w-full h-[200px] "
            ></iframe>
          </div>
        </div>
      </div>
      <p className="text-center pb-10 text-slate-400">
        {" "}
        <small>Copyright © {year} - by MD. Mehedi hasan Akash</small>
      </p>
    </div>
  );
};

export default Footer;
