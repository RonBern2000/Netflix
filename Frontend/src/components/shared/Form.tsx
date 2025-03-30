
type FormProps = {
    children: React.ReactNode;
    onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
    className?: string;
}

const Form = ({ children, onSubmit, className = '' }: FormProps) => {
    return (
        <form className={`${className}`} onSubmit={onSubmit}>
            {children}
        </form>
    );
};

export default Form;