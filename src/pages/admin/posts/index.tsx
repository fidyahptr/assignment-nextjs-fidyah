import { useEffect, useState } from "react";
import useFetch from "@/hooks/useFetch";
import { IPosts } from "@/interface";
import Link from "next/link";
import AdminLayout from "@/components/layout/adminLayout";
import Modal from "@/components/modal";
import { toast } from "sonner";
import { formatDate, truncateDescription } from "@/utils";
import Pagination from "@/components/pagination";

const Posts = (): JSX.Element => {
  const {
    data: postsData,
    totalData,
    fetchData: fetchDataPosts,
  } = useFetch<IPosts[]>();
  const { data: deleteData, fetchData: fetchDeletePosts } =
    useFetch<IPosts[]>();
  const [selectedProduct, setSelectedProduct] = useState<IPosts>();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchName, setSearchName] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [sorting, setSorting] = useState("desc");
  const [type, setType] = useState<boolean | null>(null);
  const [totalRow, setTotalRow] = useState<number | null>(null);
  const itemsPerPage = 6;

  useEffect(() => {
    if (totalData) {
      setTotalRow(Math.ceil(totalData / itemsPerPage));
    }
    if (searchName !== "") {
      setCurrentPage(1);
      fetchDataPosts(
        `posts?title_like=${searchName}&_page=${currentPage}&_limit=${itemsPerPage}`,
        {
          method: "get",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    } else {
      fetchDataPosts(
        `posts?_sort=createdAt&_order=${sorting}&_page=${currentPage}&_limit=${itemsPerPage}${
          type !== null ? `&isPremium=${type}` : ""
        }`,
        {
          method: "get",
        }
      );
    }
  }, [searchName, deleteData, sorting, currentPage, type]);

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleDelete = async (id: number | undefined) => {
    await fetchDeletePosts(`posts/${id}`, {
      method: "delete",
    });

    setIsModalOpen(false);
    toast.success("Data has been deleted", {
      duration: 2000,
    });
  };

  return (
    <AdminLayout>
      <h3 className="font-bold text-3xl">News Lists</h3>

      <div className="relative overflow-x-auto mt-8">
        <div className="flex flex-column sm:flex-row flex-wrap space-y-4 sm:space-y-0 items-center justify-between mb-4">
          <Link href={"posts/add"}>
            <button
              type="button"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
            >
              <i className="fa-solid fa-plus mr-2"></i>
              Create news
            </button>
          </Link>

          <div className="flex items-center gap-4">
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
                className="dropdown-content z-[2] menu shadow bg-base-100 rounded-box"
              >
                <li>
                  <a
                    onClick={() => {
                      setType(null);
                      setCurrentPage(1);
                    }}
                  >
                    All
                  </a>
                </li>
                <li>
                  <a
                    onClick={() => {
                      setType(false);
                      setCurrentPage(1);
                    }}
                  >
                    Free
                  </a>
                </li>
                <li>
                  <a
                    onClick={() => {
                      setType(true);
                      setCurrentPage(1);
                    }}
                  >
                    Premium
                  </a>
                </li>
              </ul>
            </div>
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
        </div>
        <div className="relative overflow-x-auto border border-gray-200 shadow-md sm:rounded-lg mt-6">
          <table className="w-full text-left text-gray-600 dark:text-gray-400">
            <thead className=" text-gray-700 bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-4"></th>
                <th scope="col" className="px-6 py-4">
                  Title
                </th>
                <th scope="col" className="px-6 py-4">
                  Descriptions
                </th>
                <th scope="col" className="px-6 py-4">
                  Type
                </th>
                <th scope="col" className="px-6 py-4">
                  Date
                </th>
                <th scope="col" className="px-6 py-4">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="text-sm">
              {postsData &&
                postsData.map((val, i) => {
                  return (
                    <tr
                      key={i}
                      className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700"
                    >
                      <td scope="row" className="p-3 ">
                        <img
                          src={val.picture}
                          alt=""
                          width={150}
                          height={100}
                        />
                      </td>
                      <td className="px-6 py-3">{val.title}</td>
                      <td className="px-6 py-3">
                        {truncateDescription(val.desc)}
                      </td>
                      <td className="px-6 py-3">
                        {val.isPremium ? "Premium" : "Free"}
                      </td>
                      <td className="px-6 py-3">
                        {val.updatedAt ? formatDate(val.updatedAt) : "-"}
                      </td>
                      <td className="px-6 py-3 flex gap-1">
                        <Link
                          href={`posts/${val.id}/edit`}
                          className=" text-sm text-white rounded-lg bg-green-600 hover:bg-green-700 px-3 py-1.5"
                        >
                          Edit
                        </Link>
                        <Link
                          href={`posts/${val.id}`}
                          className=" text-sm text-white rounded-lg bg-blue-600 hover:bg-blue-700 px-3 py-1.5"
                        >
                          Detail
                        </Link>
                        <button
                          className=" text-white text-sm bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 rounded-lg px-3 py-1.5"
                          type="button"
                          onClick={() => {
                            setIsModalOpen(true);
                            setSelectedProduct(val);
                          }}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>

        {postsData && postsData.length > 0 && totalData && (
          <Pagination
            data={postsData}
            totalData={totalData}
            totalRow={totalRow}
            itemsPerPage={itemsPerPage}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
        )}

        <Modal
          isOpen={isModalOpen}
          onClose={closeModal}
          name={selectedProduct?.title}
          handleDelete={() => handleDelete(selectedProduct?.id)}
        />
      </div>
    </AdminLayout>
  );
};

export default Posts;
