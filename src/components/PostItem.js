import { useEffect, useMemo, useState } from "react"
import { Link } from "react-router-dom";
import { useRestAPI } from "../contexts/RestAPIsContext";
import { ButtonLink } from "./ButtonLink";

const PostItem = ( {post} ) => {
    const [author, setAuthor] = useState({});
    const [categories, setCategories] = useState([]);
    const [tags, setTags] = useState([]);
    const [comments, setComments] = useState([]);
    const [dateTime, setDateTime] = useState({});

    const { findUser, findCategory, findTag, findComment, toDateTime } = useRestAPI();

    const imgComments = useMemo(
        () => {
            if (comments.length >= 5){
                let newArr = []
                for (let i = 0; i < 5; i++){
                    newArr.push(comments[i])
                }
                return newArr
            }
            else {
                return comments
            }
        },
        [comments]
    )

    const otherComments = useMemo(
        () => {
            if (imgComments.length === 5){
                return (
                    <span>+{comments.length - 5}</span>
                )
            }
        },
        [comments, imgComments]
    )

    useEffect(
        () => {
            setAuthor(findUser(post.author))
            setCategories(findCategory(post.categories))
            setTags(findTag(post.tags))
            setDateTime(toDateTime(post.date))
            fetch(`https://fswd-wp.devnss.com/wp-json/wp/v2/comments?post=${post.id}`)
                .then(res => res.json())
                .then(
                    (result) => { setComments(result)},
                    (error) => {}
                )
        },
        [findUser, findCategory, findTag, post, findComment, toDateTime],
    )

    return (
        <div className="post-item">
            <div className="author">
                <Link to={`/author/${author.id}`}>
                    <img src={author.avatar_urls ? author.avatar_urls["96"] : ""} alt="" className="author-avatar"></img>
                </Link>
                <div>
                    <div className="author-name">{author.name}</div>
                    <div className="post-datetime">{dateTime.date} {dateTime.time}</div>
                </div>
            </div>
            <div className="post-title">{post.title.rendered}</div>
            <div className="cates">
                { categories.map((c) => (
                    <Link to={`/categories/${c.id}`} className="link-default" key={c.id}>
                        <div className="cates-item"> {c.name}</div>
                    </Link>
                )) }
            </div>
            <div dangerouslySetInnerHTML={{__html :post.excerpt.rendered}}></div>
            <div className="tags">
                { tags.map((t) => (
                    <Link to={`/tags/${t.id}`} className="link-default" key={t.id}>
                        <div className="tags-item">#{t.name}</div>
                    </Link>
                )) }
            </div>
            <div className="post-num-comment">{comments.length} คอมเมนต์</div>
            <div className="post-img-comment">
                {
                    imgComments.map((cm) => (
                        <img key={cm.id} src={cm.author_avatar_urls ? cm.author_avatar_urls["24"] : ""} alt=""/>
                    ))
                    
                }
                {otherComments}
            </div>
            <ButtonLink to={`/posts/${post.id}`} text="ดูเพิ่มเติม" align="right" />
        </div>
    )
}

export default PostItem