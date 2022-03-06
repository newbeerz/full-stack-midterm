import { useEffect, useState } from "react"
import { useRestAPI } from "../contexts/RestAPIsContext"

const PostComment = (  {comment, index} ) => {
    const [dateTime, setDateTime] = useState([])

    const { toDateTime } = useRestAPI()
    
    useEffect(
        () => {
            setDateTime(toDateTime(comment.date))
        },
        [toDateTime, setDateTime, comment]
    )

    return (
        <div className="comment-item">
            <div className="comment-no">{`คอมเมนต์ที่ ${index + 1}`}</div>
            <div className="author">
                <img src={comment.author_avatar_urls ? comment.author_avatar_urls["96"] : ""} alt="" className="author-avatar"></img>
                <div>
                    <div className="author-name">{comment.author_name}</div>
                    <div className="post-datetime">{dateTime.date} {dateTime.time}</div>
                </div>
            </div>
            <div dangerouslySetInnerHTML={{__html :comment.content.rendered}}></div>
        </div>
    )
}

export default PostComment