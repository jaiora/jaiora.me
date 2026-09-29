import { Navigate, Route, Routes } from 'react-router-dom'
import JaioraLanding from '@/components/JaioraLanding'
import LocationsView from '@/components/LocationsView'
import LocationView from '@/components/LocationView'
import BlogView from '@/components/BlogView'
import BlogPostView from '@/components/BlogPostView'
import TeamView from '@/components/TeamView'
import { usePageMeta } from '@/lib/usePageMeta'

export default function App() {
  usePageMeta()
  return (
    <Routes>
      <Route path="/" element={<JaioraLanding />} />
      <Route path="/locations" element={<LocationsView />} />
      <Route path="/location/:slug" element={<LocationView />} />
      <Route path="/blog" element={<BlogView />} />
      <Route path="/blog/:slug" element={<BlogPostView />} />
      <Route path="/team" element={<TeamView />} />
      <Route path="/en" element={<JaioraLanding />} />
      <Route path="/en/locations" element={<LocationsView />} />
      <Route path="/en/location/:slug" element={<LocationView />} />
      <Route path="/en/blog" element={<BlogView />} />
      <Route path="/en/blog/:slug" element={<BlogPostView />} />
      <Route path="/en/team" element={<TeamView />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}
