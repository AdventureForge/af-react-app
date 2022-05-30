import SideNavItem from './SideNavItem';

type Props = {
  items: { value: string }[];
  onClick: (itemClicked: string) => void;
};

const SideNavBar: React.FC<Props> = (props) => {
  return (
    <div className="w-60 h-full shadow-md bg-slate-800 px-1 py-10 align-top overflow-auto">
      <ul>
        {props.items.map((item) => (
          <SideNavItem key={item.value} item={item} onClick={props.onClick} />
        ))}
      </ul>
    </div>
  );
};

export default SideNavBar;
