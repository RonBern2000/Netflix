import { useState } from "react";

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
        <>
            <img src="/language.png" alt="lang" className="w-5 absolute" />
            <select
                className="font-bold text-center text-sm rounded-sm w-30 h-8 bg-[rgba(0,0,0,0.55)] text-white"
                value={selectedLanguage}
                onChange={handleLanguageChange}>
                {languages.map((l) => (<option key={l} value={l}>
                    {l}
                </option>))}
            </select>
        </>
    )
}

export default LanguageDropDown;