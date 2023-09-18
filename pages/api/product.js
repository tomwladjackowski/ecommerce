import prisma from 'lib/prisma'
import { authOptions } from 'pages/api/auth/[...nextauth].js'
import { getServerSession } from 'next-auth/next'

export default async function handler(req, res) {
  // if (req.method !== 'POST') {
  //   return res.status(501).end()
  // }
  if (req.method === 'POST') {

    const session = await getServerSession(req, res, authOptions)
    if (!session) return res.status(401).json({ message: 'Not logged in' })

    const user = await prisma.user.findUnique({
      where: {
        id: session.user.id,
      },
    })

    if (!user) return res.status(401).json({ message: 'User not found' })
    if (!user.isAdmin) return res.status(401).json({ message: 'Not authorized' })

    await prisma.product.create({
      data: {
        title: req.body.title,
        price: parseInt(req.body.price) * 100,
        description: req.body.description,
      },
    })

    const productToConnect = await prisma.product.findFirst({
      where: {
        title: req.body.title,
      }
    })

    const imagesArray = req.body.images.split(" ")

    await Promise.all(imagesArray.map(async (image) => {
      const response = await prisma.image.create({
        data: {
          title: image,
          path: image,
          product: {
            connect: {id: productToConnect.id}
          },
        }
      })
    }))
  }

  if (req.method === "DELETE") {

    const session = await getServerSession(req, res, authOptions)
    if (!session) return res.status(401).json({ message: 'Not logged in' })

    const user = await prisma.user.findUnique({
      where: {
        id: session.user.id,
      },
    })

    if (!user) return res.status(401).json({ message: 'User not found' })
    if (!user.isAdmin) return res.status(401).json({ message: 'Not authorized' })

    await prisma.product.delete({
      where: {
        id: req.params.id
      }
    })
  }



  res.end()
}