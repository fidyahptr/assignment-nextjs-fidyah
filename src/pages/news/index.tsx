import useFetch from "@/hooks/useFetch";
import { useEffect, useState } from "react";
import { GetServerSideProps } from "next";
import { IPosts } from "@/interface";
import Hero from "@/components/hero";
import UserLayout from "@/components/layout/userLayout";
import Trending from "@/components/trending";
import NewsLanding from "@/components/newsLanding";

interface ILanding {
  initialPosts: IPosts[];
  trendingNews: IPosts[];
}

const News = ({ initialPosts, trendingNews }: ILanding): JSX.Element => {
  const { data: postsData, fetchData: fetchDataPosts } = useFetch<IPosts[]>();
  const [categoryFilter, setCategoryFilter] = useState("");
  const [typeFilter, setTypeFilter] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [posts, setPosts] = useState(initialPosts);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  useEffect(() => {
    if (postsData) {
      setPosts([...posts, ...postsData]);
      setIsLoadingMore(false);
    }
  }, [postsData]);

  const loadMorePosts = async () => {
    setIsLoadingMore(true);
    fetchDataPosts(
      `posts?_sort=createdAt&_order=desc&_start=${posts.length}&_limit=5`,
      {
        method: "GET",
      }
    );
  };

  const filteredPosts = posts?.filter((post) => {
    const categoryMatches = !categoryFilter || post.category === categoryFilter;
    const typeMatches =
      !typeFilter ||
      (typeFilter === "free" && !post.isPremium) ||
      (typeFilter === "premium" && post.isPremium);
    const titleMatches = post.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    return categoryMatches && typeMatches && titleMatches;
  });

  return (
    <UserLayout>
      <Hero />
      <section className="w-11/12 sm:w-7/12 mx-auto my-12">
        <h3 className=" font-bold text-3xl">Trending on Mideum</h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-x-4 gap-y-9 mt-8">
          {trendingNews?.map((val, i) => {
            return <Trending key={`trending-${i}`} data={val} index={i} />;
          })}
        </div>
      </section>

      <hr className="h-px my-14 w-11/12 sm:w-7/12 mx-auto bg-gray-200 border dark:bg-gray-700" />
      <section className="w-11/12 sm:w-7/12 mx-auto my-12 bg-white">
        <h3 className=" font-bold text-3xl mb-8">News</h3>

        <select
          value={typeFilter}
          onChange={(e) => setTypeFilter(e.target.value)}
          className="bg-gray-100 text-gray-800 font-medium me-2 px-3 py-2 rounded-full dark:bg-gray-700 dark:text-gray-400 hover:bg-gray-200 cursor-pointer"
        >
          <option value="">All</option>
          <option value="free">Free</option>
          <option value="premium">Premium</option>
        </select>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search by title"
          className="bg-gray-100 text-gray-800 font-medium me-2 px-3 py-2 rounded-full dark:bg-gray-700 dark:text-gray-400 hover:bg-gray-200"
        />
        <div className="flex gap-2 md:grid-cols-3 mt-10 mb-4">
          <div>
            <input
              type="checkbox"
              id="all"
              name="all"
              className="hidden peer"
              checked={categoryFilter === ""}
              onChange={() => setCategoryFilter("")}
            />
            <label
              htmlFor="all"
              className="bg-gray-100 text-gray-800 font-medium me-2 px-3 py-2 rounded-full dark:bg-gray-700 dark:text-gray-400 hover:bg-gray-200 cursor-pointer peer-checked:border border-gray-500"
            >
              All
            </label>
          </div>

          <div>
            <input
              type="checkbox"
              id="tech"
              name="tech"
              className="hidden peer"
              checked={categoryFilter === "tech"}
              onChange={() => setCategoryFilter("tech")}
            />
            <label
              htmlFor="tech"
              className="bg-gray-100 text-gray-800 font-medium me-2 px-3 py-2 rounded-full dark:bg-gray-700 dark:text-gray-400 hover:bg-gray-200 cursor-pointer peer-checked:border border-gray-500"
            >
              Tech
            </label>
          </div>

          <div>
            <input
              type="checkbox"
              id="social"
              name="social"
              className="hidden peer"
              checked={categoryFilter === "social"}
              onChange={() => setCategoryFilter("social")}
            />
            <label
              htmlFor="social"
              className="bg-gray-100 text-gray-800 font-medium me-2 px-3 py-2 rounded-full dark:bg-gray-700 dark:text-gray-400 hover:bg-gray-200 cursor-pointer peer-checked:border border-gray-500"
            >
              Social
            </label>
          </div>

          <div>
            <input
              type="checkbox"
              id="health"
              name="health"
              className="hidden peer"
              checked={categoryFilter === "health"}
              onChange={() => setCategoryFilter("health")}
            />
            <label
              htmlFor="health"
              className="bg-gray-100 text-gray-800 font-medium me-2 px-3 py-2 rounded-full dark:bg-gray-700 dark:text-gray-400 hover:bg-gray-200 cursor-pointer peer-checked:border border-gray-500"
            >
              Health
            </label>
          </div>
        </div>

        <div className="flex flex-col gap-3">
          {filteredPosts &&
            filteredPosts.map((val, i) => {
              return <NewsLanding key={`news-${i}`} data={val} index={i} />;
            })}
        </div>
        <div className="flex items-center justify-center">
          <button
            onClick={loadMorePosts}
            className="bg-black py-2 px-3 rounded-lg disabled:bg-gray-400 text-white"
            disabled={isLoadingMore}
          >
            {isLoadingMore ? "Loading..." : "Load More"}
          </button>
        </div>
      </section>
    </UserLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  const postsResponse = await fetch(
    `${process.env.NEXT_PUBLIC_URL}/posts?_sort=createdAt&_order=desc&_limit=5`
  );
  const trendingResponse = await fetch(
    `${process.env.NEXT_PUBLIC_URL}/posts?_sort=like&_order=desc&_limit=5`
  );

  const initialPosts = await postsResponse.json();
  const trendingNews = await trendingResponse.json();

  return {
    props: {
      initialPosts,
      trendingNews,
    },
  };
};

export default News;
