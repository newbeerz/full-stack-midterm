import { useEffect, useState } from "react"
import { useRestAPI } from "../contexts/RestAPIsContext";
import { ButtonLink } from "./ButtonLink";

const PostItem = ( {post} ) => {
    const [author, setAuthor] = useState({});
    const [categories, setCategories] = useState([]);
    const [tags, setTags] = useState([]);
    const [comments, setComments] = useState([]);
    const [dateTime, setDateTime] = useState({});

    const { findUser, findCategory, findTag, findComment, toDateTime } = useRestAPI();

    useEffect(
        () => {
            setAuthor(findUser(post.author))
            setCategories(findCategory(post.categories))
            setTags(findTag(post.tags))
            setComments(findComment(post.id))
            setDateTime(toDateTime(post.date))
        },
        [findUser, findCategory, findTag, post, findComment, toDateTime],
    )

    return (
        <div className="post-item">
            <div className="author">
                <img src={author.avatar_urls ? author.avatar_urls["96"] : ""} alt="" className="author-avatar"></img>
                <div>
                    <div className="author-name">{author.name}</div>
                    <div className="post-datetime">{dateTime.date} {dateTime.time}</div>
                </div>
            </div>
            <div className="post-title">{post.title.rendered}</div>
            <div className="cates">
                { categories.map((c) => (
                    <div key={c.id} className="cates-item"> {c.name}</div>
                )) }
            </div>
            <div dangerouslySetInnerHTML={{__html :post.excerpt.rendered}}></div>
            <div className="tags">
                { tags.map((t) => (
                    <div key={t.id} className="tags-item">#{t.name}</div>
                )) }
            </div>
            <div className="post-num-comment">{comments.length} คอมเมนต์</div>
            <div className="post-img-comment">
                {
                    comments.map((cm) => (
                        <img key={cm.id} src={cm.author_avatar_urls ? cm.author_avatar_urls["24"] : ""} alt=""/>
                    ))
                }
            </div>
            <ButtonLink to={`/posts/${post.id}`} text="ดูเพิ่มเติม" right={true} />
        </div>
    )
}

export default PostItem