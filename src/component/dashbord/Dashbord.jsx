import { FaCloudUploadAlt } from "react-icons/fa";
import Post from "../Post";
import "./Dashbord.css";
import UploadProfilePic from "../UploadProfilePic";
import { useDispatch, useSelector } from "react-redux";
import { IoLogOut } from "react-icons/io5";
import { getAuth, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { userData } from "../../userLoginInfoSlice";
const Dashbord = ({ handleSwitchComponent, show, setShow }) => {
  const data = useSelector((state) => state.userLoginReducer.value);
  const auth = getAuth();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // signing out function
  const handleLogOut = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        console.log("oke");
        dispatch(userData(null));
        localStorage.removeItem("userData");
        navigate("/sign-in");
      })
      .catch((error) => {
        console.log(
          "🚀 > file: Dashbord.jsx:27 > handleLogOut > error:",
          error.code
        );
        // An error happened.
      });
  };
  return (
    <>
      {show ? (
        <UploadProfilePic setShow={setShow} />
      ) : (
        <div className="Customcontainer">
          <div className="left-panel ml-3">
            <ul>
              <li className="relative">
                <div onClick={handleSwitchComponent} className="group">
                  <div className="group-hover:opacity-100 opacity-0 duration-300 ease-linear text-xl text-white absolute top-10 left-9 z-10">
                    <FaCloudUploadAlt />
                  </div>
                  <div className=" group relative after:rounded-full  overflow-hidden after:content-[''] after:absolute after:w-16 after:h-16 after:top-2 after:left-0 group-hover:after:bg-black/25 after:duration-300 after:ease-linear">
                    <img
                      className="inline-block h-16 w-16 rounded-full my-2 "
                      src={data?.photoURL}
                      alt=""
                    />
                  </div>
                </div>

                <p className="font-pops font-semibold text-lg">
                  {data?.displayName}
                </p>
              </li>
              <li>
                <i className="fa fa-user-friends"></i>
                <p>Friends</p>
              </li>
              <li>
                <i className="fa fa-play-circle"></i>
                <p>Videos</p>
              </li>
              <li>
                <i className="fa fa-flag"></i>
                <p>Pages</p>
              </li>
              <li>
                <i className="fa fa-users"></i>
                <p>Groups</p>
              </li>
              <li>
                <i className="fa fa-bookmark"></i>
                <p>Bookmark</p>
              </li>
              <li>
                <i className="fab fa-facebook-messenger"></i>
                <p>Inbox</p>
              </li>
              <li>
                <i className="fas fa-calendar-week"></i>
                <p>Events</p>
              </li>
              <li>
                <i className="fa fa-bullhorn"></i>
                <p>Ads</p>
              </li>
              <li>
                <i className="fas fa-hands-helping"></i>
                <p>Offers</p>
              </li>
              <li>
                <i className="fas fa-briefcase"></i>
                <p>Jobs</p>
              </li>
              <li>
                <i className="fa fa-star"></i>
                <p>Favourites</p>
              </li>
              <li onClick={handleLogOut}>
                <IoLogOut className="text-2xl text-blue-500" />
                <p>Logout</p>
              </li>
            </ul>

            <div className="footer-links">
              <a href="#">Privacy</a>
              <a href="#">Terms</a>
              <a href="#">Advance</a>
              <a href="#">More</a>
            </div>
          </div>

          <div className="middle-panel">
            <div className="story-section">
              <div className="story create">
                <div className="dp-image">
                  <img src="./images/dp.jpg" alt="Profile pic" />
                </div>
                <span className="dp-Customcontainer">
                  <i className="fa fa-plus"></i>
                </span>
                <span className="name">Create Story</span>
              </div>

              <div className="story">
                <img src="./images/model.jpg" alt="Anuska's story" />
                <div className="dp-Customcontainer">
                  <img src="./images/girl.jpg" alt="" />
                </div>
                <p className="name">Anuska Sharma</p>
              </div>

              <div className="story">
                <img src="./images/boy.jpg" alt="Story image" />
                <span className="dp-Customcontainer">
                  <img src="./images/dp.jpg" alt="Profile pic" />
                </span>
                <span className="name">Gaurav Gall</span>
              </div>

              <div className="story">
                <img src="./images/mountains.jpg" alt="Story image" />
                <span className="dp-Customcontainer">
                  <img src="./images/boy.jpg" alt="Profile pic" />
                </span>
                <span className="name">Priyank Saksena</span>
              </div>

              <div className="story">
                <img src="./images/shoes.jpg" alt="Story image" />
                <span className="dp-Customcontainer">
                  <img src="./images/model.jpg" alt="Profile pic" />
                </span>
                <span className="name">Pragati Adhikari</span>
              </div>
            </div>

            <div className="post create">
              <div className="post-top">
                <div className="dp">
                  <img src="./images/girl.jpg" alt="" />
                </div>
                <input
                  type="text"
                  placeholder="What's on your mind, Aashish ?"
                />
              </div>

              <div className="post-bottom">
                <div className="action">
                  <i className="fa fa-video"></i>
                  <span>Live video</span>
                </div>
                <div className="action">
                  <i className="fa fa-image"></i>
                  <span>Photo/Video</span>
                </div>
                <div className="action">
                  <i className="fa fa-smile"></i>
                  <span>Feeling/Activity</span>
                </div>
              </div>
            </div>
            {/* ====post===== */}
            <Post />
            {/* ====post===== */}
            {/* ====post===== */}
            <Post />
            {/* ====post===== */}
            {/* ====post===== */}
            <Post />
            {/* ====post===== */}

            {/* ... (other posts) ... */}
          </div>

          <div className="right-panel">
            <div className="pages-section">
              <h4>Your pages</h4>
              <a className="page" href="#">
                <div className="dp">
                  <img src="./images/logo.png" alt="" />
                </div>
                <p className="name">Cody</p>
              </a>
              {/* ... (other pages) ... */}
            </div>

            <div className="friends-section">
              <h4>Friends</h4>
              <a className="friend" href="#">
                <div className="dp">
                  <img src="./images/dp.jpg" alt="" />
                </div>
                <p className="name">Henry Mosely</p>
              </a>
              {/* ... (other friends) ... */}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Dashbord;
