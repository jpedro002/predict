import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import appUsersService from '@/services/appUsers/appUsersServices'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'
import { Button } from '../ui/button/button'

const passwordSchema = z.object({
	currentPassword: z.string().min(1, 'Current password is required'),
	newPassword: z.string().min(6, 'New password must be at least 6 characters'),
})

type PasswordSchema = z.infer<typeof passwordSchema>

export const TabPassword = ({
	handleCloseModal,
}: { handleCloseModal: () => void }) => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<PasswordSchema>({
		resolver: zodResolver(passwordSchema),
	})

	const onSubmit = async ({ currentPassword, newPassword }: PasswordSchema) => {
		try {
			const response = await appUsersService.selfUpdatePassword({
				oldPassword: currentPassword,
				newPassword,
			})

			if ('message' in response) {
				toast.error(response.message)
				return
			}

			if (response.success) {
				toast.success('Password updated successfully')
				handleCloseModal()
				return
			}
		} catch (error) {
			console.error(error)
			toast.error('Error updating the password')
		}
	}

	return (
		<Card>
			<CardHeader>
				<CardTitle>Password</CardTitle>
				<CardDescription>
					Change your password here. After saving, you'll be logged out.
				</CardDescription>
			</CardHeader>
			<CardContent className="space-y-2">
				<form onSubmit={handleSubmit(onSubmit)} className="space-y-2">
					<div className="space-y-1">
						<Label htmlFor="currentPassword">Current password</Label>
						<Input
							id="currentPassword"
							type="password"
							{...register('currentPassword')}
						/>
						{errors.currentPassword && (
							<p>{errors.currentPassword.message?.toString()}</p>
						)}
					</div>
					<div className="space-y-1">
						<Label htmlFor="newPassword">New password</Label>
						<Input
							id="newPassword"
							type="password"
							{...register('newPassword')}
						/>
						{errors.newPassword && (
							<p>{errors.newPassword.message?.toString()}</p>
						)}
					</div>
					<Button type="submit">Save password</Button>
				</form>
			</CardContent>
			<CardFooter></CardFooter>
		</Card>
	)
}
