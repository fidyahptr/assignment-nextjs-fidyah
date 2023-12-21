import useFetch from "@/hooks/useFetch";
import { IUsers } from "@/interface";
import { useEffect, useState } from "react";
import AdminLayout from "@/components/layout/adminLayout";
import { formatDate } from "@/utils";
import Pagination from "@/components/pagination";

const Subscriptions = (): JSX.Element => {
  const { data, totalData, fetchData } = useFetch<IUsers[]>();
  const { data: deactiveData, fetchData: fetchDeactiveAcc } =
    useFetch<IUsers>();
  const [searchName, setSearchName] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [status, setStatus] = useState<boolean | null>(null);
  const [totalRow, setTotalRow] = useState<number | null>(null);
  const itemsPerPage = 8;

  useEffect(() => {
    if (totalData) {
      setTotalRow(Math.ceil(totalData / itemsPerPage));
    }

    if (searchName !== "") {
      fetchData(
        `users?name_like=${searchName}&_page=1&_limit=${itemsPerPage}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    } else {
      fetchData(
        `users?_page=${currentPage}&_limit=${itemsPerPage}${
          status !== null && `&isSubscription=${status}`
        }`,
        {
          method: "GET",
        }
      );
    }
  }, [searchName, status, totalData, deactiveData, currentPage]);

  const deactiveAccount = (id: number | undefined) => {
    if (id !== undefined) {
      fetchDeactiveAcc(`users/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          isSubscription: false,
        }),
      });
    }
  };

  return (
    <AdminLayout>
      <h3 className="font-bold text-3xl">Subscription Lists</h3>
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
              placeholder="Search by name.."
              onChange={(e) => {
                setCurrentPage(1);
                setSearchName(e.target.value);
              }}
            />
          </div>
        </div>

        <div className="flex gap-2 items-center">
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
                    setStatus(true);
                  }}
                >
                  Active
                </a>
              </li>
              <li>
                <a
                  onClick={() => {
                    setCurrentPage(1);
                    setStatus(false);
                  }}
                >
                  Deactive
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="relative overflow-x-auto border border-gray-200 shadow-md sm:rounded-lg mt-4">
        <table className="w-full text-left text-gray-600 dark:text-gray-400">
          <thead className="text-sm text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-4 py-4">
                Id
              </th>
              <th scope="col" className="px-4 py-4">
                Name
              </th>
              <th scope="col" className="px-4 py-4">
                email
              </th>
              <th scope="col" className="px-4 py-4">
                Status
              </th>
              <th scope="col" className="px-4 py-4">
                Expired Date
              </th>
              <th scope="col" className="px-4 py-4">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {data &&
              data?.length > 0 &&
              data.map((val, i) => {
                return (
                  <tr
                    key={`subs-${i}`}
                    className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700"
                  >
                    <td className="px-4 py-2">{val.id}</td>
                    <td className="px-4 py-2">{val.name}</td>
                    <td className="px-4 py-2">{val.email}</td>
                    <td className="px-4 py-2">
                      {val.isSubscription ? (
                        <div className="w-fit bg-emerald-100 text-emerald-800 text-sm font-medium me-2 px-2.5 py-0.5 rounded-full dark:bg-emerald-900 dark:text-emerald-300">
                          Active
                        </div>
                      ) : (
                        <div className="w-fit bg-red-100 text-red-800 text-sm font-medium me-2 px-2.5 py-0.5 rounded-full dark:bg-red-700 dark:text-red-300">
                          Deactive
                        </div>
                      )}
                    </td>
                    <td className="px-4 py-2">
                      {val.expiredSubs !== ""
                        ? formatDate(val.expiredSubs)
                        : "-"}
                    </td>
                    <td className="px-4 py-2">
                      <button
                        onClick={() => deactiveAccount(val.id)}
                        className="text-white bg-red-700 hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 disabled:bg-slate-300 disabled:text-slate-500 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
                        disabled={val.isSubscription === false}
                      >
                        Deactive account
                      </button>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
        {data && data?.length > 0 && data && totalData && (
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

export default Subscriptions;
