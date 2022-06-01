/* eslint-disable react/jsx-key */
import { useState, useEffect, useMemo } from 'react';
import Section from '../components/layout/Section';
import SideNavBar from '../components/layout/SideNavBar';
import useAxios from '../hooks/useAxios';
import { toEntries } from '../types/functions';
import PublisherForm from '../components/forms/PublisherForm';
import Button from '../components/ui/Button';
import Modal from '../components/ui/Modal';
import { Publisher } from '../types/domain';
import Loader from '../components/ui/Loader';
import { Column, useSortBy, useTable } from 'react-table';
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/outline';

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
  const [modalDisplayed, setModalDisplayed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [publisherData, setPublisherData] = useState<Publisher[]>([]);
  const axiosInstance = useAxios();

  const columns: Column<{
    uuid?: string;
    name?: string;
    description?: string;
    websiteUrl?: string;
    logo?: string;
  }>[] = useMemo(
    () => [
      {
        Header: 'Uuid',
        accessor: 'uuid', // accessor is the "key" in the data
      },
      {
        Header: 'Name',
        accessor: 'name',
      },
      {
        Header: 'Description',
        accessor: 'description',
      },
      {
        Header: 'Website url',
        accessor: 'websiteUrl',
      },
      {
        Header: 'Logo url',
        accessor: 'logo',
      },
    ],
    []
  );

  const data = useMemo((): Publisher[] => [...publisherData], []);

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data }, useSortBy);

  useEffect(() => {
    !!axiosInstance.current &&
      axiosInstance.current
        .get(`${pageContent.url}`)
        .then((response) => {
          if (response.data.length == 0) {
            console.log('no data');
            setDataReturned(false);
          } else {
            setDataReturned(true);
            setPublisherData(response.data.data);
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

  const onAddPublisher = (newPublisher: Publisher) => {
    setModalDisplayed(false);
    setIsLoading(true);
    console.log(JSON.stringify(newPublisher));
    !!axiosInstance.current &&
      axiosInstance.current
        .post(items[0].url, newPublisher)
        .then((response) => console.log(response))
        .catch((error) => {
          console.log(error);
          console.log(error.response.data);
        })
        .finally(() => setIsLoading(false));
  };

  const openModalHandler = () => {
    setModalDisplayed(true);
  };
  const closeModalHandler = () => {
    setModalDisplayed(false);
  };

  return (
    <div className="grid grid-cols-5 h-full">
      {isLoading && <Loader />}
      {!isLoading && (
        <>
          <SideNavBar items={items} onClick={onNavItemClick} />
          <Section className="col-span-4 py-6 px-10 mb-14">
            <div className="flex flex-row items-center justify-between">
              <div className="flex items-center">
                <div className="w-5 h-5 bg-cyan-400"></div>
                <h1 className="text-white text-3xl font-semibold block pl-5">
                  {pageContent.value}
                </h1>
              </div>
              <Button
                value={`new ${pageContent.value.toLowerCase()}`}
                className="w-64"
                onClick={openModalHandler}
                style="plain"
                color="accent"
              />
            </div>
            {modalDisplayed && (
              <Modal onClose={closeModalHandler}>
                <PublisherForm
                  onConfirm={onAddPublisher}
                  onCancel={closeModalHandler}
                />
              </Modal>
            )}

            {!dataReturned && (
              <p className="text-center mt-20 text-xl italic">
                No {pageContent.value.toLowerCase()} found!{' '}
              </p>
            )}
            {dataReturned && publisherData.length > 0 && (
              <table
                {...getTableProps()}
                className="w-full shadow-lg rounded mt-10"
              >
                <thead className="border-white border-solid bg-slate-800">
                  {headerGroups.map((headerGroup) => (
                    <tr {...headerGroup.getHeaderGroupProps()}>
                      {headerGroup.headers.map((column) => (
                        <th
                          {...column.getHeaderProps(
                            column.getSortByToggleProps()
                          )}
                          className="p-4 text-left font-bold"
                        >
                          {column.render('Header')}
                          <span>
                            {column.isSorted ? (
                              column.isSortedDesc ? (
                                <ChevronDownIcon className="ml-4 w-4 inline-block" />
                              ) : (
                                <ChevronUpIcon className="ml-4 w-4 inline-block" />
                              )
                            ) : (
                              ''
                            )}
                          </span>
                        </th>
                      ))}
                    </tr>
                  ))}
                </thead>
                <tbody
                  {...getTableBodyProps()}
                  className="border-white border-solid"
                >
                  {rows.map((row, i) => {
                    prepareRow(row);
                    return (
                      <tr
                        {...row.getRowProps()}
                        className="border-white border-solid"
                      >
                        {row.cells.map((cell) => {
                          return (
                            <td
                              {...cell.getCellProps()}
                              className={`${
                                i % 2 === 0 ? 'bg-slate-700' : ''
                              } px-4`}
                            >
                              {cell.render('Cell')}
                            </td>
                          );
                        })}
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            )}
          </Section>
        </>
      )}
    </div>
  );
};

export default Admin;
