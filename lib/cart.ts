export interface Cart {
	id: number
	product: {
		id: number
		title: string
		price: number
	}
	quantity: number
}
