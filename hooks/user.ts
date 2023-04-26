import { User } from "@/lib/user"
import axios from "axios"
import { useMutation, useQuery, useQueryClient } from "react-query"

interface SignInVariables {
	email: string
	password: string
}

interface UseSignInResult {
	signIn: (email: string, password: string) => Promise<boolean>
	signInError: boolean
	signInLoading: boolean
}

const useSignIn = (): UseSignInResult => {
	const queryClient = useQueryClient()

	const mutation = useMutation<User, Error, SignInVariables>(
		async ({ email, password }) => {
			const response = await axios.post(`/api/login`, {
				email,
				password,
			})

			return response.data
		}
	)

	return {
		signIn: async (email: string, password: string) => {
			try {
				const user = await mutation.mutateAsync({ email, password })
				queryClient.setQueryData("user", user)
				return true
			} catch (err) {
				return false
			}
		},
		signInError: mutation.isError,
		signInLoading: mutation.isLoading,
	}
}

const useSignOut = (): (() => Promise<void>) => {
	const queryClient = useQueryClient()
	const mutation = useMutation(() => axios.post("/api/logout"))

	return async () => {
		await mutation.mutateAsync()
		queryClient.setQueryData("user", undefined)
	}
}

const useUser = (): User => {
	const query = useQuery<User>(
		"user",
		async () => {
			try {
				const resp = await axios.get("/api/user")
				return resp.data
			} catch (err) {
				return undefined
			}
		},
		{
			cacheTime: Infinity,
			staleTime: 30_000, //ms
		}
	)

	return query.data
}

export { useUser, useSignIn, useSignOut }
