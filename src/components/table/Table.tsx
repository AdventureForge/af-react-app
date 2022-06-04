/* eslint-disable react/display-name */
/* eslint-disable react/jsx-key */
import {
  ChevronDownIcon,
  ChevronUpIcon,
  PencilAltIcon,
  TrashIcon,
} from '@heroicons/react/outline';
import { useEffect } from 'react';
import {
  useTable,
  useSortBy,
  Column,
  usePagination,
  useRowSelect,
} from 'react-table';
import { PageInfo, Publisher } from '../../types/domain';
import IndeterminateCheckbox from './IndeterminateCheckbox';
import TablePagination from './TablePagination';

type TableProps = {
  data: object[];
  columns: Column<object>[];
  pageInfo?: PageInfo;
  onRowSelect: (row: (string | undefined)[]) => void;
  onDelete: () => void;
};

const Table: React.FC<TableProps> = ({
  data,
  columns,
  pageInfo,
  onRowSelect,
  onDelete,
}) => {
  const instance = useTable(
    {
      columns,
      data,
      manualPagination: true,
      pageCount: pageInfo?.totalPages,
      initialState: {
        pageIndex: pageInfo?.pageNumber,
        pageSize: pageInfo?.pageSize,
      },
    },
    useSortBy,
    usePagination,
    useRowSelect,
    (hooks) => {
      hooks.visibleColumns.push((columns) => [
        {
          id: 'selection',
          Header: ({ getToggleAllPageRowsSelectedProps }) => (
            <div>
              <IndeterminateCheckbox
                name={'test'}
                {...getToggleAllPageRowsSelectedProps()}
              />
            </div>
          ),
          Cell: ({ row }) => (
            <div>
              <IndeterminateCheckbox
                name={'test2'}
                {...row.getToggleRowSelectedProps()}
              />
            </div>
          ),
        },
        {
          id: 'edit',
          Header: () => <div>Edit</div>,
          Cell: (table) => (
            <PencilAltIcon
              className="w-5 hover:text-violet-500 cursor-pointer"
              onClick={() => console.log(table.data[table.row.id])}
            />
          ),
        },
        ...columns,
      ]);
    }
  );

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
    selectedFlatRows,
    state: { pageIndex, pageSize },
  } = instance;

  useEffect(() => {
    const selectedPublishesUuids = selectedFlatRows
      .map((selectedFlatRow) => selectedFlatRow.original as Publisher)
      .map((publisher) => publisher.uuid);

    onRowSelect(selectedPublishesUuids);
  }, [selectedFlatRows]);

  return (
    <div className="mt-10">
      <div className="flex items-center align-top mb-4">
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
        />
        <TrashIcon
          className="w-6 ml-6 inline-block hover:text-red-400 cursor-pointer"
          onClick={onDelete}
        />
      </div>
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
