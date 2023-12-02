import { Link, useNavigate } from "react-router-dom";
import img from "../../assets/sign-up/Sign-up.gif";
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
  sendEmailVerification,
} from "firebase/auth";
import { useState } from "react";
import { IoEye, IoEyeOff } from "react-icons/io5";
import { ToastContainer, toast } from "react-toastify";
import { getDatabase, ref, set } from "firebase/database";
import "react-toastify/dist/ReactToastify.css";
const SignUp = () => {
  // firebase
  const auth = getAuth();
  const db  = getDatabase()
  // state variables
  const [fName, setFname] = useState("");
  const [lName, setLname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassowrd] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  // showing errors
  const [fNameErr, setFnameErr] = useState("");
  const [lNameErr, setLnameErr] = useState("");
  const [emailErr, setEmailErr] = useState("");
  const [passwordErr, setPasswordErr] = useState("");
  const [confirmPasswordErr, setConfirmPasswordErr] = useState("");
  // react router
  const navigate = useNavigate();
  // handle validation

  const handleSignUp = () => {
    if (fName === "") {
      setFnameErr("Please enter your first name ");
    }
    if (lName === "") {
      setLnameErr("Please enter your last name");
    }
    if (password === "") {
      setPasswordErr("Please enter your password");
    }
    if (email === "") {
      setEmailErr("Please enter your email");
    }
    if (confirmPassword === "") {
      setConfirmPasswordErr("confirm your password");
    }
    if (
      fName.trim() === "" ||
      lName.trim() === "" ||
      password.trim() === "" ||
      confirmPassword.trim() === "" ||
      email.trim() === ""
    )
      return;
    if (password !== confirmPassword) {
      setConfirmPasswordErr("Password did not match");
      return;
    }

    // signup method
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed up
        const user = userCredential.user;
        console.log("🚀 > file: SignUp.jsx:68 > .then > user:", user);
        updateProfile(auth.currentUser, {
          displayName: fName + " " + lName,
          photoURL: "./src/assets/user.png",
        })
          .then(() => {
            sendEmailVerification(auth.currentUser);
            toast.success("Registration successful");
            setTimeout(() => {
              navigate("/sign-in");
            }, 2000);
          })
          .then(() => {
            set(ref(db, "users/" + user.uid), {
              username: user.displayName,
              email: user.email,
              profile_picture: user.photoURL,
            });
          });
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        if (errorCode === "auth/email-already-in-use") {
          setEmailErr("this email already exist");
        }
        const errorMessage = error.message;
        console.log(
          "🚀 > file: SignUp.jsx:90 > handleSignUp > errorMessage:",
          errorMessage
        );
        // ..
      });
  };
  return (
    <>
      <ToastContainer
        position="top-center"
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
      <main>
        <div className="container mx-auto">
          <div className="flex justify-center px-6 my-12">
            <div className="w-full xl:w-3/4 lg:w-11/12 flex items-center justify-center">
              <div className="w-full h-auto hidden lg:block lg:w-5/12 bg-cover rounded-l-lg">
                <img src={img} alt="image" />
              </div>

              <div className="w-full lg:w-7/12 bg-white p-5 rounded-lg lg:rounded-l-none">
                <h3 className="pt-4 text-2xl text-center">
                  Create an Account!
                </h3>
                <form className="px-8 pt-6 pb-8 mb-4 bg-white rounded">
                  <div className="mb-4 md:flex md:justify-between">
                    <div className="mb-4 md:mr-2 md:mb-0">
                      <label
                        className="block mb-2 text-sm font-bold text-gray-700"
                        htmlFor="firstName"
                      >
                        First Name
                      </label>
                      <input
                        className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                        type="text"
                        placeholder="First Name"
                        value={fName}
                        onChange={(e) => (
                          setFname(e.target.value), setFnameErr("")
                        )}
                        required
                        pattern=".*\S+.*"
                        title="Please fill out this field"
                      />
                      <p className="text-sm text-white  rounded-bl-3xl mt-1 px-4 font-semibold bg-red-500">
                        {fNameErr}
                      </p>
                    </div>
                    <div className="md:ml-2">
                      <label
                        className="block mb-2 text-sm font-bold text-gray-700"
                        htmlFor="lastName"
                      >
                        Last Name
                      </label>
                      <input
                        className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                        type="text"
                        placeholder="Last Name"
                        value={lName}
                        onChange={(e) => {
                          setLname(e.target.value), setLnameErr("");
                        }}
                      />
                      <p className="text-sm text-white  rounded-bl-3xl mt-1 px-4 font-semibold bg-red-500">
                        {lNameErr}
                      </p>
                    </div>
                  </div>
                  <div className="mb-4">
                    <label
                      className="block mb-2 text-sm font-bold text-gray-700"
                      htmlFor="email"
                    >
                      Email
                    </label>
                    <input
                      className=" w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                      type="email"
                      placeholder="Email"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value), setEmailErr("");
                      }}
                    />
                    <p className="text-sm text-white  rounded-bl-3xl  px-4 font-semibold bg-red-500">
                      {emailErr}
                    </p>
                  </div>
                  <div className="mb-4 md:flex md:justify-between">
                    <div className="mb-4 md:mr-2 md:mb-0">
                      <label
                        className="block mb-2 text-sm font-bold text-gray-700"
                        htmlFor="password"
                      >
                        Password
                      </label>
                      <div className="relative">
                        <input
                          className="w-full  pl-3 pr-8 py-2 inline-block  mb-3 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                          type={showPassword ? "text" : `password`}
                          placeholder="***********"
                          value={password}
                          onChange={(e) => {
                            setPassowrd(e.target.value), setPasswordErr("");
                          }}
                        />
                        <p className=" text-sm text-white  rounded-bl-3xl  px-4 font-semibold bg-red-500">
                          {passwordErr}
                        </p>
                        <div
                          className={`absolute inset-y-0 bottom-3 end-0 pe-2 flex items-center text-lg cursor-pointer ${
                            passwordErr && "-top-6"
                          } `}
                          onClick={() => setShowPassword((prev) => !prev)}
                        >
                          {showPassword ? <IoEyeOff /> : <IoEye />}
                        </div>
                      </div>
                    </div>
                    <div className="md:ml-2">
                      <label
                        className="block mb-2 text-sm font-bold text-gray-700"
                        htmlFor="c_password"
                      >
                        Confirm Password
                      </label>
                      <div className="relative">
                        <input
                          className="w-full pl-3 pr-8 py-2  mb-3 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                          type={showConfirmPassword ? "text" : `password`}
                          placeholder="***********"
                          value={confirmPassword}
                          onChange={(e) => {
                            setConfirmPassword(e.target.value),
                              setConfirmPasswordErr("");
                          }}
                        />
                        <p className=" text-sm text-white  rounded-bl-3xl  px-4 font-semibold bg-red-500">
                          {confirmPasswordErr}
                        </p>

                        <div
                          onClick={() =>
                            setShowConfirmPassword((prev) => !prev)
                          }
                          className="absolute text-lg inset-y-0 bottom-3 end-0 pe-2 flex items-center"
                        >
                          {showConfirmPassword ? <IoEyeOff /> : <IoEye />}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="mb-6 text-center">
                    <button
                      onClick={handleSignUp}
                      className="w-full px-4 py-2 font-bold text-white bg-blue-500 rounded-full hover:bg-blue-700 focus:outline-none focus:shadow-outline"
                      type="button"
                    >
                      Register Account
                    </button>
                  </div>
                  <hr className="mb-6 border-t" />
                  <div className="text-center">
                    <Link
                      className="inline-block text-sm text-blue-500 align-baseline hover:text-blue-800"
                      to={"/forget-password"}
                    >
                      Forgot Password?
                    </Link>
                  </div>
                  <div className="text-center">
                    <Link
                      className="inline-block text-sm text-blue-500 align-baseline hover:text-blue-800"
                      to="/sign-in"
                    >
                      Already have an account? Login!
                    </Link>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default SignUp;
