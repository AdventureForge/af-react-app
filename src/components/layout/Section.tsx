type Props = {
  children?: React.ReactNode;
  className?: string;
};

const Section: React.FC<Props> = (props) => {
  return <section className={`${props.className}`}>{props.children}</section>;
};

export default Section;
