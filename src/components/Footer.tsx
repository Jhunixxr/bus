import React from 'react';
import { Phone, Mail, MapPin, Facebook, Instagram, Twitter, Award, Shield, Clock } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-azul-oscuro text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Logo y descripción */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-3 mb-6">
              <img 
                src="/logo.png" 
                alt="NORTEEXPRESO" 
                className="h-12 w-auto"
              />
              <span className="text-2xl font-bold">NORTEEXPRESO</span>
            </div>
            <p className="text-gray-300 mb-6 max-w-md">
              Más de 30 años brindando el mejor servicio de transporte interprovincial en el Perú. 
              Tu comodidad y seguridad son nuestra prioridad.
            </p>
            
            {/* Certificaciones */}
            <div className="flex items-center space-x-4 mb-6">
              <div className="flex items-center space-x-2 bg-white/10 px-3 py-2 rounded-lg">
                <Shield className="h-4 w-4 text-amarillo-dorado" />
                <span className="text-sm">Certificado ISO</span>
              </div>
              <div className="flex items-center space-x-2 bg-white/10 px-3 py-2 rounded-lg">
                <Award className="h-4 w-4 text-amarillo-dorado" />
                <span className="text-sm">Premio Calidad</span>
              </div>
            </div>
            
            <div className="flex space-x-4">
              <a href="#" className="text-gray-300 hover:text-amarillo-dorado transition-colors">
                <Facebook className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-300 hover:text-amarillo-dorado transition-colors">
                <Instagram className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-300 hover:text-amarillo-dorado transition-colors">
                <Twitter className="h-6 w-6" />
              </a>
            </div>
          </div>

          {/* Enlaces rápidos */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-amarillo-dorado">Enlaces Rápidos</h3>
            <ul className="space-y-3">
              <li>
                <a href="/search" className="text-gray-300 hover:text-white transition-colors flex items-center">
                  <div className="w-1.5 h-1.5 bg-amarillo-dorado rounded-full mr-2"></div>
                  Buscar Viajes
                </a>
              </li>
              <li>
                <a href="/loyalty" className="text-gray-300 hover:text-white transition-colors flex items-center">
                  <div className="w-1.5 h-1.5 bg-amarillo-dorado rounded-full mr-2"></div>
                  Programa Fidelidad
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white transition-colors flex items-center">
                  <div className="w-1.5 h-1.5 bg-amarillo-dorado rounded-full mr-2"></div>
                  Nuestras Rutas
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white transition-colors flex items-center">
                  <div className="w-1.5 h-1.5 bg-amarillo-dorado rounded-full mr-2"></div>
                  Términos y Condiciones
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white transition-colors flex items-center">
                  <div className="w-1.5 h-1.5 bg-amarillo-dorado rounded-full mr-2"></div>
                  Política de Privacidad
                </a>
              </li>
            </ul>
          </div>

          {/* Contacto */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-amarillo-dorado">Contacto</h3>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-amarillo-dorado/20 rounded-lg flex items-center justify-center">
                  <Phone className="h-4 w-4 text-amarillo-dorado" />
                </div>
                <div>
                  <p className="text-white font-medium">+51 1 234-5678</p>
                  <p className="text-gray-400 text-sm">24/7 Atención al cliente</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-amarillo-dorado/20 rounded-lg flex items-center justify-center">
                  <Mail className="h-4 w-4 text-amarillo-dorado" />
                </div>
                <div>
                  <p className="text-white font-medium">info@norteexpreso.com</p>
                  <p className="text-gray-400 text-sm">Respuesta en 24h</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-amarillo-dorado/20 rounded-lg flex items-center justify-center mt-1">
                  <MapPin className="h-4 w-4 text-amarillo-dorado" />
                </div>
                <div>
                  <p className="text-white font-medium">
                    Av. Javier Prado Este 123
                  </p>
                  <p className="text-gray-400 text-sm">
                    San Isidro, Lima - Perú
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom section */}
        <div className="border-t border-primary-600 mt-8 pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <p className="text-gray-300 text-center md:text-left mb-4 md:mb-0">
              &copy; 2024 NORTEEXPRESO. Todos los derechos reservados.
            </p>
            
            <div className="flex items-center space-x-6 text-sm text-gray-400">
              <div className="flex items-center space-x-2">
                <Clock className="h-4 w-4" />
                <span>Puntualidad 99.2%</span>
              </div>
              <div className="flex items-center space-x-2">
                <Shield className="h-4 w-4" />
                <span>Viajes seguros</span>
              </div>
              <div className="flex items-center space-x-2">
                <Award className="h-4 w-4" />
                <span>30+ años</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}