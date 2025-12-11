// components/DebugSync.tsx (SISTEMA DE MONITORAMENTO)
import React, { useEffect, useState } from 'react';
import { useConteudo } from '@/contexts/ConteudoContext';
import { RefreshCw, AlertCircle, Check, X, Database } from 'lucide-react';

export default function DebugSync() {
  const { carrossel, momentosLiturgicos, popups, recados, recarregarDados } = useConteudo();
  const [ultimaAtualizacao, setUltimaAtualizacao] = useState<string>('');
  const [mostrarDebug, setMostrarDebug] = useState(true);
  const [statusSistema, setStatusSistema] = useState<'online' | 'offline'>('online');

  // Monitorar atualizações
  useEffect(() => {
    const agora = new Date().toLocaleTimeString('pt-BR', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
    setUltimaAtualizacao(agora);
    
    // Verificar se dados estão sincronizados
    const lsData = localStorage.getItem('santuario-dados');
    if (!lsData) {
      setStatusSistema('offline');
      console.error('❌ SISTEMA OFFLINE: Nenhum dado no localStorage');
    }
  }, [carrossel, momentosLiturgicos, popups, recados]);

  const handleForceSync = () => {
    console.log('🔄 SINCRONIZAÇÃO MANUAL INICIADA');
    
    // 1. Recarrega do contexto
    recarregarDados();
    
    // 2. Dispara evento para outras abas
    window.dispatchEvent(new CustomEvent('dadosAtualizados', {
      detail: { origem: 'DebugSync', manual: true }
    }));
    
    // 3. Feedback
    setUltimaAtualizacao(new Date().toLocaleTimeString('pt-BR') + ' (manual)');
    console.log('✅ Sincronização concluída');
  };

  const verificarLocalStorage = () => {
    const lsData = localStorage.getItem('santuario-dados');
    if (lsData) {
      const parsed = JSON.parse(lsData);
      console.log('📊 LOCALSTORAGE ATUAL:', {
        carrossel: parsed.carrossel?.length || 0,
        momentos: parsed.momentosLiturgicos?.length || 0,
        popups: parsed.popups?.length || 0,
        recados: parsed.recados?.length || 0,
        ultimaAtualizacao: parsed.ultimaAtualizacao
      });
      alert('Verifique o Console (F12) para ver os dados');
    } else {
      alert('❌ Nenhum dado encontrado no localStorage');
    }
  };

  if (!mostrarDebug) return null;

  return (
    <div className="fixed bottom-4 right-4 bg-gray-900 text-white p-4 rounded-xl shadow-2xl z-50 max-w-sm border border-gray-700">
      <div className="flex justify-between items-center mb-3">
        <div className="flex items-center gap-2">
          <Database size={16} className={statusSistema === 'online' ? 'text-green-400' : 'text-red-400'} />
          <h3 className="font-bold text-sm">Sistema Admin</h3>
          <span className={`text-xs px-2 py-0.5 rounded ${statusSistema === 'online' ? 'bg-green-900 text-green-300' : 'bg-red-900 text-red-300'}`}>
            {statusSistema === 'online' ? 'ONLINE' : 'OFFLINE'}
          </span>
        </div>
        <button onClick={() => setMostrarDebug(false)} className="text-gray-400 hover:text-white">
          <X size={16} />
        </button>
      </div>
      
      {/* Estatísticas */}
      <div className="space-y-2 mb-4">
        <div className="grid grid-cols-2 gap-2 text-xs">
          <div className="bg-gray-800/50 p-2 rounded">
            <div className="text-gray-400">Carrossel</div>
            <div className="font-bold">{carrossel.filter(c => c.ativo).length}/{carrossel.length}</div>
          </div>
          <div className="bg-gray-800/50 p-2 rounded">
            <div className="text-gray-400">Momentos</div>
            <div className="font-bold">{momentosLiturgicos.filter(m => m.ativo).length}/{momentosLiturgicos.length}</div>
          </div>
          <div className="bg-gray-800/50 p-2 rounded">
            <div className="text-gray-400">Popups</div>
            <div className="font-bold">{popups.filter(p => p.ativo).length}/{popups.length}</div>
          </div>
          <div className="bg-gray-800/50 p-2 rounded">
            <div className="text-gray-400">Recados</div>
            <div className="font-bold">{recados.filter(r => r.ativo).length}/{recados.length}</div>
          </div>
        </div>
        
        <div className="text-xs text-gray-400">
          <div className="flex justify-between">
            <span>Última atualização:</span>
            <span className="text-gray-300">{ultimaAtualizacao}</span>
          </div>
          <div className="flex justify-between mt-1">
            <span>Fonte:</span>
            <span className="text-blue-300">ConteudoContext</span>
          </div>
        </div>
      </div>
      
      {/* Botões de ação */}
      <div className="flex gap-2">
        <button
          onClick={handleForceSync}
          className="flex-1 flex items-center justify-center gap-1 bg-blue-600 hover:bg-blue-700 px-3 py-2 rounded text-xs transition-colors"
          title="Forçar sincronização"
        >
          <RefreshCw size={12} />
          Sincronizar
        </button>
        
        <button
          onClick={verificarLocalStorage}
          className="flex-1 flex items-center justify-center gap-1 bg-gray-700 hover:bg-gray-600 px-3 py-2 rounded text-xs transition-colors"
          title="Verificar localStorage"
        >
          <Database size={12} />
          Ver Dados
        </button>
      </div>
      
      {/* Instruções */}
      <div className="mt-3 pt-3 border-t border-gray-700 text-xs text-gray-400">
        <p>📌 PainelAdmin salva em: <code className="bg-gray-800 px-1 rounded">santuario-dados</code></p>
        <p className="mt-1">🔧 Use "Salvar & Publicar" para atualizar site</p>
      </div>
    </div>
  );
}