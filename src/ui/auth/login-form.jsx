"use client";

import { ArrowRightIcon } from "@heroicons/react/20/solid";
import Button from "@/ui/button";
import { useFormState, useFormStatus } from "react-dom";
import { handleSignIn } from "@/lib/cognitoActions";
import Link from "next/link";

export default function LoginForm() {
  const [errorMessage, dispatch] = useFormState(handleSignIn, undefined);
  return (
    <form action={dispatch} className="bg-white shadow-2xl rounded-lg px-8 pt-6 pb-8 mb-4">
          <h1 className="mb-6 text-2xl font-bold text-center text-gray-900">
            Login
          </h1>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="email"
            >
              Email
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="email"
              type="email"
              name="email"
              placeholder="Email"
              required
            />
          </div>
          <div className="mb-6">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="password"
            >
              Password
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              type="password"
              name="password"
              placeholder="Password"
              required
              minLength={6}
            />
          </div>
          <div className="flex items-center justify-between mb-6">
            <LoginButton />
          </div>
          {errorMessage && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
              <span className="block sm:inline">{errorMessage}</span>
            </div>
          )}
        </form>
  );
}

function LoginButton() {
  const { pending } = useFormStatus();

  return (
    <Button className="mt-4 w-full flex justify-center items-center bg-blue-500 hover:bg-blue-400 text-white font-medium py-3 px-6 rounded-lg shadow-md" aria-disabled={pending}>
      <span>Log in</span>
      <ArrowRightIcon className="ml-2 h-5 w-5" />
    </Button>
  );
}