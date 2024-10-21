'use client'

import { useRouter } from 'next/navigation';
import { handleSignOut } from "@/lib/cognitoActions";

export default function Dashboard() {
  const router = useRouter();

  const onSignOut = async () => {
    const result = await handleSignOut();
    if (result.success) {
      router.push('/');
    } else {
      console.log('Error al cerrar sesión:', result.error)
    }
  }
  return (
    <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
      <div className="relative py-3 sm:max-w-xl sm:mx-auto">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-light-blue-500 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
        <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
          <div className="max-w-md mx-auto">
            <div>
              <h1 className="text-2xl font-semibold">Control de Instancia EC2</h1>
            </div>
            <div className="divide-y divide-gray-200">
              <div className="mt-6">
                <button
                  onClick={onSignOut}
                  className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                >
                  Sign Out
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}