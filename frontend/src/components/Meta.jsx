import { Helmet } from 'react-helmet-async';

const Meta = ({ title, description, keywords }) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name='description' content={description} />
      <meta name='keyword' content={keywords} />
    </Helmet>
  );
};

Meta.defaultProps = {
  title: 'Welcome To Jack\'s E-Commerce Platform',
  description: 'This platform is built with MERN stack. It is a full-stack e-commerce platform.',
  keywords: 'E-Commerce Platform',
};

export default Meta;
