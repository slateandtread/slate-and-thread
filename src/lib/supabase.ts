import { createClient } from '@supabase/supabase-js'

const url = import.meta.env.VITE_SUPABASE_URL
const publishableKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY

export const supabase = url && publishableKey ? createClient(url, publishableKey) : null

export type WorkProject = {
  id: string
  slug: string
  title: string
  category: string
  summary: string
  year: string | null
  cover_image_url: string | null
  hero_image_url: string | null
  services: string[] | null
  body: Record<string, string> | null
  sort_order: number
}
