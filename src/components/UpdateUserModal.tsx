import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog'
import { useAuthStorage } from '@/hooks/useAuthStorage'
import {
	UpdateUserSchema,
	updateUserSchema,
} from '@/schemas/AdminCreateUserSchema'
import appUsersService from '@/services/appUsers/appUsersServices'
import { useAppSelector } from '@/store'
import { updateUser } from '@/store/slices/appUsersSlice'
import { zodResolver } from '@hookform/resolvers/zod'
import { Minus, Pencil, Plus } from 'lucide-react'
import { useState } from 'react'
import { Controller, useFieldArray, useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { toast } from 'sonner'
import { Button } from './ui/button/button'
import { Input } from './ui/input'
import { Label } from './ui/label'
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from './ui/select'

export default function UpdateUserModal({
	defaultValues,
	userID,
}: {
	defaultValues: {
		name: string
		email: string
		roles: { role: string }[]
	}
	userID: number
}) {
	const [isOpen, setIsOpen] = useState(false)

	const loading = useAppSelector((state) => state.appUsers.isLoading)

	const { ROLES } = useAuthStorage()
	const dispatch = useDispatch()

	const {
		register,
		handleSubmit,
		control,
		formState: { errors, isSubmitting },
	} = useForm<UpdateUserSchema>({
		resolver: zodResolver(updateUserSchema),
		defaultValues,
	})

	const { fields, append, remove } = useFieldArray({
		control,
		name: 'roles',
	})

	const onSubmit = async (data: UpdateUserSchema) => {
		try {
			const roles = data.roles.map(({ role }) => role)

			const response = await appUsersService.updateUser(userID, {
				...data,
				role: roles,
			})

			if ('message' in response) {
				return toast.error(response.message)
			}

			dispatch(updateUser(response))
			toast.success('Usuário atualizado com sucesso')
			setIsOpen(false)
		} catch (error) {
			console.error(error)
			toast.error('Erro ao atualizar usuário')
		}
	}

	return (
		<Dialog onOpenChange={setIsOpen} open={isOpen}>
			<DialogTrigger asChild>
				<Button variant="ghost" className="flex w-full justify-between p-2">
					<span>Editar</span>
					<Pencil size={18} />
				</Button>
			</DialogTrigger>
			<DialogContent
				className="flex flex-col min-h-screen sm:min-h-fit overflow-y-auto "
				aria-describedby={undefined}
			>
				<DialogHeader>
					<DialogTitle>Editar Conta</DialogTitle>
				</DialogHeader>
				<form
					onSubmit={handleSubmit(onSubmit)}
					className="flex flex-col justify-between flex-1 space-y-4"
				>
					<div>
						<div className="space-y-2">
							<Label htmlFor="name">Nome</Label>
							<Input id="name" type="text" {...register('name')} />
							{errors.name && (
								<span className="text-red-500">{errors.name.message}</span>
							)}
						</div>

						<div className="space-y-2">
							<Label htmlFor="email">e-mail</Label>
							<Input id="email" type="email" {...register('email')} />
							{errors.email && (
								<span className="text-red-500">{errors.email?.message}</span>
							)}
						</div>

						<div className="flex flex-col gap-4 mt-4">
							{fields.map((field, index) => (
								<div className="flex flex-col gap-1" key={field.id}>
									<div className="flex items-center justify-between">
										<Controller
											name={`roles.${index}.role`}
											control={control}
											render={({ field: { onChange, value } }) => (
												<Select value={value} onValueChange={onChange}>
													<SelectTrigger className="h-10 w-[180px] capitalize">
														<SelectValue placeholder="Roles" />
													</SelectTrigger>
													<SelectContent>
														{ROLES.map((item) => (
															<SelectItem
																key={item}
																value={item}
																className="capitalize"
															>
																{item}
															</SelectItem>
														))}
													</SelectContent>
												</Select>
											)}
										/>
										<Button
											type="button"
											onClick={() => remove(index)}
											className="bg-red-600 text-white hover:bg-red-700"
											size="icon"
										>
											<Minus size={24} />
										</Button>
									</div>
									{errors.roles && errors.roles[index]?.role && (
										<span className="text-red-500">
											{errors.roles[index]?.role.message}
										</span>
									)}
								</div>
							))}
						</div>

						<div className="w-full flex flex-col items-center gap-1 justify-center mt-4">
							<Button
								type="button"
								onClick={() => append({ role: '' })}
								className="bg-green-600 text-white hover:bg-green-700"
							>
								<span className="mr-2">Adicionar Cargo</span>
								<Plus size={24} />
							</Button>
							{errors.roles && (
								<span className="text-red-500">{errors.roles.message}</span>
							)}
						</div>
					</div>

					<div className="flex justify-between">
						<Button
							className="w-full mt-5"
							disabled={isSubmitting || loading}
							type="submit"
						>
							{loading ? 'Atualizando...' : 'Atualizar Usuário'}
						</Button>
						<Button
							type="button"
							className="w-fit mt-5 ml-2"
							onClick={() => {
								console.log('oi')
							}}
						>
							Resetar Senha
						</Button>
					</div>
				</form>
			</DialogContent>
		</Dialog>
	)
}
