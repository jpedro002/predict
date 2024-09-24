import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog'
import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect, useState } from 'react'
import { Controller, useFieldArray, useForm } from 'react-hook-form'

import { useAuthStorage } from '@/hooks/useAuthStorage'
import { RegisterSchema, schema } from '@/schemas/AdminCreateUserSchema'
import { Eye, EyeOff, Minus, Plus } from 'lucide-react'
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

export default function CreateAccountModal() {
	const [isOpen, setIsOpen] = useState(false)
	const [passwordVisibility, setPasswordVisibility] = useState({
		password1: false,
		password2: false,
	})

	const { ROLES } = useAuthStorage()

	const {
		register,
		handleSubmit,
		control,
		reset,
		formState: { errors, isSubmitting },
	} = useForm<RegisterSchema>({
		resolver: zodResolver(schema),
	})

	const { fields, append, remove } = useFieldArray({
		control,
		name: 'roles',
	})

	const togglePasswordVisibility = (field: 'password1' | 'password2') => {
		setPasswordVisibility((prev) => ({
			...prev,
			[field]: !prev[field],
		}))
	}

	const onSubmit = (data: RegisterSchema) => {
		console.log(data)
	}

	useEffect(() => {
		console.log(errors, 'errors')
	}, [errors])

	useEffect(() => {
		if (isOpen) {
			reset()
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
				{...register(id as keyof RegisterSchema)}
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
							? 'Ocultar senha'
							: 'Mostrar senha'}
					</span>
				</Button>
			</div>
		</div>
	)

	return (
		<Dialog onOpenChange={setIsOpen} open={isOpen}>
			<DialogTrigger asChild>
				<Button className="w-full sm:max-w-[16rem]">Criar Usuário</Button>
			</DialogTrigger>
			<DialogContent
				aria-describedby={undefined}
				className="flex flex-col min-h-screen sm:min-h-fit overflow-y-auto h-full"
			>
				<DialogHeader>
					<DialogTitle>Criar Conta</DialogTitle>
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

						{renderPasswordField('password', 'Senha', 'password1')}
						{renderPasswordField('retypePassword', 'Repita senha', 'password2')}

						<div className="flex flex-col gap-4 mt-4  ">
							{fields.map((field, index) => (
								<div className="flex flex-col gap-1" key={field.id}>
									<div className="flex items-center justify-between my-">
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
											className="bg-red-600 text-white hover:bg-red-700 focus:ring-2 focus:ring-red-500 active:bg-red-800 transition-colors duration-200"
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
								className="bg-green-600 text-white hover:bg-green-700 focus:ring-2
							 focus:ring-green-500 active:bg-green-800 transition-colors duration-200
							 mx-auto w-fit items-center px-2
							 "
								size="icon"
							>
								<span className="mr-2">Adicionar Cargo</span>
								<Plus size={24} />
							</Button>
							{errors.roles && (
								<span className="text-red-500">{errors.roles.message}</span>
							)}
							{errors.roles?.root && (
								<span className="text-red-500">
									{errors.roles?.root?.message}
								</span>
							)}
						</div>
					</div>

					<Button className="w-full mt-5" disabled={isSubmitting} type="submit">
						Finalizar Cadastro
					</Button>
				</form>
			</DialogContent>
		</Dialog>
	)
}
