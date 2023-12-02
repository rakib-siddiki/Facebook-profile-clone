import { useEffect, useState } from "react";
import { getDatabase, ref, onValue } from "firebase/database";
const Userlist = () => {
  const db = getDatabase();
  const [userList, setUserList] = useState([]);
  useEffect(() => {
    const starCountRef = ref(db, "users/");
    onValue(starCountRef, (snapshot) => {
      let arr = [];
      snapshot.forEach((userlist) => {
        arr.push(userlist.val());
      });
      setUserList(arr);
    });
  }, [db]);
  return (
    <>
      <div className="pages-section">
        <h4 className="text-2xl font-semibold font-pops text-gray-600">Users List {'>'} </h4>
        <ul>
          {userList.map((item, i) => (
            <li key={i} className="page">
              <div className="dp">
                <img src={item.profile_picture} alt="" />
              </div>
              <p className="name w-3/4">{item.username}</p>
            </li>
          ))}
        </ul>
        {/* ... (other pages) ... */}
      </div>
    </>
  );
};

export default Userlist;
