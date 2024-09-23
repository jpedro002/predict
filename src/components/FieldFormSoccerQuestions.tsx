import { cn } from '@/lib/utils'
import { athleteFormType } from '@/schemas/AthleteFormSchema'
import { useController, useFormContext } from 'react-hook-form'

const scaleColors = [
	'bg-red-600',
	'bg-red-500',
	'bg-red-400',
	'bg-orange-400',
	'bg-yellow-400',
	'bg-yellow-300',
	'bg-green-200',
	'bg-green-300',
	'bg-green-400',
	'bg-green-500',
	'bg-green-600',
]

interface FieldFormSoccerQuestionsProps {
	label: string
	name: keyof athleteFormType
	hasFieldError?: boolean
	scaleDescription?: string
}

export const FieldFormSoccerQuestions = ({
	label,
	name,
	hasFieldError,
	scaleDescription,
}: FieldFormSoccerQuestionsProps) => {
	const { control } = useFormContext<athleteFormType>()

	const {
		field: { value, onChange },
	} = useController({ name, control })

	return (
		<div className="mb-4 space-y-2 px-4">
			<label className="block text-lg font-semibold ">{label}</label>
			{scaleDescription && (
				<p className="text-gray-500 text-sm mb-2">{scaleDescription}</p>
			)}
			<div className="flex gap-2 flex-wrap ">
				{scaleColors.map((color, index) => (
					<button
						key={index}
						type="button"
						onClick={() => onChange(index)}
						data-selected={index === value}
						className={cn(
							`w-10 h-10 rounded-lg text-white font-bold transition-colors
						data-[selected=true]:ring-2 data-[selected=true]:ring-offset-2 data-[selected=true]:ring-blue-500
						hover:bg-opacity-75
						`,
							color,
						)}
					>
						{index}
					</button>
				))}
			</div>
			{hasFieldError && (
				<p className="text-red-500 text-sm">Champ obligatoire</p>
			)}
		</div>
	)
}
