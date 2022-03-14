import { useCallback } from "react"
import { useRestAPI } from "../contexts/RestAPIsContext"
import { CategoryItem } from "./CategoryItem"
import { HeadTitle } from "./HeadTitle"

export const CategoryList = () => {

    const {categories} = useRestAPI()
    
    const togglePosts = useCallback(
        (index) => () => {
            const postsDiv = document.querySelectorAll(".categories")[index];
            const icon = document.querySelectorAll(".cate-title .bi")[index]; 
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
            <HeadTitle text={"หมวดหมู่"} />
            {
                categories.map((cate, index) => (
                    <div key={cate.id}>
                        <div className="cate-title" onClick={togglePosts(index)}><i className="bi bi-chevron-right"></i> {cate.name}</div>
                        <CategoryItem category={cate} index={index} />
                    </div>
                ))
            }
        </div>
    )
}