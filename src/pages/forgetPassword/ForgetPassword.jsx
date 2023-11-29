import { Link } from "react-router-dom";
import img from "../../assets/forget-password/reset-password.gif";
const ForgotPassword = () => {
  return (
    <>
      <div className="">
        <div className="container mx-auto">
          <div className="flex justify-center px-6 my-12">
            <div className="w-full xl:w-3/4 lg:w-11/12 flex items-center justify-center">
              <div className="w-full h-auto hidden lg:block lg:w-5/12 bg-cover rounded-l-lg">
                <img src={img} alt="image" />
              </div>
              <div className="w-full lg:w-7/12 bg-white p-5 rounded-lg lg:rounded-l-none">
                <div className="flex h-full items-center py-16">
                  <main className="w-full max-w-md mx-auto p-6">
                    <div className="mt-7 bg-white border border-gray-200 rounded-xl shadow-sm">
                      <div className="p-4 sm:p-7">
                        <div className="text-center">
                          <h1 className="block text-2xl font-bold text-gray-800">
                            Forgot password?
                          </h1>
                          <p className="mt-2 text-sm text-gray-600">
                            Remember your password?
                            <Link
                              className="text-blue-600 decoration-2 hover:underline font-medium"
                              to="/sign-in"
                            >
                              Sign in here
                            </Link>
                          </p>
                        </div>

                        <div className="mt-5">
                          {/* Form */}
                          <form>
                            <div className="grid gap-y-4">
                              {/* Form Group */}
                              <div>
                                <label
                                  htmlFor="email"
                                  className="block text-sm mb-2"
                                >
                                  Email address
                                </label>
                                <div className="relative">
                                  <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    className="py-3 px-4 block w-full outline-none border border-gray-300 rounded-lg text-sm  disabled:opacity-50 disabled:pointer-events-none"
                                    required
                                    aria-describedby="email-error"
                                  />
                                </div>
                                <p
                                  className="hidden text-xs text-red-600 mt-2"
                                  id="email-error"
                                >
                                  Please include a valid email address so we can
                                  get back to you
                                </p>
                              </div>
                              {/* End Form Group */}

                              <button
                                type="submit"
                                className="w-full py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none"
                              >
                                Reset password
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
        </div>
      </div>
    </>
  );
};

export default ForgotPassword;
