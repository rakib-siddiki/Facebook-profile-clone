import { useRef, useState } from "react";
import { useSelector } from "react-redux";
import { getDatabase, push, ref, set } from "firebase/database";
import { HiMiniPaperAirplane } from "react-icons/hi2";
import moment from "moment";
const WriteSomeThing = () => {
  const [write, setWrite] = useState("");
  const inputRef = useRef(null);
  const data = useSelector((state) => state.userLoginReducer.value);
  const db = getDatabase();

  const resizeInput = () => {
    const input = inputRef.current;
    console.dir(input);
    if (input) {
      input.style.height = "auto";
      input.style.height = Math.min(input.scrollHeight, 100) + "px";
    }
  };

  const handleChange = (e) => {
    setWrite(e.target.value);
    resizeInput();
  };

  // Handle post
  const hanldePost = () => {
    console.log(data.uid);
    set(push(ref(db, "posts/")), {
      profile_picture: data.photoURL,
      username: data.displayName,
      date: moment().format("YYYYMMDD h:mm:ss a"),
      posts: write,
    }).then(() => setWrite(""));
  };

  return (
    <>
      <div className="post create">
        <div className="post-top relative ">
          <div className="dp">
            <img src={data.photoURL} alt="" />
          </div>
          <textarea
            onChange={handleChange}
            ref={inputRef}
            value={write}
            type="text"
            placeholder={`What's on your mind, ${data.displayName} ?`}
          />
          {write && (
            <HiMiniPaperAirplane
              className="absolute top-5.5 right-7 text-2xl text-blue-500 cursor-pointer"
              onClick={hanldePost}
            />
          )}
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
    </>
  );
};

export default WriteSomeThing;
