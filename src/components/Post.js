import '../App.css';
import { useRestAPI } from '../contexts/RestAPIsContext';
import { HeadTitle } from './HeadTitle';
import PostItem from './PostItem';

const Post = ( {text="โพสต์"} ) => {
    const {posts} = useRestAPI()

    return (
        <div className="post-box">
            <HeadTitle text={text} />
            {
                posts.map((post) => (
                    <PostItem key={post.id} post={post} />
                ))
            }
        </div>
    )
}

export default Post