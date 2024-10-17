'use client'

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../hooks/useAuth';
import axios from 'axios';

export default function Dashboard() {
  const [instanceState, setInstanceState] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const { isAuthenticated, logout } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login');
    } else {
      fetchInstanceState();
    }
  }, [isAuthenticated]);

  const fetchInstanceState = async () => {
    try {
      const response = await axios.get('https://a7oe0km689.execute-api.us-east-2.amazonaws.com/default/StatusERP');
      setInstanceState(response.data.state);
      setIsLoading(false);
    } catch (error) {
      console.error('Error al obtener el estado de la instancia:', error);
      setIsLoading(false);
    }
  };

  const handleStartStop = async (action) => {
    try {
      setIsLoading(true);
      const apiStartStop = action === "start"?"https://xu7alw3v53.execute-api.us-east-2.amazonaws.com/default/StartERP":"https://hcok7hlva3.execute-api.us-east-2.amazonaws.com/default/StopERP"
      await axios.post(apiStartStop);
      await fetchInstanceState();
    } catch (error) {
      console.error(`Error al ${action === 'start' ? 'iniciar' : 'detener'} la instancia:`, error);
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    logout();
    router.push('/login');
  };

  if (!isAuthenticated) {
    return null;
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
              <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                <p>Estado actual: {isLoading ? 'Cargando...' : instanceState}</p>
                <div className="flex justify-between">
                  <button
                    onClick={() => handleStartStop('start')}
                    disabled={isLoading || instanceState === 'running'}
                    className="px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50"
                  >
                    Encender
                  </button>
                  <button
                    onClick={() => handleStartStop('stop')}
                    disabled={isLoading || instanceState === 'stopped'}
                    className="px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:opacity-50"
                  >
                    Apagar
                  </button>
                </div>
              </div>
              <div className="pt-6 text-base leading-6 font-bold sm:text-lg sm:leading-7">
                <button
                  onClick={handleLogout}
                  className="text-indigo-600 hover:text-indigo-500"
                >
                  Cerrar sesión
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}