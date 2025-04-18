import { useEffect, useState } from "react";
import Search from "../components/icons/Search";
import Container from "../components/shared/Container";
import { useNavigate } from "react-router-dom";
import { getFilterUrl } from "../utils/getFilterUrl";
// import { useSearchMoviesQuery } from "../store/slices/moviesApiSlice";

type SearchBarProps = {
    className?: string;
}

const SearchBar = ({ className = '' }: SearchBarProps) => {

    const [searchValue, setSearchValue] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const delay = setTimeout(() => {
            if (searchValue) {
                const filterURI = getFilterUrl(searchValue);
                navigate(filterURI);
            } else {
                navigate('/')
            }
        }, 500);

        return () => clearTimeout(delay);
    }, [searchValue, navigate]);

    return (
        <Container className={`${className} bg-black border-white border-1 gap-2 py-1 px-0.5`}>
            <Search />
            <input
                placeholder="Titles"
                max={30}
                className="bg-black text-white border-none focus:outline-none"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)} />
        </Container>
    )
}

export default SearchBar;