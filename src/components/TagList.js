import { useRestAPI } from "../contexts/RestAPIsContext"
import { TagItem } from "./TagItem"
import { HeadTitle } from "./HeadTitle"
import { useCallback } from "react"

export const TagList = () => {

    const {tags} = useRestAPI()

    const togglePosts = useCallback(
        (index) => () => {
            const postsDiv = document.querySelectorAll(".tags-box")[index];
            const icon = document.querySelectorAll(".tag-title .bi")[index]; 
            if (postsDiv.style.display === "none"){
                postsDiv.style.display = "block"
                icon.classList.remove("bi-chevron-right")
                icon.classList.add("bi-chevron-down")
            }
            else{
                postsDiv.style.display = "none"
                icon.classList.remove("bi-chevron-down")
                icon.classList.add("bi-chevron-right")
            }
        },
        []
    )
    
    return (
        <div>
            <HeadTitle text={"แท๊ก"} />
            {
                tags.map((tag, index) => (
                    <div key={tag.id}>
                        <div className="tag-title" onClick={togglePosts(index)}><i className="bi bi-chevron-right"></i> #{tag.name}</div>
                        <TagItem tag={tag} />
                    </div>
                ))
            }
        </div>
    )
}