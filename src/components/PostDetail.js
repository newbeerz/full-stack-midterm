import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom";
import { useRestAPI } from "../contexts/RestAPIsContext";
import { CreateComment } from "./CreateComment";
import Error from "./Error";
import PostComment from "./PostComment";

const PostDetail = ( ) => {
    const { id } = useParams();

    const [post, setPost] = useState({});
    const [author, setAuthor] = useState({});
    const [categories, setCategories] = useState([]);
    const [tags, setTags] = useState([]);
    const [comments, setComments] = useState([]);
    const [dateTime, setDateTime] = useState({});

    const { findPost, findUser, findCategory, findTag, findComment, toDateTime } = useRestAPI();
    
    useEffect(
        () => {
            setPost(findPost(id))
        },
        [findPost, id]
    )

    useEffect(
        () => {
            if (post.id)
            {
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
            }
        },
        [findUser, findCategory, findTag, post, findComment, toDateTime],
    )

    if (post.id) {
        return ( 
            <div className="container">
                <Link to={"/posts"} className="a-link">กลับ</Link><br /><br />
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
                <div dangerouslySetInnerHTML={{__html :post.content.rendered}}></div>
                <div className="tags">
                    { tags.map((t) => (
                        <div key={t.id} className="tags-item">#{t.name}</div>
                    )) }
                </div>
                <div className="post-num-comment post-comment">{comments.length} คอมเมนต์</div>
                <hr />
                <CreateComment post={post} setComments={setComments} />
                {
                    comments.map((comment, index) => (
                        <PostComment key={index} comment={comment} index={index} />
                    ))
                }
            </div>
        )
    }
    else{
        return (
            <Error />
        )
    }
}

export default PostDetail