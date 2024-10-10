import { api } from '@/lib/axios'
import { User } from '@/store/slices/appUsersSlice'
import axios from 'axios'

interface CreateUserSuccess extends User {
	id: number
}

interface UpdateUserSuccess {
	id: number
	email: string
	name: string
	role: string[]
}

interface DeleteUserSuccess {
	success: boolean
}

type ListUsersSuccess = User[]

interface ListUsersQuery {
	customerName?: string
	status?: string
}

interface GetUserSuccess {
	user: User
}

interface SelfUpdateUserSuccess {
	success: true
}

interface ServiceError {
	message: string
}

type CreateUserResponse = CreateUserSuccess | ServiceError

type UpdateUserResponse = UpdateUserSuccess | ServiceError
type DeleteUserResponse = DeleteUserSuccess | ServiceError
type ListUsersResponse = ListUsersSuccess | ServiceError
type GetUserResponse = GetUserSuccess | ServiceError
type SelfUpdateUserResponse = SelfUpdateUserSuccess | ServiceError

const appUsersService = {
	createUser: async (data: {
		name: string
		email: string
		password: string
		role: string[]
	}): Promise<CreateUserResponse> => {
		try {
			const response = await api.post('/users', data)
			return response.data as CreateUserSuccess
		} catch (error) {
			if (axios.isAxiosError(error) && error.response) {
				return {
					message: error.response.data.message || 'Unknown error occurred',
				} as ServiceError
			}
			return { message: 'Network or server error' } as ServiceError
		}
	},

	getUser: async (): Promise<GetUserResponse> => {
		try {
			const response = await api.get('/users/me')
			return response.data as GetUserSuccess
		} catch (error) {
			if (axios.isAxiosError(error) && error.response) {
				return {
					message: error.response.data.message || 'Unknown error occurred',
				} as ServiceError
			}
			return { message: 'Network or server error' } as ServiceError
		}
	},

	updateUser: async (
		id: number,
		data: {
			name?: string
			email?: string
			role?: string[]
		},
	): Promise<UpdateUserResponse> => {
		try {
			const response = await api.put(`/users/${id}`, data)
			return response.data as UpdateUserSuccess
		} catch (error) {
			if (axios.isAxiosError(error) && error.response) {
				return {
					message: error.response.data.message || 'Unknown error occurred',
				} as ServiceError
			}
			return { message: 'Network or server error' } as ServiceError
		}
	},

	deleteUser: async (id: number): Promise<DeleteUserResponse> => {
		try {
			const response = await api.delete(`/users/${id}`)
			if (response.status === 204) {
				return {
					success: true,
				} as DeleteUserSuccess
			}
			return { message: 'Unknown error occurred' } as ServiceError
		} catch (error) {
			if (axios.isAxiosError(error) && error.response) {
				return {
					message: error.response.data.message || 'Unknown error occurred',
				} as ServiceError
			}
			return { message: 'Network or server error' } as ServiceError
		}
	},

	listUsers: async ({
		customerName,
		status,
	}: ListUsersQuery): Promise<ListUsersResponse> => {
		try {
			const searchParams = new URLSearchParams()

			if (customerName) {
				searchParams.append('customerName', customerName)
			}
			if (status) {
				searchParams.append('status', status)
			}

			const response = await api.get(`/users?${searchParams.toString()}`)

			return response.data as ListUsersSuccess
		} catch (error) {
			if (axios.isAxiosError(error) && error.response) {
				return {
					message: error.response.data.message || 'Unknown error occurred',
				} as ServiceError
			}
			return { message: 'Network or server error' } as ServiceError
		}
	},

	resetPassword: async (id: number): Promise<DeleteUserResponse> => {
		try {
			const response = await api.patch(`/users/resetPassword/${id}`)

			if (response.status === 204) {
				return { success: true }
			}

			return { message: 'Unknown error occurred' } as ServiceError
		} catch (error) {
			if (axios.isAxiosError(error) && error.response) {
				return {
					message: error.response.data.message || 'Unknown error occurred',
				} as ServiceError
			}
			return { message: 'Network or server error' } as ServiceError
		}
	},

	selfUpdateAccount: async (data: {
		name?: string
		email?: string
	}): Promise<SelfUpdateUserResponse> => {
		try {
			const response = await api.put<SelfUpdateUserResponse>(
				'users/me/email-and-name',
				data,
			)
			if (response.status === 204) {
				return { success: true }
			}

			throw new Error('Error trying to update user')
		} catch (error) {
			if (axios.isAxiosError(error) && error.response) {
				return error.response.data
			}
			throw new Error('Error trying to update user')
		}
	},

	selfUpdatePassword: async (data: {
		oldPassword: string
		newPassword: string
	}): Promise<SelfUpdateUserResponse> => {
		try {
			const response = await api.put('/users/me/password', data)

			if (response.status === 200) {
				return { success: true }
			}

			throw new Error('Error trying to update password')
		} catch (error) {
			if (axios.isAxiosError(error) && error.response) {
				if (error.response.status === 400) {
					return {
						message: error.response.data.error || 'old password is incorrect',
					}
				}
			}
			throw new Error('Error trying to update password')
		}
	},
}
export default appUsersService
