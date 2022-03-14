import { useEffect, useState } from "react"
import { Link } from "react-router-dom";
import { useRestAPI } from "../contexts/RestAPIsContext";
import { ButtonLink } from "./ButtonLink";

const PostInterestItem = ( {post} ) => {
    const [categories, setCategories] = useState([]);
    const [tags, setTags] = useState([]);
    const [dateTime, setDateTime] = useState({});

    const { findUser, findCategory, findTag, findComment, toDateTime } = useRestAPI();

    useEffect(
        () => {
            setCategories(findCategory(post.categories))
            setTags(findTag(post.tags))
            setDateTime(toDateTime(post.date))
        },
        [findUser, findCategory, findTag, post, findComment, toDateTime],
    )

    return (
        <div className="post-item">
            <h2>{post.title.rendered}</h2>
            <div className="cates">
                { categories.map((c) => (
                    <Link to={`/categories/${c.id}`} className="link-default" key={c.id}>
                        <div key={c.id} className="cates-item"> {c.name}</div>
                    </Link>
                    )) 
                }
            </div>
            <div dangerouslySetInnerHTML={{__html :post.excerpt.rendered}}></div>
            <div className="tags">
                { tags.map((t) => (
                    <Link to={`/tags/${t.id}`} className="link-default" key={t.id}>
                        <div key={t.id} className="tags-item">#{t.name}</div>
                    </Link>
                    )) }
            </div>
            <ButtonLink to={`/posts/${post.id}`} text="ดูเพิ่มเติม" align="right" />
            <div className="post-datetime" style={{textAlign: "right"}}>{dateTime.date}</div>
        </div>
    )

}

export default PostInterestItem