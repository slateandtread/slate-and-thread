import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { ArrowDown, ArrowRight, ArrowUpRight } from 'lucide-react'
import { motion } from 'framer-motion'

export function Eyebrow({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <p className={`mb-5 flex items-center gap-3 text-[10px] font-medium uppercase tracking-[.2em] text-ink/55 ${className}`}><span className="inline-block size-1.5 rounded-full bg-copper" />{children}</p>
}

export function PageLead({ eyebrow, title, text }: { eyebrow: string; title: ReactNode; text?: string }) {
  return <div className="max-w-4xl"><Eyebrow>{eyebrow}</Eyebrow><h1 className="font-editorial text-5xl leading-[.98] tracking-[-.035em] sm:text-6xl md:text-8xl">{title}</h1>{text && <p className="mt-7 max-w-xl text-base leading-7 text-ink/65 md:ml-[27%] md:text-lg">{text}</p>}</div>
}

export function ActionLink({ to, children, light = false }: { to: string; children: ReactNode; light?: boolean }) {
  return <Link to={to} className={`group inline-flex min-h-12 items-center justify-center gap-3 px-5 text-[11px] font-semibold uppercase tracking-[.13em] transition-all ${light ? 'bg-paper text-ink hover:bg-copper hover:text-paper' : 'bg-ink text-paper hover:bg-copper'}`}>{children}<ArrowUpRight size={15} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" /></Link>
}

export function TextLink({ to, children }: { to: string; children: ReactNode }) {
  return <Link to={to} className="group inline-flex items-center gap-2 border-b border-ink/30 pb-1 text-xs font-medium transition-colors hover:border-copper hover:text-copper">{children}<ArrowRight size={14} className="transition-transform group-hover:translate-x-1" /></Link>
}

export function Reveal({ children, className = '', delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  return <motion.div className={className} initial={{ opacity: 0, y: 22 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.12 }} transition={{ duration: .65, delay, ease: [0.22, 1, .36, 1] }}>{children}</motion.div>
}

export function ScrollCue() {
  return <div className="flex items-center gap-3 text-[9px] uppercase tracking-[.2em] text-ink/50"><ArrowDown size={13} className="animate-bounce" /> Прокрутить</div>
}
