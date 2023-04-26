import { CMS_URL } from "@/lib/api"
import { User } from "@/lib/user"
import axios from "axios"
import { NextApiHandler } from "next"

const handleUser: NextApiHandler<User> = async (req, res) => {
	const { jwt } = req.cookies

	if (!jwt) {
		res.status(401).end()
	}

	try {
		const resp = await axios.get(`${CMS_URL}/users/me`, {
			headers: {
				Authorization: `Bearer ${jwt}`,
			},
		})

		const user = resp.data

		res.status(200).json({
			id: user.id,
			name: user.username,
		})
	} catch (err) {
		res.status(401).end()
	}
}

export default handleUser
