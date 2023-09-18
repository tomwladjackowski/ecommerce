import { useState } from "react"
import Cart from "./Cart"
import Link from "next/link"
import MobileNav from "./MobileNav"

export default function Navbar () {
  const [showMobileMenu, setShowMobileMenu] = useState(false)

  const handleHamburgerClick = () => {
    setShowMobileMenu(!showMobileMenu)
  }
  return(
    <header className="sticky top-0 bg-white">
      <nav className="hidden md:grid md md:p-4 md:border-b-2 md:max-w-7xl md:mx-auto">
        <ul className="flex justify-around">
          <li><Link href="/">Home</Link></li>
          <li><Link href="/shop">Shop</Link></li>
          <li><Link href="/about">About</Link></li>
          <li><Link href="/contact">Contact</Link></li>
        </ul>
      </nav>
      <div className="flex items-center p-6 gap-4 md:gap-16">
        {showMobileMenu ? (
          <MobileNav handleHamburgerClick={handleHamburgerClick} />
        ) : (
          <svg
            className='cursor-pointer md:hidden'
            onClick={handleHamburgerClick}
            width='16'
            height='15'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              d='M16 12v3H0v-3h16Zm0-6v3H0V6h16Zm0-6v3H0V0h16Z'
              fill={"#69707D"}
              fillRule='evenodd'
            />
          </svg>
        )}
      </div>
      
    </header>
  )
}