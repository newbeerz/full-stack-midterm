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
            else if (path.includes("/authors")){
                links[3].classList.add("selected")
            }
            else if (path.includes("/about")){
                links[4].classList.add("selected")
            }
            else if (path.includes("/")){
                links[0].classList.add("selected")
            }
             
        },
        [location]
    )

    return (
        <div className="nvbar">
            <div className="nvbar-item">
                <Link to="/" className="link-default">
                    <div className="nvbar-title">ONCE AGAIN</div>
                </Link>
            </div>
            <div className="nvbar-item right">
                <div className="nvbar-btn"><NavLink to="/" className="navbar-link">หน้าหลัก</NavLink></div>
                <div className="nvbar-btn"><NavLink to="/posts" className="navbar-link">โพสต์</NavLink></div>
                <div className="nvbar-btn"><NavLink to="/categories" className="navbar-link">หมวดหมู่</NavLink></div>
                <div className="nvbar-btn"><NavLink to="/authors" className="navbar-link">ผู้ใช้</NavLink></div>
                <div className="nvbar-btn"><NavLink to="/about" className="navbar-link">เกี่ยวกับ</NavLink></div>
            </div>
        </div>
    )
}

export default Navbar