import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Upload, 
  Image, 
  MessageSquare, 
  Calendar, 
  AlertCircle,
  LogOut,
  Save,
  Trash2,
  Eye,
  Home,
  Bell,
  Settings,
  Type,
  X,
  Palette,
  Plus,
  FileText,
  Download,
  Globe
} from 'lucide-react';

interface RecadoItem {
  id: string;
  titulo: string;
  conteudo: string;
  tipo: 'texto' | 'imagem';
  imagem?: string;
  dataCriacao: string;
  ativo: boolean;
  categoria?: string;
  paginaDestino?: string;
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
  textoFaixa?: string;
  paginaDestino: 'carrosselFotos' | 'momentosLiturgicos' | 'eventosEspeciais';
}

interface CarrosselHomeItem {
  id: string;
  imagem: string;
  titulo?: string;
  descricao?: string;
  ordem: number;
  ativo: boolean;
  paginaDestino: 'carrosselFotos' | 'destaqueHome';
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
  const [activeTab, setActiveTab] = useState<'carrossel-home' | 'recados' | 'eventos' | 'popups'>('carrossel-home');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'published' | 'error'>('idle');

  // Estados
  const [carrosselHome, setCarrosselHome] = useState<CarrosselHomeItem[]>([]);
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
    categoria: 'geral',
    paginaDestino: 'carrosselFotos'
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
    corBanner: '#9333ea', // Roxo padrão
    corBannerTo: '#7c3aed', // Roxo mais escuro
    textoFaixa: '',
    paginaDestino: 'carrosselFotos'
  });

  const [novoPopup, setNovoPopup] = useState<Omit<PopupItem, 'id'>>({
    titulo: '',
    mensagem: '',
    tipo: 'texto',
    imagem: '',
    ativo: true,
    intervalo: 5
  });

  // Páginas de destino disponíveis
  const paginasDestino = [
    { id: 'carrosselFotos', nome: 'Carrossel Fotos (Principal)', descricao: 'Imagens no carrossel da página inicial' },
    { id: 'momentosLiturgicos', nome: 'Momentos Litúrgicos', descricao: 'Eventos e celebrações litúrgicas' },
    { id: 'eventosEspeciais', nome: 'Eventos Especiais', descricao: 'Batizados, casamentos, festas' },
    { id: 'destaqueHome', nome: 'Destaque Home', descricao: 'Destaques na página inicial' }
  ];

  // Cores pré-definidas para banners
  const coresBanner = [
    { nome: 'Verde (Tempo Comum)', from: '#059669', to: '#047857', descricao: 'Períodos ordinários' },
    { nome: 'Roxo (Advento/Quaresma)', from: '#9333ea', to: '#7c3aed', descricao: 'Tempos de preparação' },
    { nome: 'Branco (Natal/Páscoa)', from: '#ffffff', to: '#f3f4f6', descricao: 'Celebrações festivas' },
    { nome: 'Vermelho (Paixão/Mártires)', from: '#dc2626', to: '#b91c1c', descricao: 'Paixão de Cristo' },
    { nome: 'Rosa (Gaudete/Laetare)', from: '#db2777', to: '#be185d', descricao: 'Domingos especiais' },
    { nome: 'Azul (Marianos)', from: '#2563eb', to: '#1d4ed8', descricao: 'Festa de Nossa Senhora' },
    { nome: 'Amarelo (Jubileu)', from: '#f59e0b', to: '#d97706', descricao: 'Aniversários especiais' },
    { nome: 'Cinza (Finados)', from: '#6b7280', to: '#4b5563', descricao: 'Falecimentos' }
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

  // Carregar dados do localStorage
  useEffect(() => {
    if (isAuthenticated) {
      const carregarDados = () => {
        const dados = localStorage.getItem('recados-santuario');
        if (dados) {
          try {
            const parsed = JSON.parse(dados);
            
            // Separar por tipo
            const carrosselItems = parsed.filter((item: any) => item.tipo === 'carrossel-home');
            const recadosItems = parsed.filter((item: any) => item.tipo === 'recado');
            const eventosItems = parsed.filter((item: any) => item.tipo === 'evento');
            const popupsItems = parsed.filter((item: any) => item.tipo === 'popup');
            
            setCarrosselHome(carrosselItems);
            setRecados(recadosItems);
            setEventos(eventosItems);
            setPopups(popupsItems);
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

  // Função para salvar e publicar dados
  const salvarEPublicar = () => {
    setSaveStatus('saving');
    
    try {
      const todosDados = [
        ...carrosselHome.map(item => ({ ...item, tipo: 'carrossel-home' as const })),
        ...recados.map(item => ({ ...item, tipo: 'recado' as const })),
        ...eventos.map(item => ({ ...item, tipo: 'evento' as const })),
        ...popups.map(item => ({ ...item, tipo: 'popup' as const }))
      ];
      
      localStorage.setItem('recados-santuario', JSON.stringify(todosDados));
      
      // Simular publicação
      setTimeout(() => {
        setSaveStatus('published');
        setTimeout(() => setSaveStatus('idle'), 3000);
      }, 1000);
      
    } catch (error) {
      console.error('Erro ao salvar:', error);
      setSaveStatus('error');
      setTimeout(() => setSaveStatus('idle'), 3000);
    }
  };

  // === CARROSSEL HOME ===
  const handleUploadFotoCarrossel = (e: React.ChangeEvent<HTMLInputElement>, pagina: string) => {
    const files = e.target.files;
    if (files) {
      const novasFotos: CarrosselHomeItem[] = Array.from(files).map((file, index) => ({
        id: Date.now() + index + '',
        imagem: URL.createObjectURL(file),
        titulo: `Imagem ${carrosselHome.length + index + 1}`,
        ordem: carrosselHome.length + index,
        ativo: true,
        paginaDestino: pagina as 'carrosselFotos' | 'destaqueHome'
      }));
      
      setCarrosselHome([...carrosselHome, ...novasFotos]);
    }
  };

  const handleDeleteFotoCarrossel = (id: string) => {
    if (window.confirm('Excluir esta imagem?')) {
      setCarrosselHome(carrosselHome.filter(item => item.id !== id));
    }
  };

  const handleToggleAtivoCarrossel = (id: string) => {
    setCarrosselHome(carrosselHome.map(item => 
      item.id === id ? { ...item, ativo: !item.ativo } : item
    ));
  };

  // === RECADOS ===
  const handleAddRecado = () => {
    const novoItem: RecadoItem = {
      id: Date.now() + '',
      ...novoRecado,
      dataCriacao: new Date().toLocaleDateString('pt-BR')
    };

    setRecados([...recados, novoItem]);
    
    // Limpar formulário
    setNovoRecado({
      titulo: '',
      conteudo: '',
      tipo: 'texto',
      imagem: '',
      ativo: true,
      categoria: 'geral',
      paginaDestino: 'carrosselFotos'
    });
  };

  const handleRecadoUploadImagem = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setNovoRecado({ ...novoRecado, imagem: URL.createObjectURL(file) });
    }
  };

  const handleDeleteRecadoImagem = () => {
    setNovoRecado({ ...novoRecado, imagem: '' });
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

  // === EVENTOS ===
  const handleAddEvento = () => {
    const novoItem: EventoItem = {
      id: Date.now() + '',
      ...novoEvento,
      dataCriacao: new Date().toLocaleDateString('pt-BR')
    };

    setEventos([...eventos, novoItem]);
    
    // Limpar formulário
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
      corBannerTo: '#7c3aed',
      textoFaixa: '',
      paginaDestino: 'carrosselFotos'
    });
  };

  const handleEventoUploadImagem = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setNovoEvento({ ...novoEvento, imagem: URL.createObjectURL(file) });
    }
  };

  const handleDeleteEventoImagem = () => {
    setNovoEvento({ ...novoEvento, imagem: '' });
  };

  const handleDeleteEvento = (id: string) => {
    if (window.confirm('Excluir este evento?')) {
      setEventos(eventos.filter(item => item.id !== id));
    }
  };

  const handleToggleAtivoEvento = (id: string) => {
    setEventos(eventos.map(item => 
      item.id === id ? { ...item, ativo: !item.ativo } : item
    ));
  };

  // === POPUP ===
  const handleAddPopup = () => {
    const novoItem: PopupItem = {
      id: Date.now() + '',
      ...novoPopup
    };

    setPopups([...popups, novoItem]);
    
    // Limpar formulário
    setNovoPopup({
      titulo: '',
      mensagem: '',
      tipo: 'texto',
      imagem: '',
      ativo: true,
      intervalo: 5
    });
  };

  const handlePopupUploadImagem = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setNovoPopup({ ...novoPopup, imagem: URL.createObjectURL(file) });
    }
  };

  const handleDeletePopupImagem = () => {
    setNovoPopup({ ...novoPopup, imagem: '' });
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

  // Exportar dados
  const handleExportarDados = () => {
    const dados = {
      carrosselHome,
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
        backgroundImage: "url('/images/carrosselFotos/fachada1.png')",
        backgroundPosition: 'right top',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'auto 80vh',
        backgroundAttachment: 'fixed',
        backgroundBlendMode: 'overlay'
      }}
    >
      {/* Overlay suave */}
      <div className="absolute inset-0 bg-white/85 z-0"></div>

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
              {/* Status de publicação */}
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
                onClick={handleExportarDados}
                className="flex items-center gap-2 px-3 py-2 text-gray-700 hover:text-blue-600 hover:bg-gray-100 rounded-lg transition-colors"
                title="Exportar dados"
              >
                <Download size={18} />
                <span className="hidden sm:inline">Exportar</span>
              </button>
              
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
        {/* Cards de Estatísticas */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-sm p-5 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Carrossel Fotos</p>
                <p className="text-2xl font-bold text-gray-800 mt-1">
                  {carrosselHome.filter(item => item.paginaDestino === 'carrosselFotos' && item.ativo).length}
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
                <p className="text-sm text-gray-500">Recados Ativos</p>
                <p className="text-2xl font-bold text-gray-800 mt-1">
                  {recados.filter(item => item.ativo).length}
                </p>
                <p className="text-xs text-gray-500 mt-1">Urgências e avisos</p>
              </div>
              <div className="p-3 bg-green-100 rounded-lg">
                <MessageSquare className="text-green-600" size={24} />
              </div>
            </div>
          </div>
          
          <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-sm p-5 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Eventos Litúrgicos</p>
                <p className="text-2xl font-bold text-gray-800 mt-1">
                  {eventos.filter(item => item.paginaDestino === 'momentosLiturgicos' && item.ativo).length}
                </p>
                <p className="text-xs text-gray-500 mt-1">Celebrações ativas</p>
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
                  {popups.filter(item => item.ativo).length}
                </p>
                <p className="text-xs text-gray-500 mt-1">Avisos no site</p>
              </div>
              <div className="p-3 bg-yellow-100 rounded-lg">
                <Bell className="text-yellow-600" size={24} />
              </div>
            </div>
          </div>
        </div>

        {/* Abas */}
        <div className="mb-6 overflow-x-auto">
          <div className="flex gap-2 pb-2 min-w-max">
            {([
              { id: 'carrossel-home', label: 'Carrossel Fotos', icon: Image },
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

        {/* Conteúdo da Aba */}
        <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-sm border border-gray-200 p-4 sm:p-6 mb-6">
          
          {/* CARROSSEL FOTOS */}
          {activeTab === 'carrossel-home' && (
            <div>
              <h2 className="text-xl font-bold text-gray-800 mb-2">Gerenciar Carrossel de Fotos</h2>
              <p className="text-gray-600 mb-4 text-sm">Adicione imagens para diferentes seções do site</p>
              
              {/* Seletor de Página */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-3">Selecione onde a imagem aparecerá:</label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {paginasDestino.filter(p => p.id === 'carrosselFotos' || p.id === 'destaqueHome').map((pagina) => (
                    <div 
                      key={pagina.id}
                      className={`border rounded-lg p-4 cursor-pointer transition-all ${
                        novoRecado.paginaDestino === pagina.id ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-gray-400'
                      }`}
                      onClick={() => setNovoRecado({...novoRecado, paginaDestino: pagina.id})}
                    >
                      <h3 className="font-bold text-gray-800">{pagina.nome}</h3>
                      <p className="text-sm text-gray-600 mt-1">{pagina.descricao}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Upload para página selecionada */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Adicionar Imagens para: {
                    paginasDestino.find(p => p.id === novoRecado.paginaDestino)?.nome || 'Carrossel Fotos'
                  }
                </label>
                <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center hover:border-blue-500 transition-colors bg-white/50">
                  <Upload className="w-10 h-10 text-gray-400 mx-auto mb-3" />
                  <p className="text-sm text-gray-600 mb-2">Selecione imagens para esta seção (JPG/PNG)</p>
                  <p className="text-xs text-gray-500 mb-3">Tamanho recomendado: 1920x800px</p>
                  <label className="inline-flex items-center gap-2 px-5 py-2.5 bg-blue-600 text-white rounded-lg text-sm cursor-pointer hover:bg-blue-700 transition-colors">
                    <Plus size={16} />
                    Escolher Imagens para {
                      paginasDestino.find(p => p.id === novoRecado.paginaDestino)?.nome || 'Carrossel Fotos'
                    }
                    <input 
                      type="file" 
                      multiple 
                      accept="image/*" 
                      onChange={(e) => handleUploadFotoCarrossel(e, novoRecado.paginaDestino || 'carrosselFotos')} 
                      className="hidden" 
                    />
                  </label>
                </div>
              </div>

              {/* Galeria por página */}
              {['carrosselFotos', 'destaqueHome'].map((paginaId) => {
                const imagensPagina = carrosselHome.filter(item => item.paginaDestino === paginaId);
                const paginaNome = paginasDestino.find(p => p.id === paginaId)?.nome;
                
                if (imagensPagina.length === 0) return null;
                
                return (
                  <div key={paginaId} className="mb-8">
                    <h3 className="font-bold text-gray-700 mb-4 text-lg">{paginaNome}</h3>
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                      {imagensPagina.map((item) => (
                        <div key={item.id} className="border rounded-lg overflow-hidden bg-white">
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
                                setCarrosselHome(carrosselHome.map(i => 
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
                );
              })}
              
              {carrosselHome.length === 0 && (
                <div className="text-center py-10 text-gray-500">
                  <Image className="w-12 h-12 mx-auto mb-2 text-gray-300" />
                  <p>Nenhuma imagem cadastrada</p>
                  <p className="text-sm mt-1">Selecione uma página e adicione imagens</p>
                </div>
              )}
            </div>
          )}

          {/* RECADOS */}
          {activeTab === 'recados' && (
            <div>
              <h2 className="text-xl font-bold text-gray-800 mb-2">Gerenciar Recados</h2>
              <p className="text-gray-600 mb-4 text-sm">Avisos e notícias urgentes (apenas texto)</p>

              {/* Formulário de novo recado */}
              <div className="bg-gray-50/50 rounded-lg p-4 mb-6">
                <h3 className="font-bold text-gray-700 mb-3">Novo Recado</h3>
                
                <div className="space-y-4">
                  <input
                    type="text"
                    value={novoRecado.titulo}
                    onChange={(e) => setNovoRecado({ ...novoRecado, titulo: e.target.value })}
                    placeholder="Título do recado (ex: Aviso importante)"
                    className="w-full p-3 border border-gray-300 rounded-lg"
                  />

                  <textarea
                    value={novoRecado.conteudo}
                    onChange={(e) => setNovoRecado({ ...novoRecado, conteudo: e.target.value })}
                    placeholder="Conteúdo do recado..."
                    rows={4}
                    className="w-full p-3 border border-gray-300 rounded-lg"
                  />

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

              {/* Lista de recados existentes */}
              <h3 className="font-bold text-gray-700 mb-3">Recados Existentes ({recados.length})</h3>
              
              {recados.length === 0 ? (
                <p className="text-gray-500 text-center py-6">Nenhum recado cadastrado</p>
              ) : (
                <div className="space-y-4">
                  {recados.map((recado) => (
                    <div key={recado.id} className="border rounded-lg p-4 hover:border-blue-300 bg-white/50">
                      <div className="flex justify-between items-start mb-3">
                        <div className="flex-1">
                          <h4 className="font-bold text-gray-800">{recado.titulo}</h4>
                          <div className="flex items-center gap-3 mt-1">
                            <span className={`text-xs px-2 py-1 rounded-full ${recado.ativo ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                              {recado.ativo ? 'Ativo' : 'Inativo'}
                            </span>
                            <span className="text-xs text-gray-500">{recado.dataCriacao}</span>
                          </div>
                        </div>
                        <div className="flex gap-2">
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
                      
                      <p className="text-gray-700 text-sm">{recado.conteudo}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* EVENTOS */}
          {activeTab === 'eventos' && (
            <div>
              <h2 className="text-xl font-bold text-gray-800 mb-2">Gerenciar Eventos e Celebrações</h2>
              <p className="text-gray-600 mb-4 text-sm">Configure eventos litúrgicos e celebrações especiais</p>

              {/* Formulário de novo evento */}
              <div className="bg-gray-50/50 rounded-lg p-4 mb-6">
                <h3 className="font-bold text-gray-700 mb-3">Novo Evento</h3>
                
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Seletor de página */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Onde o evento aparecerá?</label>
                      <select
                        value={novoEvento.paginaDestino}
                        onChange={(e) => setNovoEvento({ ...novoEvento, paginaDestino: e.target.value as any })}
                        className="w-full p-3 border border-gray-300 rounded-lg"
                      >
                        {paginasDestino.filter(p => p.id !== 'carrosselFotos' && p.id !== 'destaqueHome').map((pagina) => (
                          <option key={pagina.id} value={pagina.id}>
                            {pagina.nome}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Seletor de tipo de conteúdo */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Tipo de Conteúdo</label>
                      <div className="flex gap-2">
                        <button
                          onClick={() => setNovoEvento({ ...novoEvento, tipo: 'texto' })}
                          className={`flex-1 py-2 rounded-lg text-sm font-medium ${
                            novoEvento.tipo === 'texto' ? 'bg-blue-100 text-blue-700 border border-blue-300' : 'bg-gray-100 border'
                          }`}
                        >
                          Texto
                        </button>
                        <button
                          onClick={() => setNovoEvento({ ...novoEvento, tipo: 'imagem' })}
                          className={`flex-1 py-2 rounded-lg text-sm font-medium ${
                            novoEvento.tipo === 'imagem' ? 'bg-blue-100 text-blue-700 border border-blue-300' : 'bg-gray-100 border'
                          }`}
                        >
                          Imagem
                        </button>
                      </div>
                    </div>
                  </div>

                  <input
                    type="text"
                    value={novoEvento.titulo}
                    onChange={(e) => setNovoEvento({ ...novoEvento, titulo: e.target.value })}
                    placeholder="Título do evento (ex: Corpus Christi, Batizados)"
                    className="w-full p-3 border border-gray-300 rounded-lg"
                  />

                  {/* Texto da faixa */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Texto da Faixa (aparece no banner)
                    </label>
                    <input
                      type="text"
                      value={novoEvento.textoFaixa}
                      onChange={(e) => setNovoEvento({ ...novoEvento, textoFaixa: e.target.value })}
                      placeholder="Ex: Corpus Christi - 30 de junho às 10h"
                      className="w-full p-3 border border-gray-300 rounded-lg"
                    />
                  </div>

                  {/* Seletor de cores do banner */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Cor da Faixa (Banner)</label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                      {coresBanner.map((cor) => (
                        <button
                          key={cor.nome}
                          onClick={() => setNovoEvento({ 
                            ...novoEvento, 
                            corBanner: cor.from, 
                            corBannerTo: cor.to 
                          })}
                          className={`flex flex-col items-center gap-2 p-3 rounded-lg border ${
                            novoEvento.corBanner === cor.from 
                              ? 'ring-2 ring-blue-500' 
                              : 'border-gray-300 hover:border-gray-400'
                          }`}
                          title={cor.nome}
                        >
                          <div 
                            className="w-full h-3 rounded" 
                            style={{ 
                              background: `linear-gradient(135deg, ${cor.from}, ${cor.to})` 
                            }}
                          />
                          <span className="text-xs font-medium text-center">{cor.nome}</span>
                          <span className="text-xs text-gray-500 text-center">{cor.descricao}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Data</label>
                      <input
                        type="date"
                        value={novoEvento.data}
                        onChange={(e) => setNovoEvento({ ...novoEvento, data: e.target.value })}
                        className="w-full p-2.5 border border-gray-300 rounded-lg text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Hora</label>
                      <input
                        type="time"
                        value={novoEvento.hora}
                        onChange={(e) => setNovoEvento({ ...novoEvento, hora: e.target.value })}
                        className="w-full p-2.5 border border-gray-300 rounded-lg text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Local</label>
                      <input
                        type="text"
                        value={novoEvento.local}
                        onChange={(e) => setNovoEvento({ ...novoEvento, local: e.target.value })}
                        placeholder="Ex: Igreja Matriz"
                        className="w-full p-2.5 border border-gray-300 rounded-lg text-sm"
                      />
                    </div>
                  </div>

                  {novoEvento.tipo === 'texto' ? (
                    <textarea
                      value={novoEvento.conteudo}
                      onChange={(e) => setNovoEvento({ ...novoEvento, conteudo: e.target.value })}
                      placeholder="Descrição detalhada do evento..."
                      rows={4}
                      className="w-full p-3 border border-gray-300 rounded-lg"
                    />
                  ) : (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Imagem do Evento</label>
                      {novoEvento.imagem ? (
                        <div className="relative inline-block">
                          <img src={novoEvento.imagem} alt="Preview" className="h-40 object-contain border rounded-lg" />
                          <button
                            onClick={handleDeleteEventoImagem}
                            className="absolute -top-2 -right-2 bg-red-500 rounded-full p-1"
                          >
                            <X size={14} className="text-white" />
                          </button>
                        </div>
                      ) : (
                        <label className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg p-6 cursor-pointer hover:border-blue-500 bg-white">
                          <Upload size={24} className="text-gray-400 mb-2" />
                          <span className="text-sm text-gray-600">Clique para enviar imagem do evento</span>
                          <span className="text-xs text-gray-500 mt-1">JPG, PNG</span>
                          <input
                            type="file"
                            accept="image/*"
                            onChange={handleEventoUploadImagem}
                            className="hidden"
                          />
                        </label>
                      )}
                    </div>
                  )}

                  <div className="flex gap-3">
                    <button
                      onClick={handleAddEvento}
                      className="flex-1 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
                    >
                      <div className="flex items-center justify-center gap-2">
                        <Plus size={18} />
                        Adicionar Evento
                      </div>
                    </button>
                  </div>
                </div>
              </div>

              {/* Lista de eventos existentes */}
              <h3 className="font-bold text-gray-700 mb-3">Eventos Existentes ({eventos.length})</h3>
              
              {eventos.length === 0 ? (
                <p className="text-gray-500 text-center py-6">Nenhum evento cadastrado</p>
              ) : (
                <div className="space-y-4">
                  {eventos.map((evento) => (
                    <div key={evento.id} className="border rounded-lg p-4 hover:border-blue-300 bg-white/50">
                      <div className="flex justify-between items-start mb-3">
                        <div className="flex-1">
                          <h4 className="font-bold text-gray-800">{evento.titulo}</h4>
                          <div className="flex items-center gap-3 mt-1">
                            <span className={`text-xs px-2 py-1 rounded-full ${evento.ativo ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                              {evento.ativo ? 'Ativo' : 'Inativo'}
                            </span>
                            <span className="text-xs text-gray-500">{evento.dataCriacao}</span>
                            <span className="text-xs text-gray-500">
                              {paginasDestino.find(p => p.id === evento.paginaDestino)?.nome || 'Evento'}
                            </span>
                            <div 
                              className="w-4 h-4 rounded-full border" 
                              style={{ 
                                background: `linear-gradient(135deg, ${evento.corBanner}, ${evento.corBannerTo})` 
                              }}
                              title="Cor do banner"
                            />
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
                            onClick={() => handleDeleteEvento(evento.id)}
                            className="p-2 bg-red-100 text-red-600 rounded hover:bg-red-200"
                            title="Excluir"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-3">
                        <div className="text-sm">
                          <span className="font-medium">Data: </span>
                          <span className="text-gray-700">{evento.data}</span>
                        </div>
                        <div className="text-sm">
                          <span className="font-medium">Hora: </span>
                          <span className="text-gray-700">{evento.hora || 'Não definida'}</span>
                        </div>
                        <div className="text-sm">
                          <span className="font-medium">Local: </span>
                          <span className="text-gray-700">{evento.local || 'Não definido'}</span>
                        </div>
                      </div>
                      
                      {evento.textoFaixa && (
                        <div className="mb-3">
                          <span className="text-sm font-medium">Texto da faixa: </span>
                          <span className="text-sm text-gray-700">{evento.textoFaixa}</span>
                        </div>
                      )}
                      
                      {evento.tipo === 'texto' ? (
                        <p className="text-gray-700 text-sm">{evento.conteudo}</p>
                      ) : evento.imagem && (
                        <div className="mt-2">
                          <img src={evento.imagem} alt={evento.titulo} className="h-40 object-contain rounded" />
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* POPUPS */}
          {activeTab === 'popups' && (
            <div>
              <h2 className="text-xl font-bold text-gray-800 mb-2">Gerenciar Popups</h2>
              <p className="text-gray-600 mb-4 text-sm">Avisos que aparecem ao entrar no site (apenas imagens)</p>

              {/* Formulário de novo popup */}
              <div className="bg-gray-50/50 rounded-lg p-4 mb-6">
                <h3 className="font-bold text-gray-700 mb-3">Novo Popup</h3>
                
                <div className="space-y-4">
                  <input
                    type="text"
                    value={novoPopup.titulo}
                    onChange={(e) => setNovoPopup({ ...novoPopup, titulo: e.target.value })}
                    placeholder="Título do popup (apenas para organização)"
                    className="w-full p-3 border border-gray-300 rounded-lg"
                  />

                  {/* Apenas imagem para popups */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Imagem do Popup</label>
                    {novoPopup.imagem ? (
                      <div className="relative inline-block">
                        <img src={novoPopup.imagem} alt="Preview" className="h-40 object-contain border rounded-lg" />
                        <button
                          onClick={handleDeletePopupImagem}
                          className="absolute -top-2 -right-2 bg-red-500 rounded-full p-1"
                        >
                          <X size={14} className="text-white" />
                        </button>
                      </div>
                    ) : (
                      <label className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg p-6 cursor-pointer hover:border-blue-500 bg-white">
                        <Upload size={24} className="text-gray-400 mb-2" />
                        <span className="text-sm text-gray-600">Clique para enviar imagem do popup</span>
                        <span className="text-xs text-gray-500 mt-1">JPG, PNG (Tamanho recomendado: 600x400px)</span>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handlePopupUploadImagem}
                          className="hidden"
                        />
                      </label>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Intervalo de exibição (segundos)
                    </label>
                    <input
                      type="range"
                      min="1"
                      max="30"
                      value={novoPopup.intervalo}
                      onChange={(e) => setNovoPopup({ ...novoPopup, intervalo: parseInt(e.target.value) })}
                      className="w-full"
                    />
                    <div className="flex justify-between text-sm text-gray-600 mt-1">
                      <span>1s</span>
                      <span>{novoPopup.intervalo}s</span>
                      <span>30s</span>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <button
                      onClick={handleAddPopup}
                      disabled={!novoPopup.imagem}
                      className="flex-1 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <div className="flex items-center justify-center gap-2">
                        <Plus size={18} />
                        Adicionar Popup
                      </div>
                    </button>
                  </div>
                </div>
              </div>

              {/* Lista de popups existentes */}
              <h3 className="font-bold text-gray-700 mb-3">Popups Existentes ({popups.length})</h3>
              
              {popups.length === 0 ? (
                <p className="text-gray-500 text-center py-6">Nenhum popup cadastrado</p>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {popups.map((popup) => (
                    <div key={popup.id} className="border rounded-lg p-4 hover:border-blue-300 bg-white/50">
                      <div className="flex justify-between items-start mb-3">
                        <div className="flex-1">
                          <h4 className="font-bold text-gray-800">{popup.titulo}</h4>
                          <div className="flex items-center gap-3 mt-1">
                            <span className={`text-xs px-2 py-1 rounded-full ${popup.ativo ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                              {popup.ativo ? 'Ativo' : 'Inativo'}
                            </span>
                            <span className="text-xs text-gray-500">Intervalo: {popup.intervalo}s</span>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleToggleAtivoPopup(popup.id)}
                            className={`p-2 rounded ${popup.ativo ? 'bg-red-100 text-red-600 hover:bg-red-200' : 'bg-green-100 text-green-600 hover:bg-green-200'}`}
                            title={popup.ativo ? 'Desativar' : 'Ativar'}
                          >
                            <Eye size={16} />
                          </button>
                          <button
                            onClick={() => handleDeletePopup(popup.id)}
                            className="p-2 bg-red-100 text-red-600 rounded hover:bg-red-200"
                            title="Excluir"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </div>
                      
                      {popup.imagem && (
                        <div className="mt-2">
                          <img src={popup.imagem} alt={popup.titulo} className="w-full h-40 object-contain rounded" />
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Botão para salvar e publicar */}
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
            As alterações serão publicadas no site imediatamente
          </p>
        </div>
      </main>

      <footer className="mt-8 border-t bg-white/90 backdrop-blur-sm py-4 relative z-10">
        <div className="container mx-auto px-4 text-center text-gray-600 text-sm">
          <p>© {new Date().getFullYear()} Santuário de Fátima - Painel Administrativo</p>
          <p className="mt-1">Sistema de gestão de conteúdo</p>
          <div className="mt-2 text-xs text-gray-500">
            Usuário: {localStorage.getItem('admin_user') || 'Admin'} • Última publicação: {new Date().toLocaleDateString()}
          </div>
          <div className="mt-2 text-xs text-gray-500">
            Total de itens: {carrosselHome.length + recados.length + eventos.length + popups.length}
          </div>
        </div>
      </footer>
    </div>
  );
}