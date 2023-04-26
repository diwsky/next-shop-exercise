import { Product } from "@/lib/product"
import Link from "next/link"
import Image from "next/image"

interface ProductCardProps {
	product: Product
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
	return (
		<div className="border my-4 w-80 shadow hover:shadow-xl">
			<Link href={`/products/${product.id}`}>
				<Image width={320} height={240} src={product.pictureUrl} alt=""></Image>
				<div className="p-2 flex justify-between items-baseline">
					<h2 className="text-lg font-bold">{product.title}</h2>
					<span>{product.price}</span>
				</div>
			</Link>
		</div>
	)
}

export default ProductCard
