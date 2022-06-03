import { useState, useEffect, useCallback } from 'react';
import SideNavBar from '../components/layout/SideNavBar';
import useAxios from '../hooks/useAxios';
import { toEntries } from '../types/functions';
import PublisherForm from '../components/forms/PublisherForm';
import { PageInfo, Publisher } from '../types/domain';
import Loader from '../components/ui/Loader';
import AdminContent from '../components/admin/AdminContent';
import {
  IPublisherHeaderTypes,
  publisherHeaders,
} from '../types/table-headers';

enum AdminPageContentEnum {
  PUBLISHERS = 'Publishers',
  ROLEPLAYINGGAMES = 'Roleplaying Games',
  COLLECTIONS = 'Collections',
  AUTHORS = 'Authors',
  BOOKS = 'Books',
  ADVENTURES = 'Adventures',
}

export type AdminPageContent = {
  value: string;
  url: string;
};

const items: AdminPageContent[] = [
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
  const [isDataReturned, setDataReturned] = useState(false);
  const [isModalDisplayed, setModalDisplayed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [pageContent, setPageContent] = useState<AdminPageContent>(items[0]);
  const [publisherData, setPublisherData] = useState<Publisher[]>([]);
  const [pageInfo, setPageInfo] = useState<PageInfo | null>(null);
  const axiosInstance = useAxios();

  useEffect(() => {
    setIsLoading(true);
    fetchData();
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

  //const data = useMemo((): Publisher[] => [...publisherData], [isDataReturned]);

  const fetchData = useCallback(
    async () =>
      !!axiosInstance.current &&
      axiosInstance.current
        .get(`${pageContent.url}`)
        .then((response) => {
          if (response.data.length == 0) {
            console.log('no data');
            setDataReturned(false);
          } else {
            console.log(response.data);
            setDataReturned(true);
            setPublisherData(response.data.data);
            setPageInfo(response.data.pageInfo);
          }
        })
        .catch((error) => {
          console.log(error.response);
        })
        .finally(() => {
          console.log('end fetch');
          setIsLoading(false);
        }),
    [pageContent]
  );

  const addDataHandler = <T,>(t: T) => {
    setModalDisplayed(false);
    !!axiosInstance.current &&
      axiosInstance.current
        .post(items[0].url, t)
        .then((response) => console.log(response))
        .catch((error) => {
          console.log(error);
          console.log(error.response.data);
          fetchData();
        });
  };

  const openModalHandler = () => {
    setModalDisplayed(true);
  };
  const closeModalHandler = () => {
    setModalDisplayed(false);
  };

  return (
    <div className="grid grid-cols-5 h-full">
      {isLoading && !isDataReturned && !pageInfo && <Loader />}
      {!isLoading && isDataReturned && pageInfo && (
        <>
          <SideNavBar items={items} onClick={onNavItemClick} />
          <AdminContent
            pageContent={pageContent}
            pageInfo={pageInfo}
            onCloseModal={closeModalHandler}
            onOpenModal={openModalHandler}
            modalDisplayed={isModalDisplayed}
            isDataReturned={isDataReturned}
            dataFromDB={publisherData}
            headers={publisherHeaders}
            form={
              <PublisherForm
                onConfirm={addDataHandler}
                onCancel={closeModalHandler}
              />
            }
          ></AdminContent>
        </>
      )}
    </div>
  );
};

export default Admin;
