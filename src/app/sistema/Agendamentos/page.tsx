"use client";
import TabelaAgendamentos from "@/components/TableAgendamentos/page";
import { Input } from "@/components/ui/input";
import { useState } from "react";


const Agendamento = () =>{

     const [reloadTabela, setReloadTabela] = useState(0);

     return (
     <div className="w-full flex flex-col gap-6 p-6 min-h-screen">
          <header className="flex items-center justify-between">
               <h1 className="text-3xl font-bold text-yellow-600 tracking-tight">
                    Agendamentos
               </h1>
          </header>

          <section className="bg-white p-4 rounded-md shadow-sm border border-slate-200">
               <div className="flex gap-4 flex-wrap">
                    <div>
                    <label className="text-sm text-slate-600">Nome d*</label>
                    <Input
                    type="text"
                    placeholder="Nome da Transportadora"
                    classes="w-full border border-slate-300 rounded px-2 py-1"
                    onChangeParam={(value) => setTransportadora({ ...transportadora, NomeTransportadora: value })}
                    valueParam={transportadora.NomeTransportadora}
                    />
                    </div>
                    <div>
                    <label className="text-sm text-slate-600">Endereço*</label>
                    <Input
                    type="text"
                    placeholder="Endereço"
                    classes="w-full border border-slate-300 rounded px-2 py-1"
                    onChangeParam={(value) => setTransportadora({ ...transportadora, Endereco: value })}
                    valueParam={transportadora.Endereco}
                    />
                    </div>
                    <div>
                    <label className="text-sm text-slate-600">Número*</label>
                    <Input
                    type="text"
                    placeholder="Número"
                    classes="w-full border border-slate-300 rounded px-2 py-1"
                    onChangeParam={(value) => setTransportadora({ ...transportadora, Numero: value })}
                    valueParam={transportadora.Numero}
                    />
                    </div>
                    <div>
                    <label className="text-sm text-slate-600">Bairro*</label>
                    <Input
                    type="text"
                    placeholder="Bairro"
                    classes="w-full border border-slate-300 rounded px-2 py-1"
                    onChangeParam={(value) => setTransportadora({ ...transportadora, Bairro: value })}
                    valueParam={transportadora.Bairro}
                    />
                    </div>
                    <div>
                    <label className="text-sm text-slate-600">CEP*</label>
                    <Input
                    type="text"
                    placeholder="CEP"
                    classes="w-full border border-slate-300 rounded px-2 py-1"
                    onChangeParam={(value) => setTransportadora({ ...transportadora, Cep: value })}
                    valueParam={transportadora.Cep}
                    maxLengthParam={9}
                    />
                    </div>
                    <div>
                    <label className="text-sm text-slate-600">Documento*</label>
                    <Input
                    type="text"
                    placeholder="Documento"
                    classes="w-full border border-slate-300 rounded px-2 py-1"
                    onChangeParam={(value) => setTransportadora({ ...transportadora, Documento: value })}
                    valueParam={transportadora.Documento}
                    />
                    </div>
                    <div>
                    <label className="text-sm text-slate-600">Contato*</label>
                    <Input
                    type="text"
                    placeholder="Contato"
                    classes="w-full border border-slate-300 rounded px-2 py-1"
                    onChangeParam={(value) => setTransportadora({ ...transportadora, Contato: value })}
                    valueParam={transportadora.Contato}
                    />
                    </div>
                    <div>
                         <label className="text-sm text-slate-600">Cidade*</label>
                         <ComboboxDemo
                         opcoes={cidades}
                         onSelectProp={(value) => setTransportadora({ ...transportadora, CidadeId: value })}
                         valueProp={transportadora.CidadeId}
                         />
                    </div>
                    <div className="mt-6">
                    {editando ? (
                    <div className="flex gap-4">
                         <BotaoAzul onClick={() => onConfirmarEdicao()} disabled={carregando}>
                         {carregando ? (
                              <LoaderCircle className="animate-spin w-4 h-4" />
                         ) : (
                              <PlusCircle className="w-4 h-4 mr-2" />
                         )}
                         Editar
                         </BotaoAzul>

                         <BotaoVermelho onClick={() => onParaEdicao()} disabled={carregando}>
                         <X size={20} className="w-4 h-4" /> Parar Edição
                         </BotaoVermelho>
                    </div>
                    ) : (
                    <BotaoAzul onClick={() => adicionarTransportadora()} disabled={carregando}>
                         {carregando ? (
                         <LoaderCircle className="animate-spin w-4 h-4" />
                         ) : (
                         <PlusCircle className="w-4 h-4 mr-2" />
                         )}
                         Cadastrar
                    </BotaoAzul>
                    )}
                    </div>
               </div>
               </section>

          <TabelaAgendamentos atualizarTabela={reloadTabela}/>
     </div>
     );
}

export default Agendamento;