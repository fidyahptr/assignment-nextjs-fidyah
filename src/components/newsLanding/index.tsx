import { IPosts } from "@/interface";
import { formatDate, truncateDescription } from "@/utils";
import Image from "next/image";
import Link from "next/link";

interface ILanding {
  data: IPosts;
  index: number;
}

const NewsLanding = ({ data, index }: ILanding) => {
  return (
    <div className="border-b border-gray-200 my-6 pb-6" key={`news-${index}`}>
      <div className="flex gap-8">
        <Link href={`/news/${data.id}`}>
          <Image
            src={data.picture}
            alt={data.title}
            width={100}
            height={100}
            loading="lazy"
          />
        </Link>
        <div>
          <div className="flex items-center gap-2">
            <Link href={`/news/${data.id}`}>
              <div className="font-bold text-lg">{data.title}</div>
            </Link>
            {data.isPremium && (
              <span className="bg-purple-100 text-purple-800 text-xs font-medium me-2 px-2 py-0.5 rounded-full dark:bg-purple-900 dark:text-purple-300">
                Premium
              </span>
            )}
          </div>
          <div className="mt-2">{truncateDescription(data.desc)}</div>
          <div className=" text-gray-400 text-sm mt-2">
            {formatDate(data.createdAt)}
            <span className="bg-gray-100 text-gray-800 text-xs font-medium ml-2 px-2.5 py-1 rounded-full dark:bg-gray-700 dark:text-gray-300">
              {data.category}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsLanding;
