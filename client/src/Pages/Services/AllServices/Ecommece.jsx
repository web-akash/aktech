import { Icon } from "@iconify/react";

const Ecommece = () => {
  return (
    <div>
      <div className="parallax">
        <div className="inset-0 absolute bg-black h-[50vh] opacity-10"></div>
        <div className="parallax__content"></div>
      </div>

      <div className="py-20">
        <div data-aos="zoom-in" className="text-center pb-14">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-[#004282]">
            E-commerce
          </h1>
          <p className="max-w-3xl mx-auto text-gray-600">
            Develop a user-friendly single and Multi-vendor e-commerce website
            with a secure payment system, and mobile optimization. Include a
            product catalog, shopping cart, and order tracking. Prioritize
            speed, scalability, and data security.
          </p>
        </div>
      </div>

      <div className="max-w-screen-xl mx-auto pb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <div className="border p-10 bg-gray-100 shadow">
            <h1 className="text-xl text-[#004282] font-bold">
              Package E-commerce Website
            </h1>

            <article className="pt-10">
              <ul>
                <li className="flex gap-2 items-center">
                  <Icon
                    icon="charm:shield-tick"
                    width={20}
                    className="text-[#004282]"
                  />
                  Domain & premium Hosting for 1 year free
                </li>
                <li className="flex gap-2 items-center">
                  <Icon
                    icon="charm:shield-tick"
                    width={20}
                    className="text-[#004282]"
                  />
                  Customize attractive Design
                </li>
                <li className="flex gap-2 items-center">
                  <Icon
                    icon="charm:shield-tick"
                    width={20}
                    className="text-[#004282]"
                  />
                  Business Webmail
                </li>
                <li className="flex gap-2 items-center">
                  <Icon
                    icon="charm:shield-tick"
                    width={20}
                    className="text-[#004282]"
                  />
                  COD & payment getway (Bkash, Rocket, Nogod, Bank)
                </li>
                <li className="flex gap-2 items-center">
                  <Icon
                    icon="charm:shield-tick"
                    width={20}
                    className="text-[#004282]"
                  />
                  Responsive Design
                </li>
                <li className="flex gap-2 items-center">
                  <Icon
                    icon="charm:shield-tick"
                    width={20}
                    className="text-[#004282]"
                  />
                  Admin Panel
                </li>
                <li className="flex gap-2 items-center">
                  <Icon
                    icon="charm:shield-tick"
                    width={20}
                    className="text-[#004282]"
                  />
                  SEO Friendly
                </li>
                <li className="flex gap-2 items-center">
                  <Icon
                    icon="charm:shield-tick"
                    width={20}
                    className="text-[#004282]"
                  />
                  Security Modules
                </li>
                <li className="flex gap-2 items-center">
                  <Icon
                    icon="charm:shield-tick"
                    width={20}
                    className="text-[#004282]"
                  />
                  Unlimited Category and Brand & vendor & product Manage
                </li>
                <li className="flex gap-2 items-center">
                  <Icon
                    icon="charm:shield-tick"
                    width={20}
                    className="text-[#004282]"
                  />
                  Well Documentation & tranning
                </li>
              </ul>

              <div>
                <a
                  href="https://wa.me/+8801606104415"
                  rel="noreferrer"
                  target="_blank"
                >
                  <button className="my-5 bg-[#004282] text-white px-5 py-1 rounded hover:scale-105 duration-300 font-semibold text-[14px]">
                    Order Now
                  </button>
                </a>
              </div>
            </article>
          </div>

          <div className="border p-10 bg-gray-100 shadow">
            <h1 className="text-xl text-[#004282] font-bold">
              Custom E-commerce Website
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Ecommece;
