import Image from "next/image"
import { useState } from "react"

export default function Lightbox ({activeImage, images, toggleLightBox}) {
  const [lightboxImage, setLightboxImage] = useState(activeImage)
  const indexOfActiveImage = images.findIndex((image) => image === lightboxImage)

  const handlePrevImage = () => {
    if (indexOfActiveImage > 0) {
      setLightboxImage(images[indexOfActiveImage - 1])
    }
  }
  const handleNextImage = () => {
    if (indexOfActiveImage < (images.length -1)) {
      setLightboxImage(images[indexOfActiveImage + 1])
    }
  }

  return (
    <div className="hidden md:absolute md:grid md:justify-items-center md:top-0 md:left-0 md:h-full md:w-full md:bg-black/75">
      <div className="relative grid justify-items-center content-center gap-4 md:w-1/2">
        <div className="w-full">
          <button onClick={toggleLightBox} className="float-right">
            <Image src={"/icon-close.svg"} width={'28'} height={'30'} alt={"icon-close"} className="hover:text-customOrange"/>
          </button>
        </div>
        <div
          onClick={handlePrevImage}
          className='bg-white w-6 h-6 p-6 cursor-pointer rounded-[50%] inline-flex items-center justify-center flex-auto text-center absolute top-[50%] -translate-y-16 -left-6 hover:text-customOrange'
        >
          <svg
            className='flex-shrink-0 flex-grow '
            width='12'
            height='18'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              d='M11 1 3 9l8 8'
              stroke='currentColor'
              strokeWidth='3'
              fill='none'
              fillRule='evenodd'
            />
          </svg>
        </div>
        <Image src={`/` + lightboxImage.path} width={'800'} height={'800'} alt={lightboxImage.path} className="rounded-xl mb-4"/>
        <div
          onClick={handleNextImage}
          className='bg-white w-6 h-6 p-6 cursor-pointer rounded-[50%] inline-flex items-center justify-center flex-auto text-center absolute top-[50%] -translate-y-16 -right-6 hover:text-customOrange'
        >
          <svg
            className='flex-shrink-0 flex-grow'
            width='13'
            height='18'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              d='m2 1 8 8-8 8'
              stroke='currentColor'
              strokeWidth='3'
              fill='none'
              fillRule='evenodd'
            />
          </svg>
        </div>
        <div className='grid grid-cols-4 gap-8 w-10/12'>
          <div onClick={() => {setLightboxImage(images[0])}}>
            <Image src={`/` + images[0].path} width={'600'} height={'600'} alt={images[0].path} className='rounded-lg hover:opacity-50 active:border-2'/>
          </div>
          <div onClick={() => {setLightboxImage(images[1])}}>
            <Image src={`/` + images[1].path} width={'600'} height={'600'} alt={images[1].path} className='rounded-lg hover:opacity-50 active:border-2'/>
          </div>
          <div onClick={() => {setLightboxImage(images[2])}}>
            <Image src={`/` + images[2].path} width={'600'} height={'600'} alt={images[2].path} className='rounded-lg hover:opacity-50 outline hover:outline-2 hover:outline-customOrange active:border-2'/>
          </div>
          <div onClick={() => {setLightboxImage(images[3])}}>
            <Image src={`/` + images[3].path} width={'600'} height={'600'} alt={images[3].path} className='rounded-lg hover:opacity-50 active:border-2'/>
          </div>
        </div>
      </div>
    </div>
  )
}