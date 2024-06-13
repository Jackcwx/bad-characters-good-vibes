import PageTitle from '@/components/PageTitle'
import { Link } from 'react-router-dom'

function Home() {
  return (
    <div className="h-full relative w-full">
      <PageTitle title="Home" />
      <button className="text-9xl px-20 py-12 font-title font-bold hover:scale-105 m-auto bg-green rounded-xl"><Link to='/game'>Play</Link></button>
    </div>
  )
}

export default Home
