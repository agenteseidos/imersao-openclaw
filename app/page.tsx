'use client'

import { useEffect, useRef } from 'react'
import Image from 'next/image'

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
  href = '#planos',
}: {
  label: string
  variant?: 'primary' | 'outline'
  href?: string
}) {
  const base =
    'inline-block w-full sm:w-auto px-8 py-4 rounded-xl font-bold text-base tracking-wide transition-all duration-200 cursor-pointer text-center'
  if (variant === 'primary') {
    return (
      <a
        href={href}
        target={href.startsWith('http') ? '_blank' : undefined}
        rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
        className={`${base} bg-blue-500 hover:bg-blue-400 text-white shadow-lg hover:shadow-blue-500/40 hover:-translate-y-0.5 active:translate-y-0`}
      >
        {label}
      </a>
    )
  }
  return (
    <a
      href={href}
      target={href.startsWith('http') ? '_blank' : undefined}
      rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
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

// ─── Arrow item for content grid ─────────────────────────────────────────────
function ArrowItem({ title, desc }: { title: string; desc: string }) {
  return (
    <div className="bg-[#111118] border border-[#1e1e2e] rounded-xl p-6 flex flex-col gap-2 hover:border-blue-500/40 transition-colors duration-200">
      <div className="flex items-start gap-3">
        <span className="text-blue-500 font-bold text-xl mt-0.5 flex-shrink-0">→</span>
        <div>
          <p className="text-white font-bold text-base leading-tight">{title}</p>
          <p className="text-slate-400 text-sm mt-1 leading-relaxed">{desc}</p>
        </div>
      </div>
    </div>
  )
}

// ─── Pricing Card ─────────────────────────────────────────────────────────────
function PricingCard({
  plan,
  price,
  subtitle,
  features,
  note,
  ctaLabel,
  ctaHref = '#planos',
  highlight = false,
}: {
  plan: string
  price: string
  subtitle: string
  features: string[]
  note?: string
  ctaLabel: string
  ctaHref?: string
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
        <div className="flex justify-center -mt-2 mb-0">
          <span className="bg-blue-500 text-white text-xs font-bold px-4 py-1.5 rounded-full tracking-widest uppercase shadow-lg">
            Melhor custo-benefício
          </span>
        </div>
      )}

      <div>
        <p className={`text-xs font-bold tracking-widest uppercase mb-1 ${highlight ? 'text-blue-400' : 'text-slate-400'}`}>
          {plan}
        </p>
        <p className="text-4xl font-extrabold text-white mb-1">{price}</p>
        <p className="text-slate-400 text-sm">{subtitle}</p>
      </div>

      <ul className="flex flex-col gap-3 flex-1">
        {features.map((f) => (
          <CheckItem key={f} text={f} />
        ))}
      </ul>

      {note && (
        <p className="text-slate-500 text-xs leading-relaxed border-t border-[#1e1e2e] pt-4">{note}</p>
      )}

      <a
        href={ctaHref}
        target="_blank"
        rel="noopener noreferrer"
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

      {/* ── HEADER ───────────────────────────────────────────────── */}
      <header className="fixed top-0 left-0 right-0 z-50 px-5 py-4 bg-[#0a0a0f]/80 backdrop-blur-sm border-b border-[#1e1e2e]/50">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <Image
            src="/openclaw-logo-dark.png"
            alt="OpenClaw"
            width={140}
            height={36}
            className="h-8 w-auto object-contain"
          />
          <a
            href="#planos"
            className="bg-blue-500 hover:bg-blue-400 text-white text-sm font-bold px-5 py-2 rounded-lg transition-colors duration-200"
          >
            Garantir Vaga
          </a>
        </div>
      </header>

      {/* ── HERO ─────────────────────────────────────────────────── */}
      <section className="relative min-h-screen flex flex-col items-center justify-center px-5 pt-32 pb-16 text-center hero-grid">
        {/* Background hero image */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <Image
            src="/hero.webp"
            alt=""
            fill
            className="object-cover opacity-10"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0f]/60 via-transparent to-[#0a0a0f]" />
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

          <div className="flex flex-col items-center gap-1 text-slate-400 font-medium mb-10">
            <div className="flex items-center gap-3 text-base">
              <span>28 de março às 13h</span>
              <span className="text-slate-600">·</span>
              <span>Ao vivo</span>
            </div>
            <span className="text-base">4 horas de imersão</span>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <CTAButton label="Quero garantir minha vaga →" variant="primary" />
          </div>
          <p className="mt-4 text-slate-500 text-sm text-center max-w-md mx-auto">
            ⚡ Esta página foi construída inteiramente por agentes de IA — do layout ao texto — em menos de 2 horas.
          </p>
        </div>

        {/* Scroll hint */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-slate-600 animate-bounce">
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </section>

      {/* ── SEÇÃO 2 — ABERTURA (Timeline Narrativa) ──────────────── */}
      <section className="py-24 px-5">
        <div className="max-w-2xl mx-auto">
          <Section>
            <div className="mb-12">
              <h2 className="text-3xl sm:text-4xl font-extrabold leading-tight">
                A IA não é mais ferramenta.{' '}
                <span className="gradient-text">É funcionário.</span>
              </h2>
            </div>

            <div className="relative">
              <div className="absolute left-5 top-10 bottom-10 w-px bg-[#1e1e2e]" />
              <div className="space-y-8">
                {[
                  { fase: 'passado', icone: '💤', rotulo: 'Era assim', ativo: false, conteudo: 'Você já usou ChatGPT pra rascunhar texto. Já pediu pro Claude revisar uma copy. Isso era a fase 1 — e ela acabou.' },
                  { fase: 'virada', icone: '⚡', rotulo: 'A fase 2 é diferente', ativo: true, conteudo: 'Agentes que operam sozinhos, entregam resultado e não precisam que você fique na tela.' },
                  { fase: 'presente', icone: '🤖', rotulo: 'Enquanto você vive', ativo: true, conteudo: 'Enquanto você atende cliente, está na academia ou dorme — eles estão rodando.', grid: ['📊 Monitorando dados', '📄 Gerando relatórios', '💬 Respondendo leads', '🔧 Construindo ferramentas'] },
                  { fase: 'diagnostico', icone: '🎯', rotulo: 'O problema real', ativo: true, conteudo: 'O problema não é acesso à tecnologia. É que a maioria ainda usa IA como buscador glorificado.' },
                ].map((etapa, i) => (
                  <div key={i} className="flex gap-6 relative">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center text-lg shrink-0 z-10 ${etapa.ativo ? 'bg-blue-500/10 border border-blue-500/40' : 'bg-[#111118] border border-[#1e1e2e]'}`}>
                      {etapa.icone}
                    </div>
                    <div className={`flex-1 bg-[#111118] rounded-2xl p-6 space-y-3 border border-[#1e1e2e] ${!etapa.ativo ? 'opacity-55' : ''}`}>
                      <span className={`text-xs font-semibold uppercase tracking-widest ${etapa.ativo ? 'text-blue-400' : 'text-slate-500'}`}>
                        {etapa.rotulo}
                      </span>
                      <p className="text-slate-400 text-base leading-relaxed">{etapa.conteudo}</p>
                      {etapa.grid && (
                        <div className="grid grid-cols-2 gap-2 pt-2">
                          {etapa.grid.map((a) => (
                            <div key={a} className="bg-[#0a0a0f] border border-[#1e1e2e] rounded-lg px-3 py-2 text-sm text-slate-300">{a}</div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-[#111118] border border-blue-500/40 rounded-2xl p-8 text-center space-y-4 mt-12">
              <p className="text-white text-xl font-medium leading-relaxed">
                Nessa imersão, a gente mostra como montar a estrutura que trabalha por você.
              </p>
              <div className="flex flex-wrap justify-center gap-4 pt-2">
                {['✅ Ao vivo.', '✅ Com tela aberta.', '✅ Sem teoria de palco.'].map((item) => (
                  <span key={item} className="text-blue-400 font-semibold text-sm">{item}</span>
                ))}
              </div>
            </div>
          </Section>
        </div>
      </section>

      {/* Divider */}
      <div className="max-w-5xl mx-auto px-5">
        <div className="h-px bg-gradient-to-r from-transparent via-blue-500/30 to-transparent" />
      </div>

      {/* ── SEÇÃO 3 — O QUE É ESSA IMERSÃO ───────────────────────── */}
      <section className="py-24 px-5">
        <div className="max-w-5xl mx-auto">
          <Section>
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Text */}
              <div>
                <h2 className="text-3xl sm:text-4xl font-extrabold mb-8 leading-tight">
                  4 horas. Ao vivo. <span className="gradient-text">Tela aberta.</span>
                </h2>

                <div className="grid gap-4">
                  <div className="bg-[#111118] border border-[#1e1e2e] rounded-xl p-5 flex items-start gap-4">
                    <span className="text-3xl flex-shrink-0">🎯</span>
                    <div>
                      <p className="text-white font-bold text-base mb-1">Não é curso, não é palestra</p>
                      <p className="text-slate-400 text-sm leading-relaxed">Não é pitch disfarçado de conteúdo. É uma imersão prática onde você vai ver — em tempo real — como uma infra de agentes de IA funciona de verdade.</p>
                    </div>
                  </div>
                  <div className="bg-[#111118] border border-[#1e1e2e] rounded-xl p-5 flex items-start gap-4">
                    <span className="text-3xl flex-shrink-0">🖥️</span>
                    <div>
                      <p className="text-white font-bold text-base mb-1">Tela aberta, sem teatro</p>
                      <p className="text-slate-400 text-sm leading-relaxed">Você vai sair sabendo o que montar, por onde começar e o que evitar. Sem precisar ser técnico. Sem precisar de equipe.</p>
                    </div>
                  </div>
                  <div className="bg-[#111118] border border-[#1e1e2e] rounded-xl p-5 flex items-start gap-4">
                    <span className="text-3xl flex-shrink-0">⚡</span>
                    <div>
                      <p className="text-white font-bold text-base mb-1">Arquitetura real</p>
                      <p className="text-slate-400 text-sm leading-relaxed">Erros reais. Custos reais. Só precisar querer que as coisas rodem sem depender de você.</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Image */}
              <div className="relative rounded-2xl overflow-hidden border border-[#1e1e2e]">
                <Image
                  src="/secao-imersao.png"
                  alt="Imersão OpenClaw em ação"
                  width={600}
                  height={400}
                  className="w-full h-auto object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0f]/60 to-transparent" />
              </div>
            </div>
          </Section>
        </div>
      </section>

      {/* ── SEÇÃO 4 — O QUE VOCÊ VAI VER ─────────────────────────── */}
      <section className="py-24 px-5 bg-[#0d0d14]">
        <div className="max-w-4xl mx-auto">
          <Section>
            <div className="mb-12 text-center">
              <h2 className="text-3xl sm:text-4xl font-extrabold leading-tight">
                O que acontece nas <span className="gradient-text">4 horas</span>
              </h2>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <ArrowItem
                title="OpenClaw vs ChatGPT vs Claude"
                desc="A diferença real — e por que só um deles executa"
              />
              <ArrowItem
                title="Arquitetura de time de agentes"
                desc="Como definir função, modelo e nível de autonomia de cada agente"
              />
              <ArrowItem
                title="Integrações ao vivo"
                desc="Notion, Google Workspace, WhatsApp e internet em tempo real — conectados e funcionando"
              />
              <ArrowItem
                title="Análise de dados e relatórios automáticos"
                desc="Agentes que monitoram, processam e entregam — sem você pedir"
              />
              <ArrowItem
                title="Ferramentas construídas pelos próprios agentes"
                desc="Apps funcionais criados durante a imersão, na sua frente"
              />
              <ArrowItem
                title="Por onde começar — por perfil"
                desc="Quais agentes criar primeiro dependendo do que você faz"
              />
              <div className="sm:col-span-2">
                <ArrowItem
                  title="Erros, custos e lições reais"
                  desc="O que não funciona, quanto custa e o que a gente mudaria se fosse começar hoje"
                />
              </div>
            </div>
          </Section>
        </div>
      </section>

      {/* ── CTA SECUNDÁRIO (meio de página) ───────────────────────── */}
      <section className="py-10 px-5">
        <div className="max-w-2xl mx-auto text-center">
          <Section>
            <p className="text-slate-400 text-sm font-semibold tracking-widest uppercase mb-3">
              28 de março · 13h · Ao vivo
            </p>
            <h3 className="text-2xl sm:text-3xl font-extrabold mb-5 text-white">
              Pronto pra montar seu time de IA?
            </h3>
            <div className="flex justify-center">
              <CTAButton label="Quero garantir minha vaga →" variant="primary" />
            </div>
          </Section>
        </div>
      </section>

      {/* Divider */}
      <div className="max-w-5xl mx-auto px-5">
        <div className="h-px bg-gradient-to-r from-transparent via-blue-500/30 to-transparent" />
      </div>

      {/* ── SEÇÃO 5 — QUEM VAI APRESENTAR ────────────────────────── */}
      <section className="py-24 px-5">
        <div className="max-w-3xl mx-auto">
          <Section>
            <div className="mb-12 text-center">
              <h2 className="text-3xl sm:text-4xl font-extrabold leading-tight">
                Quem vai apresentar
              </h2>
            </div>

            <div className="flex flex-col gap-4">
              {/* Sidney */}
              <div className="bg-[#111118] border border-[#1e1e2e] rounded-2xl p-6 flex flex-col sm:flex-row gap-6 items-start">
                <div className="flex-shrink-0">
                  <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-blue-500 shadow-lg shadow-blue-500/20">
                    <Image
                      src="/sidney-pro.png"
                      alt="Sidney Medeiros"
                      width={80}
                      height={80}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-extrabold text-white mb-1">Sidney Medeiros</h3>
                  <p className="text-blue-400 text-sm font-semibold mb-4">Estrategista Digital</p>
                  <p className="text-slate-300 leading-relaxed text-sm sm:text-base">
                    Estrategista digital com participação em projetos de múltiplos 6 dígitos em vendas de infoprodutos. Não é dev, não é técnico — montou uma infra de IA completa seguindo o próprio feeling e saiu na frente.
                    <strong className="text-white"> Se ele conseguiu sem background técnico, você também consegue.</strong>
                  </p>
                </div>
              </div>

              {/* Avner */}
              <div className="bg-[#111118] border border-[#1e1e2e] rounded-2xl p-6 flex flex-col sm:flex-row gap-6 items-start">
                <div className="flex-shrink-0">
                  <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-blue-500 shadow-lg shadow-blue-500/20">
                    <Image
                      src="/avner-pro.png"
                      alt="Avner Vasconcelos"
                      width={80}
                      height={80}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-extrabold text-white mb-1">Avner Vasconcelos</h3>
                  <p className="text-blue-400 text-sm font-semibold mb-4">Analista de Dados</p>
                  <p className="text-slate-300 leading-relaxed text-sm sm:text-base">
                    Analista de dados especializado em transformar números em decisões que aumentam lucro.
                    Construiu agentes que monitoram campanhas e entregam análises em tempo real — rodando agora, enquanto você lê isso.
                    É o <strong className="text-white">técnico que foi fundo e voltou pra contar como funciona de verdade.</strong>
                  </p>
                </div>
              </div>

              <div className="text-center text-slate-400 text-base italic pt-2">
                Dois pontos de vista. Um resultado só: <strong className="text-white">você saindo com clareza do que montar.</strong>
              </div>
            </div>
          </Section>
        </div>
      </section>

      {/* ── SEÇÃO 6 — PLANOS ──────────────────────────────────────── */}
      <section className="py-24 px-5 bg-[#0d0d14]" id="planos">
        <div className="max-w-4xl mx-auto">
          <Section>
            <div className="mb-14 text-center">
              <h2 className="text-3xl sm:text-4xl font-extrabold mt-2 leading-tight">
                Escolha seu acesso
              </h2>
              <p className="text-slate-400 mt-3 text-lg">28 de março · 13h · Ao vivo · 4 horas</p>
            </div>

            <div className="grid sm:grid-cols-2 gap-6 items-start pt-10 overflow-visible">
              <PricingCard
                plan="Starter"
                price="R$ 97"
                subtitle="Para quem quer ver, entender e começar."
                features={[
                  'Imersão ao vivo — 28 de março às 13h',
                  'Pré-imersão gravado — 7 dias de acesso',
                ]}
                note="Sem replay. O que acontece ao vivo, fica ao vivo."
                ctaLabel="GARANTIR MINHA VAGA STARTER"
                ctaHref="https://pay.hotmart.com/X105002125N?off=rtciubcx"
              />
              <PricingCard
                plan="VIP"
                price="R$ 147"
                subtitle="Para quem quer sair com plano de ação personalizado."
                features={[
                  'Imersão ao vivo — 28 de março às 13h',
                  'Pré-imersão gravado — 30 dias de acesso',
                  'Gravação da imersão — 30 dias para revisar no seu ritmo',
                  'Sessão privada com IAVNER no WhatsApp — onboarding direto: quais agentes criar primeiro, como configurar, por onde começar no seu contexto específico',
                ]}
                note="IAVNER é o agente que já está operando na estrutura OpenClaw. Ele analisa o seu perfil e monta um plano do zero pra você."
                ctaLabel="QUERO O ACESSO VIP"
                ctaHref="https://pay.hotmart.com/R105002285N?off=tku0qzgx"
                highlight
              />
            </div>
          </Section>
        </div>
      </section>

      {/* ── SEÇÃO 7 — FECHAMENTO / URGÊNCIA ──────────────────────── */}
      <section className="py-24 px-5">
        <div className="max-w-3xl mx-auto text-center">
          <Section>
            <h2 className="text-3xl sm:text-5xl font-extrabold leading-tight mb-8">
              28 de março. 13h. <span className="gradient-text">Ao vivo.</span>
            </h2>

            <div className="flex flex-col gap-3 text-slate-300 text-lg mb-12 max-w-xl mx-auto">
              <p>Não tem replay no Starter.</p>
              <p>Não tem segunda chamada.</p>
              <p className="font-semibold text-white">As vagas são limitadas — e quando fechar, fechou.</p>
            </div>

            <div className="bg-[#111118] border border-[#1e1e2e] rounded-2xl p-8 mb-12 text-left max-w-xl mx-auto">
              <p className="text-slate-300 text-lg leading-relaxed">
                A virada já está acontecendo.<br />
                A pergunta é se você vai entrar agora ou ficar tentando entender depois o que os outros já estão usando.
              </p>
            </div>

            <div className="flex justify-center">
              <CTAButton label="QUERO O ACESSO VIP — R$ 147" variant="primary" href="https://pay.hotmart.com/R105002285N?off=tku0qzgx" />
            </div>
          </Section>
        </div>
      </section>

      {/* ── FOOTER ───────────────────────────────────────────────── */}
      <footer className="py-10 px-5 border-t border-[#1e1e2e]">
        <div className="max-w-5xl mx-auto flex flex-col items-center gap-4">
          <div className="flex items-center gap-3">
            <Image
              src="/pixel-lobster.svg"
              alt="OpenClaw"
              width={28}
              height={28}
              className="opacity-60"
            />
            <span className="text-slate-500 text-sm">Powered by OpenClaw</span>
          </div>
          <p className="text-slate-600 text-sm text-center">© 2026 Agência Eidos · imersao.agenciaeidos.com.br</p>
        </div>
      </footer>
    </main>
  )
}
