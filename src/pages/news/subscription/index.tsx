import UserLayout from "@/components/layout/userLayout";
import ModalSubs from "@/components/modal/modalSubs";
import { getUserData } from "@/utils/token";
import { useState } from "react";

const Subscripstions = () => {
  const [qrValue, setQrValue] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const userData = getUserData();

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <UserLayout>
      <div className="max-w-sm sm:max-w-3xl mx-auto mt-16 mb-24">
        <h3 className="font-bold text-4xl">Subscriptions</h3>
        <section className="grid grid-cols-1 sm:grid-cols-2 gap-12 mt-10">
          <div className="w-full max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700">
            <h5 className="mb-4 text-xl font-medium text-gray-500 dark:text-gray-400">
              Monthly subs
            </h5>
            <div className="flex items-baseline text-gray-900 dark:text-white">
              <span className="text-3xl font-semibold">Rp </span>
              <span className="text-5xl font-extrabold tracking-tight">
                50.000
              </span>
              <span className="ms-1 text-xl font-normal text-gray-500 dark:text-gray-400">
                /month
              </span>
            </div>
            <ul role="list" className="space-y-5 my-7">
              <li className="flex items-center">
                <svg
                  className="flex-shrink-0 w-4 h-4 text-blue-600 dark:text-blue-500"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
                </svg>
                <span className="text-base font-normal leading-tight text-gray-500 dark:text-gray-400 ms-3">
                  Access all premium news on Mideum
                </span>
              </li>
              <li className="flex">
                <svg
                  className="flex-shrink-0 w-4 h-4 text-blue-600 dark:text-blue-500"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
                </svg>
                <span className="text-base font-normal leading-tight text-gray-500 dark:text-gray-400 ms-3">
                  Support writers you read most
                </span>
              </li>

              <li className="flex line-through decoration-gray-500">
                <svg
                  className="flex-shrink-0 w-4 h-4 text-gray-400 dark:text-gray-500"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
                </svg>
                <span className="text-base font-normal leading-tight text-gray-500 ms-3">
                  Sketch Files
                </span>
              </li>
            </ul>
            <button
              type="button"
              onClick={() => {
                setIsModalOpen(true);
                setQrValue("1");
              }}
              className="text-white bg-black hover:bg-slate-800 focus:ring-4 focus:outline-none focus:ring-slate-200 dark:focus:ring-slate-900 font-medium rounded-lg text-sm px-5 py-2.5 inline-flex justify-center w-full text-center"
            >
              Choose subs
            </button>
          </div>

          <div className="w-full max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700">
            <h5 className="mb-4 text-xl font-medium text-gray-500 dark:text-gray-400">
              Yearly subs
            </h5>
            <div className="flex items-baseline text-gray-900 dark:text-white">
              <span className="text-3xl font-semibold">Rp </span>
              <span className="text-5xl font-extrabold tracking-tight">
                400.000
              </span>
              <span className="ms-1 text-xl font-normal text-gray-500 dark:text-gray-400">
                /year
              </span>
            </div>
            <ul role="list" className="space-y-5 my-7">
              <li className="flex items-center">
                <svg
                  className="flex-shrink-0 w-4 h-4 text-blue-600 dark:text-blue-500"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
                </svg>
                <span className="text-base font-normal leading-tight text-gray-500 dark:text-gray-400 ms-3">
                  Access all premium news on Mideum
                </span>
              </li>
              <li className="flex">
                <svg
                  className="flex-shrink-0 w-4 h-4 text-blue-600 dark:text-blue-500"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
                </svg>
                <span className="text-base font-normal leading-tight text-gray-500 dark:text-gray-400 ms-3">
                  Support writers you read most
                </span>
              </li>
              <li className="flex">
                <svg
                  className="flex-shrink-0 w-4 h-4 text-blue-600 dark:text-blue-500"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
                </svg>
                <span className="text-base font-normal leading-tight text-gray-500 dark:text-gray-400 ms-3">
                  Integration help
                </span>
              </li>
            </ul>
            <button
              type="button"
              onClick={() => {
                setIsModalOpen(true);
                setQrValue("2");
              }}
              className="text-white bg-black hover:bg-slate-800 focus:ring-4 focus:outline-none focus:ring-slate-200 dark:focus:ring-slate-900 font-medium rounded-lg text-sm px-5 py-2.5 inline-flex justify-center w-full text-center"
            >
              Choose subs
            </button>
          </div>
        </section>
      </div>
      <ModalSubs
        isOpen={isModalOpen}
        onClose={closeModal}
        qrValue={qrValue}
        userId={userData?.id}
      />
    </UserLayout>
  );
};

export default Subscripstions;
