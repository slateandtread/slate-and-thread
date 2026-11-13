import { useState } from 'react'
import { Link, NavLink, Outlet, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowUpRight, Menu, X } from 'lucide-react'
import { nav, services } from '../data/site'

function Mark() {
  return <span aria-hidden="true" className="relative grid size-9 shrink-0 place-items-center rounded-full border border-ink/25">
    <span className="absolute h-[1px] w-5 bg-ink" />
    <span className="absolute h-5 w-[1px] bg-copper" />
    <span className="size-1.5 rounded-full bg-paper ring-1 ring-ink/70" />
  </span>
}

export function Shell() {
  const [open, setOpen] = useState(false)
  const location = useLocation()
  return <>
    <header className="fixed inset-x-0 top-0 z-50 border-b border-ink/10 bg-paper/90 backdrop-blur-xl">
      <div className="mx-auto flex h-[76px] max-w-[1440px] items-center justify-between px-5 md:px-10 xl:px-16">
        <Link to="/" onClick={() => setOpen(false)} className="flex items-center gap-3" aria-label="Slate & Thread — на главную">
          <Mark /><span className="flex flex-col leading-none"><span className="font-sans text-[13px] font-semibold tracking-[.14em]">SLATE <span className="text-copper">&</span> THREAD</span><span className="mt-1.5 text-[9px] uppercase tracking-[.22em] text-ink/50">Independent digital studio</span></span>
        </Link>
        <nav className="hidden items-center gap-7 lg:flex" aria-label="Основная навигация">
          {nav.map((item) => <NavLink key={item.to} to={item.to} className={({ isActive }) => `nav-link ${isActive || (item.to === '/services' && location.pathname.startsWith('/services/')) ? 'text-ink after:scale-x-100' : ''}`}>{item.label}</NavLink>)}
          <NavLink to="/contact" className={({ isActive }) => `nav-link ${isActive ? 'text-ink after:scale-x-100' : ''}`}>Контакт</NavLink>
        </nav>
        <Link to="/start-project" className="hidden items-center gap-2 border-b border-copper pb-1 text-[11px] font-semibold uppercase tracking-[.13em] transition-colors hover:text-copper lg:flex">Обсудить проект <ArrowUpRight size={14} /></Link>
        <button className="grid size-11 place-items-center rounded-full border border-ink/15 lg:hidden" onClick={() => setOpen(!open)} aria-label={open ? 'Закрыть меню' : 'Открыть меню'} aria-expanded={open}>{open ? <X size={19} /> : <Menu size={19} />}</button>
      </div>
      <AnimatePresence>
        {open && <motion.nav initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden border-t border-ink/10 bg-paper px-5 lg:hidden" aria-label="Мобильная навигация">
          <div className="flex flex-col py-4">
            {[...nav, { label: 'Контакт', to: '/contact' }, { label: 'Начать проект', to: '/start-project' }, ...services.map((s) => ({ label: s.title, to: s.href }))].map((item) => <Link key={item.to} to={item.to} onClick={() => setOpen(false)} className="border-b border-ink/10 py-3 text-sm">{item.label}</Link>)}
          </div>
        </motion.nav>}
      </AnimatePresence>
    </header>
    <main className="min-h-screen pt-[76px]"><Outlet /></main>
    <Footer />
  </>
}

function Footer() {
  return <footer className="bg-ink text-paper">
    <div className="mx-auto max-w-[1440px] px-5 pb-8 pt-16 md:px-10 md:pt-24 xl:px-16">
      <div className="grid gap-12 border-b border-paper/20 pb-14 md:grid-cols-[1.4fr_.7fr_.8fr] md:gap-8">
        <div><p className="mb-5 font-sans text-xs font-semibold tracking-[.14em]">SLATE <span className="text-copper">&</span> THREAD</p><h2 className="max-w-xl font-editorial text-4xl leading-[1.05] md:text-6xl">Сделаем цифровой опыт <i className="font-normal text-copper">осмысленным.</i></h2><Link to="/start-project" className="mt-8 inline-flex items-center gap-2 border-b border-paper/45 pb-2 text-xs uppercase tracking-[.14em] hover:border-copper hover:text-copper">Обсудить проект <ArrowUpRight size={14} /></Link></div>
        <div><p className="mb-5 text-[10px] uppercase tracking-[.2em] text-paper/45">Навигация</p><div className="flex flex-col gap-3 text-sm text-paper/80">{nav.map((item) => <Link key={item.to} to={item.to} className="hover:text-copper">{item.label}</Link>)}<Link to="/contact" className="hover:text-copper">Контакт</Link></div></div>
        <div><p className="mb-5 text-[10px] uppercase tracking-[.2em] text-paper/45">Направления</p><div className="flex flex-col gap-3 text-sm text-paper/80">{services.slice(0, 4).map((item) => <Link key={item.slug} to={item.href} className="hover:text-copper">{item.title}</Link>)}</div></div>
      </div>
      <div className="flex flex-col gap-3 pt-6 text-[10px] uppercase tracking-[.13em] text-paper/50 sm:flex-row sm:items-center sm:justify-between"><span>© {new Date().getFullYear()} Slate & Thread</span><span>Независимая digital-студия</span><Link to="/privacy" className="hover:text-paper">Конфиденциальность</Link></div>
    </div>
  </footer>
}
