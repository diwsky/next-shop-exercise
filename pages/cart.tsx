import CartTable from "@/components/CartTable"
import Page from "@/components/Page"
import { useCart } from "@/hooks/cart"

const Cart: React.FC = () => {
	const carts = useCart()

	return <Page title="Cart">{carts && <CartTable carts={carts} />}</Page>
}

export default Cart
