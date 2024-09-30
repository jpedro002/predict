import { z } from 'zod'

// Base Athlete Schema
const baseAthleteSchema = z.object({
	name: z.string().min(1, 'Nome é obrigatório'),
	email: z.string().email('Formato de e-mail inválido'),
})

type BaseAthleteSchema = z.infer<typeof baseAthleteSchema>

const coachRegisterAthleteSchema = baseAthleteSchema
	.extend({
		password: z.string().min(6, 'Senha deve ter no mínimo 6 caracteres'),
		retypePassword: z.string().min(6, 'Senhas devem coincidir'),
	})
	.refine((data) => data.password === data.retypePassword, {
		message: 'As senhas não coincidem',
		path: ['retypePassword'],
	})

type CoachRegisterAthleteSchema = z.infer<typeof coachRegisterAthleteSchema>

const updateAthleteSchema = baseAthleteSchema.partial()

type UpdateAthleteSchema = z.infer<typeof updateAthleteSchema>

export {
	baseAthleteSchema,
	coachRegisterAthleteSchema,
	updateAthleteSchema,
	type BaseAthleteSchema,
	type CoachRegisterAthleteSchema,
	type UpdateAthleteSchema,
}
