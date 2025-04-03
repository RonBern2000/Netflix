import Container from "./Container"

type CheckBoxProps = {
    children: React.ReactNode;
    className?: string;
}

const CheckBox = ({ children, className = '' }: CheckBoxProps) => {
    return (
        <Container className={`${className}`}>
            <input type="checkbox" className="w-4.5" />
            <span>{children}</span>
        </Container>
    )
}

export default CheckBox