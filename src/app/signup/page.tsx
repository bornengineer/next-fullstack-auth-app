"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

type Fields = "email" | "password" | "username";
interface User {
  email: string;
  password: string;
  username: string;
}

const fields: Fields[] = ["username", "email", "password"];

export default function SignupPage() {
  const router = useRouter();
  const [user, setUser] = useState<User>({
    email: "",
    password: "",
    username: "",
  });
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (
      user.email.length > 0 &&
      user.username.length > 0 &&
      user.password.length > 0
    )
      setButtonDisabled(false);
    else setButtonDisabled(true);
  }, [user]);

  const onSignup = async () => {
    try {
      setLoading(true);
      const res = await axios.post("/api/users/signup", user);
      if (res.status === 200) {
        console.log("Signup success :", res.data);
        setUser({
          email: "",
          password: "",
          username: "",
        });
        const toastId = toast.success(res.data.message);
        setTimeout(() => {
          toast.remove(toastId);
          router.push("/login");
        }, 1500);
      }
      
      if (res.status === 202) {
        toast.error(res.data.error);
      }
    } catch (err: any) {
      console.log("Signup failed :", err.message);
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Toaster />
      <div className="flex flex-col items-center justify-center min-h-screen py-2">
        <h1 className="text-2xl mb-4 text-bold">Signup</h1>
        <hr className="" />
        <div className="flex items-start flex-col justify-center gap-5">
          {/* TODO make this component generic */}
          {fields.map((field: Fields, index) => (
            <div className="flex flex-col gap-1" key={index}>
              <label className="capitalize text-bold" htmlFor={field}>
                {field}
              </label>
              <input
                className="text-black focus:outline-none focus:border-gray-600 py-1 px-2 rounded-lg border-gray-300"
                id={field}
                type={field === "username" ? "text" : field}
                value={user[field]}
                onChange={(e) => setUser({ ...user, [field]: e.target.value })}
                placeholder={field}
              />
            </div>
          ))}
          <button
            onClick={onSignup}
            className="text-bold mt-2 w-full border hover:border-slate-500 disabled:opacity-50 hover:bg-blue-600 bg-gray-900 p-2 rounded-lg border-slate-700"
            disabled={buttonDisabled || loading}
          >
            {loading ? "Processing..." : "Signup"}
          </button>
        </div>
        <div className="mt-8 flex-row flex">
          <p>Already Signed up?</p>&nbsp;
          <Link className="text-blue-300" href="/login">
            visit login page
          </Link>
        </div>
      </div>
    </>
  );
}
