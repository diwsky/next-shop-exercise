import { GetStaticPaths, GetStaticProps } from "next"
import { Product, getProducts, getProduct } from "@/lib/product"
import { ParsedUrlQuery } from "querystring"
import { ApiError } from "@/lib/api"
import Image from "next/image"
import Page from "@/components/Page"
import { useUser } from "@/hooks/user"
import AddToCart from "@/components/AddToCart"

interface ProductPageParams extends ParsedUrlQuery {
	id: string
}

interface ProductPageProps {
	product: Product
}

export const getStaticPaths: GetStaticPaths<ProductPageParams> = async () => {
	const products = await getProducts()

	return {
		paths: products.map(product => {
			return {
				params: {
					id: product.id.toString(),
				},
			}
		}),
		fallback: "blocking",
	}
}

export const getStaticProps: GetStaticProps<
	ProductPageProps,
	ProductPageParams
> = async ({ params: { id } }) => {
	try {
		const product = await getProduct(id)
		return {
			props: { product },
			revalidate: 30,
		}
	} catch (err) {
		if (err instanceof ApiError && err.status === 404) {
			return { notFound: true }
		}
		throw err
	}
}

const ProductPage: React.FC<ProductPageProps> = ({ product }) => {
	const user = useUser()

	return (
		<Page title={product.title}>
			<div className="flex flex-col lg:flex-row">
				<div>
					<Image src={product.pictureUrl} alt="" width={640} height={480} />
				</div>

				<div className="flex-1 lg:ml-4">
					<p className="text-sm">{product.description}</p>
					<p className="text-lg mt-2 font-bold">{product.price}</p>
					{user && <AddToCart productId={product.id} />}
				</div>
			</div>
		</Page>
	)
}

export default ProductPage
