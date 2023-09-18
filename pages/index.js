import Head from 'next/head'

import prisma from 'lib/prisma'
import { getProducts, getImages } from 'lib/data.js'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import * as localForage from 'localforage'
import Script from 'next/script'
import Navbar from '@/components/Navbar'
import Product from '@/components/Product'
import Cart from '@/components/Cart'

export default function Home({ products, productsWithImages }) {
  const [cart, setCart] = useState([])


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
        <title>Shop</title>
        <meta name='description' content='Shop' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <Navbar />
      <div className=''>
        <h1 className='mt-10 font-extrabold text-4xl text-center'>Shop</h1>
        {cart.length > 0 && (
          <Cart cart={cart} setCart={setCart}/>
        )}
        <div className='mt-20 sm:mx-auto max-w-4xl md:mx-10'>
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
      products,
      productsWithImages,
    },
  }
}