import Sidebar from "@/components/sidebar";

const AdminLayout = ({
  children,
}: {
  children: JSX.Element | JSX.Element[];
}): JSX.Element => {
  return (
    <>
      <Sidebar />
      <div className="px-10 md:px-24 py-12 sm:ml-64">{children}</div>
    </>
  );
};

export default AdminLayout;
