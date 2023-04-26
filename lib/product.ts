import axios from "axios"
import { ApiError, CMS_URL } from "./api"

export interface Product {
	id: number
	title: string
	description: string
	price: string
	pictureUrl: string
}

function stripProduct(product: any): Product {
	return {
		id: product.id,
		title: product.title,
		description: product.description,
		price: "$" + parseInt(product.price).toFixed(2),
		pictureUrl: `${CMS_URL}` + product.picture.url,
	}
}

export async function getProducts(): Promise<Product[]> {
	const response = await axios.get(`${CMS_URL}/products`).catch(err => {
		throw new ApiError(CMS_URL, err.response.status)
	})

	return response.data.map(stripProduct)
}

export async function getProduct(id: string): Promise<Product> {
	const response = await axios.get(`${CMS_URL}/products/${id}`).catch(err => {
		throw new ApiError(CMS_URL, err.response.status)
	})
	return stripProduct(response.data)
}
