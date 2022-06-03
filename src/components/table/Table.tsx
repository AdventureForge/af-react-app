/* eslint-disable react/jsx-key */
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/outline';
import { useTable, useSortBy, Column, usePagination } from 'react-table';
import { PageInfo } from '../../types/domain';
import TablePagination from './TablePagination';

type Props = {
  data: object[];
  columns: Column<object>[];
  pageInfo: PageInfo;
};

const Table: React.FC<Props> = ({ data, columns, pageInfo }) => {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,

    state: { pageIndex, pageSize },
  } = useTable(
    {
      columns,
      data,
      manualPagination: true,
      pageCount: pageInfo.totalPages,
      initialState: {
        pageIndex: pageInfo.pageNumber,
        pageSize: pageInfo.pageSize,
      },
    },
    useSortBy,
    usePagination
  );

  return (
    <div className="mt-10">
      <TablePagination
        canNextPage={canNextPage}
        canPreviousPage={canPreviousPage}
        gotoPage={gotoPage}
        nextPage={nextPage}
        pageCount={pageCount}
        pageIndex={pageIndex}
        pageOptions={pageOptions}
        pageSize={pageSize}
        previousPage={previousPage}
        setPageSize={setPageSize}
        className="mb-4"
      />
      <table {...getTableProps()} className="w-full shadow-lg rounded">
        <thead className="border-white border-solid bg-slate-800">
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th
                  {...column.getHeaderProps(column.getSortByToggleProps())}
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
        <tbody {...getTableBodyProps()} className="border-white border-solid">
          {page.map((row, i) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()} className="border-white border-solid">
                {row.cells.map((cell) => {
                  return (
                    <td
                      {...cell.getCellProps()}
                      className={`${i % 2 === 0 ? 'bg-slate-700' : ''} px-4`}
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
      <TablePagination
        canNextPage={canNextPage}
        canPreviousPage={canPreviousPage}
        gotoPage={gotoPage}
        nextPage={nextPage}
        pageCount={pageCount}
        pageIndex={pageIndex}
        pageOptions={pageOptions}
        pageSize={pageSize}
        previousPage={previousPage}
        setPageSize={setPageSize}
        className="mt-4"
      />
    </div>
  );
};

export default Table;
