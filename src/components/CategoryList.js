import { useRestAPI } from "../contexts/RestAPIsContext"
import { CategoryItem } from "./CategoryItem"
import { HeadTitle } from "./HeadTitle"

export const CategoryList = () => {

    const {categories} = useRestAPI()
    
    return (
        <div>
            <HeadTitle text={"หมวดหมู่"} />
            {
                categories.map((cate) => (
                    <div key={cate.id}>
                        <li className="post-title" style={{marginTop: "30px"}}> {cate.name}</li>
                        <CategoryItem category={cate} />
                    </div>
                ))
            }
        </div>
    )
}