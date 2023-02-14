import { Link } from "react-router-dom";
import style from "./NavBar.module.css"

const NavBar = () => {
    return (
        <div class={style.mainContainer}>
            <Link to='/Home'> HOME </Link>
            <Link to="/create"> New Recipe </Link>

        </div>
    )
}

export default NavBar