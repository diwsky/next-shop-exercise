import axios from "axios"
import cookie from "cookie"
import { CMS_URL } from "../../lib/api"
import { NextApiHandler } from "next"
import { User } from "@/lib/user"

const handler: NextApiHandler<User> = async (req, res) => {
	if (req.method !== "POST") {
		res.status(405).end()
		return
	}

	const { email, password } = req.body

	console.log("body: ", email, password)
	try {
		const response = await axios.post(
			`${CMS_URL}/auth/local`,
			{
				identifier: email,
				password,
			},
			{
				headers: {
					"Content-Type": "application/json",
				},
			}
		)
		const { jwt, user } = response.data

		res
			.status(200)
			.setHeader(
				"Set-Cookie",
				cookie.serialize("jwt", jwt, {
					path: "/api",
					httpOnly: true,
				})
			)
			.json({
				id: user.id,
				name: user.username,
			})
	} catch (err) {
		console.log(err)
		res.status(401).end()
	}
}

export default handler
