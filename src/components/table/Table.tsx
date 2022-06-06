/* eslint-disable react/display-name */
/* eslint-disable react/jsx-key */
import {
  ChevronDownIcon,
  ChevronUpIcon,
  PencilAltIcon,
  TrashIcon,
} from '@heroicons/react/outline';
import { useEffect, useMemo } from 'react';
import {
  useTable,
  useSortBy,
  Column,
  usePagination,
  useRowSelect,
  useBlockLayout,
  useResizeColumns,
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
  onEdit: (data: object) => void;
  onPageNumberChange: (pageNumber: number) => void;
  onPageSizeChange: (pageSize: number) => void;
};

const Table: React.FC<TableProps> = ({
  data,
  columns,
  pageInfo,
  onRowSelect,
  onDelete,
  onEdit,
  onPageNumberChange,
  onPageSizeChange,
}) => {
  const defaultColumn = useMemo(
    () => ({
      minWidth: 30,
      width: 100,
      maxWidth: 400,
    }),
    []
  );

  const instance = useTable(
    {
      columns,
      data,
      defaultColumn,
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
    useBlockLayout,
    useResizeColumns,
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
          width: 50,
        },
        {
          id: 'edit',
          Header: () => <div>Edit</div>,
          Cell: (table) => (
            <PencilAltIcon
              className="w-5 hover:text-violet-500 cursor-pointer"
              onClick={() => editDataHandler(table.data[table.row.id])}
            />
          ),
          width: 60,
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
    allColumns,
    getToggleHideAllColumnsProps,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    selectedFlatRows,
    resetResizing,
    state: { pageIndex, pageSize },
  } = instance;

  const editDataHandler = (data: object) => {
    onEdit(data);
  };

  useEffect(() => {
    const selectedPublishesUuids = selectedFlatRows
      .map((selectedFlatRow) => selectedFlatRow.original as Publisher)
      .map((publisher) => publisher.uuid);

    onRowSelect(selectedPublishesUuids);
  }, [selectedFlatRows]);

  useEffect(() => {
    onPageNumberChange(pageIndex);
  }, [pageIndex]);

  useEffect(() => {
    onPageSizeChange(pageSize);
  }, [pageSize]);

  return (
    <>
      <div className="flex mb-4 border-y border-y-violet-500 py-4 mt-10 ">
        <div className="mr-4 text-sm">
          <IndeterminateCheckbox
            name="togglecolumns"
            {...getToggleHideAllColumnsProps()}
          />{' '}
          Toggle All
        </div>
        {allColumns
          .filter((column) => column.id !== 'selection' && column.id !== 'edit')
          .map((column) => {
            console.log(column);
            return (
              <div key={column.id} className="mr-4 text-sm">
                <label>
                  <input type="checkbox" {...column.getToggleHiddenProps()} />{' '}
                  {column.id}
                </label>
              </div>
            );
          })}
        <br />
      </div>
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
        <button onClick={resetResizing} className="ml-4 hover:text-red-500">
          reset resizing
        </button>
      </div>
      <div className="overflow-x-auto">
        <table {...getTableProps()} className="w-full shadow-lg rounded">
          <thead className="border-white border-solid bg-slate-800">
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <div
                    {...column.getHeaderProps(column.getSortByToggleProps())}
                    className="p-4 text-left font-bold th"
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
                    <div
                      {...column.getResizerProps()}
                      className={`inline-block bg-slate-900 w-1 h-full absolute right-0 top-0 translate-x-1/2 z-10 touch-none ${
                        column.isResizing ? 'bg-red-500' : ''
                      }`}
                    />
                  </div>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()} className="border-white border-solid">
            {page.map((row, i) => {
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
      </div>
      <div className="flex items-center align-top mt-4">
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
        <button onClick={resetResizing} className="ml-4 hover:text-red-500">
          reset resizing
        </button>
      </div>
    </>
  );
};

export default Table;
