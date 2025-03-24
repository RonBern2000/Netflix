
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: string;
  className?: string;
}

const Input = ({ className = '', error, ...props }: InputProps) => {
  return (
    <>
      <input className={`rounded-lg p-3 text-white ${className}`} {...props} />
      {error && <p className="text-red-400 text-sm mt-1">{error}</p>}
    </>
  )
}

export default Input;