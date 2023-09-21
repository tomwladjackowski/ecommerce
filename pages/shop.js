import prisma from 'lib/prisma'
import { getProducts, getImages } from 'lib/data.js'
import { useState, useEffect } from 'react'
import * as localForage from 'localforage'
import Script from 'next/script'
import Navbar from '@/components/Navbar'
import Product from '@/components/Product'
import Cart from '@/components/Cart'

export default function Shop ({productsWithImages}) {
  const [cart, setCart] = useState([])
  const [showCart, setShowCart] = useState(false)


  useEffect(() => {
    localForage.getItem('cart', function (err, value) {
      if (value) {
        setCart(value)
      }
    })
  }, [])

  useEffect(() => {
    localForage.setItem('cart', cart)
  }, [cart])


  return (
    <div>
      <Script src='https://js.stripe.com/v3/' />
      <Navbar showCart={showCart} setShowCart={setShowCart} cart={cart} />
      <div className=''>
        {showCart ? (
          <Cart cart={cart} setCart={setCart} />
          ) : (
            null
          )   
        }
        <div className='sm:mx-auto sm:mt-10 max-w-5xl'>
          {productsWithImages.map((product) => (
            <Product product={product} cart={cart} setCart={setCart} key={product.title} />
          ))}
        </div>
      </div>
    </div>
  )
}

export async function getServerSideProps(context) {
  const products = await getProducts(prisma)
  const productsWithImages = await Promise.all(products.map(async (product) => {
    const images = await getImages(prisma, product.id)
    return {...product, images}
  }))

  return {
    props: {
      productsWithImages,
    },
  }
}