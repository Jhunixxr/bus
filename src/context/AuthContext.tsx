import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Usuario } from '../types';

interface AuthContextType {
  user: Usuario | null;
  login: (usuario: string, password: string) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<Usuario | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Verificar si hay un usuario guardado en localStorage
    const savedUser = localStorage.getItem('norteexpreso_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (usuario: string, password: string): Promise<boolean> => {
    try {
      // Simulación de login - en producción conectar con API
      const mockUser: Usuario = {
        codigo: 1,
        usuario: usuario,
        estado: 'activo',
        personal: {
          codigo: 1,
          nombre: 'Admin',
          apellidos: 'Sistema',
          dni: '12345678',
          direccion: 'Lima, Perú',
          telefono: '999999999',
          email: 'admin@norteexpreso.com',
          cargo: 'Administrador',
          area: 'Sistemas'
        },
        tipo_usuario: 'Administrador'
      };

      if (usuario === 'admin' && password === 'admin123') {
        setUser(mockUser);
        localStorage.setItem('norteexpreso_user', JSON.stringify(mockUser));
        return true;
      }
      return false;
    } catch (error) {
      console.error('Error en login:', error);
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('norteexpreso_user');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        isAuthenticated: !!user,
        isLoading
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}