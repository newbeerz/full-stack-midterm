import { useEffect, useState } from "react";

const RestAPIs = ( name, id="" ) => {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [items, setItems] = useState(null);

    useEffect(() => {
        fetch(`https://fswd-wp.devnss.com/wp-json/wp/v2/${name}/${id}`)
          .then(res => res.json())
          .then(
            (result) => {
              setIsLoaded(true);
              setItems(result);
            },
            (error) => {
              setIsLoaded(true);
              setError(error);
              console.log(error.message);
            }
          )
      }, 
      [name, id]
    )

      if (error) {
        return false
      } else if (!isLoaded) {
        return false
      } else {
        return items;
      }
}

export default RestAPIs