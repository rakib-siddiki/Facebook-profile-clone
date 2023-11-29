

const NavBar = () => {
  return (
    <nav className="h-16 w-full px-8 flex justify-between bg-white shadow sticky top-0 z-50">
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
        <span
          className="profile"
          style={{
            backgroundImage: `url('./images/dp.jpg')`,
            height: "30px",
            width: "30px",
            backgroundSize: "cover",
            borderRadius: "50%",
            cursor: "pointer",
          }}
        ></span>

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
