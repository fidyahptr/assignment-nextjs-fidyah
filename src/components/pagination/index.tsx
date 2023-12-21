import { IPosts, ITansactions, IUsers } from "@/interface";

interface IPagination {
  data: IPosts[] | IUsers[] | ITansactions[];
  totalData: number;
  totalRow: number | null;
  currentPage: number;
  itemsPerPage: number;
  setCurrentPage: React.Dispatch<number>;
}

const Pagination = ({
  data,
  totalData,
  totalRow,
  currentPage,
  itemsPerPage,
  setCurrentPage,
}: IPagination): JSX.Element => {
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-3 md:space-y-0 p-4">
      <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
        Showing
        <span className="font-semibold text-gray-900 mx-1 dark:text-white">
          {indexOfFirstItem + 1} - {data!.length + indexOfFirstItem}
        </span>
        of
        <span className="font-semibold text-gray-900 ml-1 dark:text-white">
          {" "}
          {totalData && totalData}
        </span>
      </span>

      <ul className="inline-flex items-stretch -space-x-px">
        <li>
          <button
            onClick={() => setCurrentPage(currentPage - 1)}
            disabled={currentPage === 1}
            className="flex items-center justify-center h-full py-1.5 px-3 ml-0 text-gray-500 bg-white rounded-l-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 disabled:bg-slate-200"
          >
            <svg
              className="w-5 h-5"
              aria-hidden="true"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </li>

        <li>
          <button
            onClick={() => setCurrentPage(currentPage + 1)}
            disabled={currentPage === totalRow}
            className="flex items-center justify-center h-full py-1.5 px-3 leading-tight text-gray-500 bg-white rounded-r-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 disabled:bg-slate-200"
          >
            <svg
              className="w-5 h-5"
              aria-hidden="true"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </li>
      </ul>
    </div>
  );
};

export default Pagination;
