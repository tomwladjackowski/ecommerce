import { useState } from 'react'
import Image from 'next/image'
import Lightbox from '@/components/Lightbox'

export default function Product ({product, cart, setCart}) {
  const [activeImage, setActiveImage] = useState(product.images[0])
  const [showLightBox, setShowLightBox] = useState(false)
  const [productQuantity, setProductQuantity] = useState(1)
  const images = product.images
  const indexOfActiveImage = images.findIndex((image) => image === activeImage)

  const toggleLightBox = () => {
    setShowLightBox(!showLightBox)
  }
  const handlePrevImage = () => {
    if (indexOfActiveImage > 0) {
      setActiveImage(images[indexOfActiveImage - 1])
    }
  }
  const handleNextImage = () => {
    if (indexOfActiveImage < (images.length -1)) {
      setActiveImage(images[indexOfActiveImage + 1])
    }
  }

  return (
    <div className=''>
      {showLightBox ? <Lightbox activeImage={activeImage} images={images} toggleLightBox={toggleLightBox} /> : null}
      <div className='mb-4 grid sm:grid-cols-2 sm:justify-center md:gap-10'>
        <div>
          <div className='grid relative sm:static sm:mx-4 gap-4'>
            <div onClick={toggleLightBox}>
              <div
                onClick={(handlePrevImage)}
                className='sm:hidden bg-white w-6 h-6 p-6 cursor-pointer rounded-[50%] inline-flex items-center justify-center flex-auto text-center absolute top-[50%] inset-y-0 left-2 hover:text-customOrange'
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
              <Image src={`/` + activeImage.path} width={'600'} height={'600'} className='md:rounded-xl cursor-not-allowed hover:cursor-pointer'/>
              <div
                onClick={handleNextImage}
                className='sm:hidden bg-white w-6 h-6 p-6 cursor-pointer rounded-[50%] inline-flex items-center justify-center flex-auto text-center absolute top-[50%] inset-y-0 right-2 hover:text-customOrange'
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
            </div>
            <div className='hidden md:grid md:grid-cols-4 md:gap-4'>
              <div onClick={() => {setActiveImage(product.images[0])}}>
                <Image src={`/` + product.images[0].path} width={'600'} height={'600'} className='rounded-lg cursor-pointer hover:opacity-50 active:border-2'/>
              </div>
              <div onClick={() => {setActiveImage(product.images[1])}}>
                <Image src={`/` + product.images[1].path} width={'600'} height={'600'} className='rounded-lg cursor-pointer hover:opacity-50 active:border-2'/>
              </div>
              <div onClick={() => {setActiveImage(product.images[2])}}>
                <Image src={`/` + product.images[2].path} width={'600'} height={'600'} className='rounded-lg cursor-pointer hover:opacity-50 active:border-2'/>
              </div>
              <div onClick={() => {setActiveImage(product.images[3])}}>
                <Image src={`/` + product.images[3].path} width={'600'} height={'600'} className='rounded-lg cursor-pointer hover:opacity-50 active:border-2'/>
              </div>
            </div>
          </div>
        </div>
        <div className='m-6 mb-20'>
          <h2 className='text-3xl mb-4 font-bold md:p-4 md:text-4xl'>{product.title}</h2>
          <p className='text-xl mb-4 md:p-4 text-darkGrayishBlue'>{product.description}</p>
          <h3 className='text-2xl font-extrabold mb-4 md:p-4'>
            ${product.price / 100}
          </h3>
          <div className='sm:flex sm:flex-row'>
            <div className='flex justify-around basis-[8rem] flex-shrink-0 bg-lightGrayishBlue items-center p-4 rounded-xl sm:mr-2'>
              <button
                className='w-4 h-4 mr-auto ml-2 cursor-pointer flex-shrink-0 flex justify-center items-center hover:opacity-60'
                onClick={() => {
                  if (productQuantity <= 1) {
                    return null
                  }
                  setProductQuantity(productQuantity - 1)
                }}
              >
                <svg width="12" height="4" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
                  <defs>
                    <path d="M11.357 3.332A.641.641 0 0 0 12 2.69V.643A.641.641 0 0 0 11.357 0H.643A.641.641 0 0 0 0 .643v2.046c0 .357.287.643.643.643h10.714Z" id="a"/>
                  </defs>
                  <use fill="#FF7E1B" fillRule="nonzero" xlinkHref="#a"/>
                </svg>
              </button>
              <span className='font-bold'>{productQuantity}</span>
              <button
                className='w-4 h-4 ml-auto mr-2 cursor-pointer flex-shrink-0 flex justify-center items-center hover:opacity-60'
                onClick={() => {
                  setProductQuantity(productQuantity + 1)
                }}
              >
                <svg width="12" height="12" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
                  <defs>
                    <path d="M12 7.023V4.977a.641.641 0 0 0-.643-.643h-3.69V.643A.641.641 0 0 0 7.022 0H4.977a.641.641 0 0 0-.643.643v3.69H.643A.641.641 0 0 0 0 4.978v2.046c0 .356.287.643.643.643h3.69v3.691c0 .356.288.643.644.643h2.046a.641.641 0 0 0 .643-.643v-3.69h3.691A.641.641 0 0 0 12 7.022Z" id="b"/>
                  </defs>
                  <use fill="#FF7E1B" fillRule="nonzero" xlinkHref="#b"/>
                </svg>
              </button>
            </div>
            <button className='flex justify-center items-center w-full gap-4 p-4 mt-4 md:mt-0 bg-customOrange rounded-xl text-white min-w-max shadow-2xl shadow-customOrange/50 hover:bg-opacity-70'
              onClick={() => {
                const itemsInCartWithThisId = cart.filter((item) => {
                return item.product.id === product.id
                })

              if (itemsInCartWithThisId.length > 0) {
                setCart([
                  ...cart.filter((item) => {
                      return item.product.id !== product.id
                    }),
                    {
                      product: itemsInCartWithThisId[0].product,
                      quantity: itemsInCartWithThisId[0].quantity + productQuantity,
                    },
                  ])
                } else {
                  setCart([...cart, { product, quantity: productQuantity}])
                }
              }}
            >
              <svg width='22' height='20' xmlns='http://www.w3.org/2000/svg'>
                <path
                d='M20.925 3.641H3.863L3.61.816A.896.896 0 0 0 2.717 0H.897a.896.896 0 1 0 0 1.792h1l1.031 11.483c.073.828.52 1.726 1.291 2.336C2.83 17.385 4.099 20 6.359 20c1.875 0 3.197-1.87 2.554-3.642h4.905c-.642 1.77.677 3.642 2.555 3.642a2.72 2.72 0 0 0 2.717-2.717 2.72 2.72 0 0 0-2.717-2.717H6.365c-.681 0-1.274-.41-1.53-1.009l14.321-.842a.896.896 0 0 0 .817-.677l1.821-7.283a.897.897 0 0 0-.87-1.114ZM6.358 18.208a.926.926 0 0 1 0-1.85.926.926 0 0 1 0 1.85Zm10.015 0a.926.926 0 0 1 0-1.85.926.926 0 0 1 0 1.85Zm2.021-7.243-13.8.81-.57-6.341h15.753l-1.383 5.53Z'
                fill='currentColor'
                fillRule='nonzero'
                />
              </svg>
              <span className='font-bold'>Add to Cart</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}