import { useEffect, useMemo, useState } from "react"
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
    
    const sortComment = useMemo(
        () => {
            if (comments === 0){
                return []
            }

            let newArr = comments.slice()

            while (true){
                let sorted = true
                for (let i = 0; i < comments.length - 1; i++){
                    if (comments[i].date > comments[i+1].date){
                        let cpy = comments[i+1]
                        comments[i+1] = comments[i]
                        comments[i] = cpy
                        sorted = false
                    }
                }

                if (sorted){
                    return newArr.reverse()
                }
            }
        },
        [comments]
    )

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
                    <Link   Link to={`/author/${author.id}`}>
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
                            <div key={c.id} className="cates-item"> {c.name}</div>
                        </Link>
                    )) }
                </div>
                <div dangerouslySetInnerHTML={{__html :post.content.rendered}}></div>
                <div className="tags">
                    { tags.map((t) => (
                        <Link to={`/tags/${t.id}`} className="link-default" key={t.id}>
                            <div key={t.id} className="tags-item">#{t.name}</div>
                        </Link>
                    )) }
                </div>
                <div className="post-num-comment post-comment">{comments.length} คอมเมนต์</div>
                <hr />
                <CreateComment post={post} setComments={setComments} />
                {
                    sortComment.map((comment, index) => (
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