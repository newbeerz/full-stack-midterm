import { useCallback } from "react"

export const ButtonGoToTop = () => {
    
    const goTop = useCallback(
        () => {
            window.scroll(0, 0)
        },
        []
    )

    return (
        <div className="btn-toTop">
            <button onClick={goTop}><i className="bi bi-arrow-up"></i></button>
        </div>
    )
}