
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: string;
}

const Input = ({ error, ...props }: InputProps) => {
  return (
    <div>
      <input className="rounded" {...props} />
      {error && <p className="text-red-400 text-sm mt-1">{error}</p>}
    </div>
  )
}

export default Input;