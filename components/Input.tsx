import { InputHTMLAttributes } from "react"

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {}

const Input: React.FC<InputProps> = props => {
	return <input {...props} className="py-1 px-3 border rounded w-80"></input>
}

export default Input
