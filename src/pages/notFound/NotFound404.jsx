import notFound404Image from "../../assets/Monster404Error.svg";
const NotFound404 = () => {
  return (
    <>
      <img
        src={notFound404Image}
        alt="notFound404"
        className=" w-full h-screen object-contain inline-block"
      />
    </>
  );
};

export default NotFound404;
