import {  useSelector } from "react-redux";
import Dashbord from "../../component/dashbord/Dashbord";
import NavBar from "../../component/Navbar";
import {  useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
const Home = () => {
  // state variables
     const [show, setShow] = useState(false);
  // others variables
  const navigate=useNavigate()
  // redux 
  const data = useSelector((state) => state.userLoginReducer.value);

  // when first time component load 
  useEffect(()=>{
    data??navigate('/sign-in') // if users data did't exist then it will naviagte to sign in page
    
  },[data, navigate])
  // uploading profile pictures
const handleSwitchComponent= () => {
  setShow(prev=>!prev)
  // show && navigate ("/sign-in")
};

  return (
    <>
      <NavBar />
      <Dashbord
        handleSwitchComponent={handleSwitchComponent}
          show={show}
          setShow={setShow}
      ></Dashbord>
    </>
  );
};

export default Home;
