import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User, LogOut, Menu, X, Home } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useState } from 'react';

export function Header() {
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header className="bg-azul-oscuro text-white shadow-lg relative z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 hover:opacity-80 transition-opacity">
            <img 
              src="/logo.svg" 
              alt="NORTEEXPRESO" 
              className="h-10 w-auto"
            />
            <div>
              <span className="text-xl font-bold">NORTEEXPRESO</span>
              <div className="text-xs text-amarillo-dorado">Especialistas en el Norte</div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link to="/" className="hover:text-amarillo-dorado transition-colors flex items-center space-x-1">
              <Home className="h-4 w-4" />
              <span>Inicio</span>
            </Link>
            <Link to="/search" className="hover:text-amarillo-dorado transition-colors">
              Buscar Viajes
            </Link>
            <Link to="/promotions" className="hover:text-amarillo-dorado transition-colors relative">
              Promociones
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-2 h-2"></span>
            </Link>
            <Link to="/loyalty" className="hover:text-amarillo-dorado transition-colors">
              Programa Fidelidad
            </Link>
            <Link to="/about" className="hover:text-amarillo-dorado transition-colors">
              Nosotros
            </Link>
            <Link to="/contact" className="hover:text-amarillo-dorado transition-colors">
              Contacto
            </Link>
          </nav>

          {/* User Section */}
          <div className="hidden md:flex items-center space-x-4">
            {isAuthenticated ? (
              <div className="flex items-center space-x-3">
                <Link
                  to="/admin"
                  className="flex items-center space-x-2 px-3 py-2 rounded-lg bg-amarillo-dorado text-azul-oscuro hover:bg-yellow-500 transition-colors"
                >
                  <User className="h-4 w-4" />
                  <span className="text-sm font-medium">{user?.personal.nombre}</span>
                </Link>
                <button
                  onClick={handleLogout}
                  className="p-2 rounded-lg hover:bg-primary-600 transition-colors"
                  title="Cerrar sesión"
                >
                  <LogOut className="h-5 w-5" />
                </button>
              </div>
            ) : (
              <Link
                to="/login"
                className="px-4 py-2 bg-amarillo-dorado text-azul-oscuro rounded-lg hover:bg-yellow-500 transition-colors font-medium"
              >
                Iniciar Sesión
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-primary-600 transition-colors"
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden absolute top-16 left-0 right-0 bg-azul-oscuro border-t border-primary-600 animate-slide-up">
            <nav className="flex flex-col p-4 space-y-3">
              <Link
                to="/"
                className="py-2 hover:text-amarillo-dorado transition-colors flex items-center space-x-2"
                onClick={() => setIsMenuOpen(false)}
              >
                <Home className="h-4 w-4" />
                <span>Inicio</span>
              </Link>
              <Link
                to="/search"
                className="py-2 hover:text-amarillo-dorado transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Buscar Viajes
              </Link>
              <Link
                to="/promotions"
                className="py-2 hover:text-amarillo-dorado transition-colors flex items-center"
                onClick={() => setIsMenuOpen(false)}
              >
                Promociones
                <span className="ml-2 bg-red-500 text-white text-xs rounded-full w-2 h-2"></span>
              </Link>
              <Link
                to="/loyalty"
                className="py-2 hover:text-amarillo-dorado transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Programa Fidelidad
              </Link>
              <Link
                to="/about"
                className="py-2 hover:text-amarillo-dorado transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Nosotros
              </Link>
              <Link
                to="/contact"
                className="py-2 hover:text-amarillo-dorado transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Contacto
              </Link>
              
              <div className="pt-3 border-t border-primary-600">
                {isAuthenticated ? (
                  <div className="space-y-3">
                    <Link
                      to="/admin"
                      className="flex items-center space-x-2 py-2 text-amarillo-dorado"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <User className="h-4 w-4" />
                      <span>{user?.personal.nombre}</span>
                    </Link>
                    <button
                      onClick={() => {
                        handleLogout();
                        setIsMenuOpen(false);
                      }}
                      className="flex items-center space-x-2 py-2 hover:text-amarillo-dorado transition-colors"
                    >
                      <LogOut className="h-4 w-4" />
                      <span>Cerrar Sesión</span>
                    </button>
                  </div>
                ) : (
                  <Link
                    to="/login"
                    className="block py-2 px-4 bg-amarillo-dorado text-azul-oscuro rounded-lg hover:bg-yellow-500 transition-colors font-medium text-center"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Iniciar Sesión
                  </Link>
                )}
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}