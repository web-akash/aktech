import React, { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import axios from "../Axios/Axios";
import {
  Button,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { activeUser } from "../userSlice/UserSlice";

const Login = () => {
  let navigate = useNavigate();
  const dispatch = useDispatch();
  const naviagte = useNavigate();
  const selectore = useSelector((state) => state);
  const [showPassword, setShowPassword] = React.useState(false);
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState({
    email: "",
    password: "",
  });
  useEffect(() => {
    if (selectore.user.userValue?.success == "Successfully Login") {
      naviagte("/");
    }
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const handelChange = (e) => {
    let { name, value } = e.target;
    setData({ ...data, [name]: value });
    setError({ ...error, [name]: value ? "" : `${name} is requried` });
  };

  const handelLogin = async () => {
    if (!data.email) {
      setError({ email: "please input your email" });
    } else if (!data.password) {
      setError({ password: "please input your password" });
    } else {
      try {
        let res = await axios.post("/api/auth/login", data);
        console.log("ami log data:", res.data.data);
        if (res.data?.success) {
          toast.success(res.data?.success || res.data?.error, {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
          dispatch(activeUser(res.data));
          localStorage.setItem("user", JSON.stringify(res.data));
          setTimeout(() => {
            if (res.data.data.role === "aklogicAdmin") {
              navigate("/aklogicadmin");
            } else {
              navigate("/");
            }
          }, 1000);
        } else {
          toast.error(res.data?.success || res.data?.error, {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        }
      } catch (e) {
        console.log(e);
      }
    }
  };

  const handleSearchInputKeyDown = (e) => {
    if (e.key === "Enter") {
      handelLogin();
    }
  };

  return (
    <div className="max-w-[400px] px-3 my-[100px] mx-auto  ">
      <div className="flex flex-col gap-y-4 font-light text-base">
        <ToastContainer
          position="top-right"
          autoClose={2000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
        {error && (
          <p className="text-red-600">{error.email || error.password}</p>
        )}
        <TextField
          id="outlined-basic"
          fullWidth
          onKeyDown={handleSearchInputKeyDown}
          name="email"
          label="Email"
          onChange={handelChange}
          variant="outlined"
        />

        <FormControl variant="outlined">
          <InputLabel htmlFor="outlined-adornment-password">
            Password
          </InputLabel>
          <OutlinedInput
            id="outlined-adornment-password"
            onChange={handelChange}
            onKeyDown={handleSearchInputKeyDown}
            name="password"
            type={showPassword ? "text" : "password"}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            label="Password"
          />
        </FormControl>

        <Button
          sx={{
            backgroundColor: "#004282",
            "&:hover": {
              backgroundColor: "#004282",
            },
          }}
          onClick={handelLogin}
          variant="contained"
        >
          Login
        </Button>
        <p className="text-xs">
          Don't have an account?
          <span
            onClick={() => navigate("/singup")}
            className=" text-[#004282] font-bold cursor-pointer"
          >
            {" "}
            Sing up
          </span>
        </p>
      </div>
    </div>
  );
};

export default Login;
