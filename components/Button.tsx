import { ButtonHTMLAttributes } from "react"

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {}

const Button: React.FC<ButtonProps> = ({ children, ...props }) => {
	return (
		<button
			{...props}
			className="bg-green-800 text-white hover:bg-green-600 py-2 px-4 my-2 rounded"
		>
			{children}
		</button>
	)
}

export default Button
