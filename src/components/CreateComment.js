import { useCallback } from "react";
import { useComment } from "../contexts/CommentContext"
import moment from "moment";

export const CreateComment = ({post, setComments}) => {

    const { sendComment } = useComment();
    
    const createComment = useCallback(
        () => {
            const name = document.querySelector("#comment-name")
            const msg = document.querySelector("#comment-msg")
            if (name && msg){
                const data = {
                    "post": post.id,
                    "author_name": name.value,
                    "date": moment(),
                    "content": msg.value
                }
                sendComment(data)()
                .then( () => {
                    fetch(`https://fswd-wp.devnss.com/wp-json/wp/v2/comments?post=${post.id}`)
                    .then(res => res.json())
                    .then(
                        (result) => { setComments(result) },
                        (error) => {}
                    )
                    msg.value = ""
                }                    
                )
            }
        },
        [sendComment, post, setComments]
    )

    return (
        <div className="create-comment">
            <label className="comment-label">ชื่อ :</label>
            <input className="comment-input" id="comment-name" /><br />
            <label className="comment-label">ช่องคอมเมนต์ :</label>
            <textarea className="comment-input" id="comment-msg" />
            <div className="comment-btn">
                <button onClick={createComment}>คอมเมนต์</button>
            </div>
            <hr />
        </div>
    )
}