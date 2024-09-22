import { z } from 'zod'

export const athleteFormSchema = z.object({
	// Nível de Estresse
	stressLevel: z.number().min(0).max(10).nonnegative(),
	emotionalStress: z.number().min(0).max(10).nonnegative(),
	physicalImpact: z.number().min(0).max(10).nonnegative(),

	// Qualidade do Sono
	sleepQuality: z.number().min(0).max(10).nonnegative(),
	sleepHours: z.number().min(0).max(10).nonnegative(),
	wakeUpFeeling: z.number().min(0).max(10).nonnegative(),

	// Nível de Fadiga
	fatigueLevel: z.number().min(0).max(10).nonnegative(),
	fatigueImpact: z.number().min(0).max(10).nonnegative(),
	energyLevel: z.number().min(0).max(10).nonnegative(),

	// Percepção de Dor e Desconforto Muscular
	musclePain: z.number().min(0).max(10).nonnegative(),
	muscleStiffness: z.number().min(0).max(10).nonnegative(),
	muscleImpact: z.number().min(0).max(10).nonnegative(),

	// Capacidade de Recuperação
	recoveryAbility: z.number().min(0).max(10).nonnegative(),
	recoveryDifference: z.number().min(0).max(10).nonnegative(),

	// Nível de Motivação e Engajamento
	motivationLevel: z.number().min(0).max(10).nonnegative(),
	concentrationLevel: z.number().min(0).max(10).nonnegative(),
	motivationImpact: z.number().min(0).max(10).nonnegative(),

	// Percepção de Carga de Treino
	workoutIntensity: z.number().min(0).max(10).nonnegative(),
	workoutEffort: z.number().min(0).max(10).nonnegative(),
	workoutOverload: z.number().min(0).max(10).nonnegative(),

	// Controle de Movimentos e Coordenação
	coordinationLevel: z.number().min(0).max(10).nonnegative(),
	tremors: z.number().min(0).max(10).nonnegative(),
	movementAccuracy: z.number().min(0).max(10).nonnegative(),

	// Estado Emocional e Bem-Estar Psicológico
	moodLevel: z.number().min(0).max(10).nonnegative(),
	anxietyLevel: z.number().min(0).max(10).nonnegative(),
	performanceSatisfaction: z.number().min(0).max(10).nonnegative(),

	// Alimentação e Hidratação
	foodIntake: z.number().min(0).max(10).nonnegative(),
	hydrationQuality: z.number().min(0).max(10).nonnegative(),
	energyImpact: z.number().min(0).max(10).nonnegative(),
})

export type athleteFormType = z.infer<typeof athleteFormSchema>
