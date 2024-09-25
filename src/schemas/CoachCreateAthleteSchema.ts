import { z } from 'zod'

const coachRegisterAthleteSchema = z
	.object({
		name: z.string().min(1, 'Nome é obrigatório'),
		email: z.string().email('Formato de e-mail inválido'),
		password: z.string().min(6, 'Senha deve ter no mínimo 6 caracteres'),
		retypePassword: z.string().min(6, 'Senhas devem coincidir'),
	})
	.refine((data) => data.password === data.retypePassword, {
		message: 'As senhas não coincidem',
		path: ['retypePassword'],
	})

type CoachRegisterAthleteSchema = z.infer<typeof coachRegisterAthleteSchema>

export { coachRegisterAthleteSchema, type CoachRegisterAthleteSchema }
