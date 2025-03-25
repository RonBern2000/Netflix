import { strings } from "../../strings/strings";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: string;
  className?: string;
}

const Input = ({ className = '', error, ...props }: InputProps) => {
  return (
    <>
      <input className={`peer rounded-lg p-3 text-white ${className} ${error ? "border-red-400" : ""}`} {...props} />
      <label className="absolute pointer-events-none text-[#9a9a9a] top-1/2 -translate-y-1/6 left-16 transition-all duration-200 ease-in-out peer-focus:top-5 peer-focus:text-xs">{strings.landing.emailAddress}</label>
      {error && <p className="text-red-400 text-sm mt-1">{error}</p>}
    </>
  )
}

export default Input;