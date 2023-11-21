// PaymentCancelled.js
import React from "react";
import { useSpring, animated } from "react-spring";

function PaymentCancelled() {
  const fadeIn = useSpring({
    from: { opacity: 0 },
    to: { opacity: 1 },
    config: { duration: 1000 },
  });

  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center">
      <animated.div
        style={fadeIn}
        className="bg-white p-8 rounded-lg shadow-lg max-w-md text-center"
      >
        <h1 className="text-3xl font-semibold text-yellow-600 mb-4">
          Payment Cancelled
        </h1>
        <p className="text-gray-700 mb-6">Your payment has been cancelled.</p>
        <animated.div className="mb-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="h-16 w-16 text-yellow-600 mx-auto"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </animated.div>
        <p style={fadeIn} className="text-gray-500 text-sm mt-2">
          If you wish to complete your payment, please click the button below.
        </p>
      </animated.div>
    </div>
  );
}

export default PaymentCancelled;
