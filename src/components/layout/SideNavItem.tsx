import { NavLink } from 'react-router-dom';

type Props = {
  children?: React.ReactNode;
  color?: 'primary' | 'secondary';
  title: string;
  destination: string;
  className?: string;
};

const SideNavItem: React.FC<Props> = (props) => {
  const classes = `flex items-center text-sm py-4 px-6 h-12 overflow-hidden text-violet-100 text-ellipsis whitespace-nowrap hover:text-violet-100 hover:bg-violet-500 transition duration-300 ease-in-out cursor-pointer ${props.className}`;

  return (
    <li>
      <NavLink
        to={`${props.destination}`}
        className={({ isActive }) =>
          isActive ? `border-l-8 border-cyan-500 ${classes}` : classes
        }
      >
        <span className="font-bold">{props.title}</span>
      </NavLink>
    </li>
  );
};

export default SideNavItem;
