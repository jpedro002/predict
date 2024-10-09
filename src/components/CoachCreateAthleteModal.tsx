import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog'
import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'

import {
	CoachRegisterAthleteSchema,
	coachRegisterAthleteSchema,
} from '@/schemas/CoachCreateAthleteSchema'
import athletesService from '@/services/volleyballManagement/volleyballManagement'
import { addAthlete } from '@/store/slices/athletesSlice'
import { Eye, EyeOff } from 'lucide-react'
import { useDispatch } from 'react-redux'
import { toast } from 'sonner'
import { Button } from './ui/button/button'
import { Input } from './ui/input'
import { Label } from './ui/label'

export default function CoachCreateAthleteModal() {
	const [isOpen, setIsOpen] = useState(false)
	const [passwordVisibility, setPasswordVisibility] = useState({
		password1: false,
		password2: false,
	})

	const dispatch = useDispatch()

	const {
		register,
		handleSubmit,
		reset,
		formState: { errors, isSubmitting },
	} = useForm<CoachRegisterAthleteSchema>({
		resolver: zodResolver(coachRegisterAthleteSchema),
	})

	const togglePasswordVisibility = (field: 'password1' | 'password2') => {
		setPasswordVisibility((prev) => ({
			...prev,
			[field]: !prev[field],
		}))
	}

	const onSubmit = async (data: CoachRegisterAthleteSchema) => {
		try {
			const response = await athletesService.createAthlete(data)

			if ('message' in response) {
				console.error(
					'Erreur lors de la création de l’athlète :',
					response.message,
				)
				toast.error('Erreur lors de la création de l’athlète')
				return
			}

			dispatch(
				addAthlete({
					id: response.id,
					name: response.name,
					email: response.email,
					status: response.status,
				}),
			)

			toast.success('Athlète créé avec succès')
		} catch (error) {
			console.error('Erreur lors de la création de l’athlète :', error)
			toast.error('Erreur lors de la création de l’athlète')
		}
	}

	useEffect(() => {
		if (isOpen) {
			reset(
				{
					name: '',
					email: '',
					password: '',
					retypePassword: '',
				},
				{ keepValues: false },
			)

			setPasswordVisibility({
				password1: false,
				password2: false,
			})
		}
	}, [isOpen, reset])

	const renderPasswordField = (
		id: string,
		label: string,
		passwordField: 'password1' | 'password2',
	) => (
		<div className="relative space-y-2">
			<Label htmlFor={id}>{label}</Label>
			<Input
				id={id}
				type={passwordVisibility[passwordField] ? 'text' : 'password'}
				{...register(id as keyof CoachRegisterAthleteSchema)}
			/>
			{errors[id as keyof typeof errors] && (
				<span className="text-red-500">
					{errors[id as keyof typeof errors]?.message}
				</span>
			)}
			<div className="absolute right-0 top-6">
				<Button
					type="button"
					size="icon"
					variant="ghost"
					onClick={() => togglePasswordVisibility(passwordField)}
					className="hover:bg-transparent"
				>
					{passwordVisibility[passwordField] ? <EyeOff /> : <Eye />}
					<span className="sr-only">
						{passwordVisibility[passwordField]
							? 'Masquer le mot de passe'
							: 'Afficher le mot de passe'}
					</span>
				</Button>
			</div>
		</div>
	)

	return (
		<Dialog onOpenChange={setIsOpen} open={isOpen}>
			<DialogTrigger asChild>
				<Button className=" w-full sm:max-w-[16rem]">Créer un athlète</Button>
			</DialogTrigger>
			<DialogContent
				aria-describedby={undefined}
				className="flex flex-col min-h-screen sm:min-h-fit "
			>
				<DialogHeader>
					<DialogTitle>Créer un athlète</DialogTitle>
				</DialogHeader>
				<form
					onSubmit={handleSubmit(onSubmit)}
					className="flex flex-col justify-between flex-1 space-y-4"
				>
					<div>
						<div className="space-y-2">
							<Label htmlFor="name">Nom</Label>
							<Input id="name" type="text" {...register('name')} />
							{errors.name && (
								<span className="text-red-500">{errors.name.message}</span>
							)}
						</div>

						<div className="space-y-2">
							<Label htmlFor="email">Email</Label>
							<Input id="email" type="email" {...register('email')} />
							{errors.email && (
								<span className="text-red-500">{errors.email?.message}</span>
							)}
						</div>

						{renderPasswordField('password', 'Mot de passe', 'password1')}
						{renderPasswordField(
							'retypePassword',
							'Répéter le mot de passe',
							'password2',
						)}
					</div>

					<Button className="w-full mt-5" disabled={isSubmitting} type="submit">
						Enregistrer l'athlète
					</Button>
				</form>
			</DialogContent>
		</Dialog>
	)
}
