import { createContext, useCallback, useContext, useMemo } from "react";

export const CommentContext = createContext();

export const CommentProvider = ( {children} ) => {

    const sendComment = useCallback(
      (data) => async () => {
        await fetch(`https://fswd-wp.devnss.com/wp-json/wp/v2/comments`,
        {
          method: 'POST',
          mode: 'cors',
          cache: 'no-cache',
          credentials: 'same-origin',
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Basic ZnN3ZDpmc3dkLWNtcw==',
          },
          redirect: 'follow',
          referrerPolicy: 'no-referrer',
          body: JSON.stringify(data)
        })
      },
      []
    )

    const value = useMemo(
        () => ({
          sendComment,
        }),
        [sendComment]
    )

    return (
        <CommentContext.Provider value={value}>
            {children}
        </CommentContext.Provider>
    )
}

export const useComment = () => useContext(CommentContext)