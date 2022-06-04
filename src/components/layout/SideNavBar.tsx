import { PageContent } from '../../pages/Admin';
import SideNavItem from './SideNavItem';

type Props = {
  items: Map<string, PageContent>;
};

const SideNavBar: React.FC<Props> = ({ items }) => {
  const links = Array.from(items.values());
  return (
    <nav className="min-h-[80vh] shadow-md bg-slate-800 px-1 py-10">
      <ul className="sticky top-5">
        {links.map((link) => (
          <SideNavItem
            key={link.title}
            destination={`${link.page}`}
            title={link.title}
          />
        ))}
      </ul>
    </nav>
  );
};

export default SideNavBar;
