import { Outlet } from 'react-router-dom'

import Navigation from '@/components/layout/NavBar'
import Footer from '@/components/layout/Footer'

function App() {
  return (
    <div className="flex h-screen flex-col justify-between bg-background text-primary font-header">
      <header className="header">
        <Navigation/>
      </header>
      <section className="font-sans w-screen h-[90%] mx-auto mb-auto px-2 min-[320px]:px-6 py-5 dark:bg-neutral-900 sm:max-w-2xl md:max-w-2xl lg:max-w-4xl xl:max-w-6xl">
       <Outlet />
      </section>
      <Footer />
    </div>
  )
}

export default App
