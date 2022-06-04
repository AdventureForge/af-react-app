import {
  ChevronDoubleLeftIcon,
  ChevronDoubleRightIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from '@heroicons/react/outline';

type TablePaginationProps = {
  gotoPage: (n: number) => void;
  previousPage: () => void;
  nextPage: () => void;
  canPreviousPage: boolean;
  canNextPage: boolean;
  pageCount: number;
  pageIndex: number;
  pageOptions: number[];
  pageSize: number;
  setPageSize: (n: number) => void;
  className?: string;
};

const TablePagination: React.FC<TablePaginationProps> = ({
  gotoPage,
  canPreviousPage,
  previousPage,
  nextPage,
  canNextPage,
  pageCount,
  pageIndex,
  pageOptions,
  pageSize,
  setPageSize,
  className,
}) => {
  return (
    <div className={`pagination flex justify-start ${className}`}>
      <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
        {
          <ChevronDoubleLeftIcon className="w-4 hover:w-5 cursor-pointer hover:text-violet-400" />
        }
      </button>{' '}
      <button onClick={() => previousPage()} disabled={!canPreviousPage}>
        {
          <ChevronLeftIcon className="w-4 hover:w-5 cursor-pointer hover:text-violet-400" />
        }
      </button>{' '}
      <button onClick={() => nextPage()} disabled={!canNextPage}>
        {
          <ChevronRightIcon className="w-4 hover:w-5 cursor-pointer hover:text-violet-400" />
        }
      </button>{' '}
      <button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
        {
          <ChevronDoubleRightIcon className="w-4 hover:w-5 cursor-pointer hover:text-violet-400" />
        }
      </button>{' '}
      <span className="ml-4">
        page{' '}
        <strong>
          {pageIndex + 1} of {pageOptions.length}
        </strong>{' '}
      </span>
      <span className="mx-4">|</span>
      <span>
        go to{' '}
        <select
          value={pageIndex}
          onChange={(e) => {
            gotoPage(Number(e.target.value));
          }}
          className="inline-block bg-slate-900 border-solid rounded-full border-violet-500 text-violet-500"
        >
          {Array.from(Array(pageCount).keys()).map((i) => (
            <option key={i} value={i} className="bg-slate-900">
              page {i + 1}
            </option>
          ))}
        </select>
      </span>
      <span className="mx-4">|</span>
      <span>
        page{' '}
        <select
          value={pageSize}
          className="inline-block bg-slate-900 border-solid rounded-full border-violet-500 text-violet-500"
          onChange={(e) => {
            setPageSize(Number(e.target.value));
          }}
        >
          {[20, 30, 40, 100].map((pageSize) => (
            <option key={pageSize} value={pageSize} className="bg-slate-900">
              size {pageSize}
            </option>
          ))}
        </select>
      </span>
    </div>
  );
};

export default TablePagination;
