// PaymentFailed.js
import React from "react";
import { useSpring, animated } from "react-spring";

function PaymentFailed() {
  const fadeIn = useSpring({
    from: { opacity: 0 },
    to: { opacity: 1 },
    config: { duration: 1000 },
  });

  const shake = useSpring({
    from: { transform: "translateX(0)" },
    to: { transform: "translateX(-10px)" },
    config: { duration: 100, yoyo: true, repeat: 4 },
  });

  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center">
      <animated.div
        style={fadeIn}
        className="bg-white p-8 rounded-lg shadow-lg max-w-md"
      >
        <h1 className="text-3xl font-semibold text-red-600 mb-4">
          Payment Failed
        </h1>
        <p className="text-gray-700 mb-6">
          Oops! Something went wrong with your payment.
        </p>
        <animated.div style={shake} className="text-center mb-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="h-16 w-16 text-red-600 mx-auto"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </animated.div>
        <animated.p style={fadeIn} className="text-gray-500 text-sm mt-2">
          Please check your payment details and try again.
        </animated.p>
      </animated.div>
    </div>
  );
}

export default PaymentFailed;
