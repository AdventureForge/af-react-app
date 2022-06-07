/* eslint-disable @typescript-eslint/no-unused-vars */
import { useCallback, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import SideNavBar from '../components/layout/SideNavBar';
import Loader from '../components/ui/Loader';
import UserPageContent from '../components/user/UserPageContent';
import useAxios from '../hooks/useAxios';
import { BaseEntity, PageInfo } from '../types/domain';
import { adventureHeaders, campaignHeaders } from '../types/table-headers';
import { PageContent } from '../types/various';

export enum UserPageContentEnum {
  CAMPAIGNS = 'campaigns',
  ADVENTURES = 'adventures',
}

export const userPages: Map<string, PageContent> = new Map();
userPages.set('campaigns', {
  title: 'Campaigns',
  page: 'campaigns',
  url: 'adventures/campaigns',
} as PageContent);
userPages.set('adventures', {
  title: 'Adventures',
  page: 'adventures',
  url: 'adventures/adventures',
} as PageContent);

const UserSpace = () => {
  const [isDataReturned, setDataReturned] = useState(false);
  const [isModalDisplayed, setModalDisplayed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [pageInfo, setPageInfo] = useState<PageInfo | null>(null);
  const [pageNumber, setPageNumber] = useState(0);
  const [pageSize, setPageSize] = useState(20);
  const [rowsSelected, setRowsSelected] = useState<(string | undefined)[]>([]);
  const [campaignData, setCampaignData] = useState([]);
  const [adventureData, setAdventureData] = useState([]);
  const axiosInstance = useAxios();
  const { userSubPage } = useParams();
  const navigate = useNavigate();
  const apiUrl =
    userPages.get(userSubPage ?? UserPageContentEnum.CAMPAIGNS)?.url ?? '';

  useEffect(() => {
    setIsLoading(true);
    fetchData();
  }, [userSubPage, pageNumber, pageSize]);

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

            userSubPage === UserPageContentEnum.CAMPAIGNS &&
              setCampaignData((_) => response.data.data);

            userSubPage === UserPageContentEnum.ADVENTURES &&
              setAdventureData((_) => response.data.data);

            setPageInfo(response.data.pageInfo);
          }
        })
        .catch((error) => {
          console.log(error.response.data);
        })
        .finally(() => {
          setIsLoading(false);
        }),
    [userSubPage, pageNumber, pageSize]
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
    switch (userSubPage) {
      case UserPageContentEnum.CAMPAIGNS:
        return getCampaignPageContent();
      case UserPageContentEnum.ADVENTURES:
        return getAdventurePageContent();

      default:
        navigate('/user/campaigns');
        break;
    }
  };

  const getCampaignPageContent = () => {
    return (
      <UserPageContent
        title={
          userPages.get(UserPageContentEnum.CAMPAIGNS)?.title ?? 'Missing Title'
        }
        pageInfo={pageInfo ?? undefined}
        pageType={UserPageContentEnum.CAMPAIGNS}
        onCloseModal={closeModalHandler}
        onOpenModal={openModalHandler}
        modalDisplayed={isModalDisplayed}
        isDataReturned={isDataReturned}
        dataFromDB={campaignData}
        headers={campaignHeaders}
        onRowSelect={rowSelectedHandler}
        onDelete={deleteDataHanlder}
        onUpdate={updateDataHandler}
        onCreate={addDataHandler}
        onPageNumberChange={pageNumberHandler}
        onPageSizeChange={pageSizeHandler}
      />
    );
  };
  const getAdventurePageContent = () => {
    return (
      <UserPageContent
        title={
          userPages.get(UserPageContentEnum.ADVENTURES)?.title ??
          'Missing Title'
        }
        pageInfo={pageInfo ?? undefined}
        pageType={UserPageContentEnum.ADVENTURES}
        onCloseModal={closeModalHandler}
        onOpenModal={openModalHandler}
        modalDisplayed={isModalDisplayed}
        isDataReturned={isDataReturned}
        dataFromDB={adventureData}
        headers={adventureHeaders}
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
      {!isLoading && (campaignData || adventureData) && (
        <>
          <SideNavBar items={userPages} />
          {renderPage()}
        </>
      )}
    </div>
  );
};

export default UserSpace;
