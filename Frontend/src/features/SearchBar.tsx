import { useEffect } from "react";
import Search from "../components/icons/Search";
import Container from "../components/shared/Container";
import { useLocation, useNavigate } from "react-router-dom";
import { getFilterUrl } from "../utils/getFilterUrl";
import { useAppDispatch, useAppSelector } from "../store/store";
import { searchInputChange } from "../store/slices/moviesSlice";

type SearchBarProps = {
    className?: string;
}

const SearchBar = ({ className = '' }: SearchBarProps) => {

    const searchValue = useAppSelector((state) => state.movies.searchValue);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const delay = setTimeout(() => {
            if (searchValue !== '') {
                const filterURI = getFilterUrl(searchValue);
                navigate(filterURI);
            } else if (location.pathname.includes('/search')) {
                navigate('/');
            }
        }, 500);

        return () => clearTimeout(delay);
    }, [searchValue, navigate, location.pathname]);

    return (
        <Container className={`${className} bg-black border-white border-1 gap-2 py-1 px-0.5`}>
            <Search />
            <input
                placeholder="Titles"
                max={30}
                className="bg-black text-white border-none focus:outline-none"
                value={searchValue}
                onChange={(e) => dispatch(searchInputChange(e.target.value))} />
        </Container>
    )
}

export default SearchBar;