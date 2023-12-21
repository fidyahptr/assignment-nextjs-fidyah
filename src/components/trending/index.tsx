import { IPosts } from "@/interface";
import { formatDate } from "@/utils";
import Image from "next/image";
import Link from "next/link";

interface ITrending {
  data: IPosts;
  index: number;
}

const Trending = ({ data, index }: ITrending): JSX.Element => {
  return (
    <div>
      <div className="flex gap-4">
        <div className="text-3xl text-gray-300">0{index + 1}</div>
        <Link href={`/news/${data.id}`}>
          <Image src={data.picture} alt={data.title} width={100} height={80} />
        </Link>
        <div>
          <Link href={`/news/${data.id}`}>
            <h4 className="font-bold text-xl">{data.title}</h4>
          </Link>
          <div className="flex gap-2">
            <div className="text-gray-400 text-sm">
              {formatDate(data.createdAt)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Trending;
