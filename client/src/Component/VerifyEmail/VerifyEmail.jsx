import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useSpring, animated } from "react-spring";

function VerifyEmail() {
  const fadeIn = useSpring({
    from: { opacity: 0 },
    to: { opacity: 1 },
    config: { duration: 1000 },
  });

  const slideIn = useSpring({
    from: { transform: "translateX(-100%)" },
    to: { transform: "translateX(0%)" },
    config: { duration: 800 },
  });
  let id = useParams().id;
  console.log(id);
  const [show, SetShow] = useState(false);
  let linkid = async () => {
    let res = await axios.get("http://localhost:8000/api/auth/alluser");
    let data = res.data;
    data.map((item, index) => {
      if (item.token == id) {
        return SetShow(true);
      }
    });
  };
  useEffect(() => {
    linkid();
  }, []);

  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center">
      <animated.div
        style={fadeIn}
        className="bg-white p-8 rounded-lg shadow-lg max-w-md"
      >
        {/* {show ? (
          <h1 className="text-3xl font-semibold text-red-600 mb-4">
            your are now allready verified
          </h1>
        ) : (
          <> */}
        <h1 className="text-3xl font-semibold text-green-600 mb-4">
          Your Email Verification Successful!
        </h1>
        <animated.div style={slideIn} className="text-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="h-16 w-16 text-green-600 mx-auto mb-4"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
        </animated.div>
        {/* </>
        )} */}

        <animated.p style={slideIn} className="text-gray-500 text-sm mt-2">
          <Link to={"/"}> Go TO Home Page</Link>
        </animated.p>
      </animated.div>
    </div>
  );
}

export default VerifyEmail;
