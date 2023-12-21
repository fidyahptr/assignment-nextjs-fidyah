import { removeToken, removeUserData } from "@/utils/token";
import Link from "next/link";

const Navbar = (): JSX.Element => {
  return (
    <header className="bg-black">
      <nav className="navbar max-w-screen-xl w-full mx-auto">
        <div className="flex-1">
          <Link
            href={"/news"}
            className="flex items-center text-white space-x-3 rtl:space-x-reverse"
          >
            <img
              src="https://flowbite.com/docs/images/logo.svg"
              className="h-8"
              alt="Mideum Logo"
            />
            <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
              Mideum
            </span>
          </Link>
        </div>
        <div className="flex-none gap-2 text-white">
          <ul className="menu menu-horizontal px-1">
            <li>
              <Link
                href={"/news"}
                className="font-semibold hover:text-gray-300"
              >
                News
              </Link>
            </li>
          </ul>
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-10 rounded-full">
                <img
                  alt="Tailwind CSS Navbar component"
                  src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
                />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="mt-3 z-[1] p-2 text-gray-800 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52"
            >
              <li>
                <Link
                  href={"/news/profile"}
                  className=" font-semibold my-1 hover:text-gray-500"
                >
                  Profile
                </Link>
              </li>
              <li>
                <Link
                  href={"/news/subscription"}
                  className=" font-semibold my-1 hover:text-gray-500"
                >
                  Subscribe
                </Link>
              </li>
              <li>
                <Link
                  href={"/news/order"}
                  className=" font-semibold my-1 hover:text-gray-500 mb-2"
                >
                  Order
                </Link>
              </li>
              <li>
                <Link
                  href={"/auth/login"}
                  className=" border-t border-gray-300 text-white min-h-fit h-fit btn btn-error hover:btn-outline"
                  onClick={() => {
                    removeUserData();
                    removeToken();
                  }}
                >
                  Logout
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
    // <nav className="bg-black text-white w-full border-gray-200 dark:bg-gray-900">
    //   <div className="max-w-screen-xl w-full flex flex-wrap items-center justify-between mx-auto p-4">
    //     <Link
    //       href={"/news"}
    //       className="flex items-center space-x-3 rtl:space-x-reverse"
    //     >
    //       <img
    //         src="https://flowbite.com/docs/images/logo.svg"
    //         className="h-8"
    //         alt="Mideum Logo"
    //       />
    //       <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
    //         Mideum
    //       </span>
    //     </Link>
    //     <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
    //       <Link
    //         href={"/auth/login"}
    //         onClick={() => {
    //           removeUserData();
    //           removeToken();
    //         }}
    //         className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
    //       >
    //         Logout
    //       </Link>
    //       <button
    //         data-collapse-toggle="navbar-cta"
    //         type="button"
    //         className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
    //         aria-controls="navbar-cta"
    //         aria-expanded="false"
    //       >
    //         <span className="sr-only">Open main menu</span>
    //         <svg
    //           className="w-5 h-5"
    //           aria-hidden="true"
    //           xmlns="http://www.w3.org/2000/svg"
    //           fill="none"
    //           viewBox="0 0 17 14"
    //         >
    //           <path
    //             stroke="currentColor"
    //             strokeLinecap="round"
    //             strokeLinejoin="round"
    //             strokeWidth={2}
    //             d="M1 1h15M1 7h15M1 13h15"
    //           />
    //         </svg>
    //       </button>
    //     </div>
    //     <div
    //       className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1"
    //       id="navbar-cta"
    //     >
    //       <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 ">
    //         <li>
    //           <Link
    //             href={"/news"}
    //             className="block py-2 px-3 md:p-0 hover:text-gray-300 "
    //             aria-current="page"
    //           >
    //             Home
    //           </Link>
    //         </li>
    //         <li>
    //           <Link
    //             href={"/news/order"}
    //             className="block py-2 px-3 md:p-0 hover:text-gray-300 "
    //           >
    //             Order
    //           </Link>
    //         </li>
    //         <li>
    //           <a
    //             href={"/news/profile"}
    //             className="block py-2 px-3 md:p-0 hover:text-gray-300 "
    //           >
    //             Profile
    //           </a>
    //         </li>
    //       </ul>
    //     </div>
    //   </div>
    // </nav>
  );
};

export default Navbar;
