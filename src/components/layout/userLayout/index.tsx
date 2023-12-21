import Footer from "@/components/footer";
import Navbar from "@/components/navbar";

const UserLayout = ({
  children,
}: {
  children: JSX.Element[] | JSX.Element;
}): JSX.Element => {
  return (
    <>
      <Navbar />
      <main className="bg-white">
        <section className=" ">{children}</section>
      </main>
      <Footer />
    </>
  );
};

export default UserLayout;
