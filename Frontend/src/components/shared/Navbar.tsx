import { Link, useLocation } from "react-router-dom";
import Container from "./Container";
import { useEffect, useState } from "react";


const Navbar = () => {

    const location = useLocation();
    const [activePage, setActivePage] = useState(location.pathname);

    useEffect(() => {
        setActivePage(location.pathname);
    }, [location.pathname]);

    const setLinkClassName = (path: string) => `text-white hover:text-gray-300 ${activePage === path ? "font-bold" : ""}`;

    return (
        <Container>
            <ul className="flex gap-3 list-none">
                <li>
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
                </li>
            </ul>
        </Container>
    )
}

export default Navbar;

{/* <li>
    <Link to={'#'}>Browse by Languages</Link>
</li> */}