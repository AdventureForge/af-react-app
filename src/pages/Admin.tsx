import { useState, useEffect, useCallback } from 'react';
import SideNavBar from '../components/layout/SideNavBar';
import useAxios from '../hooks/useAxios';
import PublisherForm from '../components/forms/PublisherForm';
import { PageInfo, Publisher, RolePlayingGame } from '../types/domain';
import Loader from '../components/ui/Loader';
import AdminContent from '../components/admin/AdminContent';
import {
  publisherHeaders,
  rolePlayingGameHeaders,
} from '../types/table-headers';
import { useParams } from 'react-router-dom';
import RolePlayingGameForm from '../components/forms/RolePlayingGameForm';

enum AdminPageContentEnum {
  PUBLISHERS = 'publishers',
  ROLEPLAYINGGAMES = 'roleplayinggames',
  COLLECTIONS = 'collections',
  AUTHORS = 'authors',
  BOOKS = 'books',
  ADVENTURES = 'adventures',
}

export interface PageContent {
  title: string;
  page: string;
  url: string;
}

export const adminPages: Map<string, PageContent> = new Map();
adminPages.set('publishers', {
  title: 'Publishers',
  page: 'publishers',
  url: 'games/publishers',
} as PageContent);
adminPages.set('roleplayinggames', {
  title: 'Roleplaying Games',
  page: 'roleplayinggames',
  url: 'games/roleplayinggames',
} as PageContent);
adminPages.set('collections', {
  title: 'Collections',
  page: 'collections',
  url: 'games/collections',
} as PageContent);
adminPages.set('authors', {
  title: 'Authors',
  page: 'authors',
  url: 'games/authors',
} as PageContent);
adminPages.set('books', {
  title: 'Books',
  page: 'books',
  url: 'games/books',
} as PageContent);
adminPages.set('adventures', {
  title: 'Adventures',
  page: 'adventures',
  url: 'adventures/adventures',
} as PageContent);

const Admin = () => {
  const [isDataReturned, setDataReturned] = useState(false);
  const [isModalDisplayed, setModalDisplayed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [publisherData, setPublisherData] = useState<Publisher[]>([]);
  const [rpgData, setRpgData] = useState<RolePlayingGame[]>([]);
  const [pageInfo, setPageInfo] = useState<PageInfo | null>(null);
  const axiosInstance = useAxios();
  const { adminSubPage } = useParams();
  const apiUrl =
    adminPages.get(adminSubPage ?? AdminPageContentEnum.PUBLISHERS)?.url ?? '';

  useEffect(() => {
    setIsLoading(true);
    fetchData();
  }, [adminSubPage]);

  useEffect(() => {
    if (isModalDisplayed) document.body.style.overflow = 'hidden';
    if (!isModalDisplayed) document.body.style.overflow = '';
  }, [isModalDisplayed]);

  const fetchData = useCallback(
    async () =>
      !!axiosInstance.current &&
      axiosInstance.current
        .get(apiUrl)
        .then((response) => {
          if (response.data.length == 0) {
            console.log('no data');
            setPageInfo(response.data.pageInfo);
            setDataReturned(false);
          } else {
            console.log(response.data);
            setDataReturned(true);
            adminSubPage === AdminPageContentEnum.PUBLISHERS &&
              setPublisherData((prev) => response.data.data);
            adminSubPage === AdminPageContentEnum.ROLEPLAYINGGAMES &&
              setRpgData((prev) => response.data.data);
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
    [adminSubPage]
  );

  const addDataHandler = <T,>(t: T) => {
    console.log('ADD');
    console.log(t);
    setModalDisplayed(false);
    !!axiosInstance.current &&
      axiosInstance.current
        .post(apiUrl, t)
        .then((response) => console.log(response))
        .then(() => fetchData())
        .catch((error) => {
          console.log(error);
          console.log(error.response.data);
        });
  };

  const openModalHandler = () => {
    setModalDisplayed(true);
  };
  const closeModalHandler = () => {
    setModalDisplayed(false);
  };

  const renderPage = () => {
    switch (adminSubPage) {
      case AdminPageContentEnum.PUBLISHERS:
        return getPublisherPageContent();
      case AdminPageContentEnum.ROLEPLAYINGGAMES:
        return getRoleplyingGamesPageContent();
      case AdminPageContentEnum.COLLECTIONS:
        return getRoleplyingGamesPageContent();
      case AdminPageContentEnum.AUTHORS:
        return getRoleplyingGamesPageContent();
      case AdminPageContentEnum.BOOKS:
        return getRoleplyingGamesPageContent();
      case AdminPageContentEnum.ADVENTURES:
        return getRoleplyingGamesPageContent();

      default:
        console.log('failed match');
        break;
    }
  };

  const getPublisherPageContent = () => {
    return (
      <AdminContent
        title={
          adminPages.get(AdminPageContentEnum.PUBLISHERS)?.title ??
          'Missing Title'
        }
        pageInfo={pageInfo ?? undefined}
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
      />
    );
  };

  const getRoleplyingGamesPageContent = () => {
    return (
      <AdminContent
        title={
          adminPages.get(AdminPageContentEnum.ROLEPLAYINGGAMES)?.title ??
          'Missing Title'
        }
        pageInfo={pageInfo ?? undefined}
        onCloseModal={closeModalHandler}
        onOpenModal={openModalHandler}
        modalDisplayed={isModalDisplayed}
        isDataReturned={isDataReturned}
        dataFromDB={rpgData}
        headers={rolePlayingGameHeaders}
        form={
          <RolePlayingGameForm
            onConfirm={addDataHandler}
            onCancel={closeModalHandler}
          />
        }
      />
    );
  };
  const getCollectionsPageContent = () => <p>Work In Progress</p>;
  const getAuthorsPageContent = () => <p>Work In Progress</p>;
  const getBooksPageContent = () => <p>Work In Progress</p>;
  const getAdventuresPageContent = () => <p>Work In Progress</p>;

  return (
    <div className="grid grid-cols-6 h-full">
      {isLoading && !isDataReturned && !pageInfo && <Loader />}
      {!isLoading && (publisherData || rpgData) && (
        <>
          <SideNavBar items={adminPages} />
          {renderPage()}
        </>
      )}
    </div>
  );
};

export default Admin;
