import Head from "next/head"
import Title from "./Title"
import { PropsWithChildren } from "react"
import NavBar from "./NavBar"

interface PageProps extends PropsWithChildren {
	title: string
}

const Page: React.FC<PageProps> = ({ title, children }) => {
	return (
		<>
			<Head>
				<title>{title} - Next Shop</title>
			</Head>
			<header>
				<NavBar />
			</header>
			<main className="px-6 py-4">
				<Title>{title}</Title>
				{children}
			</main>
		</>
	)
}

export default Page
