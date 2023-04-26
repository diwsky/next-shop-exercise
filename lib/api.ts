export const CMS_URL = process.env.CMS_URL

export class ApiError extends Error {
	constructor(url: string, public status: number) {
		super(`'${url}' returned ${status}`)

		if (Error.captureStackTrace) {
			Error.captureStackTrace(this, ApiError)
		}

		this.name = "ApiError"
	}
}
