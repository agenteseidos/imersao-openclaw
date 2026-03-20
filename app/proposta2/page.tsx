'use client'

const etapas = [
  {
    fase: "passado",
    icone: "💤",
    rotulo: "Era assim",
    ativo: false,
    conteudo: "Você já usou ChatGPT pra rascunhar texto. Já pediu pro Claude revisar uma copy. Isso era a fase 1 — e ela acabou.",
  },
  {
    fase: "virada",
    icone: "⚡",
    rotulo: "A fase 2 é diferente",
    ativo: true,
    conteudo: "Agentes que operam sozinhos, entregam resultado e não precisam que você fique na tela.",
  },
  {
    fase: "presente",
    icone: "🤖",
    rotulo: "Enquanto você vive",
    ativo: true,
    grid: ["📊 Monitorando dados", "📄 Gerando relatórios", "💬 Respondendo leads", "🔧 Construindo ferramentas"],
    conteudo: "Enquanto você atende cliente, está na academia ou dorme — eles estão rodando.",
  },
  {
    fase: "diagnostico",
    icone: "🎯",
    rotulo: "O problema real",
    ativo: true,
    conteudo: "O problema não é acesso à tecnologia. É que a maioria ainda usa IA como buscador glorificado.",
  },
]

export default function Proposta2() {
  return (
    <section className="bg-[#0a0a0f] py-24 px-6 min-h-screen">
      <div className="max-w-2xl mx-auto space-y-16">
        <div className="text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight">
            A IA não é mais ferramenta.{" "}
            <span className="text-[#3b82f6]">É funcionário.</span>
          </h2>
        </div>

        <div className="relative">
          <div className="absolute left-5 top-10 bottom-10 w-px bg-[#1e1e2e]" />
          <div className="space-y-8">
            {etapas.map((etapa, i) => (
              <div key={i} className="flex gap-6 relative">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center text-lg shrink-0 z-10 ${etapa.ativo ? "bg-[#3b82f6]/10 border border-[#3b82f6]/40" : "bg-[#111118] border border-[#1e1e2e]"}`}>
                  {etapa.icone}
                </div>
                <div className={`flex-1 bg-[#111118] rounded-2xl p-6 space-y-3 border border-[#1e1e2e] ${!etapa.ativo ? "opacity-55" : ""}`}>
                  <span className={`text-xs font-semibold uppercase tracking-widest ${etapa.ativo ? "text-[#3b82f6]" : "text-gray-500"}`}>
                    {etapa.rotulo}
                  </span>
                  <p className="text-gray-400 text-base leading-relaxed">{etapa.conteudo}</p>
                  {etapa.grid && (
                    <div className="grid grid-cols-2 gap-2 pt-2">
                      {etapa.grid.map((a) => (
                        <div key={a} className="bg-[#0a0a0f] border border-[#1e1e2e] rounded-lg px-3 py-2 text-sm text-gray-300">{a}</div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-[#111118] border border-[#3b82f6]/40 rounded-2xl p-8 text-center space-y-4">
          <p className="text-white text-xl font-medium leading-relaxed">
            Nessa imersão, a gente mostra como montar a estrutura que trabalha por você.
          </p>
          <div className="flex flex-wrap justify-center gap-4 pt-2">
            {["✅ Ao vivo.", "✅ Com tela aberta.", "✅ Sem teoria de palco."].map((item) => (
              <span key={item} className="text-[#3b82f6] font-semibold text-sm">{item}</span>
            ))}
          </div>
        </div>

        <div className="text-center">
          <span className="text-slate-600 text-xs">PROPOSTA 2 — voltar: <a href="/" className="text-blue-500 underline">página principal</a></span>
        </div>
      </div>
    </section>
  )
}
