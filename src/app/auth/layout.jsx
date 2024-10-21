import Logo from "@/ui/logo";
import Link from 'next/link';

export default function Layout({ children }) {
  return (
    <main className="flex items-center justify-center md:h-screen">
      <div className="relative mx-auto flex w-full max-w-[400px] flex-col space-y-2.5 p-4 md:-mt-32">
        <div className="flex h-20 w-full items-end rounded-lg bg-gray-500 p-3 md:h-36">
          <div className="w-42 text-white md:w-46">
            <Link href="/" >
              <Logo />
            </Link>
          </div>
        </div>
        {children}
      </div>
    </main>
  );
}