import React, { useState } from 'react';
import { 
  Building2, 
  Plus, 
  Edit2, 
  Trash2, 
  Search, 
  LayoutDashboard,
  LogOut,
  Save,
  X,
  Users,
  UserPlus,
  Home,
  CheckCircle2,
  AlertCircle,
  FileText,
  Phone,
  Mail,
  Fingerprint,
  ShieldCheck,
  Printer,
  ChevronLeft,
  Filter
} from 'lucide-react';

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentView, setCurrentView] = useState('properties'); // 'properties', 'owners', 'vacant', 'contract'
  const [selectedContract, setSelectedContract] = useState(null);
  const [vacantFilter, setVacantFilter] = useState('ALL'); // 'ALL', 'BOX', 'SALA'
  
  // Imóveis do sistema
  const [properties, setProperties] = useState([
    { 
      id: 1, 
      type: 'BOX', 
      number: 'A-01', 
      rent: 800, 
      dueDate: '10', 
      owner: 'João Silva', 
      cpf: '123.456.789-00',
      phone: '(11) 98888-7777',
      email: 'joao@email.com',
      verified: true,
      status: 'OCUPADO' 
    },
    { 
      id: 2, 
      type: 'SALA', 
      number: '101', 
      rent: 1500, 
      dueDate: '15', 
      owner: 'Maria Oliveira', 
      cpf: '987.654.321-11',
      phone: '(11) 97777-6666',
      email: 'maria@email.com',
      verified: true,
      status: 'OCUPADO' 
    },
    { id: 3, type: 'BOX', number: 'A-02', rent: 0, dueDate: '', owner: '', cpf: '', phone: '', email: '', verified: false, status: 'VAGO' },
    { id: 4, type: 'SALA', number: '102', rent: 0, dueDate: '', owner: '', cpf: '', phone: '', email: '', verified: false, status: 'VAGO' },
    { id: 5, type: 'BOX', number: 'B-01', rent: 0, dueDate: '', owner: '', cpf: '', phone: '', email: '', verified: false, status: 'VAGO' },
    { id: 6, type: 'SALA', number: '201', rent: 0, dueDate: '', owner: '', cpf: '', phone: '', email: '', verified: false, status: 'VAGO' },
  ]);

  const [currentProperty, setCurrentProperty] = useState({
    id: null, type: 'BOX', number: '', rent: '', dueDate: '', owner: '', cpf: '', phone: '', email: '', verified: false, status: 'VAGO'
  });

  const handleSaveProperty = (e) => {
    e.preventDefault();
    if (currentProperty.id) {
      setProperties(properties.map(p => p.id === currentProperty.id ? currentProperty : p));
    } else {
      setProperties([...properties, { ...currentProperty, id: Date.now(), status: 'VAGO' }]);
    }
    closeModal();
  };

  const handleRentProperty = (e) => {
    e.preventDefault();
    setProperties(properties.map(p => 
      p.id === currentProperty.id 
        ? { ...currentProperty, status: 'OCUPADO', verified: true } 
        : p
    ));
    closeModal();
  };

  const handleEvict = (id) => {
    if(window.confirm('Deseja desocupar este imóvel? Os dados do inquilino serão perdidos.')) {
      setProperties(properties.map(p => 
        p.id === id 
          ? { ...p, owner: '', rent: 0, dueDate: '', cpf: '', phone: '', email: '', verified: false, status: 'VAGO' } 
          : p
      ));
    }
  };

  const openModal = (property = null) => {
    if (property) {
      setCurrentProperty(property);
    } else {
      setCurrentProperty({ id: null, type: 'BOX', number: '', rent: '', dueDate: '', owner: '', cpf: '', phone: '', email: '', verified: false, status: 'VAGO' });
    }
    setIsModalOpen(true);
  };

  const closeModal = () => setIsModalOpen(false);

  const generateContract = (property) => {
    setSelectedContract(property);
    setCurrentView('contract');
  };

  const vacantProperties = properties.filter(p => {
    const matchesSearch = p.number.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = p.status === 'VAGO';
    const matchesType = vacantFilter === 'ALL' || p.type === vacantFilter;
    return matchesSearch && matchesStatus && matchesType;
  });

  const occupiedProperties = properties.filter(p => p.status === 'OCUPADO' && (p.number.toLowerCase().includes(searchTerm.toLowerCase()) || p.owner.toLowerCase().includes(searchTerm.toLowerCase())));

  const ownersData = occupiedProperties.reduce((acc, prop) => {
    if (!acc[prop.owner]) {
      acc[prop.owner] = { name: prop.owner, items: [], totalRent: 0, details: prop };
    }
    acc[prop.owner].items.push(prop);
    acc[prop.owner].totalRent += parseFloat(prop.rent || 0);
    return acc;
  }, {});

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-slate-100 flex items-center justify-center p-4">
        <div className="bg-white p-8 rounded-3xl shadow-2xl max-w-sm w-full border border-slate-200">
          <div className="flex justify-center mb-6 text-indigo-600">
            <ShieldCheck size={64} strokeWidth={1.5} />
          </div>
          <h1 className="text-2xl font-black text-center text-slate-900 mb-2 italic">IMOB ADMIN</h1>
          <p className="text-center text-slate-500 mb-8 text-sm px-4">Gestão Segura de Locações e Credibilidade de Inquilinos</p>
          <button 
            onClick={() => setIsLoggedIn(true)}
            className="w-full bg-slate-900 text-white font-bold py-4 rounded-2xl hover:bg-indigo-600 transition-all shadow-xl active:scale-95"
          >
            Acessar Sistema
          </button>
        </div>
      </div>
    );
  }

  // TELA DE CONTRATO (VISÃO DE IMPRESSÃO)
  if (currentView === 'contract' && selectedContract) {
    return (
      <div className="min-h-screen bg-slate-200 p-4 md:p-10 flex justify-center">
        <div className="bg-white max-w-4xl w-full shadow-2xl p-12 relative font-serif text-slate-800 leading-relaxed">
          <button 
            onClick={() => setCurrentView('owners')}
            className="absolute top-6 left-6 flex items-center gap-2 text-indigo-600 font-bold hover:underline no-print"
          >
            <ChevronLeft size={20}/> Voltar
          </button>
          
          <div className="text-center mb-10 border-b pb-6">
            <h1 className="text-2xl font-bold uppercase tracking-widest">Contrato Particular de Locação</h1>
            <p className="text-sm text-slate-500 mt-2 italic">Ref: Imóvel {selectedContract.type} {selectedContract.number}</p>
          </div>

          <section className="space-y-6">
            <p>
              <strong>LOCADOR:</strong> IMOBILIÁRIA ADMINISTRAÇÃO LTDA, inscrita no CNPJ sob nº 00.000.000/0001-00.
            </p>
            <p>
              <strong>LOCATÁRIO:</strong> {selectedContract.owner.toUpperCase()}, portador do CPF nº {selectedContract.cpf || '___.___.___-__'}, 
              contato {selectedContract.phone || '( __ ) _____-____'}, residente e domiciliado neste município.
            </p>
            <p>
              <strong>OBJETO:</strong> A locação do imóvel identificado como <strong>{selectedContract.type} Nº {selectedContract.number}</strong>, 
              localizado no complexo comercial desta administração.
            </p>
            <p>
              <strong>VALOR E VENCIMENTO:</strong> O valor mensal do aluguel é de <strong>R$ {parseFloat(selectedContract.rent).toLocaleString('pt-BR')}</strong>, 
              devendo ser pago impreterivelmente até o dia <strong>{selectedContract.dueDate}</strong> de cada mês.
            </p>
            <p>
              <strong>CLÁUSULAS:</strong> O presente contrato tem validade de 12 meses, podendo ser renovado automaticamente. O atraso no pagamento 
              implicará em multa de 10% sobre o valor da mensalidade e juros de mora.
            </p>
          </section>

          <div className="mt-24 grid grid-cols-2 gap-20">
            <div className="text-center border-t border-slate-400 pt-4">
              <p className="text-sm font-bold uppercase">Locatário</p>
              <p className="text-xs text-slate-400 mt-1">{selectedContract.owner}</p>
            </div>
            <div className="text-center border-t border-slate-400 pt-4">
              <p className="text-sm font-bold uppercase">Locador</p>
              <p className="text-xs text-slate-400 mt-1">Imobiliária Admin</p>
            </div>
          </div>

          <div className="mt-16 text-right no-print">
            <button 
              onClick={() => window.print()}
              className="bg-indigo-600 text-white px-8 py-3 rounded-xl font-bold flex items-center gap-2 ml-auto hover:bg-indigo-700 transition"
            >
              <Printer size={20}/> Imprimir Contrato
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col md:flex-row">
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-slate-900 text-white p-6">
        <div className="flex items-center gap-3 mb-10">
          <div className="p-2 bg-indigo-500 rounded-lg shadow-lg shadow-indigo-500/20">
            <Building2 size={24} />
          </div>
          <span className="font-black text-xl tracking-tighter uppercase">Imob Admin</span>
        </div>
        <nav className="space-y-2">
          <button 
            onClick={() => { setCurrentView('properties'); setSearchTerm(''); }}
            className={`w-full flex items-center gap-3 p-3 rounded-xl transition ${currentView === 'properties' ? 'bg-white/10 text-white' : 'text-slate-400 hover:text-white hover:bg-white/5'}`}
          >
            <LayoutDashboard size={20} /> Estrutura Física
          </button>
          <button 
            onClick={() => { setCurrentView('vacant'); setSearchTerm(''); }}
            className={`w-full flex items-center gap-3 p-3 rounded-xl transition ${currentView === 'vacant' ? 'bg-emerald-500/20 text-emerald-400' : 'text-slate-400 hover:text-white hover:bg-white/5'}`}
          >
            <Home size={20} /> Vagos / Locação
          </button>
          <button 
            onClick={() => { setCurrentView('owners'); setSearchTerm(''); }}
            className={`w-full flex items-center gap-3 p-3 rounded-xl transition ${currentView === 'owners' ? 'bg-indigo-500/20 text-indigo-400' : 'text-slate-400 hover:text-white hover:bg-white/5'}`}
          >
            <Users size={20} /> Inquilinos Ativos
          </button>
          <div className="pt-10 border-t border-white/5">
            <button onClick={() => setIsLoggedIn(false)} className="w-full flex items-center gap-3 p-3 text-slate-500 hover:text-red-400 transition">
              <LogOut size={20} /> Encerrar Sessão
            </button>
          </div>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-4 md:p-8 overflow-y-auto">
        <div className="max-w-6xl mx-auto">
          <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
            <div>
              <h1 className="text-4xl font-black text-slate-900 tracking-tight">
                {currentView === 'properties' && 'Gestão Predial'}
                {currentView === 'vacant' && 'Nova Locação'}
                {currentView === 'owners' && 'Pesquisa de Inquilinos'}
              </h1>
              <p className="text-slate-500 mt-1">
                {currentView === 'properties' && 'Administração física de boxes e salas comerciais.'}
                {currentView === 'vacant' && 'Espaços aguardando novos contratos.'}
                {currentView === 'owners' && 'Consultar credibilidade e contratos ativos.'}
              </p>
            </div>
          </header>

          {/* Barra de Busca e Filtros de Tipo (Apenas para Vagos) */}
          <div className="flex flex-col gap-4 mb-8">
            <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-200 flex items-center gap-4 focus-within:ring-2 focus-within:ring-indigo-500 transition-all">
              <Search className="text-slate-300" size={24} />
              <input 
                type="text" 
                placeholder="Buscar por nome, CPF ou número do imóvel..." 
                className="w-full outline-none text-slate-600 font-medium"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            {currentView === 'vacant' && (
              <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-hide">
                <div className="flex items-center gap-2 bg-slate-200/50 p-1.5 rounded-2xl">
                  <button 
                    onClick={() => setVacantFilter('ALL')}
                    className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${vacantFilter === 'ALL' ? 'bg-white text-slate-900 shadow-md' : 'text-slate-500 hover:text-slate-700'}`}
                  >
                    Todos
                  </button>
                  <button 
                    onClick={() => setVacantFilter('BOX')}
                    className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${vacantFilter === 'BOX' ? 'bg-indigo-600 text-white shadow-md' : 'text-slate-500 hover:text-slate-700'}`}
                  >
                    Somente Boxes
                  </button>
                  <button 
                    onClick={() => setVacantFilter('SALA')}
                    className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${vacantFilter === 'SALA' ? 'bg-indigo-600 text-white shadow-md' : 'text-slate-500 hover:text-slate-700'}`}
                  >
                    Somente Salas
                  </button>
                </div>
                <div className="ml-auto hidden md:flex items-center gap-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest px-4">
                  <Filter size={14}/> {vacantProperties.length} encontrados
                </div>
              </div>
            )}
          </div>

          {/* VIEW: ESTRUTURA FÍSICA */}
          {currentView === 'properties' && (
            <div className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden">
              <table className="w-full text-left">
                <thead className="bg-slate-50/80 border-b">
                  <tr>
                    <th className="p-5 text-xs font-bold text-slate-400 uppercase tracking-widest">Localização</th>
                    <th className="p-5 text-xs font-bold text-slate-400 uppercase tracking-widest">Status Atual</th>
                    <th className="p-5 text-xs font-bold text-slate-400 uppercase tracking-widest">Ocupante</th>
                    <th className="p-5 text-xs font-bold text-slate-400 uppercase tracking-widest text-center">Ação</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {properties.filter(p => p.number.toLowerCase().includes(searchTerm.toLowerCase())).map(p => (
                    <tr key={p.id} className="hover:bg-slate-50 transition-colors group">
                      <td className="p-5">
                        <div className="flex items-center gap-3">
                          <span className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center text-slate-500 group-hover:bg-indigo-100 group-hover:text-indigo-600 transition">
                            {p.type === 'BOX' ? 'B' : 'S'}
                          </span>
                          <span className="font-black text-slate-700">{p.number}</span>
                        </div>
                      </td>
                      <td className="p-5">
                        <span className={`px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-tighter ${p.status === 'VAGO' ? 'bg-emerald-100 text-emerald-600' : 'bg-slate-100 text-slate-500'}`}>
                          {p.status}
                        </span>
                      </td>
                      <td className="p-5">
                        {p.owner ? (
                          <div className="flex items-center gap-2">
                            <span className="text-slate-800 font-bold">{p.owner}</span>
                            {p.verified && <ShieldCheck size={14} className="text-indigo-500" />}
                          </div>
                        ) : <span className="text-slate-300 text-sm italic">Livre</span>}
                      </td>
                      <td className="p-5">
                        <div className="flex justify-center gap-2">
                          <button onClick={() => openModal(p)} className="p-2 bg-slate-50 rounded-lg text-slate-400 hover:text-indigo-600 transition shadow-sm"><Edit2 size={16}/></button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="p-6 bg-slate-50 flex justify-center">
                <button onClick={() => openModal()} className="flex items-center gap-2 text-indigo-600 font-bold hover:scale-105 transition">
                  <Plus size={20}/> Cadastrar Novo Ponto Comercial
                </button>
              </div>
            </div>
          )}

          {/* VIEW: VAGOS (COM FILTRO) */}
          {currentView === 'vacant' && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {vacantProperties.map(p => (
                <div key={p.id} className="bg-white p-8 rounded-[2rem] border border-slate-200 shadow-sm hover:border-emerald-500 transition-all flex flex-col justify-between group">
                  <div>
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <span className={`text-[10px] font-black px-2 py-0.5 rounded uppercase tracking-widest ${p.type === 'BOX' ? 'bg-indigo-100 text-indigo-600' : 'bg-amber-100 text-amber-600'}`}>
                          {p.type}
                        </span>
                        <h3 className="text-3xl font-black text-slate-900 mt-2">{p.number}</h3>
                      </div>
                      <AlertCircle className="text-emerald-500 opacity-20 group-hover:opacity-100 transition" />
                    </div>
                    <div className="bg-emerald-50 p-4 rounded-2xl mb-6">
                      <p className="text-emerald-700 text-xs font-bold flex items-center gap-2 tracking-tight">
                        <CheckCircle2 size={16}/> Disponível para nova locação
                      </p>
                    </div>
                  </div>
                  <button 
                    onClick={() => openModal(p)}
                    className="w-full bg-slate-900 text-white py-4 rounded-2xl font-bold hover:bg-emerald-600 transition-all flex items-center justify-center gap-2 shadow-lg hover:shadow-emerald-200 active:scale-95"
                  >
                    <UserPlus size={20} /> Qualificar Inquilino
                  </button>
                </div>
              ))}
              {vacantProperties.length === 0 && (
                <div className="col-span-full py-24 text-center bg-white rounded-[2rem] border-2 border-dashed border-slate-200">
                  <Home size={48} className="mx-auto text-slate-200 mb-4" />
                  <p className="text-slate-400 font-bold text-lg">Nenhum imóvel vago encontrado com este filtro.</p>
                  <button onClick={() => setVacantFilter('ALL')} className="text-indigo-600 font-bold mt-2 hover:underline">Ver todos os disponíveis</button>
                </div>
              )}
            </div>
          )}

          {/* VIEW: INQUILINOS (PESQUISA E CONTRATOS) */}
          {currentView === 'owners' && (
            <div className="space-y-8">
              {Object.values(ownersData).filter(o => o.name.toLowerCase().includes(searchTerm.toLowerCase()) || o.details.cpf.includes(searchTerm)).map(owner => (
                <div key={owner.name} className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden">
                  <div className="p-8 border-b bg-slate-50/50 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                    <div className="flex items-center gap-5">
                      <div className="w-16 h-16 bg-white text-indigo-600 rounded-2xl border border-slate-200 flex items-center justify-center font-black text-2xl shadow-sm">
                        {owner.name.charAt(0)}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h2 className="text-2xl font-black text-slate-900 tracking-tighter">{owner.name}</h2>
                          <div className="flex items-center gap-1 bg-indigo-100 text-indigo-700 px-2 py-0.5 rounded text-[10px] font-bold">
                            <ShieldCheck size={12}/> VERIFICADO
                          </div>
                        </div>
                        <div className="flex flex-wrap gap-4 mt-2 text-sm text-slate-500 font-medium">
                          <span className="flex items-center gap-1"><Fingerprint size={14}/> {owner.details.cpf}</span>
                          <span className="flex items-center gap-1"><Phone size={14}/> {owner.details.phone}</span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right w-full md:w-auto">
                      <p className="text-[10px] uppercase font-bold text-slate-400 tracking-widest mb-1">Renda Gerada</p>
                      <p className="text-3xl font-black text-indigo-600 leading-none">R$ {owner.totalRent.toLocaleString('pt-BR')}</p>
                    </div>
                  </div>
                  
                  <table className="w-full text-left">
                    <thead className="bg-white text-slate-400 text-[10px] font-bold uppercase tracking-widest">
                      <tr>
                        <th className="px-8 py-4">Imóvel Locado</th>
                        <th className="px-8 py-4">Vencimento</th>
                        <th className="px-8 py-4">Valor Mensal</th>
                        <th className="px-8 py-4 text-center">Documentação</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {owner.items.map(item => (
                        <tr key={item.id} className="group hover:bg-slate-50 transition">
                          <td className="px-8 py-5">
                            <span className="font-black text-slate-700">{item.type} {item.number}</span>
                          </td>
                          <td className="px-8 py-5 text-slate-600 font-medium text-sm">Todo dia {item.dueDate}</td>
                          <td className="px-8 py-5 font-black text-slate-900">R$ {parseFloat(item.rent).toLocaleString('pt-BR')}</td>
                          <td className="px-8 py-5">
                            <div className="flex justify-center gap-4">
                              <button 
                                onClick={() => generateContract(item)}
                                className="flex items-center gap-2 bg-slate-900 text-white px-4 py-2 rounded-xl text-xs font-bold hover:bg-indigo-600 transition shadow-lg"
                              >
                                <FileText size={14}/> Gerar Contrato
                              </button>
                              <button onClick={() => handleEvict(item.id)} className="text-red-400 hover:text-red-600 text-xs font-bold transition uppercase tracking-tighter">Distrato</button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>

      {/* MODAL DE CADASTRO COMPLETO */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-900/80 backdrop-blur-md flex items-center justify-center z-50 p-4 overflow-y-auto">
          <div className="bg-white rounded-[2rem] shadow-2xl w-full max-w-xl overflow-hidden my-auto">
            <div className="p-8 border-b flex items-center justify-between bg-slate-50">
              <div>
                <h2 className="text-2xl font-black text-slate-900">
                  {currentView === 'properties' ? 'Configuração' : `Locação: ${currentProperty.number}`}
                </h2>
                <p className="text-sm text-slate-500 font-medium">Dados fundamentais para segurança jurídica.</p>
              </div>
              <button onClick={closeModal} className="p-3 hover:bg-slate-200 rounded-2xl transition"><X size={24}/></button>
            </div>
            
            <form onSubmit={currentView === 'properties' ? handleSaveProperty : handleRentProperty} className="p-8 space-y-6">
              {currentView === 'properties' ? (
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-2">Tipo</label>
                    <select 
                      className="w-full p-4 bg-slate-100 border-none rounded-2xl outline-indigo-600 font-bold text-slate-700"
                      value={currentProperty.type}
                      onChange={e => setCurrentProperty({...currentProperty, type: e.target.value})}
                    >
                      <option value="BOX">BOX</option>
                      <option value="SALA">SALA</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-2">Nº</label>
                    <input 
                      required type="text" className="w-full p-4 bg-slate-100 border-none rounded-2xl outline-indigo-600 font-bold"
                      value={currentProperty.number}
                      onChange={e => setCurrentProperty({...currentProperty, number: e.target.value})}
                    />
                  </div>
                </div>
              ) : (
                <div className="space-y-6">
                  <div className="space-y-4">
                    <label className="text-xs font-black text-indigo-600 uppercase flex items-center gap-2">Identificação</label>
                    <input 
                      required type="text" placeholder="Nome do Locatário"
                      className="w-full p-4 bg-slate-50 border-2 border-slate-100 rounded-2xl outline-indigo-600 font-bold"
                      value={currentProperty.owner}
                      onChange={e => setCurrentProperty({...currentProperty, owner: e.target.value})}
                    />
                    <div className="grid grid-cols-2 gap-4">
                      <input 
                        required type="text" placeholder="CPF/CNPJ"
                        className="w-full p-4 bg-slate-50 border-2 border-slate-100 rounded-2xl outline-indigo-600 font-medium"
                        value={currentProperty.cpf}
                        onChange={e => setCurrentProperty({...currentProperty, cpf: e.target.value})}
                      />
                      <input 
                        required type="text" placeholder="Telefone"
                        className="w-full p-4 bg-slate-50 border-2 border-slate-100 rounded-2xl outline-indigo-600 font-medium"
                        value={currentProperty.phone}
                        onChange={e => setCurrentProperty({...currentProperty, phone: e.target.value})}
                      />
                    </div>
                  </div>

                  <div className="space-y-4 pt-4 border-t">
                    <label className="text-xs font-black text-emerald-600 uppercase">Valores</label>
                    <div className="grid grid-cols-2 gap-4">
                      <input 
                        required type="number" placeholder="Mensalidade"
                        className="w-full p-4 bg-emerald-50 border-none rounded-2xl outline-emerald-600 font-black text-emerald-700"
                        value={currentProperty.rent}
                        onChange={e => setCurrentProperty({...currentProperty, rent: e.target.value})}
                      />
                      <input 
                        required type="number" placeholder="Vencimento"
                        className="w-full p-4 bg-slate-50 border-none rounded-2xl outline-indigo-600 font-bold"
                        value={currentProperty.dueDate}
                        onChange={e => setCurrentProperty({...currentProperty, dueDate: e.target.value})}
                      />
                    </div>
                  </div>
                </div>
              )}

              <div className="flex gap-4 pt-6">
                <button type="button" onClick={closeModal} className="flex-1 py-4 text-slate-500 font-black hover:bg-slate-100 rounded-2xl transition">Cancelar</button>
                <button type="submit" className="flex-1 py-4 bg-slate-900 text-white font-black rounded-2xl shadow-xl hover:bg-indigo-600 transition-all">
                  Confirmar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}