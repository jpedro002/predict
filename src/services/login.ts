import { api } from '@/lib/axios'
import axios from 'axios'

interface LoginSuccess {
	token: string
	user: {
		id: number
		name: string
		email: string
		role: string[]
		status?: boolean
	}
}

interface LoginError {
	message: string
}

type LoginResponse = LoginSuccess | LoginError

export const login = async (data: {
	email: string
	password: string
}): Promise<LoginResponse> => {
	try {
		const response = await api.post('/login', data)

		if (response.data) {
			return response.data as LoginSuccess
		}

		throw new Error('Login failed')
	} catch (error) {
		if (axios.isAxiosError(error) && error.response) {
			return {
				message: error.response.data.message || 'Unknown error occurred',
			} as LoginError
		}

		return {
			message: 'Network or server error',
		} as LoginError
	}
}
