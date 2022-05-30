import { useState, useEffect } from 'react';
import Section from '../components/layout/Section';
import SideNavBar from '../components/layout/SideNavBar';
import axios from 'axios';

type PageContent = {
  title: string;
};

const Admin = () => {
  const [pageContent, setPageContent] = useState<PageContent>({
    title: 'Publishers',
  });

  const items = [
    { value: 'Publishers', url: 'publishers' },
    { value: 'Roleplaying Games', url: 'roleplayinggames' },
    { value: 'Collections', url: 'collections' },
    { value: 'Authors', url: 'authors' },
    { value: 'Books', url: 'books' },
    { value: 'Adventures', url: 'adventures' },
  ];

  useEffect(() => {
    axios.get(`http://localhost:8890/games/books`).then((response) => {
      console.log(response.data);
    });
  }, []);

  const onNavItemClick = (itemClicked: string) => {
    setPageContent({ title: itemClicked });
  };

  return (
    <div className="grid grid-cols-5 h-full">
      <SideNavBar items={items} onClick={onNavItemClick} />
      <Section className="col-span-4 py-5">
        <h1 className="text-white text-3xl font-semibold block border-l-[40px] pl-5 border-l-cyan-500">
          {pageContent.title}
        </h1>
        <p>soon</p>
      </Section>
    </div>
  );
};

export default Admin;
