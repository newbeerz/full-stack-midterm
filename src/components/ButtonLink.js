import { Link } from "react-router-dom"

export const ButtonLink = ( {to, text, align="left"} ) => {
    if (align === "left")
    {
        return (
            <div className="btn-links btn-left">
                <Link to={to} className="btn-link">{text}</Link>
            </div>
        )
    }
    else if (align === "center")
    {
        return (
            <div className="btn-links btn-center">
                <Link to={to} className="btn-link">{text}</Link>
            </div>
        )
    }
    else
    {
        return (
            <div className="btn-links btn-right">
                <Link to={to} className="btn-link">{text}</Link>
            </div>
        )
    }
}