type LogoProps = {
  size?: 'landing' | 'home';
}

const logoSizes = {
  landing: { w: 148, h: 40 },
  home: { w: 93, h: 25 },
}

const Logo = ({ size = 'landing' }: LogoProps) => {
  const { w, h } = logoSizes[size];
  return (
    <img
      src="/logo.svg"
      alt="logo"
      style={{ width: `${w}px`, height: `${h}px` }} />
  )
}

export default Logo;