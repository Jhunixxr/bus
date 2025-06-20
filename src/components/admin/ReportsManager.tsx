import React, { useState, useEffect } from 'react';
import { BarChart3, TrendingUp, Download, Calendar, DollarSign, Users, MapPin, FileText, PieChart } from 'lucide-react';

export function ReportsManager() {
  const [selectedReport, setSelectedReport] = useState('ventas');
  const [dateRange, setDateRange] = useState({
    inicio: new Date(new Date().getFullYear(), new Date().getMonth(), 1).toISOString().split('T')[0],
    fin: new Date().toISOString().split('T')[0]
  });
  const [reportData, setReportData] = useState(null);
  const [loading, setLoading] = useState(false);

  // Datos simulados para reportes
  const ventasData = {
    totalIngresos: 125450.50,
    totalPasajes: 2847,
    promedioVenta: 44.05,
    crecimiento: 12.5,
    ventasPorDia: [
      { fecha: '2024-01-01', ingresos: 4500, pasajes: 102 },
      { fecha: '2024-01-02', ingresos: 5200, pasajes: 118 },
      { fecha: '2024-01-03', ingresos: 3800, pasajes: 86 },
      { fecha: '2024-01-04', ingresos: 6100, pasajes: 139 },
      { fecha: '2024-01-05', ingresos: 4900, pasajes: 111 },
      { fecha: '2024-01-06', ingresos: 5500, pasajes: 125 },
      { fecha: '2024-01-07', ingresos: 4700, pasajes: 107 }
    ]
  };

  const rutasData = [
    { ruta: 'Lima - Trujillo', pasajes: 856, ingresos: 29960, ocupacion: 85 },
    { ruta: 'Lima - Chiclayo', pasajes: 742, ingresos: 29680, ocupacion: 78 },
    { ruta: 'Lima - Piura', pasajes: 523, ingresos: 28765, ocupacion: 92 },
    { ruta: 'Lima - Cajamarca', pasajes: 445, ingresos: 20025, ocupacion: 70 },
    { ruta: 'Trujillo - Chiclayo', pasajes: 281, ingresos: 7025, ocupacion: 65 }
  ];

  const busesData = [
    { placa: 'NTE-001', viajes: 45, ingresos: 15750, ocupacion: 88, estado: 'Operativo' },
    { placa: 'NTE-002', viajes: 52, ingresos: 18200, ocupacion: 82, estado: 'Operativo' },
    { placa: 'NTE-003', viajes: 38, ingresos: 13300, ocupacion: 75, estado: 'Operativo' },
    { placa: 'NTE-004', viajes: 41, ingresos: 14350, ocupacion: 79, estado: 'Operativo' },
    { placa: 'NTE-005', viajes: 28, ingresos: 9800, ocupacion: 70, estado: 'Mantenimiento' }
  ];

  const personalData = [
    { nombre: 'Carlos Mendoza', cargo: 'Chofer', viajes: 45, ingresos: 15750, calificacion: 4.8 },
    { nombre: 'Luis García', cargo: 'Chofer', viajes: 52, ingresos: 18200, calificacion: 4.9 },
    { nombre: 'María González', cargo: 'Vendedor', ventas: 156, ingresos: 54600, calificacion: 4.7 },
    { nombre: 'Ana Rodríguez', cargo: 'Vendedor', ventas: 142, ingresos: 49700, calificacion: 4.6 }
  ];

  const generateReport = () => {
    setLoading(true);
    setTimeout(() => {
      switch (selectedReport) {
        case 'ventas':
          setReportData(ventasData);
          break;
        case 'rutas':
          setReportData(rutasData);
          break;
        case 'buses':
          setReportData(busesData);
          break;
        case 'personal':
          setReportData(personalData);
          break;
        default:
          setReportData(null);
      }
      setLoading(false);
    }, 1000);
  };

  useEffect(() => {
    generateReport();
  }, [selectedReport, dateRange]);

  const exportReport = (format) => {
    // Simulación de exportación
    const fileName = `reporte_${selectedReport}_${dateRange.inicio}_${dateRange.fin}.${format}`;
    alert(`Exportando reporte: ${fileName}`);
  };

  const reportTypes = [
    { id: 'ventas', name: 'Reporte de Ventas', icon: DollarSign, color: 'bg-green-100 text-green-600' },
    { id: 'rutas', name: 'Análisis de Rutas', icon: MapPin, color: 'bg-blue-100 text-blue-600' },
    { id: 'buses', name: 'Rendimiento de Buses', icon: BarChart3, color: 'bg-purple-100 text-purple-600' },
    { id: 'personal', name: 'Desempeño Personal', icon: Users, color: 'bg-orange-100 text-orange-600' }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="py-6">
        <div className="md:flex md:items-center md:justify-between">
          <div className="flex-1 min-w-0">
            <h1 className="text-2xl font-bold text-azul-oscuro">Centro de Reportes</h1>
            <p className="mt-1 text-sm text-gris-suave">
              Análisis detallado de operaciones y rendimiento
            </p>
          </div>
          <div className="mt-4 flex space-x-3 md:mt-0 md:ml-4">
            <button
              onClick={() => exportReport('pdf')}
              className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors flex items-center space-x-2"
            >
              <Download className="h-5 w-5" />
              <span>PDF</span>
            </button>
            <button
              onClick={() => exportReport('xlsx')}
              className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center space-x-2"
            >
              <Download className="h-5 w-5" />
              <span>Excel</span>
            </button>
          </div>
        </div>
      </div>

      {/* Report Type Selection */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {reportTypes.map((type) => (
          <button
            key={type.id}
            onClick={() => setSelectedReport(type.id)}
            className={`p-6 rounded-xl border-2 transition-all text-left ${
              selectedReport === type.id
                ? 'border-azul-oscuro bg-blue-50'
                : 'border-gray-200 hover:border-gray-300 bg-white'
            }`}
          >
            <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-4 ${type.color}`}>
              <type.icon className="h-6 w-6" />
            </div>
            <h3 className="font-semibold text-azul-oscuro mb-2">{type.name}</h3>
            <p className="text-sm text-gris-suave">
              {type.id === 'ventas' && 'Ingresos, pasajes vendidos y tendencias'}
              {type.id === 'rutas' && 'Popularidad y rentabilidad por ruta'}
              {type.id === 'buses' && 'Utilización y mantenimiento de flota'}
              {type.id === 'personal' && 'Productividad y desempeño del equipo'}
            </p>
          </button>
        ))}
      </div>

      {/* Date Range Filter */}
      <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <h3 className="text-lg font-semibold text-azul-oscuro mb-4 md:mb-0">
            Filtros de Fecha
          </h3>
          <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Fecha Inicio
              </label>
              <input
                type="date"
                value={dateRange.inicio}
                onChange={(e) => setDateRange(prev => ({ ...prev, inicio: e.target.value }))}
                className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-azul-oscuro focus:border-azul-oscuro"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Fecha Fin
              </label>
              <input
                type="date"
                value={dateRange.fin}
                onChange={(e) => setDateRange(prev => ({ ...prev, fin: e.target.value }))}
                className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-azul-oscuro focus:border-azul-oscuro"
              />
            </div>
            <div className="flex items-end">
              <button
                onClick={generateReport}
                className="bg-azul-oscuro text-white px-6 py-2 rounded-lg hover:bg-primary-600 transition-colors"
              >
                Generar
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Report Content */}
      {loading ? (
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-azul-oscuro mx-auto mb-4"></div>
          <p className="text-gris-suave">Generando reporte...</p>
        </div>
      ) : (
        <div className="space-y-8">
          {/* Ventas Report */}
          {selectedReport === 'ventas' && reportData && (
            <>
              {/* KPIs */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="bg-white rounded-xl shadow-lg p-6">
                  <div className="flex items-center">
                    <div className="p-2 bg-green-100 rounded-lg">
                      <DollarSign className="h-6 w-6 text-green-600" />
                    </div>
                    <div className="ml-4">
                      <h3 className="text-lg font-semibold text-azul-oscuro">
                        S/ {reportData.totalIngresos.toLocaleString()}
                      </h3>
                      <p className="text-sm text-gris-suave">Total Ingresos</p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white rounded-xl shadow-lg p-6">
                  <div className="flex items-center">
                    <div className="p-2 bg-blue-100 rounded-lg">
                      <Users className="h-6 w-6 text-blue-600" />
                    </div>
                    <div className="ml-4">
                      <h3 className="text-lg font-semibold text-azul-oscuro">
                        {reportData.totalPasajes.toLocaleString()}
                      </h3>
                      <p className="text-sm text-gris-suave">Pasajes Vendidos</p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white rounded-xl shadow-lg p-6">
                  <div className="flex items-center">
                    <div className="p-2 bg-purple-100 rounded-lg">
                      <BarChart3 className="h-6 w-6 text-purple-600" />
                    </div>
                    <div className="ml-4">
                      <h3 className="text-lg font-semibold text-azul-oscuro">
                        S/ {reportData.promedioVenta.toFixed(2)}
                      </h3>
                      <p className="text-sm text-gris-suave">Promedio por Venta</p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white rounded-xl shadow-lg p-6">
                  <div className="flex items-center">
                    <div className="p-2 bg-yellow-100 rounded-lg">
                      <TrendingUp className="h-6 w-6 text-yellow-600" />
                    </div>
                    <div className="ml-4">
                      <h3 className="text-lg font-semibold text-azul-oscuro">
                        +{reportData.crecimiento}%
                      </h3>
                      <p className="text-sm text-gris-suave">Crecimiento</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Ventas por día */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-lg font-semibold text-azul-oscuro mb-6">
                  Ventas por Día
                </h3>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Fecha
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Ingresos
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Pasajes
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Promedio
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {reportData.ventasPorDia.map((venta, index) => (
                        <tr key={index}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-azul-oscuro">
                            {new Date(venta.fecha).toLocaleDateString('es-PE')}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-azul-oscuro">
                            S/ {venta.ingresos.toLocaleString()}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-azul-oscuro">
                            {venta.pasajes}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-azul-oscuro">
                            S/ {(venta.ingresos / venta.pasajes).toFixed(2)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </>
          )}

          {/* Rutas Report */}
          {selectedReport === 'rutas' && reportData && (
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-semibold text-azul-oscuro mb-6">
                Análisis de Rutas
              </h3>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Ruta
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Pasajes
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Ingresos
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Ocupación
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Rendimiento
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {reportData.map((ruta, index) => (
                      <tr key={index}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-azul-oscuro">
                          {ruta.ruta}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-azul-oscuro">
                          {ruta.pasajes}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-azul-oscuro">
                          S/ {ruta.ingresos.toLocaleString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="text-sm font-medium text-azul-oscuro mr-2">
                              {ruta.ocupacion}%
                            </div>
                            <div className="w-16 bg-gray-200 rounded-full h-2">
                              <div
                                className={`h-2 rounded-full ${
                                  ruta.ocupacion >= 80 ? 'bg-green-500' :
                                  ruta.ocupacion >= 60 ? 'bg-yellow-500' : 'bg-red-500'
                                }`}
                                style={{ width: `${ruta.ocupacion}%` }}
                              />
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                            ruta.ocupacion >= 80 ? 'bg-green-100 text-green-800' :
                            ruta.ocupacion >= 60 ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'
                          }`}>
                            {ruta.ocupacion >= 80 ? 'Excelente' :
                             ruta.ocupacion >= 60 ? 'Bueno' : 'Mejorable'}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Buses Report */}
          {selectedReport === 'buses' && reportData && (
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-semibold text-azul-oscuro mb-6">
                Rendimiento de Buses
              </h3>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Placa
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Viajes
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Ingresos
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Ocupación
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Estado
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {reportData.map((bus, index) => (
                      <tr key={index}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-azul-oscuro">
                          {bus.placa}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-azul-oscuro">
                          {bus.viajes}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-azul-oscuro">
                          S/ {bus.ingresos.toLocaleString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-azul-oscuro">
                          {bus.ocupacion}%
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                            bus.estado === 'Operativo' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                          }`}>
                            {bus.estado}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Personal Report */}
          {selectedReport === 'personal' && reportData && (
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-semibold text-azul-oscuro mb-6">
                Desempeño del Personal
              </h3>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Empleado
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Cargo
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actividad
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Ingresos Generados
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Calificación
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {reportData.map((empleado, index) => (
                      <tr key={index}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-azul-oscuro">
                          {empleado.nombre}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-azul-oscuro">
                          {empleado.cargo}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-azul-oscuro">
                          {empleado.viajes ? `${empleado.viajes} viajes` : `${empleado.ventas} ventas`}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-azul-oscuro">
                          S/ {empleado.ingresos.toLocaleString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <span className="text-sm font-medium text-azul-oscuro mr-2">
                              {empleado.calificacion}
                            </span>
                            <div className="flex text-yellow-400">
                              {[...Array(5)].map((_, i) => (
                                <span key={i} className={i < Math.floor(empleado.calificacion) ? 'text-yellow-400' : 'text-gray-300'}>
                                  ★
                                </span>
                              ))}
                            </div>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}