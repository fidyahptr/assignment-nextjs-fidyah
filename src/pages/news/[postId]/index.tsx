import useFetch from "@/hooks/useFetch";
import { IPosts, IUsers } from "@/interface";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { GetServerSideProps } from "next";
import UserLayout from "@/components/layout/userLayout";
import { formatDate } from "@/utils";
import { getUserData } from "@/utils/token";
import Link from "next/link";
import PayWall from "@/components/paywall";
import LikeButton from "@/components/button/likeButton";
import ShareButton from "@/components/button/shareButton";

interface INewsDetailProps {
  initialPostData: IPosts;
}

const NewsDetail = ({ initialPostData }: INewsDetailProps): JSX.Element => {
  const { data, setData: setDataPost, fetchData } = useFetch<IPosts>();
  const { data: dataActionNews, fetchData: fetchActionNews } =
    useFetch<IPosts>();
  const { data: dataActionUser, fetchData: fetchActionUser } =
    useFetch<IPosts>();
  const { data: newsRecommendation, fetchData: fetchNewsRecommendation } =
    useFetch<IPosts[]>();
  const { data: userData, fetchData: fetchUserData } = useFetch<IUsers>();
  const router = useRouter();
  const userId: IUsers = getUserData();

  useEffect(() => {
    fetchUserData(`users/${userId.id}`, { method: "GET" });
    setDataPost(initialPostData);
  }, []);

  useEffect(() => {
    if (dataActionUser && dataActionNews) {
      fetchUserData(`users/${userId.id}`, { method: "GET" });
      fetchData(`posts/${router.query.postId}`, { method: "GET" });
    }
  }, [dataActionNews, dataActionUser]);

  useEffect(() => {
    console.log(userData);
    if (userData !== null) {
      const recommendation = findMaxKey(userData);
      fetchNewsRecommendation(
        `posts?${
          recommendation !== null
            ? `category=${recommendation}&_limit=3`
            : "_limit=3"
        }`,
        {
          method: "GET",
        }
      );
    }
  }, [userData]);

  const findMaxKey = (userData: IUsers): string | null => {
    const { tech, social, health } = userData.like;

    if (tech === social && social === health) {
      return null;
    }

    const maxVal = Math.max(tech, social, health);
    const keysWithMaxValue = Object.keys(userData.like).filter(
      (key) => userData.like[key as keyof IUsers["like"]] === maxVal
    );

    return keysWithMaxValue.join("&category=");
  };

  const handleLike = async () => {
    if (data && userData && data.category !== "") {
      const existingPostIndex = data?.like.includes(userData.id!);
      const category: "social" | "health" | "tech" = data.category;
      let likeData = data.like;
      let newLike = userData.like;

      if (!existingPostIndex) {
        likeData.push(userData.id!);
        newLike[category]++;
      } else {
        likeData = data.like.filter((e) => e !== userData.id);
        newLike[category]--;
      }

      await fetchActionUser(`users/${userData.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          like: newLike,
        }),
      });

      await fetchActionNews(`posts/${router.query.postId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          like: likeData,
        }),
      });
    }
  };

  const handleShare = () => {
    if (data !== null) {
      let dataShare = data.share;
      dataShare++;
      fetchActionNews(`posts/${router.query.postId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          share: dataShare,
        }),
      });
    }
  };

  return (
    <UserLayout>
      <div className="w-10/12 md:w-5/12 mx-auto mt-12 mb-24">
        <section className="mt-12">
          {data && (
            <div
              className={
                !userData?.isSubscription && data.isPremium
                  ? "line-clamp-5"
                  : ""
              }
            >
              <img src={data?.picture} alt="" className="w-full" height={300} />
              <h2 className="font-bold text-4xl mt-5">{data?.title}</h2>
              <div className="text-gray-500 text-sm mt-3">
                {formatDate(data?.createdAt)}{" "}
                {data?.isPremium && (
                  <span className="bg-purple-100 text-purple-800 text-xs font-medium ml-3 px-2 py-0.5 rounded-full dark:bg-purple-900 dark:text-purple-300">
                    Premium
                  </span>
                )}
              </div>

              <div
                className="mt-8 mb-12"
                dangerouslySetInnerHTML={{
                  __html: data?.desc.replace("\n", "<br/>"),
                }}
              ></div>

              <span className="bg-gray-100 text-gray-700 text-sm font-medium me-2 px-4 py-2 rounded-full dark:bg-gray-700 dark:text-gray-300">
                {data.category}
              </span>

              <div className="flex gap-6 mt-8">
                <div className="flex gap-2">
                  <LikeButton
                    initialLiked={data?.like.includes(userId?.id!)}
                    handleLike={handleLike}
                  />
                  <div className=" text-gray-700">{data?.like.length}</div>
                </div>

                <div className="flex gap-2">
                  <ShareButton handleShare={handleShare} />
                  <div className=" text-gray-700">{data?.share}</div>
                </div>
              </div>
            </div>
          )}

          {data && !userData?.isSubscription && data.isPremium && <PayWall />}
        </section>

        <hr className="h-px my-14 bg-gray-200 border dark:bg-gray-700" />

        <h3 className="font-bold text-3xl">Recommendations</h3>
        <section className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-6">
          {newsRecommendation &&
            newsRecommendation.map((val, i) => {
              return (
                <div key={`recomendation-${i}`}>
                  <Link href={`/news/${val.id}`}>
                    <img
                      src={val.picture}
                      alt={val.title}
                      height={150}
                      className="w-full"
                    />
                  </Link>
                  <Link href={`/news/${val.id}`}>
                    <div className="font-bold text-2xl mt-3">{val.title}</div>
                  </Link>
                  <div className="text-sm text-gray-400 mt-2 overflow-hidden line-clamp-2">
                    {val.desc}
                  </div>
                </div>
              );
            })}
        </section>
      </div>
    </UserLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const postId = context.params?.postId;

  if (!postId) {
    return { notFound: true };
  }

  const initialPostResponse = await fetch(
    `${process.env.NEXT_PUBLIC_URL}/posts/${postId}`
  );

  const initialPostData = await initialPostResponse.json();

  if (!initialPostData.id) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      initialPostData,
    },
  };
};

export default NewsDetail;
