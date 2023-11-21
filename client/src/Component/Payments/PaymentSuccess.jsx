import { React } from "react";
import { useSpring, animated } from "react-spring";


// function PaymentSuccess() {
//   const fadeIn = useSpring({
//     from: { opacity: 0 },
//     to: { opacity: 1 },
//     config: { duration: 1000 },
//   });

//   const slideIn = useSpring({
//     from: { transform: "translateX(-100%)" },
//     to: { transform: "translateX(0%)" },
//     config: { duration: 800 },
//   });

//   return (
//     <div className="bg-gray-100 min-h-screen flex items-center justify-center">
//       <animated.div
//         style={fadeIn}
//         className="bg-white p-8 rounded-lg shadow-lg max-w-md"
//       >
//         <h1 className="text-3xl font-semibold text-green-600 mb-4">
//           {/* Payment Successful! */} Payment Success
//         </h1>
//         <p className="text-gray-700 mb-6">Thank you for your Order.</p>
//         <p className="text-gray-700 mb-6">We will touch you soon </p>
//         <animated.div style={slideIn} className="text-center">
//           <svg
//             xmlns="http://www.w3.org/2000/svg"
//             fill="none"
//             viewBox="0 0 24 24"
//             stroke="currentColor"
//             className="h-16 w-16 text-green-600 mx-auto mb-4"
//           >
//             <path
//               strokeLinecap="round"
//               strokeLinejoin="round"
//               strokeWidth={2}
//               d="M5 13l4 4L19 7"
//             />
//           </svg>
//         </animated.div>
//         <animated.p style={slideIn} className="text-gray-500 text-sm mt-2">
//           You will receive an email confirmation shortly.
//         </animated.p>
//         <animated.p style={slideIn} className="text-gray-500 text-sm mt-2">
//           Weepoka
//         </animated.p>
//       </animated.div>
//     </div>
//   );
// }

function PaymentSuccess() {


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



  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center">
      <animated.div
        style={fadeIn}
        className="bg-white p-8 rounded-lg shadow-lg max-w-md"
      >
        <h1 className="text-3xl font-semibold text-green-600 mb-4">
          {/* Payment Successful! */} Order Request Sent
        </h1>
        <p className="text-gray-700 mb-6">Thank you for your Order.</p>
        <p className="text-gray-700 mb-6">We will touch you soon </p>
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
        <animated.p style={slideIn} className="text-gray-500 text-sm mt-2">
          You will receive an email confirmation shortly.
        </animated.p>
        <animated.p style={slideIn} className="text-gray-500 text-end  text-sm mt-2">
          <small>Copyright © 2023 - All right reserved by Weepoka</small>
        </animated.p>
      </animated.div>
    </div>
  );
}

export default PaymentSuccess;
