import { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import {
  Button,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import axios from "../Axios/Axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch } from "react-redux";
import { activeUser } from "../userSlice/UserSlice";

const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const [info, setInfo] = useState({
    fullname: "",
    email: "",
    number: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState({
    fullname: "",
    email: "",
    number: "",
    password: "",
    confirmPassword: "",
  });

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInfo({ ...info, [name]: value });
    setError({ ...error, [name]: "" }); // Clear error when user starts typing
  };

  const handleSignup = async () => {
    let hasError = false;
    const newError = { ...error };

    if (!info.fullname.trim()) {
      newError.fullname = "Please enter your full name";
      hasError = true;
    }

    const emailRegex = /^[\w.+\-]+@gmail\.com$/;
    if (!info.email.trim() || !emailRegex.test(info.email.trim())) {
      newError.email = "Please enter a valid email address";
      hasError = true;
    }

    const phoneRegex = /^(?:\+?88)?01[13-9]\d{8}$/;
    if (!info.number.trim() || !phoneRegex.test(info.number.trim())) {
      newError.number = "Please enter a valid phone number";
      hasError = true;
    }

    if (info.password.trim().length < 6) {
      newError.password = "Password should be at least 6 characters long";
      hasError = true;
    }

    if (info.confirmPassword.trim() !== info.password.trim()) {
      newError.confirmPassword = "Passwords do not match";
      hasError = true;
    }

    if (hasError) {
      setError(newError);
    } else {
      let data = await axios
        .post("/api/auth/singup", {
          fullname: info.fullname,
          email: info.email,
          number: info.number,
          name: info.name,
          password: info.password,
        })
        .then((data) => {
          if (data.data.success) {
            toast.success(data.data.success, {
              position: "top-right",
              autoClose: 1000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
            });
            setTimeout(() => {
              navigate("/login");
            }, 2000);
          }
          if (data.data.error) {
            toast.warn(data.data.error, {
              position: "top-right",
              autoClose: 1000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
            });
          }
        });
    }
  };
  const handleSearchInputKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSignup();
    }
  };
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="max-w-[400px] px-3 my-[100px] mx-auto">
      <div className="flex flex-col gap-y-4 font-light text-base">
        <ToastContainer
          position="top-right"
          autoClose={1000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
        {/* Same as */}
        <ToastContainer />
        <TextField
          id="outlined-basic"
          fullWidth
          name="fullname"
          label="Full Name"
          onKeyDown={handleSearchInputKeyDown}
          variant="outlined"
          onChange={handleInputChange}
          error={!!error.fullname}
          helperText={error.fullname}
        />
        <TextField
          id="outlined-basic"
          fullWidth
          name="email"
          label="Email"
          variant="outlined"
          onChange={handleInputChange}
          error={!!error.email}
          helperText={error.email}
        />
        <TextField
          id="outlined-basic"
          fullWidth
          name="number"
          label="Phone Number"
          variant="outlined"
          onChange={handleInputChange}
          error={!!error.number}
          onKeyDown={handleSearchInputKeyDown}
          helperText={error.number}
        />
        <FormControl variant="outlined">
          <InputLabel htmlFor="outlined-adornment-password">
            Password
          </InputLabel>
          <OutlinedInput
            id="outlined-adornment-password"
            onChange={handleInputChange}
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
            error={!!error.password}
            helperText={error.password}
          />
        </FormControl>
        <FormControl variant="outlined">
          <InputLabel htmlFor="outlined-adornment-password">
            Confirm password
          </InputLabel>
          <OutlinedInput
            id="outlined-adornment-password"
            type={showPassword ? "text" : "password"}
            onKeyDown={handleSearchInputKeyDown}
            onChange={handleInputChange}
            name="confirmPassword"
            endAdornment={<InputAdornment position="end"></InputAdornment>}
            label="Confirm password"
            error={!!error.confirmPassword}
            helperText={error.confirmPassword}
          />
        </FormControl>
        <Button
          sx={{
            backgroundColor: "#004282",
            "&:hover": {
              backgroundColor: "#004282",
            },
          }}
          onClick={handleSignup}
          variant="contained"
        >
          Sign up
        </Button>
        <p className="text-xs">
          Already have an account?{" "}
          <span
            onClick={() => navigate("/login")}
            className="text-[#004282] font-bold cursor-pointer"
          >
            Login
          </span>
        </p>
      </div>
    </div>
  );
};

export default Signup;
