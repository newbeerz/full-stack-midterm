import { Link } from "react-router-dom"

export const ButtonLink = ( {to, text, right=false} ) => {
    if (right)
    {
        return (
            <div className="btn-links btn-right">
                <Link to={to} className="btn-link">{text}</Link>
            </div>
        )
    }
    else
    {
        return (
            <div className="btn-links">
                <Link to={to} className="btn-link">{text}</Link>
            </div>
        )
    }
}