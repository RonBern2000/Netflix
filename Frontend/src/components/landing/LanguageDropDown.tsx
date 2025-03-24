import { useState } from "react";
import Container from "../shared/Container";

// TODO: Need to save the state in Redux
const languages: string[] = [
    'English',
    'עברית'
]
const LanguageDropDown = () => {
    const [selectedLanguage, setSelectedLanguage] = useState(languages[0]);

    const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedLanguage(e.target.value);
    }

    return (
        <Container className="relative">
            <img src="/language.png" alt="lang" className="w-3 absolute top-2.5 left-2.5" />
            <select
                className="border border-[rgba(84,84,84,1)] font-bold text-center text-sm rounded-sm w-30 h-8 bg-[rgba(0,0,0,0.55)] text-white"
                value={selectedLanguage}
                onChange={handleLanguageChange}>
                {languages.map((l) => (<option key={l} value={l}>
                    {l}
                </option>))}
            </select>
        </Container>
    )
}

export default LanguageDropDown;