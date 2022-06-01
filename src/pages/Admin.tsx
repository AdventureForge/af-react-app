import { useState, useEffect } from 'react';
import Section from '../components/layout/Section';
import SideNavBar from '../components/layout/SideNavBar';
import useAxios from '../hooks/useAxios';
import { toEntries } from '../types/functions';
import PublisherForm from '../components/forms/PublisherForm';

enum AdminPageContentEnum {
  PUBLISHERS = 'Publishers',
  ROLEPLAYINGGAMES = 'Roleplaying Games',
  COLLECTIONS = 'Collections',
  AUTHORS = 'Authors',
  BOOKS = 'Books',
  ADVENTURES = 'Adventures',
}

type PageContent = {
  value: string;
  url: string;
};

const items: PageContent[] = [
  { value: AdminPageContentEnum.PUBLISHERS, url: 'games/publishers' },
  {
    value: AdminPageContentEnum.ROLEPLAYINGGAMES,
    url: 'games/roleplayinggames',
  },
  { value: AdminPageContentEnum.COLLECTIONS, url: 'games/collections' },
  { value: AdminPageContentEnum.AUTHORS, url: 'games/authors' },
  { value: AdminPageContentEnum.BOOKS, url: 'games/books' },
  { value: AdminPageContentEnum.ADVENTURES, url: 'adventures/adventures' },
];

const Admin = () => {
  const [pageContent, setPageContent] = useState<PageContent>(items[0]);
  const [dataReturned, setDataReturned] = useState(false);
  const axiosInstance = useAxios();

  useEffect(() => {
    !!axiosInstance.current &&
      axiosInstance.current
        .get(`${pageContent.url}`)
        .then((response) => {
          if (response.data.length == 0) {
            console.log('no data');
            setDataReturned(false);
          }
        })
        .catch((error) => console.log(error.response));
  }, [pageContent]);

  const onNavItemClick = (itemClicked: string) => {
    for (const [index, item] of toEntries(items)) {
      if (item.value === itemClicked) {
        setPageContent(items[index]);
        return;
      }
    }
    setPageContent(items[0]);
  };

  return (
    <div className="grid grid-cols-5 h-full">
      <SideNavBar items={items} onClick={onNavItemClick} />
      <Section className="col-span-4 py-6">
        <h1 className="text-white text-3xl font-semibold block border-l-[40px] pl-5 border-l-cyan-500">
          {pageContent.value}
        </h1>
        <p>No {pageContent.value.toLowerCase()} found, create one : </p>
        {!dataReturned &&
          pageContent.value === AdminPageContentEnum.PUBLISHERS && (
            <PublisherForm />
          )}
      </Section>
    </div>
  );
};

export default Admin;
