import React, { useState } from 'react';
import { Search, Filter, Download, CreditCard, User, Calendar, MapPin } from 'lucide-react';
import { Pasaje } from '../../types';

export function PasajesManager() {
  const [pasajes, setPasajes] = useState<Pasaje[]>([
    {
      codigo: 1,
      fecha_emision: '2024-01-15T10:30:00',
      asiento: 15,
      importe_pagar: 45.00,
      estado: 'Vendido',
      viaje: {
        codigo: 1,
        fecha_hora_salida: '2024-01-15T08:00:00',
        fecha_hora_llegada_estimada: '2024-01-15T16:00:00',
        estado: 'Programado',
        ruta: {
          codigo: 1,
          origen: 'Lima',
          destino: 'Arequipa',
          costo_referencial: 45.00
        },
        bus: {
          codigo: 1,
          placa: 'ABC-123',
          fabricante: 'Mercedes Benz',
          num_asientos: 40,
          estado: 'Operativo'
        },
        chofer: {
          codigo: 1,
          nombre: 'Juan',
          apellidos: 'Pérez',
          dni: '12345678',
          direccion: 'Lima',
          telefono: '999999999',
          email: 'juan@norteexpreso.com',
          cargo: 'Chofer',
          area: 'Operaciones'
        },
        asientos_disponibles: 35
      },
      cliente: {
        codigo: 1,
        nombre: 'María',
        apellidos: 'González',
        dni: '87654321',
        razon_social: undefined,
        ruc: undefined
      }
    },
    {
      codigo: 2,
      fecha_emision: '2024-01-15T11:15:00',
      asiento: 8,
      importe_pagar: 35.00,
      estado: 'Vendido',
      viaje: {
        codigo: 2,
        fecha_hora_salida: '2024-01-15T14:00:00',
        fecha_hora_llegada_estimada: '2024-01-15T22:00:00',
        estado: 'Programado',
        ruta: {
          codigo: 2,
          origen: 'Lima',
          destino: 'Trujillo',
          costo_referencial: 35.00
        },
        bus: {
          codigo: 2,
          placa: 'DEF-456',
          fabricante: 'Scania',
          num_asientos: 44,
          estado: 'Operativo'
        },
        chofer: {
          codigo: 2,
          nombre: 'Carlos',
          apellidos: 'García',
          dni: '87654321',
          direccion: 'Lima',
          telefono: '888888888',
          email: 'carlos@norteexpreso.com',
          cargo: 'Chofer',
          area: 'Operaciones'
        },
        asientos_disponibles: 20
      },
      cliente: {
        codigo: 2,
        nombre: 'Carlos',
        apellidos: 'Mendoza',
        dni: '11223344',
        razon_social: undefined,
        ruc: undefined
      }
    },
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [filterEstado, setFilterEstado] = useState('');
  const [filterFecha, setFilterFecha] = useState('');

  const getEstadoColor = (estado: string) => {
    switch (estado) {
      case 'Vendido':
        return 'bg-green-100 text-green-800';
      case 'Cancelado':
        return 'bg-red-100 text-red-800';
      case 'No Show':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDateTime = (dateTime: string) => {
    const date = new Date(dateTime);
    return {
      date: date.toLocaleDateString('es-PE'),
      time: date.toLocaleTimeString('es-PE', { hour: '2-digit', minute: '2-digit' })
    };
  };

  const filteredPasajes = pasajes.filter(pasaje => {
    const matchesSearch = 
      pasaje.cliente.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pasaje.cliente.apellidos.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pasaje.cliente.dni.includes(searchTerm) ||
      pasaje.viaje.ruta.origen.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pasaje.viaje.ruta.destino.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pasaje.codigo.toString().includes(searchTerm);

    const matchesEstado = !filterEstado || pasaje.estado === filterEstado;
    
    const matchesFecha = !filterFecha || 
      pasaje.fecha_emision.startsWith(filterFecha);

    return matchesSearch && matchesEstado && matchesFecha;
  });

  const totalVentas = filteredPasajes
    .filter(p => p.estado === 'Vendido')
    .reduce((sum, p) => sum + p.importe_pagar, 0);

  const ventasHoy = filteredPasajes
    .filter(p => p.estado === 'Vendido' && p.fecha_emision.startsWith(new Date().toISOString().split('T')[0]))
    .reduce((sum, p) => sum + p.importe_pagar, 0);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="py-6">
        <div className="md:flex md:items-center md:justify-between">
          <div className="flex-1 min-w-0">
            <h1 className="text-2xl font-bold text-azul-oscuro">Gestión de Pasajes</h1>
            <p className="mt-1 text-sm text-gris-suave">
              Administra las ventas y reservas de pasajes
            </p>
          </div>
          <div className="mt-4 flex space-x-3 md:mt-0 md:ml-4">
            <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center space-x-2">
              <Download className="h-5 w-5" />
              <span>Exportar</span>
            </button>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 rounded-lg">
              <CreditCard className="h-6 w-6 text-green-600" />
            </div>
            <div className="ml-4">
              <h3 className="text-lg font-semibold text-azul-oscuro">
                S/ {totalVentas.toFixed(2)}
              </h3>
              <p className="text-sm text-gris-suave">Total Ventas</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Calendar className="h-6 w-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <h3 className="text-lg font-semibold text-azul-oscuro">
                S/ {ventasHoy.toFixed(2)}
              </h3>
              <p className="text-sm text-gris-suave">Ventas Hoy</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex items-center">
            <div className="p-2 bg-purple-100 rounded-lg">
              <User className="h-6 w-6 text-purple-600" />
            </div>
            <div className="ml-4">
              <h3 className="text-lg font-semibold text-azul-oscuro">
                {filteredPasajes.filter(p => p.estado === 'Vendido').length}
              </h3>
              <p className="text-sm text-gris-suave">Pasajes Vendidos</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex items-center">
            <div className="p-2 bg-red-100 rounded-lg">
              <CreditCard className="h-6 w-6 text-red-600" />
            </div>
            <div className="ml-4">
              <h3 className="text-lg font-semibold text-azul-oscuro">
                {filteredPasajes.filter(p => p.estado === 'Cancelado').length}
              </h3>
              <p className="text-sm text-gris-suave">Cancelados</p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white shadow-lg rounded-lg p-6 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-azul-oscuro focus:border-azul-oscuro"
              placeholder="Buscar por cliente, DNI, ruta..."
            />
          </div>
          <select 
            value={filterEstado}
            onChange={(e) => setFilterEstado(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-azul-oscuro focus:border-azul-oscuro"
          >
            <option value="">Todos los estados</option>
            <option value="Vendido">Vendido</option>
            <option value="Cancelado">Cancelado</option>
            <option value="No Show">No Show</option>
          </select>
          <input
            type="date"
            value={filterFecha}
            onChange={(e) => setFilterFecha(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-azul-oscuro focus:border-azul-oscuro"
          />
          <button className="bg-azul-oscuro text-white px-4 py-2 rounded-lg hover:bg-primary-600 transition-colors flex items-center justify-center space-x-2">
            <Filter className="h-5 w-5" />
            <span>Filtrar</span>
          </button>
        </div>
      </div>

      {/* Pasajes Table */}
      <div className="bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Pasaje
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Cliente
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Viaje
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Asiento
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Importe
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Estado
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredPasajes.map((pasaje) => {
                const emision = formatDateTime(pasaje.fecha_emision);
                const salida = formatDateTime(pasaje.viaje.fecha_hora_salida);

                return (
                  <tr key={pasaje.codigo} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-azul-oscuro">
                          #{pasaje.codigo.toString().padStart(6, '0')}
                        </div>
                        <div className="text-sm text-gris-suave">
                          {emision.date} {emision.time}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <User className="h-5 w-5 text-azul-oscuro mr-2" />
                        <div>
                          <div className="text-sm font-medium text-azul-oscuro">
                            {pasaje.cliente.nombre} {pasaje.cliente.apellidos}
                          </div>
                          <div className="text-sm text-gris-suave">
                            DNI: {pasaje.cliente.dni}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <MapPin className="h-5 w-5 text-azul-oscuro mr-2" />
                        <div>
                          <div className="text-sm font-medium text-azul-oscuro">
                            {pasaje.viaje.ruta.origen} → {pasaje.viaje.ruta.destino}
                          </div>
                          <div className="text-sm text-gris-suave">
                            {salida.date} {salida.time}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-azul-oscuro">
                        Asiento {pasaje.asiento}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-azul-oscuro">
                        S/ {pasaje.importe_pagar.toFixed(2)}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getEstadoColor(pasaje.estado)}`}>
                        {pasaje.estado}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-2">
                        <button className="text-azul-oscuro hover:text-primary-600">
                          Ver
                        </button>
                        <button className="text-green-600 hover:text-green-800">
                          Imprimir
                        </button>
                        {pasaje.estado === 'Vendido' && (
                          <button className="text-red-600 hover:text-red-800">
                            Cancelar
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Summary */}
      <div className="mt-6 bg-white shadow-lg rounded-lg p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <h4 className="text-lg font-semibold text-azul-oscuro mb-2">
              Resumen de Ventas
            </h4>
            <div className="text-3xl font-bold text-green-600">
              S/ {totalVentas.toFixed(2)}
            </div>
            <p className="text-sm text-gris-suave">
              {filteredPasajes.filter(p => p.estado === 'Vendido').length} pasajes vendidos
            </p>
          </div>
          
          <div className="text-center">
            <h4 className="text-lg font-semibold text-azul-oscuro mb-2">
              Promedio por Pasaje
            </h4>
            <div className="text-3xl font-bold text-azul-oscuro">
              S/ {filteredPasajes.length > 0 ? (totalVentas / filteredPasajes.filter(p => p.estado === 'Vendido').length).toFixed(2) : '0.00'}
            </div>
            <p className="text-sm text-gris-suave">
              Precio promedio
            </p>
          </div>
          
          <div className="text-center">
            <h4 className="text-lg font-semibold text-azul-oscuro mb-2">
              Tasa de Cancelación
            </h4>
            <div className="text-3xl font-bold text-red-600">
              {filteredPasajes.length > 0 ? ((filteredPasajes.filter(p => p.estado === 'Cancelado').length / filteredPasajes.length) * 100).toFixed(1) : '0.0'}%
            </div>
            <p className="text-sm text-gris-suave">
              {filteredPasajes.filter(p => p.estado === 'Cancelado').length} cancelados
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}