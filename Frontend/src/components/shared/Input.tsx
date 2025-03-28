import { useRef } from "react";
import { strings } from "../../strings/strings";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: string;
  className?: string;
}

const Input = ({ className = '', error, ...props }: InputProps) => {
  const lableRef = useRef<HTMLLabelElement | null>(null);

  const handleOnBlur = (event: React.FocusEvent<HTMLInputElement>) => {
    if (event.target.value !== '' && lableRef.current) {
      lableRef.current.classList.add("!text-xs", "!top-2");
    } else if (event.target.value === '' && lableRef.current) {
      lableRef.current.classList.remove("!text-xs", "!top-2");
    }
  }

  return (
    <div className="relative w-3/5">
      <input
        className={`peer rounded-lg pt-4 p-3 text-white ${className} ${error ? "border-red-400" : ""}`} {...props}
        onBlur={handleOnBlur} />
      <label
        ref={lableRef}
        className="absolute pointer-events-none text-[#9a9a9a] top-1/2 -translate-y-1/2 left-5 transition-all duration-200 ease-in-out peer-focus:top-2 peer-focus:text-xs">{strings.landing.emailAddress}</label>
      {error && <p className="text-red-400 text-sm mt-1">{error}</p>}
    </div>
  )
}

export default Input;

{/* <>
  <input
    className={`peer rounded-lg pt-4 p-3 text-white ${className} ${error ? "border-red-400" : ""}`} {...props}
    onBlur={handleOnBlur}>

  </input>
  <label
    ref={lableRef}
    className="absolute pointer-events-none text-[#9a9a9a] top-1/2 -translate-y-1/6 left-16 transition-all duration-200 ease-in-out peer-focus:top-5 peer-focus:text-xs">{strings.landing.emailAddress}</label>
  {error && <p className="text-red-400 text-sm mt-1">{error}</p>}
</> */}