'use client'

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { handleSignOut } from "@/lib/cognitoActions";

export default function Dashboard() {
  const router = useRouter();

  const [ec2Status, setEC2Status] = useState('unknown');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStatus = async () => {
      try {
        const response = await fetch('/api/ec2');
        if (!response.ok) throw new Error('Error al obtener el estado');
        const data = await response.json();
        setEC2Status(data.status);
        setError(null);
      } catch (err) {
        console.error('Error fetching EC2 status:', err);
        setError('No se pudo obtener el estado del servidor');
      }
    };

    fetchStatus();
    const intervalId = setInterval(fetchStatus, 30000);
    return () => clearInterval(intervalId);
  }, []);

  const handleEC2Action = async (action) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch('/api/ec2', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ action }),
      });
      if (!response.ok) throw new Error('Error en la acción del servidor');
      const data = await response.json();
      if (data.success) {
        setEC2Status(action === 'start' ? 'running' : 'stopped');
      } else {
        throw new Error(data.message);
      }
    } catch (err) {
      console.error('Error:', err);
      setError(err.message || 'Error al realizar la acción');
    } finally {
      setIsLoading(false);
    }
  };

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
              <h1 className="text-2xl font-semibold mb-6">Control de Instancia EC2</h1>
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="font-medium">Estado del servidor:</span>
                <span className={`px-2 py-1 rounded-full text-sm ${
                  ec2Status === 'running' ? 'bg-green-200 text-green-800' :
                  ec2Status === 'stopped' ? 'bg-red-200 text-red-800' :
                  'bg-gray-200 text-gray-800'
                }`}>
                  {ec2Status === 'running' ? 'Encendido' :
                   ec2Status === 'stopped' ? 'Apagado' : 'Desconocido'}
                </span>
              </div>
              <div className="flex space-x-4">
                <button
                  onClick={() => handleEC2Action('start')}
                  disabled={isLoading || ec2Status === 'running'}
                  className="flex-1 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors disabled:opacity-50"
                >
                  Iniciar Servidor
                </button>
                <button
                  onClick={() => handleEC2Action('stop')}
                  disabled={isLoading || ec2Status === 'stopped'}
                  className="flex-1 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors disabled:opacity-50"
                >
                  Apagar Servidor
                </button>
              </div>
              {error && (
                <div className="text-red-500 text-sm mt-2">
                  {error}
                </div>
              )}
              <div className="pt-4">
                <button
                  onClick={onSignOut}
                  className="w-full px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
                >
                  Cerrar Sesión
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}