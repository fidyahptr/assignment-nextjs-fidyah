import { IUsers } from "@/interface";
import UserLayout from "@/components/layout/userLayout";
import { getUserData } from "@/utils/token";
import Link from "next/link";
import { formatDate } from "@/utils";
import { useEffect } from "react";
import useFetch from "@/hooks/useFetch";

const Profile = (): JSX.Element => {
  const userData: IUsers = getUserData();
  const { data, fetchData } = useFetch<IUsers>();

  useEffect(() => {
    if (userData) {
      fetchData(`users/${userData.id}`, { method: "GET" });
    }
  }, []);

  return (
    <UserLayout>
      <div className="w-11/12 sm:w-6/12 mx-auto py-12">
        <h3 className="font-bold text-4xl">Profile</h3>

        {data && (
          <div className="flex flex-col md:flex-row gap-4 w-full my-10">
            <div className="overflow-x-auto w-full shadow-md sm:rounded-lg border border-gray-200">
              <div className="font-bold text-2xl py-6 px-4 border-b border-gray-200">
                Biodata
              </div>
              <table className="w-full text-left">
                <tr className="even:bg-white even:dark:bg-gray-900 odd:bg-gray-100 odd:dark:bg-gray-800 border-b dark:border-gray-700">
                  <td className="px-3 py-5">Full Name</td>
                  <td className="px-3 py-5">:</td>
                  <td className="px-3 py-5 font-medium">{data?.name}</td>
                </tr>
                <tr className="even:bg-white even:dark:bg-gray-900 odd:bg-gray-100 odd:dark:bg-gray-800 border-b dark:border-gray-700">
                  <td className="px-3 py-5">Email</td>
                  <td className="px-3 py-5">:</td>
                  <td className="px-3 py-5 font-medium">{data?.email}</td>
                </tr>
                <tr className="even:bg-white even:dark:bg-gray-900 odd:bg-gray-100 odd:dark:bg-gray-800 border-b dark:border-gray-700">
                  <td className="px-3 py-5">Phone Number</td>
                  <td className="px-3 py-5">:</td>
                  <td className="px-3 py-5 font-medium">{data?.phoneNumber}</td>
                </tr>
                <tr className="even:bg-white even:dark:bg-gray-900 odd:bg-gray-100 odd:dark:bg-gray-800 border-b dark:border-gray-700">
                  <td className="px-3 py-5">Address</td>
                  <td className="px-3 py-5">:</td>
                  <td className="px-3 py-5 font-medium">{data?.address}</td>
                </tr>
                <tr className="even:bg-white even:dark:bg-gray-900 odd:bg-gray-100 odd:dark:bg-gray-800 border-b dark:border-gray-700">
                  <td className="px-3 py-5">Referral</td>
                  <td className="px-3 py-5">:</td>
                  <td className="px-3 py-5 font-medium">{data?.referral}</td>
                </tr>
              </table>
            </div>

            <div className="max-w-sm w-5/12 bg-white border border-gray-200 rounded-lg shadow h-fit dark:bg-gray-800 dark:border-gray-700">
              <div className="font-bold text-2xl py-6 px-4 border-b border-gray-200">
                Subscription
              </div>
              <div>
                <div className="p-4 pb-6">
                  <div className=" text-gray-500">Member</div>
                  <div className="font-semibold text-gray-800 mt-1">
                    {data?.isSubscription ? "Premium" : "Free"}
                  </div>
                  {data?.isSubscription ? (
                    <div className="mt-4">
                      <div className=" text-gray-500">Expired Subs</div>
                      <div className="text-gray-800 font-semibold mt-1">
                        {formatDate(data?.expiredSubs)}
                      </div>
                    </div>
                  ) : (
                    <div className="flex flex-col justify-center items-center gap-3 mt-4">
                      <div className="text-sm text-gray-500 ">
                        Add subscription?
                      </div>
                      <Link href={"/news/subscription"}>
                        <button className="bg-black font-bold text-white px-4 py-2 rounded-3xl hover:bg-slate-800">
                          Subscribe
                        </button>
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </UserLayout>
  );
};

export default Profile;
