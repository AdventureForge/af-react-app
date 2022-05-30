type Props = {
  children?: React.ReactNode;
  link: string;
  classes?: string;
};

const CircleIcon: React.FC<Props> = (props) => {
  return (
    <a
      href={props.link}
      type="button"
      className="rounded-full border-2 border-white text-white leading-normal uppercase hover:bg-black hover:bg-opacity-5 focus:outline-none focus:ring-0 transition duration-150 ease-in-out w-9 h-9 m-1 hover:text-violet-500 hover:border-violet-500"
    >
      {props.children}
    </a>
  );
};

export default CircleIcon;
