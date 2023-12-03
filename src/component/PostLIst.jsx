import { getDatabase, ref, onValue, off } from "firebase/database";
import moment from "moment/moment";
import { useEffect, useState } from "react";
const PostLIst = () => {
  const [showPosts, setShowPosts] = useState([]);
  const db = getDatabase();
  useEffect(() => {
    const postsRef = ref(db, "posts/");
    let arr = [];
    onValue(postsRef, (snapshot) => {
      snapshot.forEach((item) => {
        arr.push(item.val());
      });
      setShowPosts(arr);
    });
    // Clean up the event listener to avoid memory leaks
    return () => off(postsRef); //Detach the event listener when the component unmounts
  }, [db,showPosts]);
  return (
    <>
      {showPosts.map((item, i) => (
        <div key={i} className="post">
          <div className="post-top">
            <div className="dp">
              <img src={item.profile_picture} alt="" />
            </div>
            <div className="post-info">
              <p className="name">{item.username}</p>
              <span className="time">{moment(item.date,"YYYYMMDD h:mm:ss a").fromNow()}</span>
            </div>
            <i className="fas fa-ellipsis-h"></i>
          </div>
          <div className="post-content">{item.posts}</div>

          <div className="post-bottom">
            <div className="action">
              <i className="far fa-thumbs-up"></i>
              <span>Like</span>
            </div>
            <div className="action">
              <i className="far fa-comment"></i>
              <span>Comment</span>
            </div>
            <div className="action">
              <i className="fa fa-share"></i>
              <span>Share</span>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default PostLIst;
