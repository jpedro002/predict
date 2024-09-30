import { FieldFormSoccerQuestions } from '@/components/FieldFormSoccerQuestions'
import { Button } from '@/components/ui/button/button'
import { useAppTitle } from '@/hooks/useAppTitle'
import { athleteFormSchema, athleteFormType } from '@/schemas/AthleteFormSchema'
import { AthleteFormSubmitService } from '@/services/AthleteFormSubmitService'
import { useAppSelector } from '@/store'
import { setStatusAthlete } from '@/store/slices/userSlice'
import { zodResolver } from '@hookform/resolvers/zod'
import { FormProvider, useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { toast } from 'sonner'

//TODO: rename this component to volleyballQuestionsForm

export const SoccerQuestions = () => {
	useAppTitle({ title: 'questionnaire' })
	const dayliResponse = useAppSelector((state) => state.user.statusAthlete)
	const dispatch = useDispatch()

	const methods = useForm<athleteFormType>({
		resolver: zodResolver(athleteFormSchema),
	})

	const {
		handleSubmit,
		formState: { errors },
	} = methods

	const onSubmit = async (data: athleteFormType) => {
		try {
			if (dayliResponse) {
				return toast.error(
					'try again tomorrow u already submitted the form today',
				)
			}

			const response = await AthleteFormSubmitService(data)

			if ('message' in response) {
				return toast.error(response.message)
			}
			if (response.success) {
				dispatch(setStatusAthlete(true))
				return toast.success('Form submitted successfully')
			}
		} catch (_error) {
			toast.error('Error submitting form')
		}
	}

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
							Niveau de Stress
						</h2>
						<FieldFormSoccerQuestions
							label="Comment évalueriez-vous votre niveau de stress général aujourd'hui ?"
							name="stressLevel"
							hasFieldError={!!errors.stressLevel}
							scaleDescription="Échelle : 0 (Pas de stress) à 10 (Extrêmement stressé)"
						/>
						<FieldFormSoccerQuestions
							label="Comment ressentez-vous votre stress émotionnel actuellement ?"
							name="emotionalStress"
							hasFieldError={!!errors.emotionalStress}
							scaleDescription="Échelle : 0 (Aucun stress émotionnel) à 10 (Stress émotionnel extrême)"
						/>
						<FieldFormSoccerQuestions
							label="Comment le stress physique a-t-il affecté votre performance lors des entraînements ou compétitions récentes ?"
							name="physicalImpact"
							hasFieldError={!!errors.physicalImpact}
							scaleDescription="Échelle : 0 (Aucun impact) à 10 (Totalement affecté)"
						/>
					</div>
					{/* Qualidade do Sono */}
					<div className="mb-6">
						<h2 className="text-2xl font-bold text-gray-800 mb-4 border-b-2 border-blue-500 pb-2 px-4">
							Qualité du Sommeil
						</h2>
						<FieldFormSoccerQuestions
							label="Comment évalueriez-vous la qualité de votre sommeil la nuit dernière ?"
							name="sleepQuality"
							hasFieldError={!!errors.sleepQuality}
							scaleDescription="Échelle : 0 (Très mauvaise) à 10 (Excellente)"
						/>
						<FieldFormSoccerQuestions
							label="Combien d'heures de sommeil avez-vous eues au cours des dernières 24 heures ?"
							name="sleepHours"
							hasFieldError={!!errors.sleepHours}
							scaleDescription="Échelle : 0 (Aucune) à 10 (Plus de 8 heures)"
						/>
						<FieldFormSoccerQuestions
							label="Comment vous êtes-vous senti(e) en vous réveillant aujourd'hui ?"
							name="wakeUpFeeling"
							hasFieldError={!!errors.wakeUpFeeling}
							scaleDescription="Échelle : 0 (Extrêmement fatigué(e)) à 10 (Totalement revigoré(e))"
						/>
					</div>
					{/* Nível de Fadiga */}
					<div className="mb-6">
						<h2 className="text-2xl font-bold text-gray-800 mb-4 border-b-2 border-blue-500 pb-2 px-4">
							Niveau de Fatigue
						</h2>
						<FieldFormSoccerQuestions
							label="Comment évalueriez-vous votre niveau de fatigue physique actuellement ?"
							name="fatigueLevel"
							hasFieldError={!!errors.fatigueLevel}
							scaleDescription="Échelle : 0 (Pas de fatigue) à 10 (Fatigue extrême)"
						/>
						<FieldFormSoccerQuestions
							label="Quel est l'impact de la fatigue sur votre performance pendant les entraînements ou compétitions ?"
							name="fatigueImpact"
							hasFieldError={!!errors.fatigueImpact}
							scaleDescription="Échelle : 0 (Aucun impact) à 10 (Totalement affecté)"
						/>
						<FieldFormSoccerQuestions
							label="Comment évaluez-vous votre niveau d'énergie actuel par rapport à votre normal ?"
							name="energyLevel"
							hasFieldError={!!errors.energyLevel}
							scaleDescription="Échelle : 0 (Bien en dessous de la normale) à 10 (Au-dessus de la normale)"
						/>
					</div>
					{/* Percepção de Dor e Desconforto Muscular */}
					<div className="mb-6">
						<h2 className="text-2xl font-bold text-gray-800 mb-4 border-b-2 border-blue-500 pb-2 px-4">
							Perception de la Douleur et de l'Inconfort Musculaire
						</h2>
						<FieldFormSoccerQuestions
							label="Quel est votre niveau de douleur musculaire aujourd'hui ?"
							name="musclePain"
							hasFieldError={!!errors.musclePain}
							scaleDescription="Échelle : 0 (Aucune douleur) à 10 (Douleur extrême)"
						/>
						<FieldFormSoccerQuestions
							label="Comment évaluez-vous la raideur musculaire au réveil ?"
							name="muscleStiffness"
							hasFieldError={!!errors.muscleStiffness}
							scaleDescription="Échelle : 0 (Aucune raideur) à 10 (Raideur extrême)"
						/>
						<FieldFormSoccerQuestions
							label="La douleur ou l'inconfort a-t-il affecté votre performance pendant l'entraînement ou la compétition ?"
							name="muscleImpact"
							hasFieldError={!!errors.muscleImpact}
							scaleDescription="Échelle : 0 (Aucun impact) à 10 (Totalement affecté)"
						/>
					</div>
					{/* Capacidade de Recuperação */}
					<div className="mb-6">
						<h2 className="text-2xl font-bold text-gray-800 mb-4 border-b-2 border-blue-500 pb-2 px-4">
							Capacité de Récupération
						</h2>
						<FieldFormSoccerQuestions
							label="Comment ressentez-vous votre capacité à récupérer entre les entraînements ?"
							name="recoveryAbility"
							hasFieldError={!!errors.recoveryAbility}
							scaleDescription="Échelle : 0 (Récupération très lente) à 10 (Récupération très rapide)"
						/>
						<FieldFormSoccerQuestions
							label="Remarquez-vous une différence dans votre capacité à récupérer après les séances d'entraînement les plus intenses ?"
							name="recoveryDifference"
							hasFieldError={!!errors.recoveryDifference}
							scaleDescription="Échelle : 0 (Aucune différence) à 10 (Totalement différente, beaucoup plus lente)"
						/>
					</div>
					{/* Nível de Motivação e Engajamento */}
					<div className="mb-6">
						<h2 className="text-2xl font-bold text-gray-800 mb-4 border-b-2 border-blue-500 pb-2 px-4">
							Niveau de Motivation et d'Engagement
						</h2>
						<FieldFormSoccerQuestions
							label="À quel point êtes-vous motivé(e) pour vous entraîner aujourd'hui ?"
							name="motivationLevel"
							hasFieldError={!!errors.motivationLevel}
							scaleDescription="Échelle : 0 (Pas du tout motivé(e)) à 10 (Extrêmement motivé(e))"
						/>
						<FieldFormSoccerQuestions
							label="Comment évalueriez-vous votre concentration pendant les entraînements ou les compétitions ?"
							name="concentrationLevel"
							hasFieldError={!!errors.concentrationLevel}
							scaleDescription="Échelle : 0 (Totalement distrait(e)) à 10 (Totalement concentré(e))"
						/>
						<FieldFormSoccerQuestions
							label="Les expériences récentes d'entraînement ou de compétition ont-elles affecté votre motivation ?"
							name="motivationImpact"
							hasFieldError={!!errors.motivationImpact}
							scaleDescription="Échelle : 0 (Pas du tout) à 10 (Fortement impacté(e) négativement)"
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
					{/* Perception de la Charge d'Entraînement */}
					<div className="mb-6">
						<h2 className="text-2xl font-bold text-gray-800 mb-4 border-b-2 border-blue-500 pb-2 px-4">
							Perception de la Charge d'Entraînement
						</h2>
						<FieldFormSoccerQuestions
							label="Comment évalueriez-vous l'intensité de votre entraînement aujourd'hui ?"
							name="workoutIntensity"
							hasFieldError={!!errors.workoutIntensity}
							scaleDescription="Échelle : 0 (Très léger) à 10 (Extrêmement intense)"
						/>
						<FieldFormSoccerQuestions
							label="Comment percevez-vous votre effort global pendant l'entraînement ou la compétition ?"
							name="workoutEffort"
							hasFieldError={!!errors.workoutEffort}
							scaleDescription="Échelle : 0 (Aucun effort) à 10 (Effort extrême)"
						/>
						<FieldFormSoccerQuestions
							label="Y a-t-il eu des moments où vous avez ressenti que vous ne pouviez pas suivre la charge d'entraînement ?"
							name="workoutOverload"
							hasFieldError={!!errors.workoutOverload}
							scaleDescription="Échelle : 0 (Jamais) à 10 (Tout le temps)"
						/>
					</div>
					{/* Contrôle des Mouvements et Coordination */}
					<div className="mb-6">
						<h2 className="text-2xl font-bold text-gray-800 mb-4 border-b-2 border-blue-500 pb-2 px-4">
							Contrôle des Mouvements et Coordination
						</h2>
						<FieldFormSoccerQuestions
							label="Comment évaluez-vous votre coordination motrice pendant l'entraînement aujourd'hui ?"
							name="coordinationLevel"
							hasFieldError={!!errors.coordinationLevel}
							scaleDescription="Échelle : 0 (Totalement désordonné(e)) à 10 (Coordination parfaite)"
						/>
						<FieldFormSoccerQuestions
							label="Avez-vous ressenti des tremblements ou un manque de contrôle lors de l'exécution des mouvements ?"
							name="tremors"
							hasFieldError={!!errors.tremors}
							scaleDescription="Échelle : 0 (Non) à 10 (Tremblements constants)"
						/>
						<FieldFormSoccerQuestions
							label="Comment évaluez-vous la précision de vos mouvements pendant l'entraînement ?"
							name="movementAccuracy"
							hasFieldError={!!errors.movementAccuracy}
							scaleDescription="Échelle : 0 (Totalement imprécis) à 10 (Totalement précis)"
						/>
					</div>

					{/* État Émotionnel et Bien-être Psychologique */}
					<div className="mb-6">
						<h2 className="text-2xl font-bold text-gray-800 mb-4 border-b-2 border-blue-500 pb-2 px-4">
							État Émotionnel et Bien-être Psychologique
						</h2>
						<FieldFormSoccerQuestions
							label="Comment évalueriez-vous votre humeur aujourd'hui ?"
							name="moodLevel"
							hasFieldError={!!errors.moodLevel}
							scaleDescription="Échelle : 0 (Très négatif) à 10 (Très positif)"
						/>
						<FieldFormSoccerQuestions
							label="Y a-t-il eu quelque chose qui vous a rendu(e) anxieux(se) ou préoccupé(e) avant l'entraînement/la compétition ?"
							name="anxietyLevel"
							hasFieldError={!!errors.anxietyLevel}
							scaleDescription="Échelle : 0 (Pas du tout) à 10 (Extrêmement anxieux(se)/préoccupé(e))"
						/>
						<FieldFormSoccerQuestions
							label="Comment vous sentez-vous par rapport à vos performances récentes ?"
							name="performanceSatisfaction"
							hasFieldError={!!errors.performanceSatisfaction}
							scaleDescription="Échelle : 0 (Extrêmement insatisfait(e)) à 10 (Totalement satisfait(e))"
						/>
					</div>

					{/* Alimentation et Hydratation */}
					<div className="mb-6">
						<h2 className="text-2xl font-bold text-gray-800 mb-4 border-b-2 border-blue-500 pb-2 px-4">
							Alimentation et Hydratation
						</h2>
						<FieldFormSoccerQuestions
							label="Comment évalueriez-vous votre apport alimentaire au cours des dernières 24 heures ?"
							name="foodIntake"
							hasFieldError={!!errors.foodIntake}
							scaleDescription="Échelle : 0 (Très inadéquat) à 10 (Totalement adéquat)"
						/>
						<FieldFormSoccerQuestions
							label="Quelle était la qualité de votre hydratation au cours des dernières 24 heures ?"
							name="hydrationQuality"
							hasFieldError={!!errors.hydrationQuality}
							scaleDescription="Échelle : 0 (Très mauvaise) à 10 (Excellente)"
						/>
						<FieldFormSoccerQuestions
							label="Avez-vous ressenti un manque d'énergie ou de force lié à votre alimentation ou hydratation ?"
							name="energyImpact"
							hasFieldError={!!errors.energyImpact}
							scaleDescription="Échelle : 0 (Aucun manque) à 10 (Manque extrême)"
						/>
					</div>

					<Button
						type="submit"
						disabled={dayliResponse}
						className="mx-auto w-full md:max-w-48"
					>
						envoyer
					</Button>
				</form>
			</FormProvider>
		</main>
	)
}
