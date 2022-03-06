import { useMemo } from "react"
import { useRestAPI } from "../contexts/RestAPIsContext"
import PostItem from "./PostItem"

export const CategoryItem = ({category}) => {

    const {posts} = useRestAPI()

    const categoryPosts = useMemo(
        () => {
            let postList = []
            posts.forEach((post) => {
                if (post.categories.includes(category.id))
                {
                    postList.push(post)
                }
            })
            return postList
        },
        [posts, category],
    )
    
    return (
        <div className="categories">
            <div className="categories-item">
                {
                    categoryPosts.map((post) => (
                        <PostItem key={post.id} post={post} />
                    ))
                }
            </div>
        </div>
    )
}