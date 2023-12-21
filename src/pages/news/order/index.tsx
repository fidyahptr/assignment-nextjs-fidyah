import useFetch from "@/hooks/useFetch";
import { IUsers } from "@/interface";
import { getUserData } from "@/utils/token";
import { useEffect } from "react";
import UserLayout from "@/components/layout/userLayout";
import { convertRp } from "@/utils";

const Order = (): JSX.Element => {
  const { data, fetchData } = useFetch<IUsers>();
  const userData: IUsers = getUserData();

  useEffect(() => {
    fetchData(`users/${userData.id}?_embed=transactions`, { method: "GET" });
  }, []);

  return (
    <UserLayout>
      <section className="w-11/12 sm:w-5/12 mx-auto py-12">
        <h3 className="font-bold text-4xl mb-10">History Order</h3>
        <div className="flex flex-col gap-8 mb-16">
          {data && !data.transactions?.length ? (
            <div>No History</div>
          ) : (
            data?.transactions?.map((val, i) => {
              return (
                <div
                  key={`order-${i}`}
                  className="bg-white shadow-lg border border-gray-200 rounded-lg py-6 px-8"
                >
                  <div>Type {val.type === 1 ? "Monthly" : "Yearly"} Subs</div>
                  <div>
                    Status <span className={val.status}>{val.status}</span>
                  </div>
                  <div>Price {convertRp(val.price)}</div>
                </div>
              );
            })
          )}
        </div>
      </section>
    </UserLayout>
  );
};

export default Order;
