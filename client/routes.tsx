import { Route, createRoutesFromElements } from 'react-router-dom'

import App from '@/components/layout/App'
import Home from '@/pages/Home'
import Leaderboard from '@/pages/Leaderboard.tsx'
import Character from '@/pages/Character.tsx'
import Random from '@/pages/Random.tsx'
import Manager from '@/pages/Manager.tsx'
import AddCharacter from '@/pages/AddCharacter.tsx'
import NotFound from '@/pages/NotFound'
import Register from './pages/Register'

export const routes = createRoutesFromElements(
  <Route path="/" element={<App />}>
    <Route index element={<Home />} />
    <Route path="/character/:id" element={<Character />} />
    <Route path="/random" element={<Random />} />
    <Route path="/leaderboard" element={<Leaderboard />} />
    <Route path="/managers/:managerId" element={<Manager />} />
    <Route path="/add-character" element={<AddCharacter />} />
    <Route path="/register" element={<Register />} />
    <Route path="*" element={<NotFound />} />
  </Route>,
)
