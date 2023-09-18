import Image from "next/image"
import Script from 'next/script'

export default function Cart ({cart, setCart}) {

  return (
    <>
      <Script src='https://js.stripe.com/v3/' />
        <div className='mt-20 sm:mx-auto max-w-4xl mx-10 border-2 border-black'>
          <h3 className='py-2 font-extrabold text-2xl text-center'>
            Your cart
          </h3>
          {cart.map((item, index) => (
            <div key={index} className='px-4 py-2 border-y border-black flex'>
              <div className='block mt-2'>
                <Image
                  src={`/` + item.product.image}
                  width={'50'}
                  height={'50'}
                  className=''
									alt={item.product.title}
                />
              </div>
              <div className='mt-5 pl-4'>
                <span className='font-bold'>{item.product.title}</span> -
                quantity: {item.quantity}
              </div>
            </div>
          ))}{' '}
            <button
              className='mx-auto bg-black text-white px-3 py-1 my-4 text-xl font-bold justify-center flex'
              onClick={async () => {
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
              }}
            >
              Go to checkout
            </button>
            <button
              className='mx-auto bg-black text-white px-3 py-1 my-4 text-sm justify-center flex'
              onClick={() => setCart([])}
            >
              Clear cart
            </button>
          </div>
    </>
  )
}