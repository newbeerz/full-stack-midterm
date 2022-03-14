import { useEffect, useMemo, useState } from "react"
import { useParams } from "react-router-dom"
import { HeadTitle } from "../components/HeadTitle"
import PostItem from "../components/PostItem"
import { useRestAPI } from "../contexts/RestAPIsContext"

export const CateAndTagPage = ({type}) => {

    const {id} = useParams()
    const [cate, setCate] = useState([])
    const [tag, setTag] = useState([])

    const { posts, findTag, findCategory } = useRestAPI()

    const type_posts = useMemo(
        () => {
            if (type === "cate" && cate.length === 0){
                return []
            }
            else if (type === "tag" && tag.length === 0){
                return []
            }

            let newArr = []
            if (type === "cate") {
                posts.forEach((p) => {
                    if (p.categories.includes(cate[0].id)){
                        newArr.push(p)
                    }
                })
            }
            else{
                posts.forEach((p) => {
                    if (p.tags.includes(tag[0].id)){
                        newArr.push(p)
                    }
                })
            }
            return newArr
        },
        [posts, tag, cate, type]
    )
    
    useEffect(
        () => {
            if (type === "cate"){
                setCate(findCategory([id]))
            }
            else{
                setTag(findTag([id]))
            }
        },
        [setCate, setTag, id, findCategory, findTag, type]
    )

    if (type === "cate"){
        return (
            <div>
                <HeadTitle text={`Category: ${cate[0] ? cate[0].name : "" }`} />
                {
                    type_posts.map((p) => (
                        <PostItem key={p.id} post={p} />
                    ))
                }
            </div>
        )
    }
    else{
        return (
            <div>
                <HeadTitle text={`Tag: #${tag[0] ? tag[0].name : "" }`} />
                {
                    type_posts.map((p) => (
                            <PostItem key={p.id} post={p} />
                    ))
                }
            </div>
        )
    }
}