import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select'
import { Controller, useFormContext } from 'react-hook-form'
import { FormType } from './FormSubmitVideo'

interface SelectPredictProps {
	options: string[]
	placeholder: string
}

export const SelectPredict = ({ options, placeholder }: SelectPredictProps) => {
	const { control } = useFormContext<FormType>()

	return (
		<Controller
			name="predictType"
			control={control}
			render={({ field: { onChange, value } }) => (
				<Select onValueChange={onChange} value={value}>
					<SelectTrigger type="button">
						<SelectValue placeholder={placeholder} />
					</SelectTrigger>
					<SelectContent>
						{options.map((label) => (
							<SelectItem key={label} value={label}>
								{label}
							</SelectItem>
						))}
					</SelectContent>
				</Select>
			)}
		/>
	)
}
