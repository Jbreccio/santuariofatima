// pages/admin/PainelAdmin.tsx - VERSÃO FINAL CORRIGIDA PARA BETO
import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Upload, Image, MessageSquare, Calendar, AlertCircle,
  LogOut, Save, Trash2, Eye, Home, Bell, Settings,
  X, Palette, Plus, Download, Globe,
  Clock, Edit2, Check, ChevronLeft, ChevronRight
} from 'lucide-react';

interface CarrosselHomeItem {
  id: string;
  imagem: string;
  titulo?: string;
  ordem: number;
  ativo: boolean;
}

interface RecadoItem {
  id: string;
  titulo: string;
  conteudo: string;
  tipo: 'texto' | 'imagem';
  imagem?: string;
  dataCriacao: string;
  ativo: boolean;
  urgente?: boolean;
}

interface EventoLiturgico {
  id: string;
  periodo: string;
  cor: 'verde' | 'branco' | 'vermelho' | 'roxo' | 'rosa' | 'amarelo';
  tituloFaixa: string;
  imagens: string[];
  ativo: boolean;
}

interface PopupItem {
  id: string;
  imagem: string;
  tempoExibicao: number;
  ativo: boolean;
  ordem: number;
}

// ============ FUNÇÕES AUXILIARES ============
const fileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = error => reject(error);
  });
};

// Função para corrigir URLs de imagens — SÓ se for realmente necessário
const corrigirUrlImagem = (url: string): string => {
  if (!url) return '/images/default-image.png';
  // Se já for uma URL válida (http, https, data:image ou caminho absoluto)
  if (url.startsWith('http') || url.startsWith('data:image') || url.startsWith('/')) {
    return url;
  }
  // Só adiciona /images/ se for um caminho relativo sem barra
  return `/images/${url}`;
};

export default function PainelAdmin() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'carrossel-home' | 'momentos-liturgicos' | 'popup' | 'recados'>('carrossel-home');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'published' | 'error'>('idle');
  const [previewPopup, setPreviewPopup] = useState<PopupItem | null>(null);
  const [editingPopupId, setEditingPopupId] = useState<string | null>(null);

  // ============ ESTADOS DO SISTEMA ============
  const [fotosCarrossel, setFotosCarrossel] = useState<CarrosselHomeItem[]>([
    { id: 'altarcristo', imagem: '/images/carrosselFotos/altarcristo.png', titulo: 'Altar de Cristo', ordem: 0, ativo: true },
    { id: 'altarlateral', imagem: '/images/carrosselFotos/altarlateral.png', titulo: 'Altar Lateral', ordem: 1, ativo: true },
    { id: 'altarlaterall', imagem: '/images/carrosselFotos/altarlaterall.png', titulo: 'Altar Lateral Esquerdo', ordem: 2, ativo: true },
    { id: 'cruzNovo', imagem: '/images/carrosselFotos/cruzNovo.png', titulo: 'Cruz Nova', ordem: 3, ativo: true },
    { id: 'cruzNovo2', imagem: '/images/carrosselFotos/cruzNovo2.png', titulo: 'Cruz Nova 2', ordem: 4, ativo: true },
    { id: 'rosto', imagem: '/images/carrosselFotos/Rosto.png', titulo: 'Rosto', ordem: 5, ativo: true },
    { id: 'aerea', imagem: '/images/carrosselFotos/Aerea.png', titulo: 'Vista Aérea', ordem: 6, ativo: true },
    { id: 'entradaNovo2', imagem: '/images/carrosselFotos/entradaNovo2.png', titulo: 'Entrada Nova 2', ordem: 7, ativo: true },
    { id: 'entradaNovo', imagem: '/images/carrosselFotos/entradaNovo.png', titulo: 'Entrada Nova', ordem: 8, ativo: true },
    { id: 'people', imagem: '/images/carrosselFotos/people.png', titulo: 'Pessoas', ordem: 9, ativo: true },
    { id: 'fachada1', imagem: '/images/carrosselFotos/fachada1.png', titulo: 'Fachada 1', ordem: 10, ativo: true },
    { id: 'fachada2', imagem: '/images/carrosselFotos/fachada2.png', titulo: 'Fachada 2', ordem: 11, ativo: true },
    { id: 'terco', imagem: '/images/carrosselFotos/Terco.png', titulo: 'Terço', ordem: 12, ativo: true },
    { id: 'comunhao', imagem: '/images/carrosselFotos/comunhao.png', titulo: 'Comunhão', ordem: 13, ativo: true },
    { id: 'mesanino', imagem: '/images/carrosselFotos/mesanino.png', titulo: 'Mesanino', ordem: 14, ativo: true },
    { id: 'bible', imagem: '/images/carrosselFotos/bible.png', titulo: 'Bíblia', ordem: 15, ativo: true }
  ]);

  // ✅ DADOS INICIAIS CORRIGIDOS — CAMINHOS DIRETOS NA RAIZ
  const [eventosLiturgicos, setEventosLiturgicos] = useState<EventoLiturgico[]>([
    {
      id: 'cinzas-2025',
      periodo: 'Cinzas',
      cor: 'roxo',
      tituloFaixa: 'CINZAS 2025',
      imagens: ['/Cinzas1.png','/Cinzas02.png','/Cinzas03.png','/Cinzas4.png','/Cinzas5.png','/Cinzas6.png'],
      ativo: true
    },
    {
      id: 'jubileu-2025',
      periodo: 'Jubileu',
      cor: 'amarelo',
      tituloFaixa: 'ANO JUBILAR 2025',
      imagens: ['/Jubileo.png','/Jubileo2.png','/Jubileo3.png','/Jubileo4.png','/Jubileo5.png','/Jubileo6.png'],
      ativo: true
    },
    {
      id: 'ramos-2025',
      periodo: 'Domingo de Ramos',
      cor: 'vermelho',
      tituloFaixa: 'DOMINGO DE RAMOS 2025',
      imagens: ['/altarfrente.png','/snsf.png','/ramos01.png','/ramos02.png','/ramos03.png','/ramos04.png','/ramos05.png'],
      ativo: true
    }
  ]);

  const [popups, setPopups] = useState<PopupItem[]>([
    { id: 'popup1', imagem: '/images/popup/popup001.png', tempoExibicao: 10, ativo: true, ordem: 0 },
    { id: 'popup2', imagem: '/images/popup/popup002.png', tempoExibicao: 15, ativo: true, ordem: 1 },
    { id: 'popup3', imagem: '/images/popup/popup003.png', tempoExibicao: 30, ativo: false, ordem: 2 },
    { id: 'popup4', imagem: '/images/popup/popup004.png', tempoExibicao: 10, ativo: false, ordem: 3 }
  ]);

  const [recados, setRecados] = useState<RecadoItem[]>([]);

  // ============ FORMULÁRIOS ============
  const [novoEventoLiturgico, setNovoEventoLiturgico] = useState<Omit<EventoLiturgico, 'id'>>({
    periodo: '',
    cor: 'roxo',
    tituloFaixa: '',
    imagens: [],
    ativo: true
  });

  const [novoRecado, setNovoRecado] = useState<Omit<RecadoItem, 'id' | 'dataCriacao'>>({
    titulo: '',
    conteudo: '',
    tipo: 'texto',
    ativo: true,
    urgente: false
  });

  const [novoPopup, setNovoPopup] = useState<Omit<PopupItem, 'id'>>({
    imagem: '',
    tempoExibicao: 10,
    ativo: true,
    ordem: 0
  });

  const coresLiturgicas = [
    { id: 'verde', nome: 'Verde (Tempo Comum)', descricao: 'Períodos ordinários' },
    { id: 'branco', nome: 'Branco (Natal/Páscoa)', descricao: 'Celebrações festivas' },
    { id: 'vermelho', nome: 'Vermelho (Paixão/Pentecostes)', descricao: 'Paixão, mártires e Espírito Santo' },
    { id: 'roxo', nome: 'Roxo (Advento/Quaresma)', descricao: 'Preparação e penitência' },
    { id: 'rosa', nome: 'Rosa (Gaudete/Laetare)', descricao: 'Domingos especiais' },
    { id: 'amarelo', nome: 'Amarelo (Jubileu)', descricao: 'Celebrações jubilares' }
  ];

  const temposExibicao = [
    { segundos: 10, label: '10 segundos' },
    { segundos: 15, label: '15 segundos' },
    { segundos: 30, label: '30 segundos' }
  ];

  // ============ EFFECTS ============
  useEffect(() => {
    document.body.style.overflowX = 'hidden';
    return () => {
      document.body.style.overflowX = '';
    };
  }, []);

  // Autenticação
  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem('admin_token');
      const user = localStorage.getItem('admin_user');
      if (!token || !user) {
        navigate('/loginsecret');
        return false;
      }
      setIsAuthenticated(true);
      setLoading(false);
      return true;
    };
    setTimeout(() => checkAuth(), 500);
  }, [navigate]);

  // Carregar dados
  useEffect(() => {
    if (isAuthenticated) {
      const carregarDados = () => {
        try {
          const dadosNovos = localStorage.getItem('santuario-dados');
          if (dadosNovos) {
            const parsed = JSON.parse(dadosNovos);
            if (parsed.carrossel?.length) {
              setFotosCarrossel(parsed.carrossel);
            }
            if (parsed.momentosLiturgicos?.length) {
              setEventosLiturgicos(parsed.momentosLiturgicos);
            }
            if (parsed.popups?.length) {
              setPopups(parsed.popups);
            }
            if (parsed.recados?.length) {
              setRecados(parsed.recados);
            }
          }
          const dadosAntigos = localStorage.getItem('recados-santuario');
          if (dadosAntigos && recados.length === 0) {
            const parsedAntigos = JSON.parse(dadosAntigos);
            const recadosItems = parsedAntigos.filter((item: any) => item.tipo === 'recado');
            setRecados(recadosItems);
          }
        } catch (error) {
          console.error('❌ Erro ao carregar dados:', error);
        }
      };
      carregarDados();
    }
  }, [isAuthenticated]);

  // ============ FUNÇÕES PRINCIPAIS ============
  const salvarDadosNoLocalStorage = useCallback(() => {
    console.log('💾 Salvando dados...');
    const dadosParaSalvar = {
      carrossel: fotosCarrossel,
      momentosLiturgicos: eventosLiturgicos,
      popups: popups,
      recados: recados,
      ultimaAtualizacao: new Date().toISOString()
    };
    localStorage.setItem('santuario-dados', JSON.stringify(dadosParaSalvar));
    if (recados.length > 0) {
      const recadosParaSalvar = recados.map(item => ({ ...item, tipo: 'recado' as const }));
      localStorage.setItem('recados-santuario', JSON.stringify(recadosParaSalvar));
    }
  }, [fotosCarrossel, eventosLiturgicos, popups, recados]);

  const salvarEPublicar = () => {
    const popupsAtivos = popups.filter(p => p.ativo);
    if (popupsAtivos.length === 0) {
      if (!window.confirm('⚠️ Nenhum popup está ativo. O site mostrará "Bem-vindo" como padrão.\nDeseja continuar?')) {
        return;
      }
    }
    setSaveStatus('saving');
    try {
      localStorage.removeItem('popupFechadoHoje');
      salvarDadosNoLocalStorage();
      window.dispatchEvent(new CustomEvent('dadosAtualizados', {
        detail: { 
          timestamp: new Date().toISOString(),
          origem: 'PainelAdmin'
        }
      }));
      window.dispatchEvent(new StorageEvent('storage', {
        key: 'santuario-dados',
        newValue: localStorage.getItem('santuario-dados')
      }));
      setTimeout(() => {
        setSaveStatus('published');
        console.log('🎉 Dados publicados com sucesso!');
        setTimeout(() => setSaveStatus('idle'), 3000);
      }, 1000);
    } catch (error) {
      console.error('❌ ERRO AO SALVAR:', error);
      setSaveStatus('error');
      setTimeout(() => setSaveStatus('idle'), 3000);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('admin_token');
    localStorage.removeItem('admin_user');
    navigate('/loginsecret');
  };

  const handleExportarDados = () => {
    const dados = {
      santuarioDados: {
        carrossel: fotosCarrossel,
        momentosLiturgicos: eventosLiturgicos,
        popups: popups,
        recados: recados
      },
      exportadoEm: new Date().toISOString(),
      versao: '2.1'
    };
    const blob = new Blob([JSON.stringify(dados, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `santuario-dados-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    alert('📥 Dados exportados com sucesso!');
  };

  const handleImportarDados = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const dados = JSON.parse(event.target?.result as string);
        if (dados.santuarioDados) {
          if (window.confirm('Importar dados? Isso substituirá os dados atuais.')) {
            setFotosCarrossel(dados.santuarioDados.carrossel || []);
            setEventosLiturgicos(dados.santuarioDados.momentosLiturgicos || []);
            setPopups(dados.santuarioDados.popups || []);
            setRecados(dados.santuarioDados.recados || []);
            alert('✅ Dados importados com sucesso! Clique em "Salvar & Publicar".');
          }
        } else {
          alert('❌ Formato de arquivo inválido');
        }
      } catch (error) {
        alert('❌ Erro ao importar dados: ' + error);
      }
    };
    reader.readAsText(file);
  };

  // ============ CARROSSEL ============
  const handleUploadFotoCarrossel = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const novasFotosPromises = Array.from(files).map(async (file, index) => {
        const base64 = await fileToBase64(file);
        return {
          id: Date.now() + index + '',
          imagem: base64,
          titulo: `Nova Imagem ${fotosCarrossel.length + index + 1}`,
          ordem: fotosCarrossel.length + index,
          ativo: true
        };
      });
      const novasFotos = await Promise.all(novasFotosPromises);
      setFotosCarrossel(prev => [...prev, ...novasFotos]);
      alert(`✅ ${novasFotos.length} imagem(ns) adicionada(s)!`);
    }
  };

  const handleDeleteFotoCarrossel = (id: string) => {
    if (window.confirm('Excluir esta imagem?')) {
      setFotosCarrossel(fotosCarrossel.filter(item => item.id !== id));
    }
  };

  const handleToggleAtivoCarrossel = (id: string) => {
    setFotosCarrossel(fotosCarrossel.map(item => 
      item.id === id ? { ...item, ativo: !item.ativo } : item
    ));
  };

  const handleReorderCarrossel = (fromIndex: number, toIndex: number) => {
    const newItems = [...fotosCarrossel];
    const [removed] = newItems.splice(fromIndex, 1);
    newItems.splice(toIndex, 0, removed);
    setFotosCarrossel(newItems.map((item, idx) => ({ ...item, ordem: idx })));
  };

  // ============ MOMENTOS LITÚRGICOS ============
  const handleAddEventoLiturgico = () => {
    if (!novoEventoLiturgico.periodo.trim() || !novoEventoLiturgico.tituloFaixa.trim()) {
      alert('Preencha o período e o título da faixa!');
      return;
    }
    const novoEvento: EventoLiturgico = {
      id: Date.now() + '',
      ...novoEventoLiturgico
    };
    setEventosLiturgicos([...eventosLiturgicos, novoEvento]);
    setNovoEventoLiturgico({
      periodo: '',
      cor: 'roxo',
      tituloFaixa: '',
      imagens: [],
      ativo: true
    });
  };

  const handleDeleteEventoLiturgico = (id: string) => {
    if (window.confirm('Excluir este período litúrgico?')) {
      setEventosLiturgicos(eventosLiturgicos.filter(item => item.id !== id));
    }
  };

  const handleToggleAtivoEvento = (id: string) => {
    setEventosLiturgicos(eventosLiturgicos.map(item => 
      item.id === id ? { ...item, ativo: !item.ativo } : item
    ));
  };

  const handleAddImagemEvento = async (eventoId: string, e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const novasImagensPromises = Array.from(files).map(async (file) => {
        return await fileToBase64(file);
      });
      const novasImagens = await Promise.all(novasImagensPromises);
      setEventosLiturgicos(eventosLiturgicos.map(evento => 
        evento.id === eventoId 
          ? { ...evento, imagens: [...evento.imagens, ...novasImagens] }
          : evento
      ));
      alert(`✅ ${novasImagens.length} imagem(ns) adicionada(s) ao evento!`);
    }
  };

  const handleDeleteImagemEvento = (eventoId: string, imagemIndex: number) => {
    setEventosLiturgicos(eventosLiturgicos.map(evento => 
      evento.id === eventoId 
        ? { ...evento, imagens: evento.imagens.filter((_, idx) => idx !== imagemIndex) }
        : evento
    ));
  };

  // ============ POPUP ============
  const handleUploadPopupImagem = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const novosPopupsPromises = Array.from(files).map(async (file, index) => {
        const base64 = await fileToBase64(file);
        return {
          id: Date.now() + index + '',
          imagem: base64,
          tempoExibicao: 10,
          ativo: true,
          ordem: popups.length + index
        };
      });
      const novosPopups = await Promise.all(novosPopupsPromises);
      setPopups(prev => [...prev, ...novosPopups]);
      alert(`✅ ${novosPopups.length} popup(s) adicionado(s)!`);
    }
  };

  const handleAddPopupFromUrl = () => {
    const url = prompt('Digite a URL da imagem para o popup:');
    if (url && url.trim()) {
      const novoPopupItem: PopupItem = {
        id: Date.now() + '',
        imagem: url.trim(), // ✅ Não corrige se já for URL válida
        tempoExibicao: 10,
        ativo: true,
        ordem: popups.length
      };
      setPopups([...popups, novoPopupItem]);
      alert('✅ Popup adicionado com sucesso!');
    }
  };

  const handleDeletePopup = (id: string) => {
    if (window.confirm('Excluir este popup?')) {
      setPopups(popups.filter(p => p.id !== id));
    }
  };

  const handleToggleAtivoPopup = (id: string) => {
    setPopups(popups.map(p => 
      p.id === id ? { ...p, ativo: !p.ativo } : p
    ));
  };

  const handleTempoExibicaoPopup = (id: string, tempo: number) => {
    setPopups(popups.map(p => 
      p.id === id ? { ...p, tempoExibicao: tempo } : p
    ));
  };

  const handleReorderPopup = (id: string, direction: 'up' | 'down') => {
    const index = popups.findIndex(p => p.id === id);
    if ((direction === 'up' && index === 0) || (direction === 'down' && index === popups.length - 1)) return;
    const newPopups = [...popups];
    const newIndex = direction === 'up' ? index - 1 : index + 1;
    [newPopups[index], newPopups[newIndex]] = [newPopups[newIndex], newPopups[index]];
    setPopups(newPopups.map((item, idx) => ({ ...item, ordem: idx })));
  };

  const handlePreviewPopup = (popup: PopupItem) => {
    setPreviewPopup(popup);
  };

  const handleEditPopup = (id: string) => {
    setEditingPopupId(id === editingPopupId ? null : id);
  };

  const handleSavePopupEdit = (id: string, field: keyof PopupItem, value: any) => {
    setPopups(popups.map(p => 
      p.id === id ? { ...p, [field]: value } : p
    ));
  };

  // ============ RECADOS ============
  const handleAddRecado = () => {
    if (!novoRecado.titulo.trim() || !novoRecado.conteudo.trim()) {
      alert('Preencha o título e o conteúdo do recado!');
      return;
    }
    const novoItem: RecadoItem = {
      id: Date.now() + '',
      ...novoRecado,
      tipo: 'texto',
      dataCriacao: new Date().toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      }),
      ativo: true
    };
    setRecados([...recados, novoItem]);
    setNovoRecado({
      titulo: '',
      conteudo: '',
      tipo: 'texto',
      ativo: true,
      urgente: false
    });
  };

  const handleDeleteRecado = (id: string) => {
    if (window.confirm('Excluir este recado?')) {
      setRecados(recados.filter(item => item.id !== id));
    }
  };

  const handleToggleAtivoRecado = (id: string) => {
    setRecados(recados.map(item => 
      item.id === id ? { ...item, ativo: !item.ativo } : item
    ));
  };

  const handleToggleUrgenteRecado = (id: string) => {
    setRecados(recados.map(item => 
      item.id === id ? { ...item, urgente: !item.urgente } : item
    ));
  };

  // ============ RENDERIZAÇÃO ============
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Verificando autenticação...</p>
        </div>
      </div>
    );
  }
  if (!isAuthenticated) return null;

  return (
    <div 
      className="min-h-screen bg-gray-50 relative overflow-x-hidden"
      style={{
        backgroundImage: "url('/images/carrosselFotos/fachada1.png')",
        backgroundPosition: 'right top',
        backgroundRepeat: 'no-repeat',
        backgroundSize: '100% auto',
        backgroundAttachment: 'fixed',
        imageRendering: 'crisp-edges',
        WebkitFontSmoothing: 'antialiased',
      }}
    >
      <div className="absolute inset-0 bg-white/35 z-0"></div>
      
      <header className="bg-white shadow-sm border-b sticky top-0 z-10">
        <div className="container mx-auto px-4 py-3">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="flex items-center">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center mr-3">
                <Settings className="text-white" size={22} />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Sistema Administrativo do Santuário</h1>
                <p className="text-xs text-gray-600">Desenvolvido com fé e dedicação</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="hidden sm:flex items-center gap-2">
                <label className="flex items-center gap-2 px-3 py-2 text-gray-700 hover:text-blue-600 hover:bg-gray-100 rounded-lg transition-colors cursor-pointer">
                  <Upload size={18} />
                  <span>Importar</span>
                  <input 
                    type="file" 
                    accept=".json" 
                    onChange={handleImportarDados}
                    className="hidden"
                  />
                </label>
                <button
                  onClick={handleExportarDados}
                  className="flex items-center gap-2 px-3 py-2 text-gray-700 hover:text-blue-600 hover:bg-gray-100 rounded-lg transition-colors"
                  title="Exportar dados"
                >
                  <Download size={18} />
                  <span>Exportar</span>
                </button>
              </div>
              {saveStatus === 'saving' && (
                <div className="flex items-center gap-2 px-3 py-2 bg-blue-100 text-blue-700 rounded-lg">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-700"></div>
                  <span className="text-sm">Salvando...</span>
                </div>
              )}
              {saveStatus === 'published' && (
                <div className="flex items-center gap-2 px-3 py-2 bg-green-100 text-green-700 rounded-lg">
                  <span className="text-sm">✅ Publicado com sucesso!</span>
                </div>
              )}
              {saveStatus === 'error' && (
                <div className="flex items-center gap-2 px-3 py-2 bg-red-100 text-red-700 rounded-lg">
                  <span className="text-sm">❌ Erro ao salvar</span>
                </div>
              )}
              <button
                onClick={salvarEPublicar}
                className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-lg hover:from-green-700 hover:to-emerald-700 transition-all shadow"
              >
                <Globe size={18} />
                <span>Salvar & Publicar</span>
              </button>
              <button
                onClick={() => navigate('/')}
                className="flex items-center gap-2 px-3 py-2 text-gray-700 hover:text-blue-600 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <Home size={18} />
                <span className="hidden sm:inline">Site</span>
              </button>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                <LogOut size={18} />
                <span>Sair</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6 relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-sm p-5 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Carrossel Home</p>
                <p className="text-2xl font-bold text-gray-800 mt-1">
                  {fotosCarrossel.filter(item => item.ativo).length}
                </p>
                <p className="text-xs text-gray-500 mt-1">Imagens ativas</p>
              </div>
              <div className="p-3 bg-blue-100 rounded-lg">
                <Image className="text-blue-600" size={24} />
              </div>
            </div>
          </div>
          <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-sm p-5 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Momentos Litúrgicos</p>
                <p className="text-2xl font-bold text-gray-800 mt-1">
                  {eventosLiturgicos.filter(item => item.ativo).length}
                </p>
                <p className="text-xs text-gray-500 mt-1">Períodos ativos</p>
              </div>
              <div className="p-3 bg-purple-100 rounded-lg">
                <Calendar className="text-purple-600" size={24} />
              </div>
            </div>
          </div>
          <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-sm p-5 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Popups Ativos</p>
                <p className="text-2xl font-bold text-gray-800 mt-1">
                  {popups.filter(p => p.ativo).length}
                </p>
                <p className="text-xs text-gray-500 mt-1">Avisos no site</p>
              </div>
              <div className="p-3 bg-yellow-100 rounded-lg">
                <Bell className="text-yellow-600" size={24} />
              </div>
            </div>
          </div>
          <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-sm p-5 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Recados</p>
                <p className="text-2xl font-bold text-gray-800 mt-1">
                  {recados.filter(item => item.ativo).length}
                </p>
                <p className="text-xs text-gray-500 mt-1">Avisos importantes</p>
              </div>
              <div className="p-3 bg-red-100 rounded-lg">
                <AlertCircle className="text-red-600" size={24} />
              </div>
            </div>
          </div>
        </div>

        <div className="mb-6 overflow-x-auto">
          <div className="flex gap-2 pb-2 min-w-max">
            {([
              { id: 'carrossel-home', label: 'Carrossel Fotos', icon: Image },
              { id: 'momentos-liturgicos', label: 'Momentos Litúrgicos', icon: Calendar },
              { id: 'popup', label: 'Popup', icon: Bell },
              { id: 'recados', label: 'Recados', icon: AlertCircle }
            ] as const).map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => setActiveTab(id)}
                className={`px-4 py-3 font-medium rounded-lg whitespace-nowrap transition-colors ${
                  activeTab === id 
                    ? 'bg-blue-600 text-white shadow' 
                    : 'bg-white/90 backdrop-blur-sm text-gray-600 hover:text-gray-900 hover:bg-gray-100 border'
                }`}
              >
                <div className="flex items-center gap-2">
                  <Icon size={18} />
                  {label}
                </div>
              </button>
            ))}
          </div>
        </div>

        <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-sm border border-gray-200 p-4 sm:p-6 mb-6">
          {/* CARROSSEL FOTOS */}
          {activeTab === 'carrossel-home' && (
            <div>
              <h2 className="text-xl font-bold text-gray-800 mb-2">Gerenciar Carrossel da Home</h2>
              <p className="text-gray-600 mb-4 text-sm">Total de {fotosCarrossel.length} imagens ({fotosCarrossel.filter(f => f.ativo).length} ativas)</p>
              <div className="mb-6">
                <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center hover:border-blue-500 transition-colors bg-white/50">
                  <Upload className="w-10 h-10 text-gray-400 mx-auto mb-3" />
                  <p className="text-sm text-gray-600 mb-2">
                    As novas imagens serão ADICIONADAS às {fotosCarrossel.length} existentes
                  </p>
                  <label className="inline-flex items-center gap-2 px-5 py-2.5 bg-blue-600 text-white rounded-lg text-sm cursor-pointer hover:bg-blue-700 transition-colors">
                    <Plus size={16} />
                    Adicionar Mais Imagens ({fotosCarrossel.length} já existem)
                    <input 
                      type="file" 
                      multiple 
                      accept="image/*" 
                      onChange={handleUploadFotoCarrossel} 
                      className="hidden" 
                    />
                  </label>
                </div>
              </div>
              {fotosCarrossel.length === 0 ? (
                <div className="text-center py-10 text-gray-500">
                  <Image className="w-12 h-12 mx-auto mb-2 text-gray-300" />
                  <p>Nenhuma imagem no carrossel</p>
                </div>
              ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                  {fotosCarrossel.map((item, index) => (
                    <div key={item.id} className="border rounded-lg overflow-hidden bg-white group">
                      <div className="relative">
                        <img 
                          src={item.imagem} 
                          alt={item.titulo} 
                          className="w-full h-40 object-cover bg-gray-100"
                          onError={(e) => {
                            // ✅ Só corrige se NÃO for Base64 e NÃO começar com /
                            if (!item.imagem.startsWith('data:image') && !item.imagem.startsWith('/')) {
                              const corrigida = corrigirUrlImagem(item.imagem);
                              (e.target as HTMLImageElement).src = corrigida;
                            }
                          }}
                        />
                        <div className="absolute top-2 right-2 flex gap-1">
                          <button 
                            onClick={() => handleToggleAtivoCarrossel(item.id)}
                            className={`p-1 rounded-full ${item.ativo ? 'bg-green-500' : 'bg-red-500'}`}
                            title={item.ativo ? 'Desativar' : 'Ativar'}
                          >
                            <Eye size={12} className="text-white" />
                          </button>
                          <button 
                            onClick={() => handleDeleteFotoCarrossel(item.id)}
                            className="p-1 bg-red-500 rounded-full"
                            title="Excluir"
                          >
                            <Trash2 size={12} className="text-white" />
                          </button>
                        </div>
                        <div className="absolute bottom-2 left-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                          {index > 0 && (
                            <button 
                              onClick={() => handleReorderCarrossel(index, index - 1)}
                              className="p-1 bg-blue-600 rounded text-white"
                              title="Mover para cima"
                            >
                              <ChevronLeft size={10} />
                            </button>
                          )}
                          {index < fotosCarrossel.length - 1 && (
                            <button 
                              onClick={() => handleReorderCarrossel(index, index + 1)}
                              className="p-1 bg-blue-600 rounded text-white"
                              title="Mover para baixo"
                            >
                              <ChevronRight size={10} />
                            </button>
                          )}
                        </div>
                      </div>
                      <div className="p-3">
                        <input
                          type="text"
                          value={item.titulo || ''}
                          onChange={(e) => {
                            setFotosCarrossel(fotosCarrossel.map(i => 
                              i.id === item.id ? { ...i, titulo: e.target.value } : i
                            ));
                          }}
                          className="w-full text-sm border rounded px-2 py-1 mb-1"
                          placeholder="Título da imagem"
                        />
                        <div className="flex justify-between items-center text-xs text-gray-500">
                          <span>Posição: {item.ordem + 1}</span>
                          <span className={item.ativo ? 'text-green-600' : 'text-red-600'}>
                            {item.ativo ? 'Ativo' : 'Inativo'}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* MOMENTOS LITÚRGICOS — CORRIGIDO */}
          {activeTab === 'momentos-liturgicos' && (
            <div>
              <h2 className="text-xl font-bold text-gray-800 mb-2">Gerenciar Momentos Litúrgicos</h2>
              <p className="text-gray-600 mb-4 text-sm">Configure os períodos litúrgicos e suas cores</p>
              <div className="bg-gray-50/50 rounded-lg p-4 mb-6">
                <h3 className="font-bold text-gray-700 mb-3">Novo Momento Litúrgico</h3>
                <div className="space-y-4">
                  <input
                    type="text"
                    value={novoEventoLiturgico.periodo}
                    onChange={(e) => setNovoEventoLiturgico({ ...novoEventoLiturgico, periodo: e.target.value })}
                    placeholder="Período (ex: Quaresma, Advento, Natal)"
                    className="w-full p-3 border border-gray-300 rounded-lg"
                  />
                  <input
                    type="text"
                    value={novoEventoLiturgico.tituloFaixa}
                    onChange={(e) => setNovoEventoLiturgico({ ...novoEventoLiturgico, tituloFaixa: e.target.value })}
                    placeholder="Título da faixa (ex: QUARESMA 2025)"
                    className="w-full p-3 border border-gray-300 rounded-lg"
                  />
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Cor Litúrgica</label>
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
                      {coresLiturgicas.map((cor) => (
                        <button
                          key={cor.id}
                          onClick={() => setNovoEventoLiturgico({ ...novoEventoLiturgico, cor: cor.id as any })}
                          className={`flex flex-col items-center gap-2 p-3 rounded-lg border ${
                            novoEventoLiturgico.cor === cor.id 
                              ? 'ring-2 ring-blue-500 border-blue-300' 
                              : 'border-gray-300 hover:border-gray-400'
                          }`}
                          title={cor.descricao}
                        >
                          <div 
                            className={`w-full h-3 rounded ${
                              cor.id === 'verde' ? 'bg-green-600' :
                              cor.id === 'branco' ? 'bg-gray-200 border border-gray-300' :
                              cor.id === 'vermelho' ? 'bg-red-600' :
                              cor.id === 'roxo' ? 'bg-purple-600' :
                              cor.id === 'rosa' ? 'bg-pink-500' :
                              'bg-yellow-500'
                            }`}
                          />
                          <span className="text-xs font-medium text-center">{cor.nome}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <button
                      onClick={handleAddEventoLiturgico}
                      className="flex-1 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
                    >
                      <div className="flex items-center justify-center gap-2">
                        <Plus size={18} />
                        Adicionar Momento Litúrgico
                      </div>
                    </button>
                  </div>
                </div>
              </div>
              <h3 className="font-bold text-gray-700 mb-3">Momentos Litúrgicos ({eventosLiturgicos.length})</h3>
              {eventosLiturgicos.length === 0 ? (
                <p className="text-gray-500 text-center py-6">Nenhum momento cadastrado</p>
              ) : (
                <div className="space-y-6">
                  {eventosLiturgicos.map((evento) => (
                    <div key={evento.id} className="border rounded-lg p-4 hover:border-blue-300 bg-white/50">
                      <div className="flex justify-between items-start mb-3">
                        <div className="flex-1">
                          <h4 className="font-bold text-gray-800">{evento.periodo}</h4>
                          <p className="text-sm text-gray-600">{evento.tituloFaixa}</p>
                          <div className="flex items-center gap-3 mt-1">
                            <span className={`text-xs px-2 py-1 rounded-full ${evento.ativo ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                              {evento.ativo ? 'Ativo' : 'Inativo'}
                            </span>
                            <span className={`text-xs px-2 py-1 rounded-full ${
                              evento.cor === 'verde' ? 'bg-green-100 text-green-800' :
                              evento.cor === 'branco' ? 'bg-gray-100 text-gray-800' :
                              evento.cor === 'vermelho' ? 'bg-red-100 text-red-800' :
                              evento.cor === 'roxo' ? 'bg-purple-100 text-purple-800' :
                              evento.cor === 'rosa' ? 'bg-pink-100 text-pink-800' :
                              'bg-yellow-100 text-yellow-800'
                            }`}>
                              Cor: {evento.cor}
                            </span>
                            <span className="text-xs text-gray-500">
                              {evento.imagens.length} imagem(ns)
                            </span>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleToggleAtivoEvento(evento.id)}
                            className={`p-2 rounded ${evento.ativo ? 'bg-red-100 text-red-600 hover:bg-red-200' : 'bg-green-100 text-green-600 hover:bg-green-200'}`}
                            title={evento.ativo ? 'Desativar' : 'Ativar'}
                          >
                            <Eye size={16} />
                          </button>
                          <button
                            onClick={() => handleDeleteEventoLiturgico(evento.id)}
                            className="p-2 bg-red-100 text-red-600 rounded hover:bg-red-200"
                            title="Excluir"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </div>
                      <div className="mb-4 p-3 bg-blue-50 rounded-lg">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Adicionar imagens para "{evento.periodo}"
                        </label>
                        <div className="border-2 border-dashed border-blue-300 rounded-lg p-3 text-center hover:border-blue-500 bg-white">
                          <label className="cursor-pointer">
                            <Upload size={20} className="text-blue-400 mx-auto mb-1" />
                            <span className="text-sm text-blue-600">Clique para adicionar imagens</span>
                            <input
                              type="file"
                              multiple
                              accept="image/*"
                              onChange={(e) => handleAddImagemEvento(evento.id, e)}
                              className="hidden"
                            />
                          </label>
                        </div>
                      </div>
                      {evento.imagens.length > 0 && (
                        <div>
                          <p className="text-sm font-medium mb-2">Imagens deste momento ({evento.imagens.length}):</p>
                          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
                            {evento.imagens.map((imagem, idx) => (
                              <div key={idx} className="relative border rounded overflow-hidden group">
                                <img 
                                  src={imagem} 
                                  alt={`${evento.periodo} ${idx}`} 
                                  className="w-full h-24 object-cover bg-gray-100"
                                  onError={(e) => {
                                    // ✅ Só corrige se NÃO for Base64 e NÃO começar com /
                                    if (!imagem.startsWith('data:image') && !imagem.startsWith('/')) {
                                      const corrigida = corrigirUrlImagem(imagem);
                                      (e.target as HTMLImageElement).src = corrigida;
                                    }
                                  }}
                                />
                                <button
                                  onClick={() => handleDeleteImagemEvento(evento.id, idx)}
                                  className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs opacity-0 group-hover:opacity-100 transition-opacity"
                                >
                                  ×
                                </button>
                                <div className="absolute bottom-0 left-0 right-0 bg-black/60 text-white text-xs p-1">
                                  Imagem {idx + 1}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* POPUP */}
          {activeTab === 'popup' && (
            <div>
              <h2 className="text-xl font-bold text-gray-800 mb-2">Gerenciar Popups</h2>
              <p className="text-gray-600 mb-4 text-sm">Imagens que aparecem ao entrar no site ({popups.filter(p => p.ativo).length} ativos)</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                <div className="border-2 border-dashed border-blue-300 rounded-xl p-6 text-center hover:border-blue-500 transition-colors bg-blue-50/50">
                  <Upload className="w-10 h-10 text-blue-400 mx-auto mb-3" />
                  <p className="text-sm text-gray-600 mb-2">Adicionar popups por upload</p>
                  <label className="inline-flex items-center gap-2 px-5 py-2.5 bg-blue-600 text-white rounded-lg text-sm cursor-pointer hover:bg-blue-700 transition-colors">
                    <Plus size={16} />
                    Upload de Imagens
                    <input 
                      type="file" 
                      multiple 
                      accept="image/*" 
                      onChange={handleUploadPopupImagem} 
                      className="hidden" 
                    />
                  </label>
                </div>
                <div className="border-2 border-dashed border-green-300 rounded-xl p-6 text-center hover:border-green-500 transition-colors bg-green-50/50">
                  <Globe className="w-10 h-10 text-green-400 mx-auto mb-3" />
                  <p className="text-sm text-gray-600 mb-2">Adicionar popup por URL</p>
                  <button
                    onClick={handleAddPopupFromUrl}
                    className="inline-flex items-center gap-2 px-5 py-2.5 bg-green-600 text-white rounded-lg text-sm hover:bg-green-700 transition-colors"
                  >
                    <Plus size={16} />
                    Adicionar por URL
                  </button>
                </div>
              </div>
              {popups.length === 0 ? (
                <div className="text-center py-10 text-gray-500">
                  <Bell className="w-12 h-12 mx-auto mb-2 text-gray-300" />
                  <p>Nenhum popup configurado</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {popups.map((popup, index) => (
                    <div key={popup.id} className="border rounded-xl overflow-hidden bg-white shadow-sm hover:shadow-md transition-shadow">
                      <div className="relative">
                        <div className="relative h-48 bg-gray-100">
                          <img 
                            src={popup.imagem} 
                            alt="Popup"
                            className="w-full h-full object-contain"
                            onError={(e) => {
                              if (!popup.imagem.startsWith('data:image') && !popup.imagem.startsWith('/')) {
                                const corrigida = corrigirUrlImagem(popup.imagem);
                                (e.target as HTMLImageElement).src = corrigida;
                              }
                            }}
                          />
                          <div className="absolute top-2 right-2 flex gap-1">
                            <button 
                              onClick={() => handlePreviewPopup(popup)}
                              className="p-1.5 bg-blue-500 rounded-full text-white hover:bg-blue-600"
                              title="Visualizar"
                            >
                              <Eye size={14} />
                            </button>
                            <button 
                              onClick={() => handleEditPopup(popup.id)}
                              className="p-1.5 bg-yellow-500 rounded-full text-white hover:bg-yellow-600"
                              title="Editar"
                            >
                              <Edit2 size={14} />
                            </button>
                            <button 
                              onClick={() => handleToggleAtivoPopup(popup.id)}
                              className={`p-1.5 rounded-full ${popup.ativo ? 'bg-green-500' : 'bg-red-500'} text-white hover:opacity-90`}
                              title={popup.ativo ? 'Desativar' : 'Ativar'}
                            >
                              {popup.ativo ? <Eye size={14} /> : <X size={14} />}
                            </button>
                            <button 
                              onClick={() => handleDeletePopup(popup.id)}
                              className="p-1.5 bg-red-500 rounded-full text-white hover:bg-red-600"
                              title="Excluir"
                            >
                              <Trash2 size={14} />
                            </button>
                          </div>
                          <div className="absolute bottom-2 left-2 flex gap-1">
                            {index > 0 && (
                              <button 
                                onClick={() => handleReorderPopup(popup.id, 'up')}
                                className="p-1 bg-gray-800/70 rounded text-white hover:bg-gray-900"
                                title="Mover para cima"
                              >
                                <ChevronLeft size={12} />
                              </button>
                            )}
                            {index < popups.length - 1 && (
                              <button 
                                onClick={() => handleReorderPopup(popup.id, 'down')}
                                className="p-1 bg-gray-800/70 rounded text-white hover:bg-gray-900"
                                title="Mover para baixo"
                              >
                                <ChevronRight size={12} />
                              </button>
                            )}
                          </div>
                        </div>
                        {popup.ativo && (
                          <div className="absolute top-2 left-2">
                            <span className="px-2 py-1 bg-green-500 text-white text-xs rounded-full">
                              Ativo
                            </span>
                          </div>
                        )}
                      </div>
                      <div className="p-4">
                        <div className="flex items-center justify-between mb-3">
                          <span className="text-sm font-medium text-gray-700">
                            Ordem: {popup.ordem + 1}
                          </span>
                          <span className={`text-xs px-2 py-1 rounded-full ${popup.ativo ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                            {popup.ativo ? 'Visível' : 'Oculto'}
                          </span>
                        </div>
                        <div className="space-y-3">
                          <div>
                            <label className="text-xs text-gray-600 block mb-1">Tempo de Exibição</label>
                            <div className="flex gap-1">
                              {temposExibicao.map((tempo) => (
                                <button
                                  key={tempo.segundos}
                                  onClick={() => handleTempoExibicaoPopup(popup.id, tempo.segundos)}
                                  className={`flex-1 py-2 text-xs rounded transition-colors ${
                                    popup.tempoExibicao === tempo.segundos
                                      ? 'bg-blue-600 text-white'
                                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                  }`}
                                >
                                  {tempo.segundos}s
                                </button>
                              ))}
                            </div>
                          </div>
                          {editingPopupId === popup.id && (
                            <div className="p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                              <label className="text-xs text-gray-600 block mb-1">URL da Imagem</label>
                              <input
                                type="text"
                                value={popup.imagem}
                                onChange={(e) => handleSavePopupEdit(popup.id, 'imagem', e.target.value)}
                                className="w-full text-sm border rounded px-2 py-1 mb-2"
                                placeholder="URL da imagem"
                              />
                              <button
                                onClick={() => setEditingPopupId(null)}
                                className="w-full py-1.5 bg-blue-600 text-white text-xs rounded hover:bg-blue-700"
                              >
                                <Check size={12} className="inline mr-1" />
                                Salvar Edição
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
              <div className="mt-8 p-4 bg-gray-50 rounded-lg border">
                <h4 className="font-medium text-gray-700 mb-2">Como funciona:</h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Os popups ativos aparecem quando os visitantes acessam o site</li>
                  <li>• A ordem define a sequência de exibição (0 = primeiro)</li>
                  <li>• O tempo define quantos segundos cada popup fica visível</li>
                  <li>• Salve as alterações para que os popups apareçam no site</li>
                </ul>
              </div>
            </div>
          )}

          {/* RECADOS */}
          {activeTab === 'recados' && (
            <div>
              <h2 className="text-xl font-bold text-gray-800 mb-2">Gerenciar Recados</h2>
              <p className="text-gray-600 mb-4 text-sm">Avisos que aparecem na página de recados ({recados.filter(r => r.ativo).length} ativos)</p>
              <div className="bg-gray-50/50 rounded-lg p-4 mb-6">
                <h3 className="font-bold text-gray-700 mb-3">Novo Recado</h3>
                <div className="space-y-4">
                  <input
                    type="text"
                    value={novoRecado.titulo}
                    onChange={(e) => setNovoRecado({ ...novoRecado, titulo: e.target.value })}
                    placeholder="Título do recado"
                    className="w-full p-3 border border-gray-300 rounded-lg"
                  />
                  <textarea
                    value={novoRecado.conteudo}
                    onChange={(e) => setNovoRecado({ ...novoRecado, conteudo: e.target.value })}
                    placeholder="Conteúdo do recado..."
                    rows={4}
                    className="w-full p-3 border border-gray-300 rounded-lg"
                  />
                  <div className="flex flex-wrap gap-4">
                    <div className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        id="urgente"
                        checked={novoRecado.urgente}
                        onChange={(e) => setNovoRecado({ ...novoRecado, urgente: e.target.checked })}
                        className="w-4 h-4 text-red-600"
                      />
                      <label htmlFor="urgente" className="text-sm font-medium text-gray-700">
                        <AlertCircle size={14} className="inline mr-1 text-red-500" />
                        Marcar como urgente
                      </label>
                    </div>
                    <div className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        id="ativo"
                        checked={novoRecado.ativo}
                        onChange={(e) => setNovoRecado({ ...novoRecado, ativo: e.target.checked })}
                        className="w-4 h-4 text-green-600"
                      />
                      <label htmlFor="ativo" className="text-sm font-medium text-gray-700">
                        <Eye size={14} className="inline mr-1 text-green-500" />
                        Ativo (visível no site)
                      </label>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <button
                      onClick={handleAddRecado}
                      className="flex-1 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
                    >
                      <div className="flex items-center justify-center gap-2">
                        <Plus size={18} />
                        Adicionar Recado
                      </div>
                    </button>
                  </div>
                </div>
              </div>
              <h3 className="font-bold text-gray-700 mb-3">Recados ({recados.length})</h3>
              {recados.length === 0 ? (
                <p className="text-gray-500 text-center py-6">Nenhum recado cadastrado</p>
              ) : (
                <div className="space-y-4">
                  {recados.map((recado) => (
                    <div key={recado.id} className={`border rounded-lg p-4 hover:shadow-sm transition-shadow ${
                      recado.urgente ? 'bg-red-50 border-red-200' : 'bg-white'
                    }`}>
                      <div className="flex justify-between items-start mb-3">
                        <div className="flex-1">
                          <div className="flex items-start gap-2">
                            <h4 className="font-bold text-gray-800">{recado.titulo}</h4>
                            {recado.urgente && (
                              <span className="px-2 py-0.5 bg-red-500 text-white text-xs rounded-full animate-pulse">
                                ⚠️ URGENTE
                              </span>
                            )}
                          </div>
                          <div className="flex items-center gap-3 mt-1">
                            <span className={`text-xs px-2 py-1 rounded-full ${recado.ativo ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                              {recado.ativo ? 'Ativo' : 'Inativo'}
                            </span>
                            <span className="text-xs text-gray-500 flex items-center gap-1">
                              <Clock size={10} />
                              {recado.dataCriacao}
                            </span>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleToggleUrgenteRecado(recado.id)}
                            className={`p-2 rounded ${
                              recado.urgente 
                                ? 'bg-yellow-100 text-yellow-600 hover:bg-yellow-200' 
                                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                            }`}
                            title={recado.urgente ? 'Remover urgência' : 'Marcar como urgente'}
                          >
                            <AlertCircle size={16} />
                          </button>
                          <button
                            onClick={() => handleToggleAtivoRecado(recado.id)}
                            className={`p-2 rounded ${recado.ativo ? 'bg-red-100 text-red-600 hover:bg-red-200' : 'bg-green-100 text-green-600 hover:bg-green-200'}`}
                            title={recado.ativo ? 'Desativar' : 'Ativar'}
                          >
                            <Eye size={16} />
                          </button>
                          <button
                            onClick={() => handleDeleteRecado(recado.id)}
                            className="p-2 bg-red-100 text-red-600 rounded hover:bg-red-200"
                            title="Excluir"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </div>
                      <p className="text-gray-700 text-sm whitespace-pre-line">{recado.conteudo}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        <div className="text-center mt-6">
          <button
            onClick={salvarEPublicar}
            disabled={saveStatus === 'saving'}
            className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-lg font-bold hover:from-green-700 hover:to-emerald-700 transition-all shadow-lg disabled:opacity-70"
          >
            {saveStatus === 'saving' ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                Publicando...
              </>
            ) : (
              <>
                <Globe size={22} />
                Salvar Alterações e Publicar
              </>
            )}
          </button>
          <p className="text-sm text-gray-600 mt-2">
            As alterações aparecerão no site imediatamente
          </p>
        </div>
      </main>

      {previewPopup && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-hidden">
            <div className="p-4 border-b flex justify-between items-center">
              <h3 className="font-bold text-lg">Visualização do Popup</h3>
              <button
                onClick={() => setPreviewPopup(null)}
                className="p-2 hover:bg-gray-100 rounded-lg"
              >
                <X size={20} />
              </button>
            </div>
            <div className="p-6">
              <div className="mb-4 border rounded-lg overflow-hidden">
                <img 
                  src={previewPopup.imagem} 
                  alt="Preview Popup"
                  className="w-full h-auto max-h-[60vh] object-contain bg-gray-50"
                  onError={(e) => {
                    if (!previewPopup.imagem.startsWith('data:image') && !previewPopup.imagem.startsWith('/')) {
                      const corrigida = corrigirUrlImagem(previewPopup.imagem);
                      (e.target as HTMLImageElement).src = corrigida;
                    }
                  }}
                />
              </div>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-gray-600">Status:</p>
                  <p className={`font-medium ${previewPopup.ativo ? 'text-green-600' : 'text-red-600'}`}>
                    {previewPopup.ativo ? 'Ativo' : 'Inativo'}
                  </p>
                </div>
                <div>
                  <p className="text-gray-600">Tempo de exibição:</p>
                  <p className="font-medium">{previewPopup.tempoExibicao} segundos</p>
                </div>
                <div>
                  <p className="text-gray-600">Ordem:</p>
                  <p className="font-medium">{previewPopup.ordem + 1}º</p>
                </div>
                <div>
                  <p className="text-gray-600">Tipo:</p>
                  <p className="font-medium">Imagem Popup</p>
                </div>
              </div>
            </div>
            <div className="p-4 border-t flex justify-end gap-3">
              <button
                onClick={() => setPreviewPopup(null)}
                className="px-4 py-2 border rounded-lg hover:bg-gray-50"
              >
                Fechar
              </button>
              <button
                onClick={() => {
                  handleEditPopup(previewPopup.id);
                  setPreviewPopup(null);
                }}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Editar Popup
              </button>
            </div>
          </div>
        </div>
      )}

      <footer className="mt-8 border-t bg-white/90 backdrop-blur-sm py-4 relative z-10">
        <div className="container mx-auto px-4 text-center text-gray-600 text-sm">
          <p>© {new Date().getFullYear()} Santuário de Fátima - Sistema Administrativo</p>
          <div className="mt-2 text-xs text-gray-500">
            Acessado por: {localStorage.getItem('admin_user') || 'Admin'} | 
            Versão: 2.1 | 
            Última atualização: {new Date().toLocaleDateString('pt-BR')}
          </div>
        </div>
      </footer>
    </div>
  );
}