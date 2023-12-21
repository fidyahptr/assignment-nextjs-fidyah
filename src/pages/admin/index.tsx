import AdminLayout from "@/components/layout/adminLayout";
import useFetch from "@/hooks/useFetch";
import { IPosts, ITansactions, IUsers } from "@/interface";
import { truncateDescription } from "@/utils";
import Link from "next/link";
import { useEffect, useState } from "react";

const Admin = (): JSX.Element => {
  const { data: usersData, fetchData: fetchUsersData } = useFetch<IUsers[]>();
  const { data: postsData, fetchData: fetchPostsData } = useFetch<IPosts[]>();
  const { data: transactionsData, fetchData: fetchTransactionsData } =
    useFetch<ITansactions[]>();
  const [totalNews, setTotalNews] = useState(0);
  const [totalSubs, setTotalSubs] = useState(0);
  const [totalPendingTrans, setTotalPendingTrans] = useState(0);
  const [recentNews, setRecentNews] = useState<IPosts[] | null>(null);

  useEffect(() => {
    fetchUsersData("users", { method: "GET" });
    fetchPostsData("posts?_sort=createdAt&_order=desc", { method: "GET" });
    fetchTransactionsData("transactions", { method: "GET" });
  }, []);

  useEffect(() => {
    if (postsData) {
      setTotalNews(postsData?.length);
      const newData = postsData.slice(0, 3);
      setRecentNews(newData);
    }
    if (usersData) {
      const newData = usersData.filter((val) => val.isSubscription);
      setTotalSubs(newData.length);
    }
    if (transactionsData) {
      const newData = transactionsData.filter(
        (val) => val.status === "processed"
      );
      setTotalPendingTrans(newData.length);
    }
  }, [usersData, postsData, transactionsData]);

  return (
    <AdminLayout>
      <h2 className="font-bold text-4xl mb-6">Dashboard</h2>
      <hr className="h-px my-8 bg-gray-200 border-0 "></hr>
      <header>
        <div className="sm:flex sm:items-center sm:justify-between">
          <div className="text-center sm:text-left">
            <h1 className="text-lg font-medium text-gray-800 sm:text-2xl">
              Welcome Back, Admin!
            </h1>

            <p className="mt-1.5 text-xs md:text-base text-gray-500">
              Let&apos;s write a news! 🎉
            </p>
          </div>

          <div className="mt-4 flex flex-col gap-4 sm:mt-0 sm:flex-row sm:items-center">
            <Link
              className="block rounded-lg bg-blue-600 px-5 py-3 text-sm font-medium text-white transition hover:bg-blue-700 focus:outline-none focus:ring"
              href={`admin/posts/add`}
            >
              <i className="fa-solid fa-plus mr-2"></i>
              Create news
            </Link>
          </div>
        </div>
      </header>
      <section className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
        <div className="card border border-gray-200 bg-base-100 shadow-xl">
          <div className="card-body">
            <h3 className="card-title">Total Subscriptions</h3>
            <div className="font-bold text-5xl">{totalSubs}</div>
          </div>
        </div>
        <div className="card border border-gray-200 bg-base-100 shadow-xl">
          <div className="card-body">
            <h3 className="card-title">Total News</h3>
            <div className="font-bold text-5xl">{totalNews}</div>
          </div>
        </div>
        <div className="card border border-gray-200 bg-base-100 shadow-xl">
          <div className="card-body">
            <h3 className="card-title">Pending Transactions</h3>
            <div className="font-bold text-5xl">{totalPendingTrans}</div>
          </div>
        </div>
      </section>

      <h3 className="font-bold text-2xl mt-12">Recent News</h3>
      <section className="grid grid-cols-1 gap-4 mt-4">
        {recentNews &&
          recentNews.map((val, i) => {
            return (
              <div
                className="card border border-gray-200 bg-base-100 shadow-xl"
                key={i}
              >
                <div className="card-body flex-row gap-6">
                  <img src={val.picture} alt={val.title} width={100} />
                  <div>
                    <div className="card-title">{val.title}</div>
                    <div className="text-sm">
                      {truncateDescription(val.desc)}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
      </section>
    </AdminLayout>
  );
};

export default Admin;
