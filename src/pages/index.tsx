import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return null;
}

export async function getServerSideProps() {
  return {
    redirect: {
      destination: "/news",
      permanent: true,
    },
  };
}
