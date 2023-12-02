import { FaAngleLeft } from "react-icons/fa6";
import { useState, createRef } from "react";
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";
// firebase storage
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadString,
} from "firebase/storage";
import { useDispatch, useSelector } from "react-redux";
import { userData } from "../userLoginInfoSlice";
import { ToastContainer, toast } from "react-toastify";
import { getAuth, updateProfile } from "firebase/auth";
import { getDatabase,ref as Dref, update } from "firebase/database";
const UploadProfilePic = ({ setShow }) => {
  // firebase 
  const storage = getStorage();
  const auth = getAuth()
  const db = getDatabase()
  // redux
  const data = useSelector((state) => state.userLoginReducer.value);
  const dispatch =useDispatch()
  // react copper
  const [image, setImage] = useState("");
  const [cropData, setCropData] = useState("#");
  const cropperRef = createRef();
  const handleChangeProfilePic = (e) => {
    e.preventDefault();
    let files;
    if (e.dataTransfer) {
      files = e.dataTransfer.files;
    } else if (e.target) {
      files = e.target.files;
    }
    const reader = new FileReader();
    reader.onload = () => {
      setImage(reader.result);
    };
    reader.readAsDataURL(files[0]);
    console.log(files);
  };

  const getCropData = () => {
    if (typeof cropperRef.current?.cropper !== "undefined") {
      setCropData(cropperRef.current?.cropper.getCroppedCanvas().toDataURL());
      const userId = auth.currentUser.uid;      
      // firebase storage
      const storageRef = ref(storage, userId);
      const message4 = cropperRef.current?.cropper
        .getCroppedCanvas()
        .toDataURL();
      uploadString(storageRef, message4, "data_url").then((snapshot) => {
        // Upload completed successfully, now we can get the download URL
        console.log(snapshot);
        getDownloadURL(storageRef).then((downloadURL) => {
          updateProfile(auth.currentUser, {
            photoURL: downloadURL,            
          })
          .then(() => {
            console.log('ok');
              dispatch(userData(auth.currentUser))
              localStorage.setItem('userData',JSON.stringify(auth.currentUser))
              update(Dref(db, "users/"+data.uid), {
                profile_picture: downloadURL,
              });
              toast.success('Updateing Your Profile')
              setShow(prev=>!prev)
            })
            .catch((error) => {
              console.log(error.code);
              // An error occurred
              // ...
            });
        });
      });
    }
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
      <div
        className="relative min-h-screen flex justify-center bg-gray-50  px-4 -mt-9 sm:px-6 lg:px-8  bg-no-repeat bg-cover items-center"
        style={{
          backgroundImage:
            "url(https://images.unsplash.com/photo-1621243804936-775306a8f2e3?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80)",
        }}
      >
        <div className="absolute bg-black opacity-60 inset-0 z-0 "></div>
        <div className="sm:max-w-lg w-full p-10 pb-4 bg-white rounded-xl z-10 relative">
          <div className="text-center">
            <div
              onClick={() => setShow((prev) => !prev)}
              className=" flex items-center  cursor-pointer text-blue-500  text-2xl absolute top-3 left-3"
            >
              <FaAngleLeft />
              <span className="font-bold text-xl">Back</span>
            </div>
            <h2 className="text-3xl font-bold text-gray-900">
              Upload Your Profile
            </h2>
            <div className="inline-block h-16 w-16 rounded-full overflow-hidden my-2 img-preview"><img
              className="inline-block w-full h-full rounded-full my-2"
              src={data?.photoURL}
              alt="Image Description"
            /></div>
            
            <p className="mt-2 text-sm text-gray-400">
              select your profile picture
            </p>
          </div>
          <form onSubmit={(e) => e.preventDefault()} className="mt-2 space-y-3">
            <div className="grid grid-cols-1 space-y-2">
              <label className="text-sm font-bold text-gray-500 tracking-wide">
                Attach Document
              </label>
              <div className="flex items-center justify-center w-full">
                {image ? (
                  <>
                    <Cropper
                      ref={cropperRef}
                      style={{ height: 200, width: "100%" }}
                      zoomTo={0.5}
                      initialAspectRatio={1}
                      aspectRatio={1}
                      preview=".img-preview"
                      src={image}
                      viewMode={1}
                      minCropBoxHeight={10}
                      minCropBoxWidth={10}
                      background={false}
                      responsive={true}
                      autoCropArea={1}
                      checkOrientation={false} // https://github.com/fengyuanchen/cropperjs/issues/671
                      guides={true}
                    />
                  </> //upload Box start
                ) : (
                  <label className="flex flex-col rounded-lg border-4 border-dashed w-full h-60 p-10 group text-center">
                    <div className="h-full w-full text-center flex flex-col items-center justify-center">
                      <div className="flex flex-auto max-h-48 w-2/5 mx-auto -mt-10">
                        <img
                          className="has-mask h-36 object-center"
                          src="https://img.freepik.com/free-vector/image-upload-concept-landing-page_52683-27130.jpg?size=338&ext=jpg"
                          alt="freepik image"
                        />
                      </div>
                      <p className="pointer-none text-gray-500 ">
                        <span className="text-sm">Drag and drop</span> files
                        here <br /> or{" "}
                        <span
                          href=""
                          id=""
                          className="text-blue-600 hover:underline"
                        >
                          select a file
                        </span>{" "}
                        from your computer
                      </p>
                    </div>
                    <input
                      onChange={handleChangeProfilePic}
                      type="file"
                      className="hidden"
                    />
                  </label>
                  // upload Box end
                )}
              </div>
            </div>
            {image && (
              <div>
                <label
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                  htmlFor="file_input"
                >
                  Upload file
                </label>
                <input
                  onChange={handleChangeProfilePic}
                  className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 border-none  outline-none  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 
                file:mr-4 file:py-2 file:px-4
              file:rounded-lg file:border-0
              file:text-sm file:font-semibold
              file:bg-gray-600 file:text-gray-50
              hover:file:bg-gray-500
                "
                  id="file_input"
                  type="file"
                />
              </div>
            )}
            <p className="text-sm text-gray-300">
              <span>File type:types of images jpeg,jpg.png</span>
            </p>
            <div>
              <button
                type="submit"
                onClick={getCropData}
                className="my-5 w-full flex justify-center bg-blue-500 text-gray-100 p-4 rounded-full tracking-wide font-semibold focus:outline-none focus:shadow-outline hover:bg-blue-600 shadow-lg cursor-pointer transition ease-in duration-300"
              >
                Upload
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default UploadProfilePic;
