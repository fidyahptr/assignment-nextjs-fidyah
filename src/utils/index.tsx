import { IPosts } from "@/interface";

export function truncateDescription(description: string): string {
  if (description.length <= 120) {
    return description;
  } else {
    return description.substring(0, 120 - 3) + "...";
  }
}

export const convertRp = (balance: number): string => {
  const formattedAmount = balance.toLocaleString("id-ID", {
    style: "currency",
    currency: "IDR",
  });

  const [, value] = formattedAmount.split(/[^0-9,.]+/);

  return `Rp ${value}`;
};

export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);

  const day = date.getDate();
  const monthIndex = date.getMonth();
  const year = date.getFullYear();

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  return `${day} ${monthNames[monthIndex]} ${year}`;
};

export function sortPostsByLikesAndLatest(posts: IPosts[]): IPosts[] {
  return posts
    .sort((a, b) => {
      if (a.like > b.like) {
        return -1;
      }
      if (a.like < b.like) {
        return 1;
      }

      const aCreatedAt = new Date(a.updatedAt).getTime();
      const bCreatedAt = new Date(b.updatedAt).getTime();
      return bCreatedAt - aCreatedAt;
    })
    .slice(0, 5);
}

export const getOneMonthDate = () => {
  const currentDate = new Date();
  currentDate.setMonth(currentDate.getMonth() + 1);
  return currentDate.toLocaleDateString();
};

export const getOneYearDate = () => {
  const currentDate = new Date();
  currentDate.setFullYear(currentDate.getFullYear() + 1);
  return currentDate.toLocaleDateString();
};
