import "./Card.css";

const Card = ({ post }) => {
  return (
    <div className="card">
      <img src={`http://127.0.0.1:8000/images/${post.image_url}`} alt="" />
      <div className="info">
        <p>
          {post.prompt.length > 20
            ? `${post.prompt.slice(0, 20)}...`
            : post.prompt}
          <span>
            {post.user.image_url ? (
              <img
                src={`http://127.0.0.1:8000/images/usersImages/${post.user.image_url}`}
                alt=""
              />
            ) : (
              post.user.name.charAt(0)
            )}
          </span>
        </p>
      </div>
    </div>
  );
};

export default Card;
