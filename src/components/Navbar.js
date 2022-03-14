import { useEffect } from "react"
import { Link, NavLink, useLocation } from "react-router-dom"

const Navbar = () => {
    const location = useLocation();

    useEffect(
        () => {
            const path = location.pathname
            const links = document.querySelectorAll(".navbar-link")
            links.forEach((el) => {
                el.classList.remove("selected")
            })
            if (path.includes("/posts")){
                links[1].classList.add("selected")
            }
            else if (path.includes("/categories") || path.includes("/tags")){
                links[2].classList.add("selected")
            }
            else if (path.includes("/about")){
                links[3].classList.add("selected")
            }
            else if (path.includes("/")){
                links[0].classList.add("selected")
            }
             
        },
        [location]
    )

    return (
        <div className="navbar">
            <div className="navbar-item">
                <Link to="/" className="link-default">
                    <div className="navbar-title">ONCE AGAIN</div>
                </Link>
            </div>
            <div className="navbar-item right">
                <div className="navbar-btn"><NavLink to="/" className="navbar-link">หน้าหลัก</NavLink></div>
                <div className="navbar-btn"><NavLink to="/posts" className="navbar-link">โพสต์</NavLink></div>
                <div className="navbar-btn"><NavLink to="/categories" className="navbar-link">หมวดหมู่</NavLink></div>
                <div className="navbar-btn"><NavLink to="/about" className="navbar-link">เกี่ยวกับ</NavLink></div>
            </div>
        </div>
    )
}

export default Navbar