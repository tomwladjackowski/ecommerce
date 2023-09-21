import Link from "next/link"

export default function MobileNav({handleHamburgerClick}) {
  return (
  <div className="fixed md:hidden z-10 top-0 left-0 min-h-screen w-full bg-white shadow-lg">
    <svg
      onClick={handleHamburgerClick}
      className='absolute cursor-pointer md:hidden top-6 left-6'
      width='14'
      height='15'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        d='m11.596.782 2.122 2.122L9.12 7.499l4.597 4.597-2.122 2.122L7 9.62l-4.595 4.597-2.122-2.122L4.878 7.5.282 2.904 2.404.782l4.595 4.596L11.596.782Z'
        fill='#69707D'
        fillRule='evenodd'
      />
    </svg>
    <nav className="relative top-16 left-6">
      <ul className="flex flex-col md:hidden gap-5 text-veryDarkBlue font-bold">
        <li><Link href="/">Home</Link></li>
        <li><Link href="/shop">Shop</Link></li>
        <li><Link href="/about">About</Link></li>
        <li><Link href="/contact">Contact</Link></li>
      </ul>
    </nav>
  </div>
  )
}