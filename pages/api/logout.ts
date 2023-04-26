import { serialize } from "cookie"

import { NextApiHandler } from "next"

const logout: NextApiHandler = (req, res) => {
	res
		.status(200)
		.setHeader(
			"Set-Cookie",
			serialize("jwt", "", {
				path: "/api",
				expires: new Date(0),
			})
		)
		.json({})
}

export default logout
