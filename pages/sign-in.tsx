import Button from "@/components/Button"
import Field from "@/components/Field"
import Input from "@/components/Input"
import Page from "@/components/Page"
import { useSignIn } from "@/hooks/user"
import { useRouter } from "next/router"
import { FormEventHandler, useState } from "react"
import { useMutation, useQueryClient } from "react-query"

const SignIn: React.FC = () => {
	const router = useRouter()
	const [email, setEmail] = useState("")
	const [password, setPassword] = useState("")
	const { signIn, signInError, signInLoading } = useSignIn()

	const handleSubmit: FormEventHandler<HTMLFormElement> = async event => {
		event.preventDefault()

		const resp = await signIn(email, password)

		if (resp) router.push("/")
	}

	return (
		<Page title="Sign In">
			<form onSubmit={handleSubmit}>
				<Field label="Email">
					<Input
						type="email"
						required
						onChange={event => setEmail(event.target.value)}
					/>
				</Field>
				<Field label="Password">
					<Input
						type="password"
						required
						onChange={event => setPassword(event.target.value)}
					/>
				</Field>
				{signInError && <p className="text-red-700">Invalid credentials!</p>}
				{signInLoading ? (
					<p>Loading...</p>
				) : (
					<Button type="submit">Sign in</Button>
				)}
			</form>
		</Page>
	)
}

export default SignIn
