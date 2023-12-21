import Link from "next/link";
import QRCode from "react-qr-code";

interface IModal {
  isOpen: boolean;
  onClose: () => void;
  qrValue: string;
  userId: number | undefined;
}

const ModalSubs = ({ isOpen, onClose, qrValue, userId }: IModal) => {
  return (
    <>
      {isOpen && (
        <div className="fixed z-30 top-0 bg-black/[.4] left-0 w-full h-full flex justify-center items-center">
          <div className="relative p-4 w-full max-w-md max-h-full">
            <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
              <div
                onClick={onClose}
                className="absolute top-3 end-2.5 cursor-pointer text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
              >
                <svg
                  className="w-3 h-3"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 14"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                  />
                </svg>
                <span className="sr-only">Close modal</span>
              </div>
              <div className="p-4 md:p-5 flex flex-col justify-center items-center">
                <div className="mb-5">
                  <div className="font-bold text-2xl text-center mt-2">
                    Qr Payment
                  </div>
                  <QRCode
                    size={256}
                    value={`https://assignment-nextjs-fidyah-lu1p.vercel.app/payment/${qrValue}/${userId}`}
                    className="mt-6"
                  />
                </div>
                <div className="flex gap-4 justify-center items-center">
                  <Link
                    href={"/news/order"}
                    className="text-white bg-blue-600 cursor-pointer hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center me-2"
                  >
                    Done
                  </Link>
                  <div
                    onClick={onClose}
                    className="text-gray-500 bg-white cursor-pointer hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
                  >
                    No, cancel
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ModalSubs;
