// pages/PainelAdmin.tsx - VERSÃO COM VERIFICAÇÃO DE AUTENTICAÇÃO
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
  Settings
} from 'lucide-react';

export default function PainelAdmin() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'fotos' | 'recados' | 'eventos' | 'popups'>('fotos');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  // Estado para cada seção
  const [fotos, setFotos] = useState<string[]>([]);
  const [novoRecado, setNovoRecado] = useState('');
  const [recados, setRecados] = useState<string[]>(['Recado de exemplo 1', 'Recado de exemplo 2']);
  const [evento, setEvento] = useState({ titulo: '', data: '', descricao: '' });
  const [popup, setPopup] = useState({ 
    titulo: 'Aviso Importante', 
    mensagem: 'Horários especiais neste final de semana!', 
    ativo: true 
  });

  // Verificar autenticação ao carregar
  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem('admin_token');
      const user = localStorage.getItem('admin_user');
      
      if (!token || !user) {
        // Não autenticado, redireciona para home
        navigate('/');
        return false;
      }
      
      setIsAuthenticated(true);
      setLoading(false);
      return true;
    };

    // Pequeno delay para mostrar loading
    setTimeout(() => {
      checkAuth();
    }, 500);
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('admin_token');
    localStorage.removeItem('admin_user');
    navigate('/');
  };

  const handleUploadFoto = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const newPhotos = Array.from(files).map(file => URL.createObjectURL(file));
      setFotos([...fotos, ...newPhotos]);
      alert(`${files.length} foto(s) adicionada(s) com sucesso!`);
    }
  };

  const handleAddRecado = () => {
    if (novoRecado.trim()) {
      setRecados([...recados, novoRecado]);
      setNovoRecado('');
      alert('Recado adicionado com sucesso!');
    }
  };

  const handleDeleteRecado = (index: number) => {
    if (window.confirm('Tem certeza que deseja remover este recado?')) {
      const novosRecados = recados.filter((_, i) => i !== index);
      setRecados(novosRecados);
      alert('Recado removido com sucesso!');
    }
  };

  const handleSaveEvento = () => {
    if (!evento.titulo || !evento.data) {
      alert('Preencha pelo menos o título e a data do evento!');
      return;
    }
    alert(`✅ Evento salvo com sucesso!\n\nTítulo: ${evento.titulo}\nData: ${new Date(evento.data).toLocaleDateString()}\nDescrição: ${evento.descricao || '(sem descrição)'}`);
    setEvento({ titulo: '', data: '', descricao: '' });
  };

  const handleTogglePopup = () => {
    const novoStatus = !popup.ativo;
    setPopup({ ...popup, ativo: novoStatus });
    alert(`Popup ${novoStatus ? 'ativado' : 'desativado'} com sucesso!`);
  };

  const handleSavePopup = () => {
    if (!popup.titulo || !popup.mensagem) {
      alert('Preencha o título e a mensagem do popup!');
      return;
    }
    alert('Popup salvo com sucesso!');
  };

  const handleDeleteFoto = (index: number) => {
    if (window.confirm('Tem certeza que deseja excluir esta foto?')) {
      const novasFotos = fotos.filter((_, i) => i !== index);
      setFotos(novasFotos);
      alert('Foto removida com sucesso!');
    }
  };

  // Tela de loading
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

  // Se não estiver autenticado
  if (!isAuthenticated) {
    return null; // Será redirecionado pelo useEffect
  }

  return (
    <div className="min-h-screen bg-gray-50">
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
                onClick={() => navigate('/')}
                className="flex items-center gap-2 px-3 py-2 text-gray-700 hover:text-blue-600 hover:bg-gray-100 rounded-lg transition-colors"
                title="Voltar para o site"
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

      {/* Conteúdo Principal */}
      <main className="container mx-auto px-4 py-6">
        {/* Cards de Estatísticas */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-xl shadow-sm p-5 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Fotos Ativas</p>
                <p className="text-2xl font-bold text-gray-800 mt-1">{fotos.length}</p>
              </div>
              <div className="p-3 bg-blue-100 rounded-lg">
                <Image className="text-blue-600" size={24} />
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-sm p-5 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Recados</p>
                <p className="text-2xl font-bold text-gray-800 mt-1">{recados.length}</p>
              </div>
              <div className="p-3 bg-green-100 rounded-lg">
                <MessageSquare className="text-green-600" size={24} />
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-sm p-5 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Próximo Evento</p>
                <p className="text-lg font-bold text-gray-800 mt-1">
                  {evento.titulo || 'Nenhum'}
                </p>
              </div>
              <div className="p-3 bg-purple-100 rounded-lg">
                <Calendar className="text-purple-600" size={24} />
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-sm p-5 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Popup</p>
                <p className={`text-lg font-bold mt-1 ${popup.ativo ? 'text-green-600' : 'text-red-600'}`}>
                  {popup.ativo ? 'Ativo' : 'Inativo'}
                </p>
              </div>
              <div className="p-3 bg-yellow-100 rounded-lg">
                <Bell className="text-yellow-600" size={24} />
              </div>
            </div>
          </div>
        </div>

        {/* Abas de Navegação */}
        <div className="mb-6">
          <div className="flex flex-wrap gap-2 border-b border-gray-200">
            <button
              onClick={() => setActiveTab('fotos')}
              className={`px-4 py-3 font-medium rounded-t-lg transition-colors ${
                activeTab === 'fotos' 
                  ? 'bg-white border-t border-l border-r border-gray-200 text-blue-600' 
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
              }`}
            >
              <div className="flex items-center gap-2">
                <Image size={18} />
                Fotos
              </div>
            </button>
            
            <button
              onClick={() => setActiveTab('recados')}
              className={`px-4 py-3 font-medium rounded-t-lg transition-colors ${
                activeTab === 'recados' 
                  ? 'bg-white border-t border-l border-r border-gray-200 text-blue-600' 
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
              }`}
            >
              <div className="flex items-center gap-2">
                <MessageSquare size={18} />
                Recados
              </div>
            </button>
            
            <button
              onClick={() => setActiveTab('eventos')}
              className={`px-4 py-3 font-medium rounded-t-lg transition-colors ${
                activeTab === 'eventos' 
                  ? 'bg-white border-t border-l border-r border-gray-200 text-blue-600' 
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
              }`}
            >
              <div className="flex items-center gap-2">
                <Calendar size={18} />
                Eventos
              </div>
            </button>
            
            <button
              onClick={() => setActiveTab('popups')}
              className={`px-4 py-3 font-medium rounded-t-lg transition-colors ${
                activeTab === 'popups' 
                  ? 'bg-white border-t border-l border-r border-gray-200 text-blue-600' 
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
              }`}
            >
              <div className="flex items-center gap-2">
                <AlertCircle size={18} />
                Popup
              </div>
            </button>
          </div>
        </div>

        {/* Conteúdo da Aba Ativa */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          
          {/* ABA: GERENCIAR FOTOS */}
          {activeTab === 'fotos' && (
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">Gerenciar Fotos</h2>
              <p className="text-gray-600 mb-6">Adicione, visualize ou remova fotos da galeria</p>
              
              {/* Upload de Fotos */}
              <div className="mb-8">
                <h3 className="text-lg font-medium text-gray-800 mb-4">Adicionar Novas Fotos</h3>
                <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center hover:border-blue-500 transition-colors">
                  <Upload className="w-10 h-10 text-gray-400 mx-auto mb-3" />
                  <p className="text-gray-600 mb-2">Clique para selecionar fotos</p>
                  <p className="text-gray-500 text-sm mb-4">Formatos: JPG, PNG, GIF. Máx: 5MB por imagem</p>
                  <label className="inline-block px-5 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 cursor-pointer transition-colors font-medium">
                    <input
                      type="file"
                      multiple
                      accept="image/*"
                      onChange={handleUploadFoto}
                      className="hidden"
                    />
                    Selecionar Fotos
                  </label>
                </div>
              </div>

              {/* Galeria de Fotos */}
              <div>
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-medium text-gray-800">Fotos Ativas</h3>
                  <span className="text-gray-600">{fotos.length} foto(s)</span>
                </div>
                
                {fotos.length === 0 ? (
                  <div className="text-center py-10">
                    <Image className="w-16 h-16 text-gray-300 mx-auto mb-3" />
                    <p className="text-gray-500">Nenhuma foto adicionada ainda.</p>
                    <p className="text-gray-400 text-sm mt-1">Adicione fotos usando o botão acima.</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                    {fotos.map((foto, index) => (
                      <div key={index} className="relative group">
                        <img 
                          src={foto} 
                          alt={`Foto ${index + 1}`}
                          className="w-full h-48 object-cover rounded-lg shadow-sm"
                        />
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 rounded-lg transition-all duration-300 flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100">
                          <button 
                            className="p-2 bg-white/20 hover:bg-white/30 rounded-full backdrop-blur-sm"
                            onClick={() => window.open(foto, '_blank')}
                          >
                            <Eye size={16} className="text-white" />
                          </button>
                          <button 
                            onClick={() => handleDeleteFoto(index)}
                            className="p-2 bg-red-500 hover:bg-red-600 rounded-full"
                          >
                            <Trash2 size={16} className="text-white" />
                          </button>
                        </div>
                        <div className="absolute bottom-2 left-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                          #{index + 1}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* ABA: GERENCIAR RECADOS */}
          {activeTab === 'recados' && (
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">Gerenciar Recados</h2>
              <p className="text-gray-600 mb-6">Adicione ou remova recados importantes</p>
              
              {/* Adicionar novo recado */}
              <div className="mb-8">
                <h3 className="text-lg font-medium text-gray-800 mb-4">Adicionar Novo Recado</h3>
                <div className="flex flex-col sm:flex-row gap-4">
                  <input
                    type="text"
                    value={novoRecado}
                    onChange={(e) => setNovoRecado(e.target.value)}
                    placeholder="Digite o novo recado..."
                    className="flex-1 p-3 border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                  />
                  <button
                    onClick={handleAddRecado}
                    disabled={!novoRecado.trim()}
                    className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed font-medium"
                  >
                    <MessageSquare size={18} />
                    Adicionar Recado
                  </button>
                </div>
              </div>

              {/* Lista de recados */}
              <div>
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-medium text-gray-800">Recados Ativos</h3>
                  <span className="text-gray-600">{recados.length} recado(s)</span>
                </div>
                
                {recados.length === 0 ? (
                  <div className="text-center py-10">
                    <MessageSquare className="w-16 h-16 text-gray-300 mx-auto mb-3" />
                    <p className="text-gray-500">Nenhum recado adicionado ainda.</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {recados.map((recado, index) => (
                      <div key={index} className="flex items-start justify-between p-4 bg-gray-50 rounded-lg border border-gray-200">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                            <span className="text-sm text-gray-500">Recado #{index + 1}</span>
                          </div>
                          <p className="text-gray-800">{recado}</p>
                        </div>
                        <button 
                          onClick={() => handleDeleteRecado(index)}
                          className="ml-4 p-2 text-red-600 hover:bg-red-50 rounded-full transition-colors"
                          title="Remover recado"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* ABA: GERENCIAR EVENTOS */}
          {activeTab === 'eventos' && (
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">Gerenciar Eventos</h2>
              <p className="text-gray-600 mb-6">Cadastre eventos especiais do Santuário</p>
              
              <div className="max-w-2xl space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Título do Evento *
                  </label>
                  <input
                    type="text"
                    value={evento.titulo}
                    onChange={(e) => setEvento({...evento, titulo: e.target.value})}
                    placeholder="Ex: Missa Dominical Especial"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Data e Hora do Evento *
                  </label>
                  <input
                    type="datetime-local"
                    value={evento.data}
                    onChange={(e) => setEvento({...evento, data: e.target.value})}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Descrição do Evento
                  </label>
                  <textarea
                    value={evento.descricao}
                    onChange={(e) => setEvento({...evento, descricao: e.target.value})}
                    placeholder="Descreva detalhes do evento..."
                    rows={4}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                  />
                </div>

                <div className="flex gap-4 pt-2">
                  <button
                    onClick={handleSaveEvento}
                    disabled={!evento.titulo || !evento.data}
                    className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed font-medium"
                  >
                    <Calendar size={18} />
                    Salvar Evento
                  </button>
                  
                  <button
                    onClick={() => setEvento({ titulo: '', data: '', descricao: '' })}
                    className="px-6 py-3 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors font-medium"
                  >
                    Limpar
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* ABA: GERENCIAR POPUP */}
          {activeTab === 'popups' && (
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">Gerenciar Popup</h2>
              <p className="text-gray-600 mb-6">Configure mensagens importantes que aparecem no site</p>
              
              <div className="max-w-2xl space-y-6">
                {/* Pré-visualização */}
                <div className="p-6 border-2 border-dashed border-gray-300 rounded-xl bg-gray-50">
                  <h3 className="text-lg font-medium text-gray-800 mb-4">Pré-visualização do Popup</h3>
                  
                  <div className="bg-white border border-gray-300 rounded-lg p-6 shadow-sm">
                    <div className="flex justify-between items-start mb-4">
                      <h4 className="text-xl font-bold text-gray-800">
                        {popup.titulo || "Título do Popup"}
                      </h4>
                      <div className="flex items-center gap-2">
                        <div className={`w-3 h-3 rounded-full ${popup.ativo ? 'bg-green-500' : 'bg-red-500'}`}></div>
                        <span className={`text-sm font-medium ${popup.ativo ? 'text-green-600' : 'text-red-600'}`}>
                          {popup.ativo ? '● Ativo' : '● Inativo'}
                        </span>
                      </div>
                    </div>
                    <p className="text-gray-700">
                      {popup.mensagem || "Mensagem do popup aparecerá aqui."}
                    </p>
                  </div>
                </div>

                {/* Formulário de edição */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Título do Popup *
                  </label>
                  <input
                    type="text"
                    value={popup.titulo}
                    onChange={(e) => setPopup({...popup, titulo: e.target.value})}
                    placeholder="Ex: Atenção! Horários Especiais"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Mensagem do Popup *
                  </label>
                  <textarea
                    value={popup.mensagem}
                    onChange={(e) => setPopup({...popup, mensagem: e.target.value})}
                    placeholder="Digite a mensagem importante..."
                    rows={4}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                  />
                </div>

                <div className="flex flex-col sm:flex-row gap-4 pt-2">
                  <button
                    onClick={handleTogglePopup}
                    className={`flex-1 py-3 rounded-lg transition-colors flex items-center justify-center gap-2 font-medium ${
                      popup.ativo 
                        ? 'bg-red-600 hover:bg-red-700 text-white' 
                        : 'bg-green-600 hover:bg-green-700 text-white'
                    }`}
                  >
                    {popup.ativo ? (
                      <>
                        <AlertCircle size={18} />
                        Desativar Popup
                      </>
                    ) : (
                      <>
                        <AlertCircle size={18} />
                        Ativar Popup
                      </>
                    )}
                  </button>
                  
                  <button
                    onClick={handleSavePopup}
                    disabled={!popup.titulo || !popup.mensagem}
                    className="flex-1 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Save size={18} />
                    Salvar Alterações
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-8 border-t bg-white py-6">
        <div className="container mx-auto px-4">
          <div className="text-center text-gray-600">
            <p className="font-medium">© {new Date().getFullYear()} Santuário de Fátima - Painel Administrativo</p>
            <p className="text-sm mt-1">Sistema desenvolvido para gestão de conteúdo</p>
            <div className="flex justify-center items-center gap-4 mt-4 text-xs text-gray-500">
              <span>Usuário: {localStorage.getItem('admin_user') || 'Admin'}</span>
              <span>•</span>
              <span>Último acesso: {new Date().toLocaleDateString()}</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}