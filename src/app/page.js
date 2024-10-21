import Logo from "@/ui/logo";
import { ArrowRightIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

export default function Page() {
  return (
    <main className="flex min-h-screen flex-col p-6">
      <div className="flex h-20 md:h-52 items-center pl-12 rounded-lg bg-gray-500 p-4">
        <Logo />
      </div>
      <div className="min-h-[400px] flex items-center justify-center bg-gray-100">
        <div className="max-w-md w-full space-y-8">
          <div>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
              Bienvenido al sistema de Control de encendido de instancias ERP Yucay
            </h2>
            <div className="mt-4 max-w-md w-full flex justify-center">
              <Link
                href="/auth/login"
                className="flex items-center gap-5 self-start rounded-lg bg-blue-500 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-blue-400 md:text-base"
              >
                <span>Log in</span> <ArrowRightIcon className="w-5 md:w-6" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}