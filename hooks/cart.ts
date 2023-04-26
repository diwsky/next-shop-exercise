import { Cart } from "@/lib/cart"
import { Product } from "@/lib/product"
import axios from "axios"
import { useMutation, useQuery } from "react-query"

const CART_QUERY_KEY = "cart"

interface UseAddToCartResult {
	addToCart: (productId: number, quantity: number) => Promise<void>
	addError: boolean
	addLoading: boolean
}

interface AddToCartVariables {
	productId: number
	quantity: number
}

const useCart = (): Cart[] => {
	const query = useQuery(CART_QUERY_KEY, async () => {
		try {
			const resp = await axios.get<Cart[]>("/api/cart")
			return resp.data
		} catch (err) {
			return undefined
		}
	})

	return query.data
}

const useAddToCart = (): UseAddToCartResult => {
	const mutation = useMutation<undefined, Error, AddToCartVariables>(
		async ({ productId, quantity }) => {
			await axios.post("/api/cart", {
				productId,
				quantity,
			})
		}
	)

	return {
		addToCart: async (productId: number, quantity: number) => {
			await mutation.mutateAsync({ productId, quantity })
		},
		addError: mutation.isError,
		addLoading: mutation.isLoading,
	}
}

export { useCart, useAddToCart }
