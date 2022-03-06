import { CategoryList } from "../components/CategoryList";
import { TagList } from "../components/TagList";

export const CategoryPage = () => {
    return (
        <div>
          <CategoryList />
          <br />
          <TagList />
        </div>
      );
}