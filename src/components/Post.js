import { useEffect, useMemo, useState } from 'react';
import '../App.css';
import { useRestAPI } from '../contexts/RestAPIsContext';
import { HeadTitle } from './HeadTitle';
import PostItem from './PostItem';

const Post = ( {text="โพสต์", home="false"} ) => {
    const {posts} = useRestAPI()
    const [nowPost, setNowPost] = useState([])

    const lastPosts = useMemo(
        () => {
            if (posts.length !== 0){
                let newArr = [];
                for (let i = 0; i < 4; i++){
                    newArr.push(posts[i])
                }
                return newArr
            }
            else {
                return []
            }
        },
        [posts]
    )


    useEffect(
        () => {
            if (home === "true"){
                setNowPost(lastPosts)
            }
            else {
                setNowPost(posts)
            }
        },
        [lastPosts, posts, setNowPost, home]
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