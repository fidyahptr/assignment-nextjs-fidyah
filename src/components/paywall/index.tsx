import Link from "next/link";

const PayWall = (): JSX.Element => {
  return (
    <div className="flex flex-col items-center justify-center gap-4 bg-gradient-to-b from-transparent to-slate-200 rounded-xl text-center px-12 pt-14 pb-10">
      <img src={"/img/lock.jpg"} alt="logo lock" width={110} height={100} />
      <div className="text-gray-600 mt-4">
        The author made this news available to Mideum premium only. Upgrade to
        instantly unlock this news plus other premium benefits.
      </div>
      <h4 className="text-lg font-semibold text-gray-900 dark:text-white">
        Benefits:
      </h4>
      <ul className="max-w-lg mx-auto space-y-1 text-gray-500 list-inside dark:text-gray-400">
        <li className="flex items-center">
          <svg
            className="w-3.5 h-3.5 me-2 text-green-500 dark:text-green-400 flex-shrink-0"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
          </svg>
          Access all premium news on Mideum
        </li>
        <li className="flex items-center">
          <svg
            className="w-3.5 h-3.5 me-2 text-green-500 dark:text-green-400 flex-shrink-0"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
          </svg>
          Become an expert in your areas of interest
        </li>
      </ul>
      <Link href={"/news/subscription"}>
        <button className="bg-black text-white px-4 py-2 rounded-3xl hover:bg-slate-800 mt-6">
          Upgrade
        </button>
      </Link>
    </div>
  );
};

export default PayWall;
