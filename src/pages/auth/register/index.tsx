import InputGroup from "@/components/inputGroup";
import AuthLayout from "@/components/layout/authLayout";
import useFetch from "@/hooks/useFetch";
import { IUsers } from "@/interface";
import { validateAuth } from "@/utils/validation";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";

const Register = (): JSX.Element => {
  const [formData, setFormData] = useState<IUsers>({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    address: "",
    phoneNumber: "",
    referral: "",
    like: {
      tech: 0,
      social: 0,
      health: 0,
    },
    isSubscription: false,
    expiredSubs: "",
  });
  const { data: usersData, fetchData: fetchAllUsers } = useFetch<IUsers[]>();
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    address: "",
    phoneNumber: "",
    referral: "",
  });
  const { data, fetchData } = useFetch<IUsers>();
  const router = useRouter();

  useEffect(() => {
    if (data !== null) {
      toast.success("Registration success!");
      setTimeout(() => {
        router.push("/auth/login");
      }, 1000);
    }
  }, [data]);

  useEffect(() => {
    if (usersData !== null) {
      if (!usersData.length) {
        const { confirmPassword, ...formDataWithoutConfirmPassword } = formData;
        formDataWithoutConfirmPassword.referral =
          formDataWithoutConfirmPassword.email;
        fetchData("users", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formDataWithoutConfirmPassword),
        });
      } else {
        toast.error("Email Already exist!");
      }
    }
  }, [usersData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const errorMessage = validateAuth(name, value);

    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: errorMessage,
    }));

    setFormData((formData) => ({ ...formData, [name]: value }));
  };

  const validateForm = (): boolean => {
    let isValid = true;
    const newErrors = { ...errors };

    const fieldsToValidate = [
      "name",
      "email",
      "password",
      "address",
      "phoneNumber",
    ];

    fieldsToValidate.forEach((fieldName) => {
      const value = formData[fieldName as keyof IUsers];
      const errorMessage = validateAuth(fieldName, String(value));

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
      fetchAllUsers(`users?email=${formData.email}`, { method: "get" });
    } else {
      toast.error("Please fill all required fields correctly.");
    }
  };

  return (
    <AuthLayout>
      <form onSubmit={handleSubmit} className="mt-8 grid grid-cols-6 gap-6">
        <div className="col-span-6 sm:col-span-3">
          <InputGroup
            type="text"
            name="name"
            placeholder="Enter Name"
            handleInput={handleChange}
            label="Name"
            error={errors.name}
          />
        </div>
        <div className="col-span-6 sm:col-span-3">
          <InputGroup
            type="text"
            name="email"
            placeholder="mail@gmail.com"
            handleInput={handleChange}
            label="Email"
            error={errors.email}
          />
        </div>
        <div className="col-span-6 sm:col-span-3">
          <InputGroup
            type="password"
            name="password"
            placeholder="Enter password here.."
            handleInput={handleChange}
            label="Password"
            error={errors.password}
          />
        </div>
        <div className="col-span-6 sm:col-span-3">
          <InputGroup
            type="password"
            name="confirmPassword"
            placeholder="Enter confirm password here.."
            handleInput={handleChange}
            label="Confirm Password"
            error={errors.confirmPassword}
          />
        </div>
        <div className="col-span-6">
          <InputGroup
            type="text"
            name="address"
            placeholder="Enter address"
            handleInput={handleChange}
            label="Address"
            error={errors.address}
          />
        </div>
        <div className="col-span-6 sm:col-span-3">
          <InputGroup
            type="text"
            name="phoneNumber"
            placeholder="Enter phone number"
            handleInput={handleChange}
            label="Phone Number"
            error={errors.phoneNumber}
          />
        </div>

        <div className="col-span-6 sm:col-span-3">
          <InputGroup
            type="text"
            name="referral"
            placeholder="Enter referral"
            label="Referral"
          />
        </div>

        <div className="col-span-6 sm:flex sm:items-center sm:gap-4">
          <button
            type="submit"
            className="inline-block shrink-0 rounded-md border border-blue-600 bg-blue-600 px-12 py-3 text-sm font-medium text-white transition hover:bg-transparent hover:text-blue-600 focus:outline-none focus:ring active:text-blue-500"
          >
            Create an account
          </button>
          <p className="mt-4 text-sm text-gray-500 sm:mt-0">
            Already have an account?{" "}
            <Link href={"/auth/login"} className="text-gray-700 underline">
              Log in
            </Link>
          </p>
        </div>
      </form>
    </AuthLayout>
  );
};

export default Register;
