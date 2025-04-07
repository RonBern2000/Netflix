import { useEffect, useRef } from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: string;
  className?: string;
  containerClassName?: string;
  label: string;
}

const Input = ({ className = '', containerClassName = '', label, error, value, ...props }: InputProps) => {
  const labelRef = useRef<HTMLLabelElement | null>(null);

  useEffect(() => {
    if (typeof value === 'string' && value.length > 0 && labelRef.current) {
      labelRef.current.classList.add("!text-xs", "!top-2");
    }
  }, [value]);

  const handleOnBlur = (event: React.FocusEvent<HTMLInputElement>) => {
    if (event.target.value !== '' && labelRef.current) {
      labelRef.current.classList.add("!text-xs", "!top-2");
    } else if (event.target.value === '' && labelRef.current) {
      labelRef.current.classList.remove("!text-xs", "!top-2");
    }
  }

  return (
    <div className={`w-3/5 ${containerClassName}`}>
      <div className={`relative w-full`}>
        <input
          className={`peer rounded-lg pt-4 p-3 ${className} ${error ? "border-red-400" : ""}`} {...props}
          onBlur={handleOnBlur}
        />
        <label
          ref={labelRef}
          className="absolute pointer-events-none text-[#9a9a9a] top-1/2 -translate-y-1/2 left-5 transition-all duration-200 ease-in-out peer-focus:top-2.5 peer-focus:text-xs">{label}</label>

      </div>
      {error && <p className="text-red-400 text-sm mt-1 flex gap-1 visible h-5"><img src="/CircleError.svg" />{error}</p>}
    </div>

  )
}

export default Input;