import { useEffect, useState } from 'react';
import '../App.css';
import { HeadTitle } from './HeadTitle';
import PostItem from './PostItem';

const Post = ( {text="โพสต์", home="false"} ) => {
    const [nowPost, setNowPost] = useState([])

    useEffect(
        () => {
            fetch(`https://fswd-wp.devnss.com/wp-json/wp/v2/posts?orderby=date&per_page=${home === "true" ? 4 : 100}`)
                .then(res => res.json())
                .then((result) => { setNowPost(result)})
        }
    )

    return (
        <div className="post-box">
            <HeadTitle text={text} />
            {
                nowPost.map((post) => (
                    <PostItem key={post.id} post={post} />
                ))
            }
        </div>
    )
}

export default Post