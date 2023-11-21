import { useParams } from "react-router-dom";

const SingleCart = () => {
  const id = useParams();
  console.log(id);

  return (
    <>
      <div className="py-40 container mx-auto">
        {open ? (
          <div className="fixed  top-0 left-0 w-full h-full z-[10000] blus ">
            <div className=" bg-white xl:w-[30%] md:w-[80%] w-[80%]   absolute top-[50%] left-[50%]  translate-x-[-50%] translate-y-[-50%] px-5 py-5">
              <ImCancelCircle
                className="absolute top-[5%] right-[5%] text-2xl cursor-pointer"
                onClick={handleClose}
              />

              <h1 className="md:text-3xl text-lg">
                {orderDetails.packageName}
              </h1>
              <p className="md:text-2xl text-base mt-4">
                {orderDetails.packagePrice}
              </p>
              <form onSubmit={handleSubmit} className="mt-4">
                <div className="flex flex-col gap-y-4">
                  <TextField
                    id="standard-basic"
                    label="Full Name"
                    fullWidth
                    variant="standard"
                    name="fullname"
                    value={orderDetails.fullname}
                    onChange={handleChange}
                  />
                  <TextField
                    id="standard-basic"
                    label="Phone number"
                    fullWidth
                    variant="standard"
                    name="phoneNumber"
                    value={orderDetails.phoneNumber}
                    onChange={handleChange}
                  />
                  <TextField
                    id="standard-basic"
                    label="Email"
                    fullWidth
                    variant="standard"
                    name="email"
                    value={orderDetails.email}
                    onChange={handleChange}
                    error={emailError}
                    helperText={emailError ? "Email already exists" : ""}
                  />
                </div>

                <textarea
                  className=" mt-5 border w-[100%]  focus:outline-none focus:ring-2 focus:ring-[#0D4D98] focus:border-transparent  "
                  id="w3review"
                  rows="4"
                  cols="50"
                  placeholder="Your Massage"
                  name="massage"
                  value={orderDetails.massage}
                  onChange={handleChange}
                ></textarea>

                <input
                  className="mt-4 relative m-0 block w-[50%] min-w-0 flex-auto cursor-pointer rounded border border-solid border-neutral-300 bg-clip-padding px-3 py-[0.32rem] text-xs font-normal text-neutral-700 transition duration-300 ease-in-out file:-mx-3 file:-my-[0.32rem] file:cursor-pointer file:overflow-hidden file:rounded-none file:border-0 file:border-solid file:border-inherit file:bg-neutral-100 file:px-3 file:py-[0.32rem] file:text-neutral-700 file:transition file:duration-150 file:ease-in-out file:[border-inline-end-width:1px] file:[margin-inline-end:0.75rem] hover:file:bg-neutral-200 focus:border-primary focus:text-neutral-700 focus:shadow-te-primary focus:outline-none dark:border-neutral-600 dark:text-neutral-200 dark:file:bg-neutral-700 dark:file:text-neutral-100 dark:focus:border-primary"
                  id="upload-photo"
                  name="upload-photo"
                  type="file"
                  onChange={handleFileChange}
                />

                <LoadingButton
                  sx={{ marginTop: "20px" }}
                  loading={loading}
                  loadingPosition="start"
                  variant="outlined"
                  type="submit"
                >
                  Confirm Order
                </LoadingButton>
              </form>
            </div>
          </div>
        ) : (
          ""
        )}
      </div>
    </>
  );
};

export default SingleCart;
