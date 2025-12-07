// frontend/src/pages/PainelAdmin.tsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Upload, Image, MessageSquare, Calendar, AlertCircle,
  LogOut, Save, Trash2, Eye, Home, Bell, Settings,
  Type, X, Palette, Plus, FileText, Download, Globe,
  Tv, Layout, Users, CheckCircle
} from 'lucide-react';

// TIPOS DE DADOS
interface CarrosselItem {
  id: string;
  imagem: string;
  titulo?: string;
  descricao?: string;
  ordem: number;
  ativo: boolean;
  local: 'home' | 'eventos-cinzas' | 'eventos-jubileu' | 'eventos-paixao';
}

interface RecadoItem {
  id: string;
  titulo: string;
  conteudo: string;
  tipo: 'texto' | 'imagem';
  imagem?: string;
  dataCriacao: string;
  ativo: boolean;
  categoria: string;
}

interface EventoItem {
  id: string;
  titulo: string;
  conteudo: string;
  tipo: 'texto' | 'imagem';
  imagem?: string;
  data: string;
  hora: string;
  local: string;
  dataCriacao: string;
  ativo: boolean;
  corBanner: string;
  corBannerTo: string;
}

interface PopupItem {
  id: string;
  titulo: string;
  mensagem: string;
  tipo: 'texto' | 'imagem';
  imagem?: string;
  ativo: boolean;
  intervalo: number;
  dataExpiracao?: string;
}

export default function PainelAdmin() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'carrossel' | 'recados' | 'eventos' | 'popups'>('carrossel');
  const [carrosselTipo, setCarrosselTipo] = useState<'home' | 'eventos-cinzas' | 'eventos-jubileu' | 'eventos-paixao'>('home');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  // ESTADOS
  const [carrosselHome, setCarrosselHome] = useState<CarrosselItem[]>([]);
  const [carrosselCinzas, setCarrosselCinzas] = useState<CarrosselItem[]>([]);
  const [carrosselJubileu, setCarrosselJubileu] = useState<CarrosselItem[]>([]);
  const [carrosselPaixao, setCarrosselPaixao] = useState<CarrosselItem[]>([]);
  const [recados, setRecados] = useState<RecadoItem[]>([]);
  const [eventos, setEventos] = useState<EventoItem[]>([]);
  const [popups, setPopups] = useState<PopupItem[]>([]);
  
  // FORMULÁRIOS
  const [novaFotoCarrossel, setNovaFotoCarrossel] = useState({
    titulo: '',
    descricao: '',
    imagem: '' as string | null
  });

  const [novoRecado, setNovoRecado] = useState<Omit<RecadoItem, 'id' | 'dataCriacao'>>({
    titulo: '',
    conteudo: '',
    tipo: 'texto',
    imagem: '',
    ativo: true,
    categoria: 'geral'
  });

  const [novoEvento, setNovoEvento] = useState<Omit<EventoItem, 'id' | 'dataCriacao'>>({
    titulo: '',
    conteudo: '',
    tipo: 'texto',
    imagem: '',
    data: '',
    hora: '',
    local: '',
    ativo: true,
    corBanner: '#9333ea',
    corBannerTo: '#7c3aed'
  });

  const [novoPopup, setNovoPopup] = useState<Omit<PopupItem, 'id'>>({
    titulo: '',
    mensagem: '',
    tipo: 'texto',
    imagem: '',
    ativo: true,
    intervalo: 5,
    dataExpiracao: ''
  });

  // CORES PRÉ-DEFINIDAS
  const coresBanner = [
    { nome: 'Roxo (Cinzas)', from: '#9333ea', to: '#7c3aed' },
    { nome: 'Amarelo (Jubileu)', from: '#f59e0b', to: '#d97706' },
    { nome: 'Vermelho (Paixão)', from: '#dc2626', to: '#b91c1c' },
    { nome: 'Verde (Esperança)', from: '#059669', to: '#047857' },
    { nome: 'Azul (Maria)', from: '#2563eb', to: '#1d4ed8' },
    { nome: 'Rosa (Misericórdia)', from: '#db2777', to: '#be185d' },
  ];

  // AUTENTICAÇÃO
  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem('admin_token');
      const user = localStorage.getItem('admin_user');
      
      if (!token || !user) {
        navigate('/');
        return false;
      }
      
      setIsAuthenticated(true);
      setLoading(false);
      return true;
    };

    setTimeout(() => checkAuth(), 500);
  }, [navigate]);

  // CARREGAR DADOS
  useEffect(() => {
    if (isAuthenticated) {
      carregarDados();
    }
  }, [isAuthenticated]);

  const carregarDados = () => {
    try {
      const dados = localStorage.getItem('dados-santuario');
      if (dados) {
        const parsed = JSON.parse(dados);
        
        if (parsed.carrosselHome) setCarrosselHome(parsed.carrosselHome);
        if (parsed.carrosselCinzas) setCarrosselCinzas(parsed.carrosselCinzas);
        if (parsed.carrosselJubileu) setCarrosselJubileu(parsed.carrosselJubileu);
        if (parsed.carrosselPaixao) setCarrosselPaixao(parsed.carrosselPaixao);
        if (parsed.recados) setRecados(parsed.recados);
        if (parsed.eventos) setEventos(parsed.eventos);
        if (parsed.popups) setPopups(parsed.popups);
      }
    } catch (error) {
      console.error('Erro ao carregar dados:', error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('admin_token');
    localStorage.removeItem('admin_user');
    navigate('/');
  };

  // SALVAR TODOS OS DADOS
  const salvarDados = () => {
    const dadosCompletos = {
      carrosselHome,
      carrosselCinzas,
      carrosselJubileu,
      carrosselPaixao,
      recados,
      eventos,
      popups,
      ultimaAtualizacao: new Date().toISOString()
    };
    
    localStorage.setItem('dados-santuario', JSON.stringify(dadosCompletos));
    alert('✅ Dados salvos com sucesso!');
  };

  // === FUNÇÕES CARROSSEL ===
  const getCarrosselAtual = () => {
    switch (carrosselTipo) {
      case 'home': return carrosselHome;
      case 'eventos-cinzas': return carrosselCinzas;
      case 'eventos-jubileu': return carrosselJubileu;
      case 'eventos-paixao': return carrosselPaixao;
      default: return carrosselHome;
    }
  };

  const setCarrosselAtual = (novosDados: CarrosselItem[]) => {
    switch (carrosselTipo) {
      case 'home': setCarrosselHome(novosDados); break;
      case 'eventos-cinzas': setCarrosselCinzas(novosDados); break;
      case 'eventos-jubileu': setCarrosselJubileu(novosDados); break;
      case 'eventos-paixao': setCarrosselPaixao(novosDados); break;
    }
  };

  const handleUploadFoto = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      const reader = new FileReader();
      
      reader.onload = (event) => {
        if (event.target?.result) {
          const carrosselAtual = getCarrosselAtual();
          const novaImagem: CarrosselItem = {
            id: Date.now() + '',
            imagem: event.target.result as string,
            titulo: novaFotoCarrossel.titulo || `Imagem ${carrosselAtual.length + 1}`,
            descricao: novaFotoCarrossel.descricao,
            ordem: carrosselAtual.length,
            ativo: true,
            local: carrosselTipo
          };
          
          setCarrosselAtual([...carrosselAtual, novaImagem]);
          setNovaFotoCarrossel({ titulo: '', descricao: '', imagem: null });
        }
      };
      
      reader.readAsDataURL(file);
    }
  };

  const handleDeleteFoto = (id: string) => {
    if (window.confirm('Excluir esta imagem?')) {
      const carrosselAtual = getCarrosselAtual();
      setCarrosselAtual(carrosselAtual.filter(item => item.id !== id));
    }
  };

  const handleToggleAtivoFoto = (id: string) => {
    const carrosselAtual = getCarrosselAtual();
    setCarrosselAtual(carrosselAtual.map(item => 
      item.id === id ? { ...item, ativo: !item.ativo } : item
    ));
  };

  // === FUNÇÕES RECADOS ===
  const handleAddRecado = () => {
    if (!novoRecado.titulo.trim() || !novoRecado.conteudo.trim()) {
      alert('Preencha título e conteúdo!');
      return;
    }

    const novoItem: RecadoItem = {
      id: Date.now() + '',
      ...novoRecado,
      dataCriacao: new Date().toLocaleDateString('pt-BR')
    };

    setRecados([...recados, novoItem]);
    setNovoRecado({
      titulo: '',
      conteudo: '',
      tipo: 'texto',
      imagem: '',
      ativo: true,
      categoria: 'geral'
    });
  };

  const handleRecadoUploadImagem = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setNovoRecado({ ...novoRecado, imagem: event.target.result as string });
        }
      };
      reader.readAsDataURL(file);
    }
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

  // === FUNÇÕES EVENTOS ===
  const handleAddEvento = () => {
    if (!novoEvento.titulo.trim() || !novoEvento.data) {
      alert('Preencha título e data!');
      return;
    }

    const novoItem: EventoItem = {
      id: Date.now() + '',
      ...novoEvento,
      dataCriacao: new Date().toLocaleDateString('pt-BR')
    };

    setEventos([...eventos, novoItem]);
    setNovoEvento({
      titulo: '',
      conteudo: '',
      tipo: 'texto',
      imagem: '',
      data: '',
      hora: '',
      local: '',
      ativo: true,
      corBanner: '#9333ea',
      corBannerTo: '#7c3aed'
    });
  };

  const handleEventoUploadImagem = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setNovoEvento({ ...novoEvento, imagem: event.target.result as string });
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDeleteEvento = (id: string) => {
    if (window.confirm('Excluir este evento?')) {
      setEventos(eventos.filter(item => item.id !== id));
    }
  };

  // === FUNÇÕES POPUPS ===
  const handleAddPopup = () => {
    if (!novoPopup.titulo.trim() || !novoPopup.mensagem.trim()) {
      alert('Preencha título e mensagem!');
      return;
    }

    const novoItem: PopupItem = {
      id: Date.now() + '',
      ...novoPopup
    };

    setPopups([...popups, novoItem]);
    setNovoPopup({
      titulo: '',
      mensagem: '',
      tipo: 'texto',
      imagem: '',
      ativo: true,
      intervalo: 5,
      dataExpiracao: ''
    });
  };

  const handlePopupUploadImagem = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setNovoPopup({ ...novoPopup, imagem: event.target.result as string });
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDeletePopup = (id: string) => {
    if (window.confirm('Excluir este popup?')) {
      setPopups(popups.filter(item => item.id !== id));
    }
  };

  const handleToggleAtivoPopup = (id: string) => {
    setPopups(popups.map(item => 
      item.id === id ? { ...item, ativo: !item.ativo } : item
    ));
  };

  // EXPORTAR DADOS
  const handleExportarDados = () => {
    const dados = {
      carrosselHome,
      carrosselCinzas,
      carrosselJubileu,
      carrosselPaixao,
      recados,
      eventos,
      popups,
      exportadoEm: new Date().toISOString()
    };
    
    const blob = new Blob([JSON.stringify(dados, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `dados-santuario-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  // LOADING
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

  const carrosselAtual = getCarrosselAtual();
  const carrosselInfo = {
    'home': { nome: 'Home Page', icon: Home, desc: 'Carrossel principal da página inicial' },
    'eventos-cinzas': { nome: 'Cinzas 2025', icon: Users, desc: 'Carrossel da seção Cinzas' },
    'eventos-jubileu': { nome: 'Jubileu 2025', icon: Calendar, desc: 'Carrossel da seção Jubileu' },
    'eventos-paixao': { nome: 'Paixão de Cristo', icon: Bell, desc: 'Carrossel da seção Paixão' }
  };

  const Info = carrosselInfo[carrosselTipo];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      {/* CABEÇALHO */}
      <header className="bg-white shadow-lg border-b sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center mr-4 shadow-lg">
                <Settings className="text-white" size={26} />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Painel Administrativo</h1>
                <p className="text-sm text-gray-600">Santuário Nossa Senhora de Fátima</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <button
                onClick={() => navigate('/')}
                className="flex items-center gap-2 px-4 py-2.5 text-gray-700 hover:text-blue-600 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <Home size={18} />
                <span>Visitar Site</span>
              </button>
              
              <button
                onClick={salvarDados}
                className="flex items-center gap-2 px-4 py-2.5 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors shadow-md"
              >
                <Save size={18} />
                <span>Salvar Tudo</span>
              </button>
              
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-4 py-2.5 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                <LogOut size={18} />
                <span>Sair</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* CARDS DE ESTATÍSTICAS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-blue-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Carrosséis</p>
                <p className="text-2xl font-bold text-gray-800 mt-1">
                  {carrosselHome.filter(i => i.ativo).length + carrosselCinzas.filter(i => i.ativo).length + carrosselJubileu.filter(i => i.ativo).length + carrosselPaixao.filter(i => i.ativo).length}
                </p>
              </div>
              <div className="p-3 bg-blue-100 rounded-lg">
                <Image className="text-blue-600" size={24} />
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-green-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Recados Ativos</p>
                <p className="text-2xl font-bold text-gray-800 mt-1">
                  {recados.filter(item => item.ativo).length}/{recados.length}
                </p>
              </div>
              <div className="p-3 bg-green-100 rounded-lg">
                <MessageSquare className="text-green-600" size={24} />
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-purple-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Eventos Ativos</p>
                <p className="text-2xl font-bold text-gray-800 mt-1">
                  {eventos.filter(item => item.ativo).length}/{eventos.length}
                </p>
              </div>
              <div className="p-3 bg-purple-100 rounded-lg">
                <Calendar className="text-purple-600" size={24} />
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-yellow-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Popups Ativos</p>
                <p className="text-2xl font-bold text-gray-800 mt-1">
                  {popups.filter(item => item.ativo).length}/{popups.length}
                </p>
              </div>
              <div className="p-3 bg-yellow-100 rounded-lg">
                <Bell className="text-yellow-600" size={24} />
              </div>
            </div>
          </div>
        </div>

        {/* ABAS PRINCIPAIS */}
        <div className="mb-6">
          <div className="flex gap-2 pb-2 overflow-x-auto">
            {([
              { id: 'carrossel', label: 'Carrosséis', icon: Image },
              { id: 'recados', label: 'Recados', icon: MessageSquare },
              { id: 'eventos', label: 'Eventos', icon: Calendar },
              { id: 'popups', label: 'Popups', icon: Bell }
            ] as const).map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => setActiveTab(id)}
                className={`flex items-center gap-2 px-5 py-3 font-medium rounded-lg whitespace-nowrap transition-colors ${
                  activeTab === id 
                    ? 'bg-blue-600 text-white shadow-lg' 
                    : 'bg-white text-gray-600 hover:text-gray-900 hover:bg-gray-100 border'
                }`}
              >
                <Icon size={18} />
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* CONTEÚDO DAS ABAS */}
        <div className="bg-white rounded-xl shadow-md border border-gray-200 p-6 mb-8">
          
          {/* CARROSSÉIS */}
          {activeTab === 'carrossel' && (
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">Gerenciar Carrosséis</h2>
              <p className="text-gray-600 mb-6">Gerencie os carrosséis de diferentes páginas</p>
              
              {/* SELETOR DE CARROSSEL */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-8">
                {Object.entries(carrosselInfo).map(([tipo, info]) => (
                  <button
                    key={tipo}
                    onClick={() => setCarrosselTipo(tipo as any)}
                    className={`p-4 rounded-lg border-2 transition-all ${
                      carrosselTipo === tipo
                        ? 'border-blue-500 bg-blue-50 shadow-md'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-lg ${
                        carrosselTipo === tipo ? 'bg-blue-100' : 'bg-gray-100'
                      }`}>
                        <info.icon size={20} className={
                          carrosselTipo === tipo ? 'text-blue-600' : 'text-gray-600'
                        } />
                      </div>
                      <div className="text-left">
                        <h3 className="font-semibold text-gray-800">{info.nome}</h3>
                        <p className="text-xs text-gray-500">{info.desc}</p>
                      </div>
                    </div>
                  </button>
                ))}
              </div>

              {/* INFO DO CARROSSEL SELECIONADO */}
              <div className="mb-6 p-4 bg-gradient-to-r from-blue-50 to-gray-50 rounded-xl border border-blue-200">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-blue-100 rounded-lg">
                      <Info.icon className="text-blue-600" size={24} />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg text-gray-800">{Info.nome}</h3>
                      <p className="text-gray-600">{Info.desc}</p>
                      <div className="flex items-center gap-4 mt-2">
                        <span className="text-sm text-gray-500">
                          📸 {carrosselAtual.filter(i => i.ativo).length} ativas
                        </span>
                        <span className="text-sm text-gray-500">
                          📁 {carrosselAtual.length} imagens
                        </span>
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={handleExportarDados}
                    className="flex items-center gap-2 px-3 py-2 text-sm text-gray-600 hover:text-blue-600"
                  >
                    <Download size={16} />
                    Exportar
                  </button>
                </div>
              </div>

              {/* FORMULÁRIO DE UPLOAD */}
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-gray-800 mb-3">Adicionar Imagens</h3>
                <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 hover:border-blue-400 transition-colors">
                  <div className="text-center mb-4">
                    <Upload className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                    <p className="text-gray-600 mb-1">Arraste imagens ou clique para selecionar</p>
                    <p className="text-sm text-gray-500">Formatos: JPG, PNG, GIF • Tamanho recomendado: 1920x800px</p>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <input
                      type="text"
                      value={novaFotoCarrossel.titulo}
                      onChange={(e) => setNovaFotoCarrossel({...novaFotoCarrossel, titulo: e.target.value})}
                      placeholder="Título da imagem (opcional)"
                      className="p-3 border rounded-lg text-sm"
                    />
                    <input
                      type="text"
                      value={novaFotoCarrossel.descricao}
                      onChange={(e) => setNovaFotoCarrossel({...novaFotoCarrossel, descricao: e.target.value})}
                      placeholder="Descrição (opcional)"
                      className="p-3 border rounded-lg text-sm"
                    />
                  </div>
                  
                  <label className="block">
                    <div className="flex items-center justify-center gap-3 px-6 py-3 bg-blue-600 text-white rounded-lg cursor-pointer hover:bg-blue-700 transition-colors">
                      <Plus size={20} />
                      Selecionar Arquivos
                      <input 
                        type="file" 
                        accept="image/*" 
                        onChange={handleUploadFoto} 
                        className="hidden" 
                        multiple
                      />
                    </div>
                  </label>
                </div>
              </div>

              {/* GALERIA DE IMAGENS */}
              <div>
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold text-gray-800">Imagens do Carrossel</h3>
                  <span className="text-sm text-gray-500">
                    {carrosselAtual.length} imagens • {carrosselAtual.filter(i => i.ativo).length} ativas
                  </span>
                </div>
                
                {carrosselAtual.length === 0 ? (
                  <div className="text-center py-12 border-2 border-dashed border-gray-300 rounded-xl">
                    <Image className="w-16 h-16 text-gray-300 mx-auto mb-3" />
                    <p className="text-gray-500">Nenhuma imagem neste carrossel</p>
                    <p className="text-sm text-gray-400 mt-1">Adicione imagens usando o formulário acima</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                    {carrosselAtual.map((item) => (
                      <div key={item.id} className="border rounded-xl overflow-hidden hover:shadow-lg transition-shadow">
                        <div className="relative h-48 bg-gray-100">
                          <img 
                            src={item.imagem} 
                            alt={item.titulo || 'Imagem'} 
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute top-2 right-2 flex gap-1">
                            <button
                              onClick={() => handleToggleAtivoFoto(item.id)}
                              className={`p-1.5 rounded-full ${item.ativo ? 'bg-green-500' : 'bg-red-500'}`}
                              title={item.ativo ? 'Desativar' : 'Ativar'}
                            >
                              <Eye size={14} className="text-white" />
                            </button>
                            <button
                              onClick={() => handleDeleteFoto(item.id)}
                              className="p-1.5 bg-red-500 rounded-full"
                              title="Excluir"
                            >
                              <Trash2 size={14} className="text-white" />
                            </button>
                          </div>
                        </div>
                        <div className="p-3">
                          <input
                            type="text"
                            value={item.titulo || ''}
                            onChange={(e) => {
                              const novosDados = carrosselAtual.map(i => 
                                i.id === item.id ? { ...i, titulo: e.target.value } : i
                              );
                              setCarrosselAtual(novosDados);
                            }}
                            className="w-full p-2 border rounded text-sm mb-1"
                            placeholder="Título"
                          />
                          <div className="flex justify-between items-center text-xs">
                            <span className={`px-2 py-1 rounded ${item.ativo ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                              {item.ativo ? 'Ativo' : 'Inativo'}
                            </span>
                            <span className="text-gray-500">Ordem: {item.ordem + 1}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* RECADOS */}
          {activeTab === 'recados' && (
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">Gerenciar Recados</h2>
              <p className="text-gray-600 mb-6">Os recados aparecem na página de Eventos</p>
              
              {/* [MANTENHA TODO O CÓDIGO ANTERIOR DE RECADOS AQUI] */}
              {/* ... */}
            </div>
          )}

          {/* EVENTOS */}
          {activeTab === 'eventos' && (
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">Gerenciar Eventos</h2>
              <p className="text-gray-600 mb-6">Crie eventos especiais com banners coloridos</p>
              
              {/* [MANTENHA TODO O CÓDIGO ANTERIOR DE EVENTOS AQUI] */}
              {/* ... */}
            </div>
          )}

          {/* POPUPS */}
          {activeTab === 'popups' && (
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">Gerenciar Popups</h2>
              <p className="text-gray-600 mb-6">Avisos que aparecem ao entrar no site</p>
              
              {/* [MANTENHA TODO O CÓDIGO ANTERIOR DE POPUPS AQUI] */}
              {/* ... */}
            </div>
          )}
        </div>

        {/* BOTÃO SALVAR FINAL */}
        <div className="text-center">
          <button
            onClick={salvarDados}
            className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl font-bold hover:from-green-600 hover:to-emerald-700 transition-all shadow-lg hover:shadow-xl"
          >
            <Save size={22} />
            SALVAR TODAS AS ALTERAÇÕES
          </button>
          <p className="text-sm text-gray-600 mt-3">
            Não esqueça de salvar para que as alterações apareçam no site!
          </p>
        </div>
      </main>

      <footer className="mt-12 border-t bg-white py-6">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gray-700">© {new Date().getFullYear()} Santuário Nossa Senhora de Fátima</p>
          <p className="text-sm text-gray-600 mt-1">Painel Administrativo v2.0</p>
          <div className="mt-3 text-xs text-gray-500">
            Última atualização: {new Date().toLocaleString('pt-BR')}
          </div>
        </div>
      </footer>
    </div>
  );
}