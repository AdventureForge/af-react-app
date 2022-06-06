/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState, useEffect, useCallback } from 'react';
import SideNavBar from '../components/layout/SideNavBar';
import useAxios from '../hooks/useAxios';
import {
  BaseEntity,
  Edition,
  PageInfo,
  Publisher,
  RolePlayingGame,
  Collection,
  Author,
  Book,
} from '../types/domain';
import Loader from '../components/ui/Loader';
import AdminContent from '../components/admin/AdminContent';
import {
  authorHeaders,
  bookHeaders,
  collectionHeaders,
  editionHeaders,
  publisherHeaders,
  rolePlayingGameHeaders,
} from '../types/table-headers';
import { useNavigate, useParams } from 'react-router-dom';
import { PageContent } from '../types/various';

export enum AdminPageContentEnum {
  PUBLISHERS = 'publishers',
  ROLEPLAYINGGAMES = 'roleplayinggames',
  EDITIONS = 'editions',
  COLLECTIONS = 'collections',
  AUTHORS = 'authors',
  BOOKS = 'books',
  ADVENTURES = 'adventures',
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
adminPages.set('editions', {
  title: 'Editions',
  page: 'editions',
  url: 'games/editions',
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
  const [editionData, setEditionData] = useState<Edition[]>([]);
  const [collectionData, setCollectionData] = useState<Collection[]>([]);
  const [authorData, setAuthorData] = useState<Author[]>([]);
  const [bookData, setBookData] = useState<Book[]>([]);
  const [pageInfo, setPageInfo] = useState<PageInfo | null>(null);
  const [pageNumber, setPageNumber] = useState(0);
  const [pageSize, setPageSize] = useState(20);
  const [rowsSelected, setRowsSelected] = useState<(string | undefined)[]>([]);
  const axiosInstance = useAxios();
  const { adminSubPage } = useParams();
  const navigate = useNavigate();
  const apiUrl =
    adminPages.get(adminSubPage ?? AdminPageContentEnum.PUBLISHERS)?.url ?? '';

  useEffect(() => {
    setIsLoading(true);
    fetchData();
  }, [adminSubPage, pageNumber, pageSize]);

  useEffect(() => {
    if (isModalDisplayed) document.body.style.overflow = 'hidden';
    if (!isModalDisplayed) document.body.style.overflow = '';
  }, [isModalDisplayed]);

  const fetchData = useCallback(
    async () =>
      !!axiosInstance.current &&
      axiosInstance.current
        .get(`${apiUrl}?page=${pageNumber}&size=${pageSize}`)
        .then((response) => {
          if (response.data.length == 0) {
            setPageInfo(response.data.pageInfo);
            setDataReturned(false);
          } else {
            setDataReturned(true);

            adminSubPage === AdminPageContentEnum.PUBLISHERS &&
              setPublisherData((_) => response.data.data);

            adminSubPage === AdminPageContentEnum.ROLEPLAYINGGAMES &&
              setRpgData((_) => response.data.data);

            adminSubPage === AdminPageContentEnum.EDITIONS &&
              setEditionData((_) => response.data.data);

            adminSubPage === AdminPageContentEnum.COLLECTIONS &&
              setCollectionData((_) => response.data.data);

            adminSubPage === AdminPageContentEnum.AUTHORS &&
              setAuthorData((_) => response.data.data);

            adminSubPage === AdminPageContentEnum.BOOKS &&
              setBookData((_) => response.data.data);

            setPageInfo(response.data.pageInfo);
          }
        })
        .catch((error) => {
          console.log(error.response.data);
        })
        .finally(() => {
          setIsLoading(false);
        }),
    [adminSubPage, pageNumber, pageSize]
  );

  const addDataHandler = <T extends BaseEntity>(t: T) => {
    console.log('ADD');
    console.log(t);
    setModalDisplayed(false);
    !!axiosInstance.current &&
      axiosInstance.current
        .post(apiUrl, t)
        .then(() => fetchData())
        .catch((error) => {
          console.log(error.response.data);
        });
  };

  const deleteDataHanlder = () => {
    console.log('DELETE');
    console.log(rowsSelected);
    !!axiosInstance.current &&
      axiosInstance.current
        .delete(apiUrl, {
          data: rowsSelected,
        })
        .then(() => fetchData())
        .catch((error) => {
          console.log(error.response.data);
        });
  };

  const updateDataHandler = <T extends BaseEntity>(t: T) => {
    console.log('UPDATE');
    console.log(t);
    setModalDisplayed(false);
    !!axiosInstance.current &&
      axiosInstance.current
        .put(`${apiUrl}/${t.uuid}`, t)
        .then(() => fetchData())
        .catch((error) => {
          console.log(error.response.data);
        });
  };

  const openModalHandler = () => {
    setModalDisplayed(true);
  };
  const closeModalHandler = () => {
    setModalDisplayed(false);
  };

  const pageNumberHandler = (pageNumberParam: number) => {
    setPageNumber((_) => pageNumberParam);
  };
  const pageSizeHandler = (pageSizeParam: number) => {
    setPageSize((_) => pageSizeParam);
  };

  const rowSelectedHandler = (rows: (string | undefined)[]) => {
    setRowsSelected((_) => rows);
  };

  const renderPage = () => {
    switch (adminSubPage) {
      case AdminPageContentEnum.PUBLISHERS:
        return getPublisherPageContent();
      case AdminPageContentEnum.ROLEPLAYINGGAMES:
        return getRoleplyingGamesPageContent();
      case AdminPageContentEnum.EDITIONS:
        return getEditionsPageContent();
      case AdminPageContentEnum.COLLECTIONS:
        return getCollectionsPageContent();
      case AdminPageContentEnum.AUTHORS:
        return getAuthorsPageContent();
      case AdminPageContentEnum.BOOKS:
        return getBooksPageContent();
      case AdminPageContentEnum.ADVENTURES:
        return getAdventuresPageContent();

      default:
        navigate('/admin/publishers');
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
        pageType={AdminPageContentEnum.PUBLISHERS}
        onCloseModal={closeModalHandler}
        onOpenModal={openModalHandler}
        modalDisplayed={isModalDisplayed}
        isDataReturned={isDataReturned}
        dataFromDB={publisherData}
        headers={publisherHeaders}
        onRowSelect={rowSelectedHandler}
        onDelete={deleteDataHanlder}
        onUpdate={updateDataHandler}
        onCreate={addDataHandler}
        onPageNumberChange={pageNumberHandler}
        onPageSizeChange={pageSizeHandler}
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
        pageType={AdminPageContentEnum.ROLEPLAYINGGAMES}
        onCloseModal={closeModalHandler}
        onOpenModal={openModalHandler}
        modalDisplayed={isModalDisplayed}
        isDataReturned={isDataReturned}
        dataFromDB={rpgData}
        headers={rolePlayingGameHeaders}
        onRowSelect={rowSelectedHandler}
        onDelete={deleteDataHanlder}
        onUpdate={updateDataHandler}
        onCreate={addDataHandler}
        onPageNumberChange={pageNumberHandler}
        onPageSizeChange={pageSizeHandler}
      />
    );
  };

  const getEditionsPageContent = () => {
    return (
      <AdminContent
        title={
          adminPages.get(AdminPageContentEnum.EDITIONS)?.title ??
          'Missing Title'
        }
        pageInfo={pageInfo ?? undefined}
        pageType={AdminPageContentEnum.EDITIONS}
        onCloseModal={closeModalHandler}
        onOpenModal={openModalHandler}
        modalDisplayed={isModalDisplayed}
        isDataReturned={isDataReturned}
        dataFromDB={editionData}
        headers={editionHeaders}
        onRowSelect={rowSelectedHandler}
        onDelete={deleteDataHanlder}
        onUpdate={updateDataHandler}
        onCreate={addDataHandler}
        onPageNumberChange={pageNumberHandler}
        onPageSizeChange={pageSizeHandler}
      />
    );
  };

  const getCollectionsPageContent = () => {
    return (
      <AdminContent
        title={
          adminPages.get(AdminPageContentEnum.COLLECTIONS)?.title ??
          'Missing Title'
        }
        pageInfo={pageInfo ?? undefined}
        pageType={AdminPageContentEnum.COLLECTIONS}
        onCloseModal={closeModalHandler}
        onOpenModal={openModalHandler}
        modalDisplayed={isModalDisplayed}
        isDataReturned={isDataReturned}
        dataFromDB={collectionData}
        headers={collectionHeaders}
        onRowSelect={rowSelectedHandler}
        onDelete={deleteDataHanlder}
        onUpdate={updateDataHandler}
        onCreate={addDataHandler}
        onPageNumberChange={pageNumberHandler}
        onPageSizeChange={pageSizeHandler}
      />
    );
  };

  const getAuthorsPageContent = () => {
    return (
      <AdminContent
        title={
          adminPages.get(AdminPageContentEnum.AUTHORS)?.title ?? 'Missing Title'
        }
        pageInfo={pageInfo ?? undefined}
        pageType={AdminPageContentEnum.AUTHORS}
        onCloseModal={closeModalHandler}
        onOpenModal={openModalHandler}
        modalDisplayed={isModalDisplayed}
        isDataReturned={isDataReturned}
        dataFromDB={authorData}
        headers={authorHeaders}
        onRowSelect={rowSelectedHandler}
        onDelete={deleteDataHanlder}
        onUpdate={updateDataHandler}
        onCreate={addDataHandler}
        onPageNumberChange={pageNumberHandler}
        onPageSizeChange={pageSizeHandler}
      />
    );
  };

  const getBooksPageContent = () => {
    return (
      <AdminContent
        title={
          adminPages.get(AdminPageContentEnum.BOOKS)?.title ?? 'Missing Title'
        }
        pageInfo={pageInfo ?? undefined}
        pageType={AdminPageContentEnum.BOOKS}
        onCloseModal={closeModalHandler}
        onOpenModal={openModalHandler}
        modalDisplayed={isModalDisplayed}
        isDataReturned={isDataReturned}
        dataFromDB={bookData}
        headers={bookHeaders}
        onRowSelect={rowSelectedHandler}
        onDelete={deleteDataHanlder}
        onUpdate={updateDataHandler}
        onCreate={addDataHandler}
        onPageNumberChange={pageNumberHandler}
        onPageSizeChange={pageSizeHandler}
      />
    );
  };

  const getAdventuresPageContent = () => {
    return (
      <AdminContent
        title={
          adminPages.get(AdminPageContentEnum.ADVENTURES)?.title ??
          'Missing Title'
        }
        pageInfo={pageInfo ?? undefined}
        pageType={AdminPageContentEnum.ADVENTURES}
        onCloseModal={closeModalHandler}
        onOpenModal={openModalHandler}
        modalDisplayed={isModalDisplayed}
        isDataReturned={isDataReturned}
        dataFromDB={rpgData}
        headers={rolePlayingGameHeaders}
        onRowSelect={rowSelectedHandler}
        onDelete={deleteDataHanlder}
        onUpdate={updateDataHandler}
        onCreate={addDataHandler}
        onPageNumberChange={pageNumberHandler}
        onPageSizeChange={pageSizeHandler}
      />
    );
  };

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
