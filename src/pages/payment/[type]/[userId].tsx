import useFetch from "@/hooks/useFetch";
import { ITansactions, IUsers } from "@/interface";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { toast } from "sonner";

const Payment = () => {
  const { data, fetchData } = useFetch<ITansactions>();
  const { data: userData, fetchData: fetchDataUser } = useFetch<IUsers>();
  const router = useRouter();

  useEffect(() => {
    fetchDataUser(`users/${router.query.userId}`, { method: "GET" });
  }, [router.query.userId]);

  useEffect(() => {
    if (data !== null) {
      toast.success("Success payment!");
      setTimeout(() => {
        router.push("/payment/instructions");
      }, 1000);
    }
  }, [data]);

  const handleSubs = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    const price = Number(router.query.type) === 1 ? 50000 : 400000;
    fetchData(`transactions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: Number(router.query.userId),
        email: userData?.email,
        type: Number(router.query.type),
        status: "processed",
        price: price,
        createdAt: new Date(),
        updatedAt: new Date(),
      }),
    });
  };

  return (
    <div className="flex gap-4 w-full h-screen justify-center items-center">
      <button
        onClick={(e) => handleSubs(e)}
        className="text-white bg-blue-600 cursor-pointer hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center me-2"
      >
        Pay
      </button>
    </div>
  );
};

export default Payment;
