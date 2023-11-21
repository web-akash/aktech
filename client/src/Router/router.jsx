import { createBrowserRouter } from "react-router-dom";
import Error from "../Pages/Error/Error";
import Main from "../Layout/Main";
import Home from "../Pages/Home/Home";
import Contact from "../Pages/Contact/Contact";
import Client from "../Pages/Client/Client";
import Works from "../Pages/Works/Works";
import ServiceCategories from "../Pages/ServiceCategories/ServiceCategories";
import Ecommece from "../Pages/Services/AllServices/Ecommece";
import SingleCart from "../Pages/SingleCart/SingleCart";
import PaymentSuccess from "../Component/Payments/PaymentSuccess";
import PaymentFailed from "../Component/Payments/PaymentFaild";
import PaymentCancal from "../Component/Payments/PaymentCancal";
import Login from "../Component/auth/Login";
import Singup from "../Component/auth/Singup";
import VerifyEmail from "../Component/VerifyEmail/VerifyEmail";
import ErrorEmail from "../Component/VerifyEmail/errorEmail";
import ThemeDetails from "../Pages/ThemeDetails/themeDetails";
import SearchThemes from "../Component/SearchThemes/SearchThemes";
import Admin from "../Pages/Admin/Admin";
import Profile from "../Pages/Profile/profile";
import AboutUs from "../Component/AboutUs/AboutUs";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    errorElement: <Error />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/Services",
        element: <ServiceCategories />,
      },
      {
        path: "/Our_Work",
        element: <Works />,
      },
      {
        path: "/Clients",
        element: <Client />,
      },
      {
        path: "/paymentSuccess/:id",
        element: <PaymentSuccess />,
      },
      {
        path: "/paymentfailed/:id",
        element: <PaymentFailed />,
      },
      {
        path: "/paymentCancal/:id",
        element: <PaymentCancal />,
      },
      {
        path: "/Contact_us",
        element: <Contact />,
      },
      {
        path: "/singup",
        element: <Singup />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/items/:id",
        element: <ThemeDetails />,
      },
      {
        path: "/emailverify/:id",
        element: <VerifyEmail />,
      },
      {
        path: "/errorverify/:id",
        element: <ErrorEmail />,
      },
      {
        path: "/searchThemes",
        element: <SearchThemes />,
      },
      {
        path: "/aklogicadmin",
        element: <Admin />,
      },
      {
        path: "/profile",
        element: <Profile />,
      },
      {
        path: "/about_us",
        element: <AboutUs />,
      },
    ],
  },
]);
