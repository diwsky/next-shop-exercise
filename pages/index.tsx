import { Inter } from "next/font/google"
import React, { useEffect, useState } from "react"
import axios from "axios"
import { Product } from "@/lib/product"
import ProductCard from "@/components/ProductCard"
import Title from "@/components/Title"
import Page from "@/components/Page"

const inter = Inter({ subsets: ["latin"] })

interface HomePageProps {
	products: Product[]
}

const HomePage: React.FC<HomePageProps> = () => {
	const [products, setProducts] = useState([])

	useEffect(() => {
		axios.get(`/api/product`).then(res => {
			const products = res.data
			setProducts(products)
		})
	}, [])

	return (
		<Page title="Indoor Plants">
			<ul className="grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 gap-4">
				{products.map(product => {
					return (
						<li key={product.id}>
							<ProductCard product={product}></ProductCard>
						</li>
					)
				})}
			</ul>
		</Page>
	)
}

export default HomePage
