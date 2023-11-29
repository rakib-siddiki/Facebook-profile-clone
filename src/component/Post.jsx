
const Post = () => {
    return (
      <>
        <div className="post">
          <div className="post-top">
            <div className="dp">
              <img src="./images/girl.jpg" alt="" />
            </div>
            <div className="post-info">
              <p className="name">Anuska Sharma</p>
              <span className="time">12 hrs ago</span>
            </div>
            <i className="fas fa-ellipsis-h"></i>
          </div>

          <div className="post-content">
            Roses are red <br />
            Violets are blue <br />
            {""} ugly & you are too😏
          </div>

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
      </>
    );
};

export default Post;