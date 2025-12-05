import { createContext, useContext, useState, ReactNode } from "react";

interface User {
  id: string;
  name: string;
  role: "padre" | "coordenacao1" | "coordenacao2";
  email: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  login: async () => false,
  logout: () => {}
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  const login = async (email: string, password: string) => {
    // Login simulado apenas para teste
    const loginsValidos: User[] = [
      { id: "1", name: "Padre", role: "padre", email: "padre@santuario.com" },
      { id: "2", name: "Coordenacao 1", role: "coordenacao1", email: "coord1@santuario.com" },
      { id: "3", name: "Coordenacao 2", role: "coordenacao2", email: "coord2@santuario.com" }
    ];

    const usuario = loginsValidos.find(u => u.email === email && password === "123456");

    if (usuario) {
      setUser(usuario);
      return true;
    } else {
      alert("Email ou senha inválidos");
      return false;
    }
  };

  const logout = () => setUser(null);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
