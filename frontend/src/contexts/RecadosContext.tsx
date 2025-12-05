import { createContext, useContext, ReactNode, useState } from "react";

interface Recado {
  id: string;
  titulo: string;
  conteudo: string;
  tipo: "recado" | "evento" | "popup" | "carrossel";
  ativo: boolean;
}

interface RecadosContextType {
  recados: Recado[];
  adicionarRecado: (recado: Omit<Recado, "id">) => void;
  removerRecado: (id: string) => void;
  toggleAtivoRecado: (id: string) => void;
}

const RecadosContext = createContext<RecadosContextType | undefined>(undefined);

export const RecadosProvider = ({ children }: { children: ReactNode }) => {
  const [recados, setRecados] = useState<Recado[]>([]);

  const adicionarRecado = (recado: Omit<Recado, "id">) => {
    const novo = { ...recado, id: Date.now().toString() };
    setRecados(prev => [...prev, novo]);
  };

  const removerRecado = (id: string) => {
    setRecados(prev => prev.filter(r => r.id !== id));
  };

  const toggleAtivoRecado = (id: string) => {
    setRecados(prev => prev.map(r => r.id === id ? { ...r, ativo: !r.ativo } : r));
  };

  return (
    <RecadosContext.Provider value={{ recados, adicionarRecado, removerRecado, toggleAtivoRecado }}>
      {children}
    </RecadosContext.Provider>
  );
};

export const useRecados = () => {
  const context = useContext(RecadosContext);
  if (!context) throw new Error("useRecados deve ser usado dentro do RecadosProvider");
  return context;
};
