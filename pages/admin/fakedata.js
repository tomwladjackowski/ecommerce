export default function FakeDataGenerator () {
  return(
    <>
      <button
        onClick={
          async () => {
            await fetch('https://fakestoreapi.com/products')
              .then(res => res.json)
              .then(json => console.log(json))
          }
        }
      >Fetch Product API Data</button>
    </>
  )
}