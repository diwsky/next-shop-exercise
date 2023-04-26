import { AppProps } from "next/app"
import React from "react"
import "@/styles/globals.css"
import { QueryClient, QueryClientProvider } from "react-query"

const App: React.FC<AppProps> = ({ Component, pageProps }) => {
	const queryClient = new QueryClient()

	return (
		<QueryClientProvider client={queryClient}>
			<Component {...pageProps} />
		</QueryClientProvider>
	)
}

export default App
