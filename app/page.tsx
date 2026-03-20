'use client'

import { useEffect, useRef } from 'react'

// ─── Intersection Observer hook for scroll animations ───────────────────────
function useFadeIn() {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('opacity-100', 'translate-y-0')
          el.classList.remove('opacity-0', 'translate-y-6')
          obs.disconnect()
        }
      },
      { threshold: 0.12 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])
  return ref
}

// ─── Reusable section wrapper ────────────────────────────────────────────────
function Section({
  children,
  className = '',
}: {
  children: React.ReactNode
  className?: string
}) {
  const ref = useFadeIn()
  return (
    <div
      ref={ref}
      className={`transition-all duration-700 opacity-0 translate-y-6 ${className}`}
    >
      {children}
    </div>
  )
}

// ─── CTA Button ───────────────────────────────────────────────────────────────
function CTAButton({
  label,
  variant = 'primary',
}: {
  label: string
  variant?: 'primary' | 'outline'
}) {
  const base =
    'inline-block w-full sm:w-auto px-8 py-4 rounded-xl font-bold text-base tracking-wide transition-all duration-200 cursor-pointer text-center'
  if (variant === 'primary') {
    return (
      <a
        href="#"
        className={`${base} bg-blue-500 hover:bg-blue-400 text-white shadow-lg hover:shadow-blue-500/40 hover:-translate-y-0.5 active:translate-y-0`}
      >
        {label}
      </a>
    )
  }
  return (
    <a
      href="#"
      className={`${base} border border-blue-500 text-blue-400 hover:bg-blue-500/10 hover:border-blue-400 hover:-translate-y-0.5 active:translate-y-0`}
    >
      {label}
    </a>
  )
}

// ─── Check item for lists ─────────────────────────────────────────────────────
function CheckItem({ text }: { text: string }) {
  return (
    <li className="flex items-start gap-3 text-slate-300 text-sm sm:text-base leading-relaxed">
      <span className="mt-0.5 flex-shrink-0 w-5 h-5 rounded-full bg-blue-500/20 flex items-center justify-center">
        <svg
          className="w-3 h-3 text-blue-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={3}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
        </svg>
      </span>
      <span>{text}</span>
    </li>
  )
}

// ─── Speaker avatar placeholder ───────────────────────────────────────────────
function AvatarPlaceholder({ initials }: { initials: string }) {
  return (
    <div className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-600 to-indigo-700 flex items-center justify-center text-white text-2xl font-bold shadow-lg flex-shrink-0">
      {initials}
    </div>
  )
}

// ─── Pricing Card ─────────────────────────────────────────────────────────────
function PricingCard({
  plan,
  price,
  features,
  ctaLabel,
  highlight = false,
}: {
  plan: string
  price: string
  features: string[]
  ctaLabel: string
  highlight?: boolean
}) {
  return (
    <div
      className={`relative flex flex-col rounded-2xl p-8 gap-6 transition-transform duration-200 hover:-translate-y-1 ${
        highlight
          ? 'bg-gradient-to-b from-blue-950/60 to-[#111118] border-2 border-blue-500 shadow-2xl shadow-blue-500/20'
          : 'bg-[#111118] border border-[#1e1e2e]'
      }`}
    >
      {highlight && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2">
          <span className="bg-blue-500 text-white text-xs font-bold px-4 py-1.5 rounded-full tracking-widest uppercase shadow-lg">
            Mais Popular
          </span>
        </div>
      )}

      <div>
        <p className={`text-xs font-bold tracking-widest uppercase mb-2 ${highlight ? 'text-blue-400' : 'text-slate-400'}`}>
          {plan}
        </p>
        <p className="text-4xl font-extrabold text-white">
          {price}
        </p>
      </div>

      <ul className="flex flex-col gap-3 flex-1">
        {features.map((f) => (
          <CheckItem key={f} text={f} />
        ))}
      </ul>

      <a
        href="#"
        className={`block text-center w-full py-4 px-6 rounded-xl font-bold text-sm tracking-wide transition-all duration-200 hover:-translate-y-0.5 ${
          highlight
            ? 'bg-blue-500 text-white hover:bg-blue-400 shadow-lg hover:shadow-blue-500/40'
            : 'border border-slate-600 text-slate-300 hover:border-blue-500 hover:text-blue-400'
        }`}
      >
        {ctaLabel}
      </a>
    </div>
  )
}

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function Home() {
  return (
    <main className="min-h-screen bg-[#0a0a0f] text-white overflow-x-hidden">

      {/* ── HERO ─────────────────────────────────────────────────── */}
      <section className="relative min-h-screen flex flex-col items-center justify-center px-5 py-24 text-center hero-grid">
        {/* Background glow blob */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-blue-600/10 rounded-full blur-3xl" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto animate-fade-in-up">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-500/30 rounded-full px-4 py-2 text-blue-400 text-xs font-semibold tracking-widest uppercase mb-8">
            <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
            Ao Vivo · 28 de março
          </div>

          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black leading-none tracking-tight mb-6">
            <span className="block text-white">IMERSÃO OPENCLAW:</span>
            <span className="block gradient-text">AGENTES EM AÇÃO</span>
          </h1>

          <p className="text-xl sm:text-2xl text-slate-300 font-medium italic max-w-2xl mx-auto mb-8 leading-relaxed">
            &ldquo;Construa seu time de IA — e deixe eles trabalharem enquanto você dorme&rdquo;
          </p>

          <div className="flex items-center justify-center gap-3 text-slate-400 text-base font-medium">
            <span>📅</span>
            <span>28 de março</span>
            <span className="text-slate-600">·</span>
            <span>Ao vivo</span>
            <span className="text-slate-600">·</span>
            <span>4 horas</span>
          </div>
        </div>

        {/* Scroll hint */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-slate-600 animate-bounce">
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </section>

      {/* ── SEÇÃO 1 — O momento que separa ────────────────────────── */}
      <section className="py-24 px-5">
        <div className="max-w-3xl mx-auto">
          <Section>
            <div className="mb-10">
              <span className="text-blue-500 text-xs font-bold tracking-widest uppercase">01</span>
              <h2 className="text-3xl sm:text-4xl font-extrabold mt-2 leading-tight">
                O momento que separa quem{' '}
                <span className="gradient-text">opera</span> de quem{' '}
                <span className="gradient-text">escala</span>
              </h2>
            </div>

            <div className="space-y-6 text-slate-300 text-lg leading-relaxed">
              <p>
                Durante anos, IA foi ferramenta de consulta. Você perguntava. Ela respondia. Conversa
                encerrada, trabalho seguia na sua mão.
              </p>
              <p className="text-slate-500 font-semibold text-base tracking-wide uppercase">
                Essa era a fase 1.
              </p>
              <p>
                Agora estamos na <strong className="text-white">fase 2</strong> — e a diferença é abissal.
              </p>
              <p>
                Hoje a IA executa. Ela finaliza enquanto você reúne, entrega enquanto você decide,{' '}
                <strong className="text-white">opera enquanto você dorme</strong>. Não é assistente. É time.
              </p>
              <div className="border-l-2 border-blue-500 pl-6 py-2">
                <p>
                  Quem montar esse time primeiro vai ter uma vantagem competitiva que dinheiro não compra
                  depois. O gap entre quem tem agentes autônomos e quem ainda opera sozinho vai se tornar{' '}
                  <strong className="text-white">irreversível em meses</strong>, não em anos.
                </p>
              </div>
              <p>
                A imersão <strong className="text-white">Agentes em Ação</strong> existe para colocar você do
                lado certo desse gap — agora.
              </p>
            </div>
          </Section>
        </div>
      </section>

      {/* Divider */}
      <div className="max-w-5xl mx-auto px-5">
        <div className="h-px bg-gradient-to-r from-transparent via-blue-500/30 to-transparent" />
      </div>

      {/* ── SEÇÃO 2 — O que é essa imersão ────────────────────────── */}
      <section className="py-24 px-5">
        <div className="max-w-3xl mx-auto">
          <Section>
            <div className="mb-10">
              <span className="text-blue-500 text-xs font-bold tracking-widest uppercase">02</span>
              <h2 className="text-3xl sm:text-4xl font-extrabold mt-2 leading-tight">
                O que é essa imersão
              </h2>
            </div>

            <div className="grid sm:grid-cols-3 gap-6 mb-10">
              {[
                { icon: '⏱', label: '4 horas', sub: 'ao vivo' },
                { icon: '🚫', label: 'Zero teoria', sub: 'zero enrolação' },
                { icon: '🤖', label: 'Do zero', sub: 'ao funcionando' },
              ].map((item) => (
                <div
                  key={item.label}
                  className="bg-[#111118] border border-[#1e1e2e] rounded-xl p-6 text-center"
                >
                  <div className="text-3xl mb-3">{item.icon}</div>
                  <p className="text-white font-bold text-lg">{item.label}</p>
                  <p className="text-slate-500 text-sm">{item.sub}</p>
                </div>
              ))}
            </div>

            <div className="space-y-4 text-slate-300 text-lg leading-relaxed">
              <p>
                Você vai ver na prática como montar um time de agentes autônomos operando{' '}
                <strong className="text-white">OpenClaw</strong> — do zero ao funcionando.
              </p>
              <p className="text-slate-400">
                Não é curso gravado. É <strong className="text-white">demonstração ao vivo</strong> do que já
                roda nas nossas operações hoje, adaptado para quem precisa implementar agora.
              </p>
            </div>
          </Section>
        </div>
      </section>

      {/* ── SEÇÃO 3 — O que você vai ver ──────────────────────────── */}
      <section className="py-24 px-5 bg-[#0d0d14]">
        <div className="max-w-3xl mx-auto">
          <Section>
            <div className="mb-10">
              <span className="text-blue-500 text-xs font-bold tracking-widest uppercase">03</span>
              <h2 className="text-3xl sm:text-4xl font-extrabold mt-2 leading-tight">
                O que você vai ver e sair sabendo fazer
              </h2>
            </div>

            <ul className="flex flex-col gap-4">
              {[
                'OpenClaw vs. ChatGPT/Claude — por que aqui os agentes trabalham sozinhos e lá eles só respondem',
                'Arquitetura de um time de IA — função, modelo, autonomia e integração de cada um',
                'Integrações que escalam — Notion, Google Workspace, WhatsApp, busca em tempo real',
                'Análise de dados e relatórios automáticos — construção ao vivo, sem código',
                'Ferramentas próprias com seus agentes — sistemas que rodam 24h sem você',
                'Prioridade de construção — quais agentes montar primeiro segundo seu perfil e negócio',
                'O que quebrou no caminho — erros reais, custos reais, lições que economizam semanas',
              ].map((item) => (
                <CheckItem key={item} text={item} />
              ))}
            </ul>
          </Section>
        </div>
      </section>

      {/* ── SEÇÃO 4 — Quem vai estar com você ────────────────────── */}
      <section className="py-24 px-5">
        <div className="max-w-3xl mx-auto">
          <Section>
            <div className="mb-12">
              <span className="text-blue-500 text-xs font-bold tracking-widest uppercase">04</span>
              <h2 className="text-3xl sm:text-4xl font-extrabold mt-2 leading-tight">
                Quem vai estar com você
              </h2>
            </div>

            <div className="flex flex-col gap-8">
              {/* Sidney */}
              <div className="bg-[#111118] border border-[#1e1e2e] rounded-2xl p-8 flex flex-col sm:flex-row gap-6 items-start">
                <AvatarPlaceholder initials="SM" />
                <div>
                  <h3 className="text-xl font-extrabold text-white mb-1">Sidney Medeiros</h3>
                  <p className="text-blue-400 text-sm font-semibold mb-4">Estrategista Digital</p>
                  <p className="text-slate-300 leading-relaxed text-sm sm:text-base">
                    Projetos de múltiplos 6 dígitos em tráfego, copy e lançamentos. Não é técnico — é o leigo
                    que resolveu o problema antes dos especialistas. Hoje coordena um time de agentes que
                    processa, analisa e entrega enquanto ele dorme. Se você quer ver alguém que{' '}
                    <strong className="text-white">não sabia codar montando infra de IA</strong>, é ele.
                  </p>
                </div>
              </div>

              {/* Avner */}
              <div className="bg-[#111118] border border-[#1e1e2e] rounded-2xl p-8 flex flex-col sm:flex-row gap-6 items-start">
                <AvatarPlaceholder initials="AV" />
                <div>
                  <h3 className="text-xl font-extrabold text-white mb-1">Avner Vasconcelos</h3>
                  <p className="text-blue-400 text-sm font-semibold mb-4">Fundador da Reta Analytics</p>
                  <p className="text-slate-300 leading-relaxed text-sm sm:text-base">
                    Especialista em dados de tráfego, CRM e vendas. Atende 9 clientes com uma estrutura que
                    cruza BigQuery, dashboards e agentes de IA monitorando, alertando e respondendo em tempo
                    real. É o cara que{' '}
                    <strong className="text-white">foi fundo na arquitetura</strong> — e vai mostrar o que
                    existe lá embaixo.
                  </p>
                </div>
              </div>
            </div>
          </Section>
        </div>
      </section>

      {/* ── SEÇÃO 5 — Planos ──────────────────────────────────────── */}
      <section className="py-24 px-5 bg-[#0d0d14]" id="planos">
        <div className="max-w-4xl mx-auto">
          <Section>
            <div className="mb-14 text-center">
              <span className="text-blue-500 text-xs font-bold tracking-widest uppercase">05</span>
              <h2 className="text-3xl sm:text-4xl font-extrabold mt-2 leading-tight">
                Escolha seu acesso
              </h2>
              <p className="text-slate-400 mt-3 text-lg">28 de março · Ao vivo · 4 horas</p>
            </div>

            <div className="grid sm:grid-cols-2 gap-6 items-start">
              <PricingCard
                plan="Starter"
                price="R$ 97"
                features={[
                  'Imersão ao vivo — 28 de março',
                  'Pré-imersão gravado — 7 dias de acesso',
                ]}
                ctaLabel="GARANTIR ACESSO STARTER — R$ 97"
              />
              <PricingCard
                plan="VIP"
                price="R$ 147"
                features={[
                  'Imersão ao vivo — 28 de março',
                  'Pré-imersão gravado — 30 dias de acesso',
                  'Gravação da imersão — 30 dias para revisar',
                  'Sessão privada com IAVNER no WhatsApp — plano personalizado de agentes para o seu negócio',
                ]}
                ctaLabel="GARANTIR ACESSO VIP — R$ 147"
                highlight
              />
            </div>
          </Section>
        </div>
      </section>

      {/* ── SEÇÃO 6 — Urgência / CTA final ───────────────────────── */}
      <section className="py-24 px-5">
        <div className="max-w-3xl mx-auto text-center">
          <Section>
            <div className="mb-6">
              <span className="text-blue-500 text-xs font-bold tracking-widest uppercase">06</span>
            </div>

            <h2 className="text-3xl sm:text-5xl font-extrabold leading-tight mb-6">
              O dia <span className="gradient-text">28 está chegando.</span>
            </h2>

            <div className="flex flex-col gap-3 text-slate-400 text-lg mb-12 max-w-xl mx-auto">
              <p>
                🔒 <strong className="text-white">Não terá replay</strong> para o plano Starter.
              </p>
              <p>
                🎯 <strong className="text-white">Vagas limitadas</strong> — o acesso VIP envolve atendimento
                individual antes do evento.
              </p>
              <p>
                ⚡ O mercado não espera você estar pronto.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <CTAButton label="QUERO MEU ACESSO STARTER — R$ 97" variant="outline" />
              <CTAButton label="QUERO MEU ACESSO VIP — R$ 147" variant="primary" />
            </div>
          </Section>
        </div>
      </section>

      {/* ── FOOTER ───────────────────────────────────────────────── */}
      <footer className="py-10 px-5 border-t border-[#1e1e2e] text-center text-slate-600 text-sm">
        <p>© 2025 Agência Eidos · imersao.agenciaeidos.com.br</p>
      </footer>
    </main>
  )
}
