import { useMemo } from 'react';
import '../App.css';
import { useRestAPI } from '../contexts/RestAPIsContext';
import { HeadTitle } from './HeadTitle';
import PostInterestItem from './PostInterestItem';

const PostInterest = ( ) => {
    const {posts} = useRestAPI()

    const randomPosts = useMemo(
        () => {
            if (posts.length !== 0){
                let indexPost = []
                while (indexPost.length !== 2){
                    let random = Math.floor(Math.random() * posts.length)
                    if (!indexPost.includes(posts[random])){
                        indexPost.push(posts[random])
                    }
                }
                return indexPost
            }
            else{
                return []
            }
            
        },
        [posts]
    )

    return (
        <div className="post-box post-box-sm">
            <HeadTitle text={"โพสต์ที่น่าสนใจ"} />
            {
                randomPosts.map((post) => (
                    <PostInterestItem key={post.id} post={post} normal={false}/>
                ))
            }
        </div>
    )
}

export default PostInterest