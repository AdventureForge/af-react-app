type Props = {
  onClick: (itemClicked: string) => void;
  children?: React.ReactNode;
  color?: 'primary' | 'secondary';
  item: { value: string };
  className?: string;
};

const SideNavItem: React.FC<Props> = (props) => {
  const onClickHandler = () => {
    props.onClick(props.item.value);
  };

  return (
    <li>
      <div
        className={`flex items-center text-sm py-4 px-6 h-12 overflow-hidden text-violet-100 text-ellipsis whitespace-nowrap rounded hover:text-gray-900 hover:bg-gray-100 transition duration-300 ease-in-out cursor-pointer ${props.className}`}
        onClick={onClickHandler}
      >
        <span className="font-bold">{props.item.value}</span>
      </div>
    </li>
  );
};

export default SideNavItem;
