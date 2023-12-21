export interface IUsers {
  id?: number;
  name: string;
  email: string;
  password: string;
  confirmPassword?: string;
  address: string;
  phoneNumber: string;
  referral: string;
  referralUsed?: number;
  like: {
    tech: number;
    social: number;
    health: number;
  };
  isSubscription: boolean;
  expiredSubs: string;
  transactions?: ITansactions[];
}

interface IUserLike {
  tech: number;
  social: number;
  health: number;
}

export interface IPosts {
  id?: number;
  title: string;
  desc: string;
  picture: string;
  isPremium: boolean;
  category: "social" | "health" | "tech" | "";
  like: number[];
  share: number;
  createdAt: string;
  updatedAt: string;
}

export interface ITansactions {
  id: number;
  userId: number;
  email: string;
  type: number;
  status: "processed" | "canceled" | "completed";
  price: number;
  createdAt: string;
  updatedAt: string;
}
