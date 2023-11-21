import { RouterProvider } from "react-router-dom";
import "./tailwind.css";
import { router } from "./Router/router";
import { useEffect, useState } from "react";
import pokaImg from "./assets/logo/weepoka.png";
function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [showImage, setShowImage] = useState(false);

  useEffect(() => {
    // Simulate an API call or any asynchronous operation
    setTimeout(() => {
      setIsLoading(false); // Once the data is loaded, set isLoading to false
    }, 2500); // Simulating a 2-second loading time
  }, []);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setShowImage(true);
    }, 1000); // Simulating a 1-second loading time

    return () => {
      clearTimeout(timeout);
    };
  }, []);

  window.onbeforeunload = function () {
    window.scrollTo(0, 0);
  };

  return (
    <>
      <RouterProvider router={router} />
    </>
    // <>
    //   {isLoading ? (
    //     <div className="flex items-center h-screen justify-center">
    //       <div>
    //         <div className="loading-container">
    //           <div className="loading-text">
    //             <span>W</span>
    //             <span>E</span>
    //             <span>E</span>
    //             <span>P</span>
    //             {showImage && (
    //               <img
    //                 src={pokaImg}
    //                 alt=""
    //                 className={`fade-in w-10 h-10 md:h-auto mt-3 md:mt-0 md:w-20 ${
    //                   showImage ? "visible" : ""
    //                 }`}
    //               />
    //             )}
    //             <span>K</span>
    //             <span>A</span>
    //           </div>
    //         </div>
    //       </div>
    //     </div>
    //   ) : (
    //     <>
    //       <RouterProvider router={router} />
    //     </>
    //   )}
    // </>
  );
}

export default App;
