import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import RestAPIs from "./RestAPIs";

export const RestAPIsContext = createContext();

export const RestAPIsProvider = ( {children} ) => {
    const [users, setUsers] = useState([])
    const [posts, setPosts] = useState([])
    const [categories, setCategories] = useState([])
    const [tags, setTags] = useState([])
    const [comments, setComments] = useState([])

    const apisUsers = RestAPIs("users")
    const apisPosts = RestAPIs("posts")
    const apisCategories = RestAPIs("categories")
    const apisTags = RestAPIs("tags")
    const apisComments = RestAPIs("comments")

    const findUser = useCallback(
        (id) => () => {
            let user = {}
            users.forEach((u) => {
                if (parseInt(id) === parseInt(u.id)){
                    user = u
                    return 
                }
            })
            return user
        },
        [users]
    )

    const findPost = useCallback(
        (id) => () => {
            let post = {}
            posts.forEach((p) => {
                if (parseInt(id) === parseInt(p.id)){
                    post = p
                    return 
                }
            })
            return post
        },
        [posts]
    )

    const findCategory = useCallback(
        (arr) => () => {
            let category = []
            arr.forEach((id) => {
                categories.forEach((u) => {
                    if (parseInt(id) === parseInt(u.id)){
                        category.push(u)
                        return 
                    }
                })
            })
            return category
        },
        [categories]
    )

    const findTag = useCallback(
        (arr) => () => {
            let tag = []
            arr.forEach((id) => {
                tags.forEach((u) => {
                    if (parseInt(id) === parseInt(u.id)){
                        tag.push(u)
                        return 
                    }
                })
            })
            return tag
        },
        [tags]
    )

    const findComment = useCallback(
        (id) => () => {
            let comment = []
            comments.forEach((u) => {
                if (parseInt(id) === parseInt(u.post)){
                    comment.push(u)
                }
            })
            return comment
        },
        [comments]
    )

    const toDateTime = (old_time) => {
        let [date, time] = old_time.split("T");
        return ({
            date,
            time
        })
    }


    useEffect(
        () => {
            if (apisUsers) {
                setUsers(apisUsers)
            }
            if (apisPosts) {
                setPosts(apisPosts)
            }
            if (apisCategories) {
                setCategories(apisCategories)
            }
            if (apisTags) {
                setTags(apisTags)
            }
            if (apisComments) {
                setComments(apisComments)
            }
        },
        [apisUsers, apisCategories, apisComments, apisPosts, apisTags]
    )

    const value = useMemo(
        () => ({
            users,
            posts,
            comments,
            categories,
            tags,
            findUser,
            findPost,
            findCategory,
            findTag,
            findComment,
            toDateTime,
        }),
        [users, posts, comments, categories, tags, findUser, findPost, findCategory, findTag, findComment]
    )

    return (
        <RestAPIsContext.Provider value={value}>
            {children}
        </RestAPIsContext.Provider>
    )
}

export const useRestAPI = () => useContext(RestAPIsContext)