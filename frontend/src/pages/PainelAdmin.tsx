// frontend/src/pages/PainelAdmin.tsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Upload, Image, MessageSquare, Calendar, AlertCircle,
  LogOut, Save, Trash2, Eye, Home, Bell, Settings,
  Type, X, Palette, Plus, FileText, Download, Globe,
  Tv, Layout, Users
} from 'lucide-react';

interface CarrosselItem {
  id: string;
  imagem: string;
  titulo?: string;
  descricao?: string;
  ordem: number;
  ativo: boolean;
  local: 'home' | 'eventos'; // NOVO: especifica onde o carrossel será exibido
}

interface RecadoItem {
  id: string;
  titulo: string;
  conteudo: string;
  tipo: 'texto' | 'imagem';
  imagem?: string;
  dataCriacao: string;
  ativo: boolean;
  categoria?: string;
}

interface EventoItem {
  id: string;
  titulo: string;
  conteudo: string;
  tipo: 'texto' | 'imagem' | 'carrossel';
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
}

export default function PainelAdmin() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'carrossel' | 'recados' | 'eventos' | 'popups'>('carrossel');
  const [carrosselTipo, setCarrosselTipo] = useState<'home' | 'eventos'>('home'); // NOVO: seleciona qual carrossel editar
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  // Estados
  const [carrosselHome, setCarrosselHome] = useState<CarrosselItem[]>([]);
  const [carrosselEventos, setCarrosselEventos] = useState<CarrosselItem[]>([]);
  const [recados, setRecados] = useState<RecadoItem[]>([]);
  const [eventos, setEventos] = useState<EventoItem[]>([]);
  const [popups, setPopups] = useState<PopupItem[]>([]);
  
  // Formulários
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
    intervalo: 5
  });

  const [novaFotoCarrossel, setNovaFotoCarrossel] = useState({
    titulo: '',
    descricao: '',
    imagem: ''
  });

  // Cores pré-definidas
  const coresBanner = [
    { nome: 'Roxo (Cinzas)', from: '#9333ea', to: '#7c3aed' },
    { nome: 'Amarelo (Jubileu)', from: '#f59e0b', to: '#d97706' },
    { nome: 'Vermelho (Paixão)', from: '#dc2626', to: '#b91c1c' },
    { nome: 'Verde (Esperança)', from: '#059669', to: '#047857' },
    { nome: 'Azul (Maria)', from: '#2563eb', to: '#1d4ed8' },
    { nome: 'Rosa (Misericórdia)', from: '#db2777', to: '#be185d' },
  ];

  // Autenticação
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

  // Carregar dados
  useEffect(() => {
    if (isAuthenticated) {
      const carregarDados = () => {
        const dados = localStorage.getItem('recados-santuario');
        if (dados) {
          try {
            const parsed = JSON.parse(dados);
            
            // Separar carrosséis por local
            const carrosselItems = parsed.filter((item: any) => item.tipo === 'carrossel');
            const homeItems = carrosselItems.filter((item: any) => item.local === 'home');
            const eventosItems = carrosselItems.filter((item: any) => item.local === 'eventos');
            
            setCarrosselHome(homeItems);
            setCarrosselEventos(eventosItems);
            setRecados(parsed.filter((item: any) => item.tipo === 'recado'));
            setEventos(parsed.filter((item: any) => item.tipo === 'evento'));
            setPopups(parsed.filter((item: any) => item.tipo === 'popup'));
          } catch (error) {
            console.error('Erro ao carregar dados:', error);
          }
        }
      };
      
      carregarDados();
    }
  }, [isAuthenticated]);

  const handleLogout = () => {
    localStorage.removeItem('admin_token');
    localStorage.removeItem('admin_user');
    navigate('/');
  };

  // Salvar todos os dados
  const salvarNoLocalStorage = () => {
    const todosDados = [
      ...carrosselHome.map(item => ({ ...item, tipo: 'carrossel', local: 'home' })),
      ...carrosselEventos.map(item => ({ ...item, tipo: 'carrossel', local: 'eventos' })),
      ...recados.map(item => ({ ...item, tipo: 'recado' })),
      ...eventos.map(item => ({ ...item, tipo: 'evento' })),
      ...popups.map(item => ({ ...item, tipo: 'popup' }))
    ];
    
    localStorage.setItem('recados-santuario', JSON.stringify(todosDados));
    alert('✅ Dados salvos com sucesso!');
  };

  // === FUNÇÕES CARROSSEL ===
  const carrosselAtual = carrosselTipo === 'home' ? carrosselHome : carrosselEventos;
  const setCarrosselAtual = carrosselTipo === 'home' ? setCarrosselHome : setCarrosselEventos;

  const handleUploadFotoCarrossel = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const novasFotos: CarrosselItem[] = Array.from(files).map((file, index) => ({
        id: Date.now() + index + '',
        imagem: URL.createObjectURL(file),
        titulo: novaFotoCarrossel.titulo || `Imagem ${carrosselAtual.length + index + 1}`,
        descricao: novaFotoCarrossel.descricao,
        ordem: carrosselAtual.length + index,
        ativo: true,
        local: carrosselTipo
      }));
      
      setCarrosselAtual([...carrosselAtual, ...novasFotos]);
      setNovaFotoCarrossel({ titulo: '', descricao: '', imagem: '' });
    }
  };

  const handleDeleteFotoCarrossel = (id: string) => {
    if (window.confirm('Excluir esta imagem do carrossel?')) {
      setCarrosselAtual(carrosselAtual.filter(item => item.id !== id));
    }
  };

  const handleToggleAtivoCarrossel = (id: string) => {
    setCarrosselAtual(carrosselAtual.map(item => 
      item.id === id ? { ...item, ativo: !item.ativo } : item
    ));
  };

  // === FUNÇÕES RECADOS, EVENTOS E POPUPS (mantêm iguais) ===
  // [Manter todas as funções anteriores de recados, eventos e popups]

  // Exportar dados
  const handleExportarDados = () => {
    const dados = {
      carrosselHome,
      carrosselEventos,
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
    
    alert('📥 Dados exportados com sucesso!');
  };

  // Loading
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
      className="min-h-screen bg-gray-50 relative"
      style={{
        backgroundImage: "url('/lateralnova.png')", // ← NOVA IMAGEM DE FUNDO
        backgroundPosition: 'right top',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'auto 100%',
        backgroundAttachment: 'fixed'
      }}
    >
      {/* Overlay suave */}
      <div className="absolute inset-0 bg-white/95 z-0"></div>

      {/* Cabeçalho */}
      <header className="bg-white shadow-sm border-b sticky top-0 z-10">
        <div className="container mx-auto px-4 py-3">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="flex items-center">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center mr-3">
                <Settings className="text-white" size={22} />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Painel Administrativo</h1>
                <p className="text-xs text-gray-600">Santuário de Fátima</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <button
                onClick={handleExportarDados}
                className="flex items-center gap-2 px-3 py-2 text-gray-700 hover:text-blue-600 hover:bg-gray-100 rounded-lg transition-colors"
                title="Exportar dados"
              >
                <Download size={18} />
                <span className="hidden sm:inline">Exportar</span>
              </button>
              
              <button
                onClick={salvarNoLocalStorage}
                className="flex items-center gap-2 px-3 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                <Save size={18} />
                <span className="hidden sm:inline">Salvar Tudo</span>
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
        {/* Cards de Estatísticas */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
          <div className="bg-white rounded-xl shadow-sm p-5 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Carrossel Home</p>
                <p className="text-2xl font-bold text-gray-800 mt-1">
                  {carrosselHome.filter(item => item.ativo).length}/{carrosselHome.length}
                </p>
              </div>
              <div className="p-3 bg-blue-100 rounded-lg">
                <Globe className="text-blue-600" size={24} />
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-sm p-5 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Carrossel Eventos</p>
                <p className="text-2xl font-bold text-gray-800 mt-1">
                  {carrosselEventos.filter(item => item.ativo).length}/{carrosselEventos.length}
                </p>
              </div>
              <div className="p-3 bg-purple-100 rounded-lg">
                <Tv className="text-purple-600" size={24} />
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-sm p-5 border border-gray-200">
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
          
          <div className="bg-white rounded-xl shadow-sm p-5 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Eventos Ativos</p>
                <p className="text-2xl font-bold text-gray-800 mt-1">
                  {eventos.filter(item => item.ativo).length}/{eventos.length}
                </p>
              </div>
              <div className="p-3 bg-amber-100 rounded-lg">
                <Calendar className="text-amber-600" size={24} />
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-sm p-5 border border-gray-200">
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

        {/* Abas principais */}
        <div className="mb-6 overflow-x-auto">
          <div className="flex gap-2 pb-2 min-w-max">
            {([
              { id: 'carrossel', label: 'Carrosséis', icon: Image },
              { id: 'recados', label: 'Recados', icon: MessageSquare },
              { id: 'eventos', label: 'Eventos', icon: Calendar },
              { id: 'popups', label: 'Popups', icon: AlertCircle }
            ] as const).map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => setActiveTab(id)}
                className={`px-4 py-3 font-medium rounded-lg whitespace-nowrap transition-colors ${
                  activeTab === id 
                    ? 'bg-blue-600 text-white shadow' 
                    : 'bg-white text-gray-600 hover:text-gray-900 hover:bg-gray-100 border'
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

        {/* Conteúdo da Aba */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 sm:p-6 mb-6">
          
          {/* CARROSSÉIS */}
          {activeTab === 'carrossel' && (
            <div>
              <h2 className="text-xl font-bold text-gray-800 mb-2">Gerenciar Carrosséis</h2>
              <p className="text-gray-600 mb-4 text-sm">Gerencie os carrosséis da Home e da página de Eventos</p>
              
              {/* Seletor de Carrossel */}
              <div className="flex gap-2 mb-6">
                <button
                  onClick={() => setCarrosselTipo('home')}
                  className={`flex-1 py-3 rounded-lg font-medium flex items-center justify-center gap-2 ${
                    carrosselTipo === 'home' 
                      ? 'bg-blue-600 text-white' 
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  <Globe size={18} />
                  Carrossel da Home
                </button>
                <button
                  onClick={() => setCarrosselTipo('eventos')}
                  className={`flex-1 py-3 rounded-lg font-medium flex items-center justify-center gap-2 ${
                    carrosselTipo === 'eventos' 
                      ? 'bg-blue-600 text-white' 
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  <Tv size={18} />
                  Carrossel de Eventos
                </button>
              </div>

              {/* Informação do carrossel selecionado */}
              <div className="mb-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
                <div className="flex items-center gap-3">
                  {carrosselTipo === 'home' ? (
                    <>
                      <Globe className="text-blue-600" size={24} />
                      <div>
                        <h3 className="font-bold text-blue-800">Carrossel da Página Principal</h3>
                        <p className="text-sm text-blue-700">
                          Estas imagens aparecem no carrossel da home page
                        </p>
                      </div>
                    </>
                  ) : (
                    <>
                      <Tv className="text-purple-600" size={24} />
                      <div>
                        <h3 className="font-bold text-purple-800">Carrossel da Página de Eventos</h3>
                        <p className="text-sm text-purple-700">
                          Estas imagens aparecem nas seções especiais (Cinzas, Jubileu, etc.)
                        </p>
                      </div>
                    </>
                  )}
                </div>
              </div>

              {/* Upload */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">Adicionar Imagens</label>
                <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center hover:border-blue-500 transition-colors">
                  <Upload className="w-10 h-10 text-gray-400 mx-auto mb-3" />
                  <p className="text-sm text-gray-600 mb-2">
                    Selecione imagens para o carrossel {carrosselTipo === 'home' ? 'da Home' : 'de Eventos'}
                  </p>
                  <p className="text-xs text-gray-500 mb-3">
                    {carrosselTipo === 'home' 
                      ? 'Tamanho recomendado: 1920x800px' 
                      : 'Tamanho recomendado: 1200x600px'}
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
                    <input
                      type="text"
                      value={novaFotoCarrossel.titulo}
                      onChange={(e) => setNovaFotoCarrossel({...novaFotoCarrossel, titulo: e.target.value})}
                      placeholder="Título da imagem (opcional)"
                      className="p-2 border rounded text-sm"
                    />
                    <input
                      type="text"
                      value={novaFotoCarrossel.descricao}
                      onChange={(e) => setNovaFotoCarrossel({...novaFotoCarrossel, descricao: e.target.value})}
                      placeholder="Descrição (opcional)"
                      className="p-2 border rounded text-sm"
                    />
                  </div>
                  
                  <label className="inline-flex items-center gap-2 px-5 py-2.5 bg-blue-600 text-white rounded-lg text-sm cursor-pointer hover:bg-blue-700 transition-colors">
                    <Plus size={16} />
                    Escolher Arquivos
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

              {/* Galeria */}
              {carrosselAtual.length === 0 ? (
                <div className="text-center py-10 text-gray-500">
                  <Image className="w-12 h-12 mx-auto mb-2 text-gray-300" />
                  <p>Nenhuma imagem neste carrossel</p>
                  <p className="text-sm mt-1">Adicione imagens usando o botão acima</p>
                </div>
              ) : (
                <div>
                  <div className="flex justify-between items-center mb-3">
                    <h3 className="font-bold text-gray-700">
                      Imagens do Carrossel ({carrosselAtual.filter(item => item.ativo).length} ativas)
                    </h3>
                    <span className="text-sm text-gray-500">
                      Total: {carrosselAtual.length} imagens
                    </span>
                  </div>
                  
                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                    {carrosselAtual.map((item) => (
                      <div key={item.id} className="border rounded-lg overflow-hidden">
                        <div className="relative">
                          <img 
                            src={item.imagem} 
                            alt={item.titulo} 
                            className="w-full h-40 object-cover"
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
                        </div>
                        <div className="p-3">
                          <input
                            type="text"
                            value={item.titulo}
                            onChange={(e) => {
                              setCarrosselAtual(carrosselAtual.map(i => 
                                i.id === item.id ? { ...i, titulo: e.target.value } : i
                              ));
                            }}
                            className="w-full text-sm border rounded px-2 py-1 mb-1"
                            placeholder="Título da imagem"
                          />
                          <div className="flex justify-between items-center text-xs text-gray-500">
                            <span>Ordem: {item.ordem + 1}</span>
                            <span className={item.ativo ? 'text-green-600' : 'text-red-600'}>
                              {item.ativo ? 'Ativo' : 'Inativo'}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* RECADOS, EVENTOS E POPUPS */}
          {/* [Manter o conteúdo anterior das outras abas aqui] */}
          {/* ... */}
        </div>

        {/* Botão para salvar tudo */}
        <div className="text-center mt-6">
          <button
            onClick={salvarNoLocalStorage}
            className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-lg font-medium hover:from-green-700 hover:to-emerald-700 transition-all shadow-lg"
          >
            <Save size={20} />
            Salvar Todas as Alterações
          </button>
          <p className="text-sm text-gray-600 mt-2">
            As alterações só aparecerão no site após salvar
          </p>
        </div>
      </main>

      <footer className="mt-8 border-t bg-white py-4 relative z-10">
        <div className="container mx-auto px-4 text-center text-gray-600 text-sm">
          <p>© {new Date().getFullYear()} Santuário de Fátima - Painel Administrativo</p>
          <p className="mt-1">Sistema de gestão de conteúdo</p>
          <div className="mt-2 text-xs text-gray-500">
            Usuário: {localStorage.getItem('admin_user') || 'Admin'} • Último acesso: {new Date().toLocaleDateString()}
          </div>
        </div>
      </footer>
    </div>
  );
}