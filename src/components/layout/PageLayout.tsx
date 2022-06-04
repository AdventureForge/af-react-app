import MainFooter from './MainFooter';
import MainHeader from './MainHeader';

type Props = {
  children?: React.ReactNode;
  classes?: string;
};

const PageLayout: React.FC<Props> = (props) => {
  return (
    <div className="relative min-h-screen grid-flow-col pb-96">
      <MainHeader />
      {props.children}
      <MainFooter />
    </div>
  );
};

export default PageLayout;
