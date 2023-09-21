import Head from 'next/head'
// import prisma from 'lib/prisma'
// import { getProducts, getImages } from 'lib/data.js'
import { useState, useEffect } from 'react'
import * as localForage from 'localforage'
import Script from 'next/script'
import Navbar from '@/components/Navbar'
// import Product from '@/components/Product'
import Cart from '@/components/Cart'

export default function Home({ products, productsWithImages }) {
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
      <Head>
        <title>Sneakers Shop</title>
        <meta name='description' content='Shop' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <Navbar showCart={showCart} setShowCart={setShowCart} cart={cart} />
      <div className=''>
        {showCart ? (
          <Cart cart={cart} setCart={setCart} />
          ) : (
            null
          )   
        }
      </div>
    </div>
  )
}

// // export async function getServerSideProps(context) {
// //   const products = await getProducts(prisma)
// //   const productsWithImages = await Promise.all(products.map(async (product) => {
// //     const images = await getImages(prisma, product.id)
// //     return {...product, images}
// //   }))

// //   return {
// //     props: {
// //       products,
// //       productsWithImages,
// //     },
// //   }
// }