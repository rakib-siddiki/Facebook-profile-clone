import { useSelector } from "react-redux";


const NavBar = () => {
  const data = useSelector((state) => state.userLoginReducer.value);

  return (
    <nav className="h-16 w-full px-8 flex justify-between items-center bg-white shadow sticky top-0 z-50">
      <div className="flex items-center">
        <img src="./images/logo.png" alt="Logo" className="w-10" />
        <input
          type="text"
          placeholder="Search Facebook.."
          className="h-10 px-4 border-none rounded-full outline-none bg-gray-200 ml-4"
        />
      </div>

      <div className="flex items-end">
        <a href="#" className="text-gray-700 px-4">
          <i className="fa fa-home text-2xl"></i>
        </a>

        <a href="#" className="text-gray-700 px-4">
          <i className="fa fa-user-friends text-2xl"></i>
        </a>

        <a href="#" className="text-gray-700 px-4">
          <i className="fa fa-play-circle text-2xl"></i>
        </a>

        <a href="#" className="text-gray-700 px-4">
          <i className="fa fa-users text-2xl"></i>
        </a>
      </div>

      <div className="flex items-center">

        <img src={data.photoURL} alt="" className="w-8 h-8" />

        <a
          href="#"
          className="text-gray-700 h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center ml-4"
        >
          <i className="fa fa-bell text-2xl"></i>
        </a>

        <a
          href="#"
          className="text-gray-700 h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center ml-4"
        >
          <i className="fas fa-ellipsis-h text-2xl"></i>
        </a>
      </div>
    </nav>
  );
};

export default NavBar;
