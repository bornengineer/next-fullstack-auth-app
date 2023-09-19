"use client";

import Link from "next/link";
import React from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

type Fields = "email" | "password";
interface User {
  email: string;
  password: string;
}

const fields: Fields[] = ["email", "password"];

export default function LoginPage() {
  const [user, setUser] = React.useState<User>({
    email: "",
    password: "",
  });

  const onLogin = async () => {};

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-2xl mb-4 text-bold">Login</h1>
      <hr className="" />
      <div className="flex items-start flex-col justify-center gap-5">
        {fields.map((field: Fields, index) => (
          <div className="flex flex-col gap-1" key={index}>
            <label className="capitalize text-bold" htmlFor={field}>
              {field}
            </label>
            <input
              className="text-black focus:outline-none focus:border-gray-600 py-1 px-2 rounded-lg border-gray-300"
              id={field}
              type={field}
              value={user[field]}
              onChange={(e) => setUser({ ...user, [field]: e.target.value })}
              placeholder={field}
            />
          </div>
        ))}
        <button
          onClick={onLogin}
          className="text-bold mt-2 w-full border hover:border-slate-500 hover:bg-blue-600 bg-gray-900 p-2 rounded-lg border-slate-700"
        >
          Login
        </button>
      </div>
      <div className="mt-8 flex-row flex">
        <p>New user?</p>&nbsp;
        <Link className="text-blue-300" href="/signup">
          visit signup page
        </Link>
      </div>
    </div>
  );
}
