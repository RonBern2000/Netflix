import { Link, useLocation } from "react-router-dom";
import Container from "./Container";
import { useEffect, useState } from "react";
import { strings } from "../../strings/strings";
import { useAppDispatch } from "../../store/store";
import { resetSearchValue } from "../../store/slices/moviesSlice";


const Navbar = () => {

    const location = useLocation();
    const dispatch = useAppDispatch();
    const [activePage, setActivePage] = useState(location.pathname);

    useEffect(() => {
        setActivePage(location.pathname);
    }, [location.pathname]);

    const setLinkClassName = (path: string) => `text-white hover:text-gray-300 ${activePage === path ? "font-bold" : ""}`;

    const handleNavClick = () => {
        dispatch(resetSearchValue());
    }

    return (
        <Container>
            <ul className="flex gap-3 list-none">
                <li>
                    <Link to="/browse" className={setLinkClassName("/browse")} onClick={handleNavClick}>
                        {strings.navbarTitles.home}
                    </Link>
                </li>
                <li>
                    <Link to="#" className={setLinkClassName("#")} onClick={handleNavClick}>
                        {strings.navbarTitles.movies}
                    </Link>
                </li>
                <li>
                    <Link to="/browse/mylist" className={setLinkClassName("/browse/mylist")} onClick={handleNavClick}>
                        {strings.navbarTitles.mylist}
                    </Link>
                </li>
            </ul>
        </Container>
    )
}

export default Navbar;

{/* <li>
                    <Link to={'/browse'} className={setLinkClassName("/browse")}>Home</Link>
                </li>
                <li>
                    <Link to={'#'} className={setLinkClassName("#")}>TV Shows</Link>
                </li>
                <li>
                    <Link to={'#'} className={setLinkClassName("#")}>Movies</Link>
                </li>
                <li>
                    <Link to={'#'} className={setLinkClassName("#")}>New & Popular</Link>
                </li>
                <li>
                    <Link to={'/browse/mylist'} className={setLinkClassName("/browse/mylist")}>My List</Link>
                </li> */}