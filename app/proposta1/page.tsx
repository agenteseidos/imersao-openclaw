export default function Proposta1() {
  return (
    <section className="bg-[#0a0a0f] py-24 px-6 min-h-screen">
      <div className="max-w-3xl mx-auto space-y-16">

        {/* Título */}
        <div className="text-center space-y-3">
          <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight">
            A IA não é mais ferramenta.{" "}
            <span className="text-[#3b82f6]">É funcionário.</span>
          </h2>
        </div>

        {/* FASE 1 — Apagada */}
        <div className="bg-[#111118] border border-[#1e1e2e] rounded-2xl p-8 opacity-60 relative">
          <span className="absolute -top-3 left-6 bg-[#1e1e2e] text-gray-400 text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-widest">
            Fase 1 — encerrada
          </span>
          <p className="text-gray-400 text-lg leading-relaxed">
            Você já usou ChatGPT pra rascunhar texto.<br />
            Já pediu pro Claude revisar uma copy.<br />
            <span className="text-gray-300 font-medium">Isso era a fase 1 — e ela acabou.</span>
          </p>
        </div>

        {/* Divisor com badge */}
        <div className="flex items-center gap-4">
          <div className="flex-1 h-px bg-[#1e1e2e]" />
          <span className="bg-[#3b82f6]/10 border border-[#3b82f6]/30 text-[#3b82f6] text-sm font-semibold px-4 py-2 rounded-full whitespace-nowrap">
            A fase 2 é diferente
          </span>
          <div className="flex-1 h-px bg-[#1e1e2e]" />
        </div>

        {/* FASE 2 — Iluminada */}
        <div className="bg-[#111118] border border-[#3b82f6]/30 rounded-2xl p-8 space-y-6">
          <span className="inline-block bg-[#3b82f6]/10 border border-[#3b82f6]/20 text-[#3b82f6] text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-widest">
            Fase 2 — agora
          </span>
          <p className="text-white text-lg leading-relaxed">
            Agentes que operam sozinhos, entregam resultado e não precisam que você fique na tela.
          </p>
          <p className="text-gray-400 text-base">
            Enquanto você atende cliente, está na academia ou dorme — eles estão rodando.
          </p>
          <div className="flex flex-wrap gap-3 pt-2">
            {["📊 Monitorando dados", "📄 Gerando relatórios", "💬 Respondendo leads", "🔧 Construindo ferramentas"].map((item) => (
              <span key={item} className="bg-[#0a0a0f] border border-[#1e1e2e] text-gray-300 text-sm px-4 py-2 rounded-full">
                {item}
              </span>
            ))}
          </div>
        </div>

        {/* Diagnóstico */}
        <div className="border-l-2 border-[#3b82f6] pl-6 space-y-2">
          <p className="text-gray-400 text-lg">O problema não é acesso à tecnologia.</p>
          <p className="text-white text-xl font-semibold">É que a maioria ainda usa IA como buscador glorificado.</p>
        </div>

        {/* Fechamento */}
        <div className="bg-[#111118] border border-[#1e1e2e] rounded-2xl p-8 text-center space-y-4">
          <p className="text-white text-xl font-medium leading-relaxed">
            Nessa imersão, a gente mostra como montar a estrutura que trabalha por você.
          </p>
          <div className="flex justify-center gap-6 pt-2 flex-wrap">
            {["Ao vivo.", "Com tela aberta.", "Sem teoria de palco."].map((item) => (
              <span key={item} className="text-[#3b82f6] font-semibold text-sm">{item}</span>
            ))}
          </div>
        </div>

        {/* Label de preview */}
        <div className="text-center">
          <span className="text-slate-600 text-xs">PROPOSTA 1 — voltar: <a href="/" className="text-blue-500 underline">página principal</a></span>
        </div>

      </div>
    </section>
  )
}
