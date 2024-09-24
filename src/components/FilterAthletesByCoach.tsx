import { zodResolver } from '@hookform/resolvers/zod'
import { Search, X } from 'lucide-react'
import { Controller, useForm } from 'react-hook-form'
import { useSearchParams } from 'react-router-dom'
import { z } from 'zod'

import { Button } from '@/components/ui/button/button'
import { Input } from '@/components/ui/input'
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select'

const athletesFiltersSchema = z.object({
	athleteName: z.string().optional(),
	status: z.string().optional(),
})

type AthletesFiltersSchema = z.infer<typeof athletesFiltersSchema>

export function FilterAthletesByCoach() {
	const [searchParams, setSearchParams] = useSearchParams()

	const athlete = searchParams.get('athleteName')
	const status = searchParams.get('status')

	const { register, handleSubmit, control, reset } =
		useForm<AthletesFiltersSchema>({
			resolver: zodResolver(athletesFiltersSchema),
			defaultValues: {
				athleteName: athlete ?? '',
				status: status ?? 'all',
			},
		})

	function handleFilter({ athleteName, status }: AthletesFiltersSchema) {
		setSearchParams((state) => {
			if (athleteName) {
				state.set('athleteName', athleteName.trim())
			} else {
				state.delete('athleteName')
			}

			if (status) {
				state.set('status', status.trim())
			} else {
				state.delete('status')
			}

			return state
		})
	}

	function handleClearFilters() {
		setSearchParams((state) => {
			state.delete('athleteName')
			state.delete('status')

			return state
		})

		reset({
			athleteName: '',
			status: 'all',
		})
	}

	return (
		<form
			onSubmit={handleSubmit(handleFilter)}
			className="flex flex-wrap items-center gap-2"
		>
			<span className="text-sm font-semibold">Filters:</span>
			<Input
				placeholder="Athlete Name"
				className="h-8 w-[320px]"
				{...register('athleteName')}
			/>
			<Controller
				name="status"
				control={control}
				render={({ field: { name, onChange, value, disabled } }) => {
					return (
						<Select
							defaultValue="all"
							name={name}
							onValueChange={onChange}
							value={value}
							disabled={disabled}
						>
							<SelectTrigger className="h-8 w-[180px]">
								<SelectValue />
							</SelectTrigger>
							<SelectContent>
								<SelectItem value="all">All Roles</SelectItem>
								<SelectItem value="run">Running</SelectItem>
								<SelectItem value="Soccer">Soccer</SelectItem>
								<SelectItem value="volleyball">Volleyball</SelectItem>
								<SelectItem value="volleyballAthlete">
									Volleyball Athlete
								</SelectItem>
							</SelectContent>
						</Select>
					)
				}}
			/>
			<Button variant="secondary" size="xs" type="submit">
				<Search className="mr-2 h-4 w-4" />
				Filter Results
			</Button>
			<Button
				onClick={handleClearFilters}
				variant="outline"
				size="xs"
				type="button"
			>
				<X className="mr-2 h-4 w-4" />
				Clear Filters
			</Button>
		</form>
	)
}
