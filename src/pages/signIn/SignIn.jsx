import { Link, useNavigate } from "react-router-dom";
import img from "../../assets/sign-in/sign-in.gif";
import { useState } from "react";
import {
  getAuth,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import { ToastContainer, toast } from "react-toastify";
import { IoEye, IoEyeOff } from "react-icons/io5";
import { useDispatch } from "react-redux";
import { userData } from "../../userLoginInfoSlice";
const SignIn = () => {
  //state variables
  const [email, setEmail] = useState("");
  const [password, setPassowrd] = useState("");
  const [emailErr, setEmailErr] = useState("");
  const [passwordErr, setPasswordErr] = useState("");
  const [error, setError] = useState(false);
  const [show, setShow] = useState(true);
  // other variable
  const auth = getAuth();
  const provider = new GoogleAuthProvider();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // signedin with email and password
  const handleSignedIn = () => {
    if (email.trim() === "" && password.trim() === "") {
      setEmailErr("Enter your Email");
      setPasswordErr("Enter your password");
      return;
    }
    // Signed in
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        if (user.emailVerified) { 
          toast.success("Sign In successful");
          dispatch(userData(user));
          localStorage.setItem("userData", JSON.stringify(user));
          setTimeout(() => {
            navigate("/");
          }, 2000);
        } else {
          toast.warn("please verify your email");
        }
        //navogate to home
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        errorCode === "auth/invalid-credential" && setError(true),
          toast.error("Incorrect Information");
        errorCode === "auth/missing-password" && setError(true);
      });
  };
  // signedIn with google
  const signedInWithGoogle = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        // The signed-in user info.
        const user = result.user;
        dispatch(userData(user))
        localStorage.setItem('userData',JSON.stringify(user))
        navigate('/')
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        console.log("🚀 > file: SignIn.jsx:71 > signedInWithGoogle > errorCode:", errorCode)
        const errorMessage = error.message;   // The email of the user's account used.
        console.log("🚀 > file: SignIn.jsx:73 > signedInWithGoogle > errorMessage:", errorMessage)
        const email = error.customData.email;
        console.log("🚀 > file: SignIn.jsx:75 > signedInWithGoogle > email:", email)
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        console.log("🚀 > file: SignIn.jsx:79 > signedInWithGoogle > credential:", credential)
        // ...
      });
  };
  return (
    <>
      <ToastContainer
        position="top-center"
        autoClose={1000}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
      <div className="h-full md:h-screen">
        <div className="container mx-auto">
          <div className="flex justify-center px-6 my-12">
            <div className="w-full xl:w-3/4 lg:w-11/12 flex items-center justify-center">
              <div className="w-full h-auto hidden lg:block lg:w-5/12 bg-cover rounded-l-lg">
                <p>
                  <img src={img} alt="image" />
                </p>
              </div>
              <main className="w-full max-w-md mx-auto p-6">
                <div className="mt-7 bg-white border border-gray-200 rounded-xl shadow-sm">
                  <div className="p-4 sm:p-7">
                    <div className="text-center">
                      <h1 className="block text-2xl font-bold text-gray-800">
                        Sign in
                      </h1>
                      <p className="mt-2 text-sm text-gray-600 font-pops">
                        {"Don't"} have an account yet?{" "}
                        <Link
                          className="text-blue-600 decoration-2 hover:underline font-medium"
                          to={"/sign-up"}
                        >
                          Sign up here
                        </Link>
                      </p>
                    </div>

                    <div className="mt-5">
                      <button
                        onClick={signedInWithGoogle}
                        type="button"
                        className="w-full py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none"
                      >
                        <svg
                          className="w-4 h-auto"
                          width="46"
                          height="47"
                          viewBox="0 0 46 47"
                          fill="none"
                        >
                          <path
                            d="M46 24.0287C46 22.09 45.8533 20.68 45.5013 19.2112H23.4694V27.9356H36.4069C36.1429 30.1094 34.7347 33.37 31.5957 35.5731L31.5663 35.8669L38.5191 41.2719L38.9885 41.3306C43.4477 37.2181 46 31.1669 46 24.0287Z"
                            fill="#4285F4"
                          />
                          <path
                            d="M23.4694 47C29.8061 47 35.1161 44.9144 39.0179 41.3012L31.625 35.5437C29.6301 36.9244 26.9898 37.8937 23.4987 37.8937C17.2793 37.8937 12.0281 33.7812 10.1505 28.1412L9.88649 28.1706L2.61097 33.7812L2.52296 34.0456C6.36608 41.7125 14.287 47 23.4694 47Z"
                            fill="#34A853"
                          />
                          <path
                            d="M10.1212 28.1413C9.62245 26.6725 9.32908 25.1156 9.32908 23.5C9.32908 21.8844 9.62245 20.3275 10.0918 18.8588V18.5356L2.75765 12.8369L2.52296 12.9544C0.909439 16.1269 0 19.7106 0 23.5C0 27.2894 0.909439 30.8731 2.49362 34.0456L10.1212 28.1413Z"
                            fill="#FBBC05"
                          />
                          <path
                            d="M23.4694 9.07688C27.8699 9.07688 30.8622 10.9863 32.5344 12.5725L39.1645 6.11C35.0867 2.32063 29.8061 0 23.4694 0C14.287 0 6.36607 5.2875 2.49362 12.9544L10.0918 18.8588C11.9987 13.1894 17.25 9.07688 23.4694 9.07688Z"
                            fill="#EB4335"
                          />
                        </svg>
                        Sign in with Google
                      </button>

                      <div className="py-3 flex items-center text-xs text-gray-400 uppercase before:flex-[1_1_0%] before:border-t before:border-gray-200 before:me-6 after:flex-[1_1_0%] after:border-t after:border-gray-200 after:ms-6">
                        Or
                      </div>

                      {/* Form */}
                      <form onClick={(e) => e.preventDefault()}>
                        <div className="grid gap-y-4">
                          {/* Form Group */}
                          <div>
                            <label
                              htmlFor="email"
                              className="block text-sm mb-2 font-semibold font-pops"
                            >
                              Email address
                            </label>
                            <div className="relative">
                              <input
                                type="email"
                                id="email"
                                name="email"
                                placeholder="Enter your email "
                                value={email}
                                onChange={(e) => {
                                  setEmail(e.target.value);
                                }}
                                className="py-3 px-4 block w-full mb-3 font-pops  rounded-lg text-sm border border-gray-300 outline-none disabled:opacity-50 disabled:pointer-events-none"
                                required
                                aria-describedby="email-error"
                              />
                              {emailErr && (
                                <p className=" absolute -bottom-7 w-full py-0.5 text-sm  text-white  rounded-bl-3xl  px-4 font-semibold bg-red-500">
                                  {emailErr}
                                </p>
                              )}
                              <div
                                className={`absolute  end-0 flex items-center pointer-events-none pe-3 ${
                                  error ? "flex top-3" : "hidden"
                                }`}
                              >
                                <svg
                                  className="h-5 w-5 text-red-500"
                                  width="16"
                                  height="16"
                                  fill="currentColor"
                                  viewBox="0 0 16 16"
                                  aria-hidden="true"
                                >
                                  <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8 4a.905.905 0 0 0-.9.995l.35 3.507a.552.552 0 0 0 1.1 0l.35-3.507A.905.905 0 0 0 8 4zm.002 6a1 1 0 1 0 0 2 1 1 0 0 0 0-2z" />
                                </svg>
                              </div>
                            </div>
                            <p
                              className="hidden text-xs text-red-600 mt-2"
                              id="email-error"
                            >
                              Please include a valid email address so we can get
                              back to you
                            </p>
                          </div>
                          {/* End Form Group */}

                          {/* Form Group */}
                          <div>
                            <div className="flex justify-between items-center">
                              <label
                                htmlFor="password"
                                className="block text-sm mb-2 font-semibold font-pops"
                              >
                                Password
                              </label>
                              <Link
                                className="text-sm text-blue-600 decoration-2 hover:underline font-medium font-pops"
                                to={"/forget-password"}
                              >
                                Forgot password?
                              </Link>
                            </div>
                            <div className="relative">
                              <input
                                type="password"
                                id="password"
                                name="password"
                                placeholder="Enter your password "
                                value={password}
                                onChange={(e) => {
                                  setPassowrd(e.target.value);
                                }}
                                className="py-3 px-4 mb-5 block w-full  rounded-lg font-pops text-sm border border-gray-300 outline-none disabled:opacity-50 disabled:pointer-events-none "
                                required
                                aria-describedby="password-error"
                              />
                              {passwordErr && (
                                <p className="absolute w-full -bottom-7 py-0.5 text-sm text-white  rounded-bl-3xl  px-4 font-semibold bg-red-500">
                                  {passwordErr}
                                </p>
                              )}
                              {/* eye icon */}
                              <div
                                onClick={() => setShow((prev) => !prev)}
                                className={`absolute  end-0 flex items-center top-3.5 right-0 pe-3 text-lg cursor-pointer z-20 
                                   `}
                              >
                                {show ? <IoEye /> : <IoEyeOff />}
                              </div>
                            </div>
                          </div>
                          {/* End Form Group */}

                          <button
                            type="submit"
                            onClick={handleSignedIn}
                            className=" active:scale-95 w-full py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none"
                          >
                            Sign in
                          </button>
                        </div>
                      </form>
                      {/* End Form */}
                    </div>
                  </div>
                </div>
              </main>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignIn;
