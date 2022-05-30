import MainFooter from './MainFooter';
import MainHeader from './MainHeader';

type Props = {
  children?: React.ReactNode;
  classes?: string;
};

const PageLayout: React.FC<Props> = (props) => {
  return (
    <>
      <MainHeader />
      <main>{props.children}</main>
      <MainFooter />
    </>
  );
};

export default PageLayout;
