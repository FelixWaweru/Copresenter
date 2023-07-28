import Image from 'next/image'
import SideBar from './components/SideBar'
import TextView from './components/TextView'

export default function Home() {
  return (
    <div>
      <SideBar>
        <TextView />
      </SideBar>
    </div>
  )
}
