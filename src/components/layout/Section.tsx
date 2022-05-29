type Props = {
  children?: React.ReactNode;
};

const Section: React.FC<Props> = (props) => {
  return <section className="px-40 py-14">{props.children}</section>;
};

export default Section;
