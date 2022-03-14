import { ButtonLink } from "../components/ButtonLink";
import Post from "../components/Post";
import PostInterest from "../components/PostInterest";

export const HomePage = () => {
    return (
      <>
        <div className="posts">
          <Post text={"โพสต์ล่าสุด"} home="true" />
          <PostInterest />
        </div>
        <ButtonLink to="/posts" text="โพสต์ทั้งหมด" align="center" />
      </>
      );
}