import { useEffect, useState } from "react";
import useFetch from "@/hooks/useFetch";
import AdminLayout from "@/components/layout/adminLayout";
import {
  convertRp,
  formatDate,
  getOneMonthDate,
  getOneYearDate,
} from "@/utils";
import { ITansactions, IUsers } from "@/interface";
import Pagination from "@/components/pagination";

const TransactionLists = (): JSX.Element => {
  const { data, totalData, fetchData } = useFetch<ITansactions[]>();
  const { data: dataActionUser, fetchData: fetchActionUser } =
    useFetch<IUsers>();
  const { data: dataActionTransaction, fetchData: fetchActionTransaction } =
    useFetch<ITansactions>();
  const [sorting, setSorting] = useState("desc");
  const [searchEmail, setSearchEmail] = useState("");
  const [status, setStatus] = useState<string | null>(null);
  const [type, setType] = useState<number | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalRow, setTotalRow] = useState<number | null>(null);
  const itemsPerPage = 8;

  useEffect(() => {
    if (totalData) {
      setTotalRow(Math.ceil(totalData / itemsPerPage));
    }
    if (searchEmail !== "") {
      fetchData(
        `transactions?email_like=${searchEmail}&_page=1&_limit=${itemsPerPage}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    } else {
      fetchData(
        `transactions?_sort=createdAt&_order=${sorting}&_page=${currentPage}&_limit=${itemsPerPage}${
          status !== null ? `&status=${status}` : ""
        }${type !== null ? `&type=${type}` : ""}`,
        {
          method: "GET",
        }
      );
    }
    console.log(
      `transactions?_page=${currentPage}&_limit=${itemsPerPage}${
        status !== null && `&status=${status}`
      }${type !== null && `&type=${type}`}`
    );
  }, [
    searchEmail,
    sorting,
    status,
    type,
    totalData,
    currentPage,
    dataActionTransaction,
    dataActionUser,
  ]);

  const confirmTransaction = async (
    id: number,
    userId: number,
    type: number
  ) => {
    await fetchActionTransaction(`transactions/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        status: "completed",
        updatedAt: new Date().toLocaleDateString(),
      }),
    });

    const expiredDate = type === 1 ? getOneMonthDate() : getOneYearDate();
    await fetchActionUser(`users/${userId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        isSubscription: true,
        expiredSubs: expiredDate,
      }),
    });
  };

  const cancelTransaction = (id: number) => {
    fetchActionTransaction(`transactions/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        status: "canceled",
        updatedAt: new Date().toLocaleDateString(),
      }),
    });
  };

  return (
    <AdminLayout>
      <h3 className="font-bold text-3xl">Transaction Lists</h3>
      <div className="flex flex-column sm:flex-row flex-wrap space-y-4 sm:space-y-0 items-center justify-between mt-8">
        <div>
          <label htmlFor="table-search" className="sr-only">
            Search
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 rtl:inset-r-0 rtl:right-0 flex items-center ps-3 pointer-events-none">
              <svg
                className="w-5 h-5 text-gray-500 dark:text-gray-400"
                aria-hidden="true"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <input
              type="text"
              id="table-search"
              className="block p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Search by email.."
              onChange={(e) => {
                setSearchEmail(e.target.value);
                setCurrentPage(1);
              }}
            />
          </div>
        </div>

        <div className="flex gap-2 items-center">
          <div className="dropdown">
            <div
              tabIndex={0}
              role="button"
              className="btn h-fit min-h-fit px-3 py-2.5"
            >
              Sort date by
              <i className="fa-solid fa-angle-down"></i>
            </div>
            <ul
              tabIndex={0}
              className="dropdown-content z-[1] menu shadow bg-base-100 rounded-box"
            >
              <li>
                <a
                  onClick={() => {
                    setSorting("asc");
                    setCurrentPage(1);
                  }}
                >
                  Asc
                </a>
              </li>
              <li>
                <a
                  onClick={() => {
                    setSorting("desc");
                    setCurrentPage(1);
                  }}
                >
                  Desc
                </a>
              </li>
            </ul>
          </div>
          <div className=" text-sm font-medium to-slate-900">Filter by: </div>
          <div className="dropdown">
            <div
              tabIndex={0}
              role="button"
              className="btn h-fit min-h-fit px-4 py-2.5"
            >
              Status
              <i className="fa-solid fa-angle-down"></i>
            </div>
            <ul
              tabIndex={0}
              className="dropdown-content z-[1] menu shadow bg-base-100 rounded-box"
            >
              <li>
                <a
                  onClick={() => {
                    setCurrentPage(1);
                    setStatus(null);
                  }}
                >
                  All
                </a>
              </li>
              <li>
                <a
                  onClick={() => {
                    setCurrentPage(1);
                    setStatus("processed");
                  }}
                >
                  Processed
                </a>
              </li>
              <li>
                <a
                  onClick={() => {
                    setCurrentPage(1);
                    setStatus("completed");
                  }}
                >
                  Completed
                </a>
              </li>
              <li>
                <a
                  onClick={() => {
                    setCurrentPage(1);
                    setStatus("canceled");
                  }}
                >
                  Canceled
                </a>
              </li>
            </ul>
          </div>
          <div className="dropdown">
            <div
              tabIndex={0}
              role="button"
              className="btn h-fit min-h-fit px-4 py-2.5"
            >
              Type
              <i className="fa-solid fa-angle-down"></i>
            </div>
            <ul
              tabIndex={0}
              className="dropdown-content z-[1] menu shadow bg-base-100 rounded-box"
            >
              <li>
                <a
                  onClick={() => {
                    setCurrentPage(1);
                    setType(null);
                  }}
                >
                  All
                </a>
              </li>
              <li>
                <a
                  onClick={() => {
                    setCurrentPage(1);
                    setType(1);
                  }}
                >
                  Monthly
                </a>
              </li>
              <li>
                <a
                  onClick={() => {
                    setType(2);
                    setCurrentPage(1);
                  }}
                >
                  Yearly
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="relative overflow-x-auto border border-gray-200 shadow-md sm:rounded-lg mt-6">
        <table className="w-full text-left text-gray-600 dark:text-gray-400">
          <thead className="text-sm text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-4">
                Id
              </th>
              <th scope="col" className="px-6 py-4">
                User&apos;s Email
              </th>
              <th scope="col" className="px-6 py-4">
                Type
              </th>
              <th scope="col" className="px-6 py-4">
                Price
              </th>
              <th scope="col" className="px-6 py-4">
                Status
              </th>
              <th scope="col" className="px-6 py-4">
                Date
              </th>
              <th scope="col" className="px-6 py-4">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {data && data.length > 0 ? (
              data.map((val, i) => {
                return (
                  <tr
                    key={`transaction-${i}`}
                    className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700"
                  >
                    <td className="px-6 py-2">{val.id}</td>
                    <td className="px-6 py-2">{val.email}</td>
                    <td className="px-6 py-2">
                      {val.type === 1 ? "Monthly" : "Yearly"} Subs
                    </td>
                    <td className="px-6 py-2">{convertRp(val.price)}</td>
                    <td className="px-6 py-2">{val.status}</td>
                    <td className="px-6 py-2">{formatDate(val.createdAt)}</td>
                    <td className="px-6 py-2">
                      <button
                        type="button"
                        onClick={() =>
                          confirmTransaction(val.id, val.userId, val.type)
                        }
                        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2  disabled:bg-slate-300 disabled:text-slate-500 disabled:border-slate-200 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                        disabled={val.status !== "processed"}
                      >
                        Confirm
                      </button>
                      <button
                        type="button"
                        onClick={() => cancelTransaction(val.id)}
                        className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 disabled:bg-slate-300 disabled:text-slate-500 disabled:border-slate-200 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
                        disabled={val.status !== "processed"}
                      >
                        Cancel
                      </button>
                    </td>
                  </tr>
                );
              })
            ) : (
              <div>No Data</div>
            )}
          </tbody>
        </table>
        {data && data?.length > 0 && totalData && (
          <Pagination
            data={data}
            totalData={totalData}
            totalRow={totalRow}
            itemsPerPage={itemsPerPage}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
        )}
      </div>
    </AdminLayout>
  );
};

export default TransactionLists;
