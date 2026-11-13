import { useEffect } from 'react'
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom'
import { Shell } from './components/Shell'
import { AboutPage, ContactPage, Home, NotFound, PricingPage, PrivacyPage, ProcessPage, ProjectPage, ServiceDetailPage, ServicesPage, StartProjectPage, WorkPage } from './pages'

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo(0, 0)
    const serviceTitle = ({
      'landing-page': 'Разработка лендинга', 'business-website': 'Сайт компании', ecommerce: 'Интернет-магазин',
      'ui-ux': 'UI/UX-дизайн', redesign: 'Редизайн сайта', custom: 'Индивидуальная разработка',
    } as Record<string, string>)[pathname.split('/')[2] ?? '']
    const title = pathname.startsWith('/services/') ? serviceTitle ?? 'Услуга' : pathname.startsWith('/work/') ? 'Проект' : ({
      '/': 'Независимая digital-студия', '/services': 'Услуги', '/work': 'Работы', '/about': 'О студии',
      '/process': 'Процесс работы', '/pricing': 'Стоимость', '/start-project': 'Обсудить проект',
      '/contact': 'Контакт', '/privacy': 'Конфиденциальность',
    } as Record<string, string>)[pathname] ?? 'Страница не найдена'
    document.title = `${title} — Slate & Thread`
    const description = document.querySelector<HTMLMetaElement>('meta[name="description"]')
    if (description) description.content = `${title}. Slate & Thread — независимая студия дизайна и разработки цифровых продуктов.`
  }, [pathname])
  return null
}

export default function App() {
  return <BrowserRouter><ScrollToTop /><Routes><Route element={<Shell />}>
    <Route index element={<Home />} />
    <Route path="services" element={<ServicesPage />} />
    <Route path="services/:slug" element={<ServiceDetailPage />} />
    <Route path="work" element={<WorkPage />} />
    <Route path="work/:slug" element={<ProjectPage />} />
    <Route path="about" element={<AboutPage />} />
    <Route path="process" element={<ProcessPage />} />
    <Route path="pricing" element={<PricingPage />} />
    <Route path="start-project" element={<StartProjectPage />} />
    <Route path="contact" element={<ContactPage />} />
    <Route path="privacy" element={<PrivacyPage />} />
    <Route path="*" element={<NotFound />} />
  </Route></Routes></BrowserRouter>
}
