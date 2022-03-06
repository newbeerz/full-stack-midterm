import Post from "../components/Post";
import PostInterest from "../components/PostInterest";

export const HomePage = () => {
    return (
        <div className="posts">
          <Post text={"โพสต์ล่าสุด"} />
          <PostInterest />
        </div>
      );
}