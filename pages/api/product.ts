import { NextApiHandler } from "next"
import { Product, getProducts } from "../../lib/product"

const handler: NextApiHandler<Product[]> = async (req, res) => {
	const products = await getProducts()
	res.status(200).json(products)
}

export default handler
