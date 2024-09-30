import { api } from '@/lib/axios'
import { User } from '@/store/slices/appUsersSlice'
import axios from 'axios'

// Interfaces para os dados de sucesso ou erro

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

interface GetUserSuccess {
	user: User
}

// Tipagem de possíveis erros
interface ServiceError {
	message: string
}

// Tipos de resposta para cada operação
type CreateUserResponse = CreateUserSuccess | ServiceError

type UpdateUserResponse = UpdateUserSuccess | ServiceError
type DeleteUserResponse = DeleteUserSuccess | ServiceError
type ListUsersResponse = ListUsersSuccess | ServiceError
type GetUserResponse = GetUserSuccess | ServiceError

// Services estruturados
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

	// Obtém o usuário logado
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

	// Atualiza os dados de um usuário específico
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

	// Deleta um usuário pelo ID
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

	listUsers: async (): Promise<ListUsersResponse> => {
		try {
			const response = await api.get('/users')

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
}

export default appUsersService
