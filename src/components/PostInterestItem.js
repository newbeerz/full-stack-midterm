import { useEffect, useState } from "react"
import { useRestAPI } from "../contexts/RestAPIsContext";

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
                    <div key={c.id} className="cates-item"> {c.name}</div>
                    )) }
            </div>
            <div dangerouslySetInnerHTML={{__html :post.excerpt.rendered}}></div>
            <div className="tags">
                { tags.map((t) => (
                    <div key={t.id} className="tags-item">#{t.name}</div>
                    )) }
            </div>
            <div className="post-datetime" style={{textAlign: "right"}}>{dateTime.date}</div>
        </div>
    )

}

export default PostInterestItem