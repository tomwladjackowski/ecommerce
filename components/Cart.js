import Image from "next/image"
import Script from 'next/script'

export default function Cart ({cart, setCart}) {

  const handleCheckout = async () => {
    const res = await fetch('/api/stripe/session', {
      body: JSON.stringify({
        cart,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
    })
    const data = await res.json()

    if (data.status === 'error') {
      alert(data.message)
      return
    }

    const sessionId = data.sessionId
    const stripePublicKey = data.stripePublicKey

    const stripe = Stripe(stripePublicKey)
    const { error } = await stripe.redirectToCheckout({
      sessionId,
    })

    setCart([])
  }

  return (
    <>
      <Script src='https://js.stripe.com/v3/' />
      <div className='fixed z-10 right-3 top-24 w-[22rem] border drop-shadow-2xl rounded-xl bg-white flex flex-col'>
        <h3 className='py-4 font-bold text-center border-b border-GrayishBlue'>
          Cart
        </h3>
        {cart.length > 0 ? (
          <div>
            {cart.map((item, index) => (
              <div key={index} className='px-4 py-2 flex items-center'>
                <div className='block mt-2'>
                  <Image
                    src={`/` + item.product.images[0].path}
                    width={'50'}
                    height={'50'}
                    className=''
                    alt={item.product.title}
                  />
                </div>
                <div className='mt-2 pl-4'>
                  <span className='text-darkGrayishBlue'>{item.product.title}</span>
                  <span className='block text-darkGrayishBlue'>{item.quantity} x ${item.product.price/100}</span>
                </div> 
                <div 
                  onClick={() => {
                    const newCart = cart.filter((product) => {product.id !== item.product.id})
                    setCart(newCart)
                  }}
                  className="mt-2 pl-4"
                >
                  <svg width="14" height="16" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
                      <defs>
                        <path d="M0 2.625V1.75C0 1.334.334 1 .75 1h3.5l.294-.584A.741.741 0 0 1 5.213 0h3.571a.75.75 0 0 1 .672.416L9.75 1h3.5c.416 0 .75.334.75.75v.875a.376.376 0 0 1-.375.375H.375A.376.376 0 0 1 0 2.625Zm13 1.75V14.5a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 1 14.5V4.375C1 4.169 1.169 4 1.375 4h11.25c.206 0 .375.169.375.375ZM4.5 6.5c0-.275-.225-.5-.5-.5s-.5.225-.5.5v7c0 .275.225.5.5.5s.5-.225.5-.5v-7Zm3 0c0-.275-.225-.5-.5-.5s-.5.225-.5.5v7c0 .275.225.5.5.5s.5-.225.5-.5v-7Zm3 0c0-.275-.225-.5-.5-.5s-.5.225-.5.5v7c0 .275.225.5.5.5s.5-.225.5-.5v-7Z" id="a"/>
                      </defs>
                      <use fill="#C3CAD9" fill-rule="nonzero" xlinkHref="#a"/>
                  </svg>
                </div>
              </div>
            ))}
              <button
                className='flex justify-center items-center w-[20rem] mx-auto gap-4 p-4 mt-4 bg-customOrange rounded-xl text-white font-bold min-w-max hover:bg-opacity-70'
                onClick={handleCheckout}
              >
                Go to checkout
              </button>
              <button
                className='flex justify-center items-center w-[20rem] mx-auto gap-4 p-4 mt-4 mb-4 bg-customOrange rounded-xl text-white font-bold min-w-max hover:bg-opacity-70'
                onClick={() => setCart([])}
              >
                Clear cart
              </button>
          </div>
        ) : (
          <div className="flex items-center justify-center h-[16rem]">
            <p>Cart is empty</p>
          </div>
        )}
      </div>
    </>
  )
}