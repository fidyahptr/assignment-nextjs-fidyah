import useFetch from "@/hooks/useFetch";
import { IPosts } from "@/interface";
import { useRouter } from "next/router";
import { useEffect } from "react";
import AdminLayout from "@/components/layout/adminLayout";
import Link from "next/link";

const PostDetail = (): JSX.Element => {
  const router = useRouter();
  const { data: postsData, fetchData: fetchDataPosts } = useFetch<IPosts>();

  useEffect(() => {
    fetchDataPosts(`posts/${router.query.postsId}`, { method: "GET" });
  }, []);

  return (
    <AdminLayout>
      <Link href={"/admin/posts"}>
        <button
          type="button"
          className="text-red-600 hover:text-white border border-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900 mb-6"
        >
          Back
        </button>
      </Link>

      <h4 className="font-bold text-3xl mb-4">News Detail</h4>
      {postsData ? (
        <div>
          <img
            src={postsData?.picture}
            alt={postsData?.title}
            className="w-full"
            height={200}
          />
          <div>{postsData?.title}</div>
          <div>{postsData?.desc}</div>
          <div>Category : {postsData?.category}</div>
          <div>Type : {postsData?.isPremium ? "Premium" : "basic"}</div>
          <div>Like : {postsData?.like.length}</div>
        </div>
      ) : (
        <div>No Index</div>
      )}
    </AdminLayout>
  );
};

export default PostDetail;
