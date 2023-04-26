import { MouseEventHandler, useState } from "react"
import Button from "./Button"
import Input from "./Input"
import axios from "axios"
import { useAddToCart } from "@/hooks/cart"
import { useRouter } from "next/router"

interface AddToCartProps {
	productId: number
}

const AddToCart: React.FC<AddToCartProps> = ({ productId }) => {
	const [quantity, setQuantity] = useState(1)

	const { addToCart, addLoading } = useAddToCart()

	const router = useRouter()

	const handleClick = async () => {
		await addToCart(productId, quantity)

		router.push("/cart")
	}

	return (
		<div className="py-2">
			<input
				type="number"
				min={1}
				className="border rounded px-3 py-1 w-16 text-right"
				value={quantity.toString()}
				onChange={event => setQuantity(parseInt(event.target.value))}
			/>
			{addLoading ? (
				<p>Loading...</p>
			) : (
				<Button onClick={handleClick}>Add To Cart</Button>
			)}
		</div>
	)
}

export default AddToCart
