import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Error from "../components/Error";
import { HeadTitle } from "../components/HeadTitle";
import { UserProfile } from "../components/UserProfile";

export const AuthorListPage = () => {
    const [users, setUsers] = useState(null)
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(
        () => {
            fetch(`https://fswd-wp.devnss.com/wp-json/wp/v2/users`)
            .then(res => res.json())
            .then((result) => { setUsers(result);})
            .catch((er)=> {console.log(er.message); setError(er)})
            .finally(() => {setLoading(false)})
        },
        []
    )

    if (loading) return "loading..."
    if (error) return <Error />

    return (
        <>
            <HeadTitle text={"ผู้ใช้ทั้งหมด"} />
            <div className="author-list">
                {
                    users.map((user) => (
                        <div className="author-item">
                            <Link to={`/authors/${user.id}`} className="link-default">
                                <UserProfile user={user} />
                            </Link>
                        </div>
                    ))
                }
            </div>
        </>
      );
}