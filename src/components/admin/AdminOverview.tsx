import React from 'react';
import { TrendingUp, Users, Bus, CreditCard, Calendar, AlertCircle } from 'lucide-react';

export function AdminOverview() {
  const stats = [
    {
      name: 'Ventas del día',
      value: 'S/ 12,450',
      change: '+12%',
      changeType: 'increase',
      icon: CreditCard,
    },
    {
      name: 'Pasajeros hoy',
      value: '234',
      change: '+5%',
      changeType: 'increase',
      icon: Users,
    },
    {
      name: 'Buses operativos',
      value: '45',
      change: '-2',
      changeType: 'decrease',
      icon: Bus,
    },
    {
      name: 'Viajes programados',
      value: '28',
      change: '+3',
      changeType: 'increase',
      icon: Calendar,
    },
  ];

  const recentBookings = [
    {
      id: 'P001',
      passenger: 'María González',
      route: 'Lima - Arequipa',
      departure: '08:00',
      amount: 'S/ 45.00',
      status: 'Confirmado'
    },
    {
      id: 'P002',
      passenger: 'Carlos Mendoza',
      route: 'Lima - Trujillo',
      departure: '14:30',
      amount: 'S/ 35.00',
      status: 'Confirmado'
    },
    {
      id: 'P003',
      passenger: 'Ana Rodríguez',
      route: 'Lima - Cusco',
      departure: '20:00',
      amount: 'S/ 65.00',
      status: 'Pendiente'
    },
  ];

  const alerts = [
    {
      type: 'warning',
      message: 'Bus ABC-123 requiere mantenimiento preventivo',
      time: 'Hace 2 horas'
    },
    {
      type: 'info',
      message: 'Nueva ruta Lima-Iquitos disponible desde mañana',
      time: 'Hace 4 horas'
    },
    {
      type: 'error',
      message: 'Retraso en viaje V-456 por tráfico intenso',
      time: 'Hace 1 hora'
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="py-6">
        <h1 className="text-2xl font-bold text-azul-oscuro">Dashboard</h1>
        <p className="mt-1 text-sm text-gris-suave">
          Resumen general de operaciones
        </p>
      </div>

      {/* Stats */}
      <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((item) => (
          <div key={item.name} className="bg-white overflow-hidden shadow-lg rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <item.icon className="h-6 w-6 text-azul-oscuro" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gris-suave truncate">
                      {item.name}
                    </dt>
                    <dd className="text-lg font-medium text-azul-oscuro">
                      {item.value}
                    </dd>
                  </dl>
                </div>
              </div>
              <div className="mt-4">
                <div className="flex items-center">
                  <div className={`flex items-center text-sm ${
                    item.changeType === 'increase' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    <TrendingUp className={`h-4 w-4 mr-1 ${
                      item.changeType === 'decrease' ? 'rotate-180' : ''
                    }`} />
                    {item.change}
                  </div>
                  <div className="ml-2 text-sm text-gris-suave">
                    vs. ayer
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Bookings */}
        <div className="bg-white shadow-lg rounded-lg">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-medium text-azul-oscuro">
              Reservas Recientes
            </h3>
          </div>
          <div className="overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Pasajero
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Ruta
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Monto
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Estado
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {recentBookings.map((booking) => (
                  <tr key={booking.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-azul-oscuro">
                        {booking.passenger}
                      </div>
                      <div className="text-sm text-gris-suave">
                        {booking.id}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-azul-oscuro">
                        {booking.route}
                      </div>
                      <div className="text-sm text-gris-suave">
                        {booking.departure}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-azul-oscuro">
                      {booking.amount}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        booking.status === 'Confirmado'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {booking.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Alerts */}
        <div className="bg-white shadow-lg rounded-lg">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-medium text-azul-oscuro">
              Alertas y Notificaciones
            </h3>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {alerts.map((alert, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <div className={`flex-shrink-0 w-2 h-2 rounded-full mt-2 ${
                    alert.type === 'error' ? 'bg-red-500' :
                    alert.type === 'warning' ? 'bg-yellow-500' : 'bg-blue-500'
                  }`} />
                  <div className="flex-1">
                    <p className="text-sm text-azul-oscuro">
                      {alert.message}
                    </p>
                    <p className="text-xs text-gris-suave mt-1">
                      {alert.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="mt-8">
        <div className="bg-white shadow-lg rounded-lg p-6">
          <h3 className="text-lg font-medium text-azul-oscuro mb-4">
            Acciones Rápidas
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <button className="bg-azul-oscuro text-white px-4 py-3 rounded-lg hover:bg-primary-600 transition-colors text-sm font-medium">
              Nuevo Viaje
            </button>
            <button className="bg-amarillo-dorado text-azul-oscuro px-4 py-3 rounded-lg hover:bg-yellow-500 transition-colors text-sm font-medium">
              Registrar Bus
            </button>
            <button className="border border-azul-oscuro text-azul-oscuro px-4 py-3 rounded-lg hover:bg-azul-oscuro hover:text-white transition-colors text-sm font-medium">
              Ver Reportes
            </button>
            <button className="border border-gray-300 text-gray-700 px-4 py-3 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium">
              Configuración
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}