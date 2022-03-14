import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { HeadTitle } from "../components/HeadTitle";
import PostItem from "../components/PostItem";
import { UserProfile } from "../components/UserProfile";
import { useRestAPI } from "../contexts/RestAPIsContext";

export const AuthorPage = () => {
    const { posts, findUser } = useRestAPI()
    const { id } = useParams();
    const [user, setUser] = useState({}) 

    const author_posts = useMemo(
        () => {
            if (posts.length !== 0){
                let newArr = [];
                posts.forEach((p) => {
                    if (parseInt(p.author) === parseInt(id)){
                        newArr.push(p)
                    }
                })
                return newArr
            }
            else {
                return []
            }
        },
        [posts, id]
    )

    useEffect(
        () => {
            setUser(findUser(id))
        },
        [setUser, id, findUser]
    )

    return (
        <div>
            <UserProfile user={user} />
            <HeadTitle text={`โพสต์ทั้งหมด ${author_posts.length} โพสต์`} />
            {
                author_posts.map((p) => (
                    <PostItem key={p.id} post={p} />
                ))
            }
        </div>
      );
}