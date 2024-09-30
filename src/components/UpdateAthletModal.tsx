import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog'
import {
	UpdateAthleteSchema,
	updateAthleteSchema,
} from '@/schemas/CoachCreateAthleteSchema'
import athletesService from '@/services/volleyballManagement/volleyballManagement'
import { useAppSelector } from '@/store'
import { updateAthlete } from '@/store/slices/athletesSlice'
import { zodResolver } from '@hookform/resolvers/zod'
import { Pencil } from 'lucide-react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { toast } from 'sonner'
import { Button } from './ui/button/button'
import { Input } from './ui/input'
import { Label } from './ui/label'

export function UpdateAthleteModal({
	defaultValues,
	athleteID,
}: {
	defaultValues: {
		name: string
		email: string
	}
	athleteID: number
}) {
	const [isOpen, setIsOpen] = useState(false)
	const loading = useAppSelector((state) => state.athletes.isLoading)
	const dispatch = useDispatch()

	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
	} = useForm<UpdateAthleteSchema>({
		resolver: zodResolver(updateAthleteSchema),
		defaultValues,
	})

	const onSubmit = async (data: UpdateAthleteSchema) => {
		try {
			const response = await athletesService.updateAthlete(athleteID, data)

			if ('message' in response) {
				return toast.error(response.message)
			}

			dispatch(updateAthlete(response))
			toast.success('Athlete updated successfully')
			setIsOpen(false)
		} catch (error) {
			console.error(error)
			toast.error('Error updating athlete')
		}
	}

	return (
		<Dialog onOpenChange={setIsOpen} open={isOpen}>
			<DialogTrigger asChild>
				<Button variant="ghost" className="flex w-full justify-between p-2">
					<span>Edit</span>
					<Pencil size={18} />
				</Button>
			</DialogTrigger>
			<DialogContent className="flex flex-col min-h-screen sm:min-h-fit overflow-y-auto">
				<DialogHeader>
					<DialogTitle>Edit Athlete</DialogTitle>
				</DialogHeader>
				<form
					onSubmit={handleSubmit(onSubmit)}
					className="flex flex-col justify-between flex-1 space-y-4"
				>
					<div>
						<div className="space-y-2">
							<Label htmlFor="name">Name</Label>
							<Input id="name" type="text" {...register('name')} />
							{errors.name && (
								<span className="text-red-500">{errors.name.message}</span>
							)}
						</div>

						<div className="space-y-2">
							<Label htmlFor="email">E-mail</Label>
							<Input id="email" type="email" {...register('email')} />
							{errors.email && (
								<span className="text-red-500">{errors.email?.message}</span>
							)}
						</div>
					</div>

					<div className="flex justify-between">
						<Button
							className="w-full mt-5"
							disabled={isSubmitting || loading}
							type="submit"
						>
							{loading ? 'Updating...' : 'Update Athlete'}
						</Button>
						<Button
							type="button"
							className="w-fit mt-5 ml-2"
							onClick={() => {
								console.log('Reset password')
							}}
						>
							Reset Password
						</Button>
					</div>
				</form>
			</DialogContent>
		</Dialog>
	)
}
