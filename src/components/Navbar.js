import { useEffect } from "react"
import { NavLink, useLocation } from "react-router-dom"

const Navbar = () => {
    const location = useLocation();

    useEffect(
        () => {
            const path = location.pathname
            const links = document.querySelectorAll(".navbar-link")
            if (path.includes("/posts")){
                links[1].classList.add("selected")
            }
            else if (path.includes("/categories")){
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
                <div className="navbar-title">ONCE AGAIN</div>
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