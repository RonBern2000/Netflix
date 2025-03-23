
type BlurrEffectProps = {
    className?: string;
}

const BlurrEffect = ({ className }: BlurrEffectProps) => {
    return (
        <div className={`absolute inset-0 bg-opacity-40 backdrop-blur-xs z-1 ${className}`}></div>
    )
}

export default BlurrEffect;