import { useRestAPI } from "../contexts/RestAPIsContext"
import { TagItem } from "./TagItem"
import { HeadTitle } from "./HeadTitle"

export const TagList = () => {

    const {tags} = useRestAPI()
    
    return (
        <div>
            <HeadTitle text={"แท๊ก"} />
            {
                tags.map((tag) => (
                    <div key={tag.id}>
                        <div className="post-title" style={{marginTop: "30px"}}> #{tag.name}</div>
                        <TagItem tag={tag} />
                    </div>
                ))
            }
        </div>
    )
}