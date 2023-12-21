import React, { useEffect, useState } from "react";
import useFetch from "@/hooks/useFetch";
import { useRouter } from "next/router";
import { toast } from "sonner";
import { IUsers } from "@/interface";
import { setRoleAdmin, setToken, setUserData } from "@/utils/token";
import Link from "next/link";
import AuthLayout from "@/components/layout/authLayout";
import InputGroup from "@/components/inputGroup";
import { validateAuth } from "@/utils/validation";

interface IAdmin {
  email: string;
  password: string;
}

const Login = (): JSX.Element => {
  const [formData, setFormData] = useState<IAdmin>({
    email: "",
    password: "",
  });
  const { data: adminData, fetchData: fetchDataAdmin } = useFetch<IAdmin[]>();
  const {
    data: userData,
    loading,
    fetchData: fetchDataUsers,
  } = useFetch<IUsers[]>();
  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });
  const router = useRouter();

  useEffect(() => {
    if (userData !== null) {
      if (!userData.length) {
        toast.error("Email/password wrong!");
      } else {
        setToken("users");
        console.log(userData);
        setUserData(userData[0]);
        toast.success("Login success!");
        setFormData({
          email: "",
          password: "",
        });
        setTimeout(() => {
          router.push("/news");
        }, 1000);
      }
    }
  }, [userData]);

  useEffect(() => {
    if (adminData !== null) {
      if (!adminData.length) {
        fetchDataUsers(
          `users?email=${formData.email}&password=${formData.password}`,
          {
            method: "get",
          }
        );
      } else {
        setToken("admin");
        setRoleAdmin();
        toast.success("Login success!");
        setTimeout(() => {
          router.push("/admin");
        }, 1000);
      }
    }
  }, [adminData]);

  const validateForm = (): boolean => {
    let isValid = true;
    const newErrors = { ...errors };

    Object.keys(formData).forEach((fieldName) => {
      const value = formData[fieldName as keyof IAdmin];
      const errorMessage = validateAuth(fieldName, value);

      newErrors[fieldName as keyof typeof newErrors] = errorMessage;

      if (errorMessage) {
        isValid = false;
      }
    });

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const isFormValid = validateForm();

    if (isFormValid) {
      fetchDataAdmin(
        `admins?email=${formData.email}&password=${formData.password}`,
        {
          method: "GET",
        }
      );
    } else {
      toast.error("Please fill all required fields correctly.");
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const errorMessage = validateAuth(name, value);

    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: errorMessage,
    }));
    setFormData((formData) => ({ ...formData, [name]: value }));
  };

  return (
    <AuthLayout>
      <form
        onSubmit={handleSubmit}
        className="mt-8 grid grid-cols-1 w-full lg:10/12 xl:w-7/12 gap-6"
      >
        <div>
          <InputGroup
            type="text"
            name="email"
            placeholder="mail@gmail.com"
            handleInput={handleChange}
            label="Email"
            error={errors.email}
          />
        </div>
        <div>
          <InputGroup
            type="password"
            name="password"
            placeholder="Enter password here.."
            handleInput={handleChange}
            label="Password"
            error={errors.password}
          />
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <input
              id="remember_me"
              name="remember_me"
              type="checkbox"
              className="h-4 w-4  focus:ring-blue-400 border-gray-300 rounded"
            />
            <label
              htmlFor="remember_me"
              className="ml-2 block text-sm text-gray-800"
            >
              Remember me
            </label>
          </div>
          <div className="text-sm">
            <a href="#" className="text-blue-400 hover:text-blue-500">
              Forgot your password?
            </a>
          </div>
        </div>
        <p className="mt-4 text-sm text-gray-500 sm:mt-0">
          Does not have an account?{" "}
          <Link href={"/auth/register"} className="text-gray-700 underline">
            Sign up
          </Link>
        </p>
        <div>
          <button
            type="submit"
            className="w-full rounded-md border border-blue-600 bg-blue-600 px-12 py-3 text-sm font-medium text-white transition hover:bg-transparent hover:text-blue-600 focus:outline-none focus:ring active:text-blue-500"
          >
            {loading ? "Log in" : "Loading.."}
          </button>
        </div>
      </form>
    </AuthLayout>
  );
};

export default Login;
