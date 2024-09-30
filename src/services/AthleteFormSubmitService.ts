import { api } from '@/lib/axios'
import { athleteFormType } from '@/schemas/AthleteFormSchema'
import axios from 'axios'

interface SubmitAthleteFormSuccess {
	success: boolean
}

interface SubmitAthleteFormError {
	message: string
}

type SubmitAthleteFormResponse =
	| SubmitAthleteFormSuccess
	| SubmitAthleteFormError

export const AthleteFormSubmitService = async (
	data: athleteFormType,
): Promise<SubmitAthleteFormResponse> => {
	try {
		const response = await api.post('/submit-athlete-form', data)

		console.log(response, 'response', response.status, 'response.status')

		if (response.status === 204) {
			return {
				success: true,
			} as SubmitAthleteFormSuccess
		}

		throw new Error('Submit failed')
	} catch (error) {
		if (axios.isAxiosError(error) && error.response) {
			return {
				message: error.response.data.message || 'Unknown error occurred',
			} as SubmitAthleteFormError
		}

		return {
			message: 'Network or server error',
		} as SubmitAthleteFormError
	}
}
