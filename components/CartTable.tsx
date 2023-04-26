import { Cart } from "@/lib/cart"

interface CartProps {
	carts: Cart[]
}

interface FinalCart {
	items: (Cart & { total: number })[]
	total: number
}

const buildCart = (carts: Cart[]): FinalCart => {
	const items = carts.map(eachCart => {
		return { ...eachCart, total: eachCart.quantity * eachCart.product.price }
	})

	const total = items.reduce((prev, curr) => prev + curr.total, 0)

	return { items, total }
}

const formatCurrency = (input: number): string => `$${input.toFixed(2)}`

const CartTable: React.FC<CartProps> = ({ carts }) => {
	const finalCart = buildCart(carts)

	return (
		<table>
			<thead>
				<tr>
					<th className="px-4 py-2">Product</th>
					<th className="px-4 py-2 text-right">Price</th>
					<th className="px-4 py-2 text-right">Quantity</th>
					<th className="px-4 py-2 text-right">Total</th>
				</tr>
			</thead>
			<tbody>
				{finalCart.items.map(cart => {
					return (
						<tr key={cart.id}>
							<td>{cart.product.title}</td>
							<td className="px-4 py-2 text-right">
								{formatCurrency(cart.product.price)}
							</td>
							<td className="px-4 py-2 text-right">{cart.quantity}</td>
							<td className="px-4 py-2 text-right">
								{formatCurrency(cart.total)}
							</td>
						</tr>
					)
				})}
			</tbody>
			<tfoot>
				<tr>
					<th></th>
					<th></th>

					<th className="text-right">Grand Total</th>

					<th className="font-extrabold">{formatCurrency(finalCart.total)}</th>
				</tr>
			</tfoot>
		</table>
	)
}

export default CartTable
