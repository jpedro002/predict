import { FieldFormSoccerQuestions } from '@/components/FieldFormSoccerQuestions'
import { Button } from '@/components/ui/button/button'
import { athleteFormSchema, athleteFormType } from '@/schemas/AthleteFormSchema'
import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect } from 'react'
import { FormProvider, useForm } from 'react-hook-form'

export const SoccerQuestions = () => {
	const methods = useForm<athleteFormType>({
		resolver: zodResolver(athleteFormSchema),
	})

	const {
		handleSubmit,
		formState: { errors },
	} = methods

	const onSubmit = (data: athleteFormType) => {
		console.log('Form Submitted:', data)
	}

	useEffect(() => {
		console.log(errors, 'errors')
	}, [errors])

	return (
		<main>
			<FormProvider {...methods}>
				<form
					onSubmit={handleSubmit(onSubmit)}
					className="flex flex-col h-full min-h-fit md:max-w-[40rem] p-8  mx-auto "
				>
					{/* Nível de Estresse */}
					<div className="mb-6">
						<h2 className="text-2xl font-bold text-gray-800 mb-4 border-b-2 border-blue-500 pb-2 px-4">
							Nível de Estresse
						</h2>
						<FieldFormSoccerQuestions
							label="Como você avalia seu nível de estresse geral hoje?"
							name="stressLevel"
							hasFieldError={!!errors.stressLevel}
							scaleDescription="Escala: 0 (Sem estresse) a 10 (Extremamente estressado)"
						/>
						<FieldFormSoccerQuestions
							label="Como você percebe seu estresse emocional atualmente?"
							name="emotionalStress"
							hasFieldError={!!errors.emotionalStress}
							scaleDescription="Escala: 0 (Sem estresse emocional) a 10 (Extremo estresse emocional)"
						/>
						<FieldFormSoccerQuestions
							label="Como o estresse físico afetou seu desempenho nos treinos ou competições recentes?"
							name="physicalImpact"
							hasFieldError={!!errors.physicalImpact}
							scaleDescription="Escala: 0 (Sem impacto) a 10 (Totalmente afetado)"
						/>
					</div>

					{/* Qualidade do Sono */}
					<div className="mb-6">
						<h2 className="text-2xl font-bold text-gray-800 mb-4 border-b-2 border-blue-500 pb-2 px-4">
							Qualidade do Sono
						</h2>
						<FieldFormSoccerQuestions
							label="Como você classificaria a qualidade do seu sono na última noite?"
							name="sleepQuality"
							hasFieldError={!!errors.sleepQuality}
							scaleDescription="Escala: 0 (Muito ruim) a 10 (Excelente)"
						/>
						<FieldFormSoccerQuestions
							label="Quantas horas de sono você teve nas últimas 24 horas?"
							name="sleepHours"
							hasFieldError={!!errors.sleepHours}
							scaleDescription="Escala: 0 (Nenhuma) a 10 (Mais de 8 horas)"
						/>
						<FieldFormSoccerQuestions
							label="Como você se sentiu ao acordar hoje?"
							name="wakeUpFeeling"
							hasFieldError={!!errors.wakeUpFeeling}
							scaleDescription="Escala: 0 (Extremamente cansado) a 10 (Totalmente revigorado)"
						/>
					</div>

					{/* Nível de Fadiga */}
					<div className="mb-6">
						<h2 className="text-2xl font-bold text-gray-800 mb-4 border-b-2 border-blue-500 pb-2 px-4">
							Nível de Fadiga
						</h2>
						<FieldFormSoccerQuestions
							label="Como você avalia seu nível de fadiga física atualmente?"
							name="fatigueLevel"
							hasFieldError={!!errors.fatigueLevel}
							scaleDescription="Escala: 0 (Sem fadiga) a 10 (Fadiga extrema)"
						/>
						<FieldFormSoccerQuestions
							label="Qual é o impacto da fadiga no seu desempenho durante os treinos ou competições?"
							name="fatigueImpact"
							hasFieldError={!!errors.fatigueImpact}
							scaleDescription="Escala: 0 (Nenhum impacto) a 10 (Totalmente prejudicado)"
						/>
						<FieldFormSoccerQuestions
							label="Como está seu nível de energia agora, em comparação com o seu normal?"
							name="energyLevel"
							hasFieldError={!!errors.energyLevel}
							scaleDescription="Escala: 0 (Muito abaixo do normal) a 10 (Acima do normal)"
						/>
					</div>

					{/* Percepção de Dor e Desconforto Muscular */}
					<div className="mb-6">
						<h2 className="text-2xl font-bold text-gray-800 mb-4 border-b-2 border-blue-500 pb-2 px-4">
							Percepção de Dor e Desconforto Muscular
						</h2>
						<FieldFormSoccerQuestions
							label="Qual o seu nível de dor muscular hoje?"
							name="musclePain"
							hasFieldError={!!errors.musclePain}
							scaleDescription="Escala: 0 (Sem dor) a 10 (Dor extrema)"
						/>
						<FieldFormSoccerQuestions
							label="Como você avalia a rigidez muscular ao acordar?"
							name="muscleStiffness"
							hasFieldError={!!errors.muscleStiffness}
							scaleDescription="Escala: 0 (Nenhuma rigidez) a 10 (Rigidez extrema)"
						/>
						<FieldFormSoccerQuestions
							label="A dor ou desconforto afetou seu desempenho durante o treino ou competição?"
							name="muscleImpact"
							hasFieldError={!!errors.muscleImpact}
							scaleDescription="Escala: 0 (Não afetou) a 10 (Totalmente prejudicou)"
						/>
					</div>

					{/* Capacidade de Recuperação */}
					<div className="mb-6">
						<h2 className="text-2xl font-bold text-gray-800 mb-4 border-b-2 border-blue-500 pb-2 px-4">
							Capacidade de Recuperação
						</h2>
						<FieldFormSoccerQuestions
							label="Como você se sente em relação à sua capacidade de se recuperar entre os treinos?"
							name="recoveryAbility"
							hasFieldError={!!errors.recoveryAbility}
							scaleDescription="Escala: 0 (Recuperação muito lenta) a 10 (Recuperação muito rápida)"
						/>
						<FieldFormSoccerQuestions
							label="Você percebe alguma diferença na sua capacidade de recuperar após as sessões de treino mais intensas?"
							name="recoveryDifference"
							hasFieldError={!!errors.recoveryDifference}
							scaleDescription="Escala: 0 (Sem diferença) a 10 (Totalmente diferente, muito mais lenta)"
						/>
					</div>

					{/* Nível de Motivação e Engajamento */}
					<div className="mb-6">
						<h2 className="text-2xl font-bold text-gray-800 mb-4 border-b-2 border-blue-500 pb-2 px-4">
							Nível de Motivação e Engajamento
						</h2>
						<FieldFormSoccerQuestions
							label="Quão motivado você está para treinar hoje?"
							name="motivationLevel"
							hasFieldError={!!errors.motivationLevel}
							scaleDescription="Escala: 0 (Nada motivado) a 10 (Extremamente motivado)"
						/>
						<FieldFormSoccerQuestions
							label="Como você avalia sua concentração durante os treinos ou competições?"
							name="concentrationLevel"
							hasFieldError={!!errors.concentrationLevel}
							scaleDescription="Escala: 0 (Totalmente disperso) a 10 (Totalmente focado)"
						/>
						<FieldFormSoccerQuestions
							label="A experiência de treinos ou competições recentes afetou sua motivação?"
							name="motivationImpact"
							hasFieldError={!!errors.motivationImpact}
							scaleDescription="Escala: 0 (Não afetou) a 10 (Influenciou muito negativamente)"
						/>
					</div>

					{/* Percepção de Carga de Treino */}
					<div className="mb-6">
						<h2 className="text-2xl font-bold text-gray-800 mb-4 border-b-2 border-blue-500 pb-2 px-4">
							Percepção de Carga de Treino
						</h2>
						<FieldFormSoccerQuestions
							label="Como você avalia a intensidade do seu treino hoje?"
							name="workoutIntensity"
							hasFieldError={!!errors.workoutIntensity}
							scaleDescription="Escala: 0 (Muito leve) a 10 (Extremamente intenso)"
						/>
						<FieldFormSoccerQuestions
							label="Como você percebe seu esforço geral durante o treinamento ou competição?"
							name="workoutEffort"
							hasFieldError={!!errors.workoutEffort}
							scaleDescription="Escala: 0 (Nenhum esforço) a 10 (Esforço extremo)"
						/>
						<FieldFormSoccerQuestions
							label="Houve algum momento em que você sentiu que não conseguiu acompanhar a carga do treino?"
							name="workoutOverload"
							hasFieldError={!!errors.workoutOverload}
							scaleDescription="Escala: 0 (Nunca) a 10 (O tempo todo)"
						/>
					</div>

					{/* Controle de Movimentos e Coordenação */}
					<div className="mb-6">
						<h2 className="text-2xl font-bold text-gray-800 mb-4 border-b-2 border-blue-500 pb-2 px-4">
							Controle de Movimentos e Coordenação
						</h2>
						<FieldFormSoccerQuestions
							label="Como você avalia sua coordenação motora durante o treino hoje?"
							name="coordinationLevel"
							hasFieldError={!!errors.coordinationLevel}
							scaleDescription="Escala: 0 (Totalmente descoordenado) a 10 (Perfeita coordenação)"
						/>
						<FieldFormSoccerQuestions
							label="Sentiu algum tipo de tremor ou descontrole durante a execução dos movimentos?"
							name="tremors"
							hasFieldError={!!errors.tremors}
							scaleDescription="Escala: 0 (Não) a 10 (Tremores constantes)"
						/>
						<FieldFormSoccerQuestions
							label="Como você avalia a precisão de seus movimentos durante o treino?"
							name="movementAccuracy"
							hasFieldError={!!errors.movementAccuracy}
							scaleDescription="Escala: 0 (Totalmente impreciso) a 10 (Totalmente preciso)"
						/>
					</div>

					{/* Estado Emocional e Bem-Estar Psicológico */}
					<div className="mb-6">
						<h2 className="text-2xl font-bold text-gray-800 mb-4 border-b-2 border-blue-500 pb-2 px-4">
							Estado Emocional e Bem-Estar Psicológico
						</h2>
						<FieldFormSoccerQuestions
							label="Como você classificaria seu humor hoje?"
							name="moodLevel"
							hasFieldError={!!errors.moodLevel}
							scaleDescription="Escala: 0 (Muito negativo) a 10 (Muito positivo)"
						/>
						<FieldFormSoccerQuestions
							label="Houve algo que o deixou ansioso ou preocupado antes do treino/competição?"
							name="anxietyLevel"
							hasFieldError={!!errors.anxietyLevel}
							scaleDescription="Escala: 0 (Nada) a 10 (Extremamente ansioso/preocupado)"
						/>
						<FieldFormSoccerQuestions
							label="Como você se sente em relação ao seu desempenho recente?"
							name="performanceSatisfaction"
							hasFieldError={!!errors.performanceSatisfaction}
							scaleDescription="Escala: 0 (Extremamente insatisfeito) a 10 (Totalmente satisfeito)"
						/>
					</div>

					{/* Alimentação e Hidratação */}
					<div className="mb-6">
						<h2 className="text-2xl font-bold text-gray-800 mb-4 border-b-2 border-blue-500 pb-2 px-4">
							Alimentação e Hidratação
						</h2>
						<FieldFormSoccerQuestions
							label="Como você avalia sua ingestão alimentar nas últimas 24 horas?"
							name="foodIntake"
							hasFieldError={!!errors.foodIntake}
							scaleDescription="Escala: 0 (Muito inadequada) a 10 (Totalmente adequada)"
						/>
						<FieldFormSoccerQuestions
							label="Qual foi a qualidade da sua hidratação nas últimas 24 horas?"
							name="hydrationQuality"
							hasFieldError={!!errors.hydrationQuality}
							scaleDescription="Escala: 0 (Muito ruim) a 10 (Excelente)"
						/>
						<FieldFormSoccerQuestions
							label="Sentiu falta de energia ou força relacionada à sua alimentação ou hidratação?"
							name="energyImpact"
							hasFieldError={!!errors.energyImpact}
							scaleDescription="Escala: 0 (Nada) a 10 (Totalmente relacionado)"
						/>
					</div>
					<Button type="submit" className="mx-auto w-full md:max-w-48">
						Enviar
					</Button>
				</form>
			</FormProvider>
		</main>
	)
}
