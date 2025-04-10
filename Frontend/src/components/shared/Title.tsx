// import { Helmet } from 'react-helmet-async';

type TitleProps = {
    title: string;
}

const Title = ({title}: TitleProps) => {
  return (
    // <Helmet>
        <title>{title}</title>
    // </Helmet>
  )
}

export default Title;