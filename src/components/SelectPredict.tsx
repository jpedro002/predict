import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select'
import { FormType } from '@/pages/app/Home'
import { Controller, useFormContext } from 'react-hook-form'

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
					<SelectTrigger>
						<SelectValue placeholder={placeholder} />
					</SelectTrigger>
					<SelectContent>
						{options.map((item) => (
							<SelectItem key={item} value={item}>
								{item}
							</SelectItem>
						))}
					</SelectContent>
				</Select>
			)}
		/>
	)
}
