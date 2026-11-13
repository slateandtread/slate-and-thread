import { supabase } from './supabase'

export type Inquiry = {
  name: string
  email: string
  contact: string
  project_type: string
  goal: string
  budget: string
  timeframe: string
  company: string
  existing_url: string
  brief: string
  consent: boolean
  source: 'project_brief' | 'contact'
}

export async function submitInquiry(inquiry: Inquiry) {
  if (!supabase) throw new Error('Сервис обращений временно недоступен. Попробуйте ещё раз позже.')
  const { error } = await supabase.from('project_inquiries').insert(inquiry)
  if (error) {
    console.error('Could not submit project inquiry.', error)
    throw new Error('Не удалось отправить сообщение. Проверьте соединение и попробуйте ещё раз.')
  }
}
