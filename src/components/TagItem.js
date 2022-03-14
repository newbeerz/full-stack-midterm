import { useMemo } from "react"
import { useRestAPI } from "../contexts/RestAPIsContext"
import PostItem from "./PostItem"

export const TagItem = ({tag}) => {

    const {posts} = useRestAPI()

    const tagPosts = useMemo(
        () => {
            let postList = []
            posts.forEach((post) => {
                if (post.tags.includes(tag.id))
                {
                    postList.push(post)
                }
            })
            return postList
        },
        [posts, tag],
    )
    
    return (
        <div className="tags-box">
            <div className="tags-box-item">
                {
                    tagPosts.map((post) => (
                        <PostItem key={post.id} post={post} />
                    ))
                }
            </div>
        </div>
    )
}