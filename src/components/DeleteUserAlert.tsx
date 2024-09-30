import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button/button'
import appUsersService from '@/services/appUsers/appUsersServices'
import { deleteUserFromStore } from '@/store/slices/appUsersSlice'
import { Trash } from 'lucide-react'
import { useDispatch } from 'react-redux'
import { toast } from 'sonner'

interface DeleteUserAlertProps {
	userID: number
}

export const DeleteUserAlert = ({ userID }: DeleteUserAlertProps) => {
	const dispatch = useDispatch()
	const { deleteUser } = appUsersService

	const handleDeleteUser = async () => {
		try {
			const response = await deleteUser(userID)

			if ('message' in response) {
				toast.error(response.message)
				return
			}
			if (response.success) {
				dispatch(deleteUserFromStore(userID))
				toast.success('Usuário excluído com sucesso')
			}
		} catch (error) {
			console.error(error)
			toast.error('Erro ao excluir usuário')
		}
	}

	return (
		<AlertDialog>
			<AlertDialogTrigger asChild>
				<Button
					variant="ghost"
					className="flex w-full justify-between p-2 transition-colors duration-300
							hover:text-destructive
							"
				>
					<span>Excluir</span>
					<Trash size={18} />
				</Button>
			</AlertDialogTrigger>
			<AlertDialogContent>
				<AlertDialogHeader>
					<AlertDialogTitle>
						Tem certeza que deseja excluir o usuário?
					</AlertDialogTitle>
					<AlertDialogDescription>
						Esta ação não pode ser desfeita. Isso excluirá permanentemente sua
						conta e removerá seus dados dos nossos servidores.
					</AlertDialogDescription>
				</AlertDialogHeader>
				<AlertDialogFooter>
					<AlertDialogCancel>Cancelar</AlertDialogCancel>
					<AlertDialogAction
						onClick={handleDeleteUser}
						className="bg-red-600 text-white hover:bg-red-700"
					>
						Confirmar
					</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	)
}
