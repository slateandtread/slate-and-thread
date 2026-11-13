import { useEffect, useState } from 'react'
import { supabase, type WorkProject } from './supabase'

export function useProjects(slug?: string) {
  const [projects, setProjects] = useState<WorkProject[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let active = true
    async function load() {
      if (!supabase) {
        setError('Подборка проектов скоро появится.')
        setLoading(false)
        return
      }
      setLoading(true)
      const query = supabase.from('work_projects').select('id,slug,title,category,summary,year,cover_image_url,hero_image_url,services,body,sort_order').eq('published', true)
      const { data, error: fetchError } = slug
        ? await query.eq('slug', slug).limit(1)
        : await query.order('sort_order', { ascending: true }).order('created_at', { ascending: false })
      if (!active) return
      if (fetchError) {
        console.error('Could not load published work projects.', fetchError)
        setError('Архив временно недоступен. Попробуйте открыть его позже.')
      }
      else setProjects((data ?? []) as WorkProject[])
      setLoading(false)
    }
    void load()
    return () => { active = false }
  }, [slug])

  return { projects, loading, error }
}
