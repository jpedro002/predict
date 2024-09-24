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

const orderFiltersSchema = z.object({
	orderId: z.string().optional(),
	customerName: z.string().optional(),
	status: z.string().optional(),
})

type OrderFiltersSchema = z.infer<typeof orderFiltersSchema>

export function FilterUsersByAdmin() {
	const [searchParams, setSearchParams] = useSearchParams()

	const orderId = searchParams.get('orderId')
	const customerName = searchParams.get('customerName')
	const status = searchParams.get('status')

	const { register, handleSubmit, control, reset } =
		useForm<OrderFiltersSchema>({
			resolver: zodResolver(orderFiltersSchema),
			defaultValues: {
				orderId: orderId ?? '',
				customerName: customerName ?? '',
				status: status ?? 'all',
			},
		})

	function handleFilter({ customerName, orderId, status }: OrderFiltersSchema) {
		setSearchParams((state) => {
			if (orderId) {
				state.set('orderId', orderId.trim())
			} else {
				state.delete('orderId')
			}

			if (customerName) {
				state.set('customerName', customerName.trim())
			} else {
				state.delete('customerName')
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
			state.delete('orderId')
			state.delete('customerName')
			state.delete('status')

			return state
		})

		reset({
			orderId: '',
			customerName: '',
			status: 'all',
		})
	}

	return (
		<form
			onSubmit={handleSubmit(handleFilter)}
			className="flex flex-wrap items-center gap-2"
		>
			<span className="text-sm font-semibold">Filtros:</span>
			<Input
				placeholder="Nome do cliente"
				className="h-8 w-[320px]"
				{...register('customerName')}
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
								<SelectItem value="all">Todos Cargos</SelectItem>
								<SelectItem value="run">Corrida</SelectItem>
								<SelectItem value="Soccer">Futebol</SelectItem>
								<SelectItem value="volleyball">Volei</SelectItem>
								<SelectItem value="volleyballAthlete">
									atleta de volei
								</SelectItem>
							</SelectContent>
						</Select>
					)
				}}
			/>
			<Button variant="secondary" size="xs" type="submit">
				<Search className="mr-2 h-4 w-4" />
				Filtrar resultados
			</Button>
			<Button
				onClick={handleClearFilters}
				variant="outline"
				size="xs"
				type="button"
			>
				<X className="mr-2 h-4 w-4" />
				Remover filtros
			</Button>
		</form>
	)
}
