export const getProducts = async (prisma) => {
  const products = await prisma.product.findMany({})

  return products
}

export const getImages = async (prisma, id) => {
  const imagesForProduct = await prisma.image.findMany({
    where: {
      productId: id
    }
  })
  return imagesForProduct
}