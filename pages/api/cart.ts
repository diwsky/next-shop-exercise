import { CMS_URL } from "@/lib/api"
import { Cart } from "@/lib/cart"
import axios from "axios"
import { NextApiHandler } from "next"

const stripCart = (cartItem: any): Cart => {
	return {
		id: cartItem.id,
		product: {
			id: cartItem.product.id,
			title: cartItem.product.title,
			price: cartItem.product.price,
		},
		quantity: cartItem.quantity,
	}
}

const handleGetCart: NextApiHandler<Cart[]> = async (req, res) => {
	const { jwt } = req.cookies

	try {
		const resp = await axios.get<Cart[]>(`${CMS_URL}/cart-items`, {
			headers: {
				Authorization: `Bearer ${jwt}`,
			},
		})

		const cartItems = resp.data

		res.status(200).json(cartItems.map(stripCart))
	} catch (err) {
		res.status(401).end()
	}
}

const handlePostCart: NextApiHandler = async (req, res) => {
	const { jwt } = req.cookies
	const { productId, quantity } = req.body

	try {
		await axios.post(
			`${CMS_URL}/cart-items`,
			{
				product: productId,
				quantity,
			},
			{
				headers: {
					Authorization: `Bearer ${jwt}`,
				},
			}
		)

		res.status(200).json({})
	} catch (err) {
		res.status(401).end()
	}
}

const handler: NextApiHandler<any> = async (req, res) => {
	const { jwt } = req.cookies

	if (!jwt) {
		res.status(401).end()
		return
	}

	switch (req.method) {
		case "GET": {
			return handleGetCart(req, res)
		}
		case "POST": {
			return handlePostCart(req, res)
		}
		default: {
			res.status(405).end()
		}
	}
}

export default handler
