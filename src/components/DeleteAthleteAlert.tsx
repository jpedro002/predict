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
import athletesService from '@/services/volleyballManagement/volleyballManagement'
import { deleteAthleteFromStore } from '@/store/slices/athletesSlice'
import { Trash } from 'lucide-react'
import { useDispatch } from 'react-redux'
import { toast } from 'sonner'

interface DeleteAthleteAlertProps {
	athleteID: number
}
export const DeleteAthleteAlert = ({ athleteID }: DeleteAthleteAlertProps) => {
	const dispatch = useDispatch()

	const handleDeleteAthlete = async () => {
		try {
			const response = await athletesService.deleteAthlete(athleteID)

			if ('message' in response) {
				toast.error(response.message)
				return
			}
			if (response.success) {
				dispatch(deleteAthleteFromStore(athleteID))
				toast.success('Atleta excluído com sucesso')
			}
		} catch (error) {
			console.error(error)
			toast.error('Erro ao excluir atleta')
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
					<span>Delete</span>
					<Trash size={18} />
				</Button>
			</AlertDialogTrigger>
			<AlertDialogContent>
				<AlertDialogHeader>
					<AlertDialogTitle>
						Are you sure you want to delete this user?
					</AlertDialogTitle>
					<AlertDialogDescription>
						This action cannot be undone. It will permanently delete the account
						and remove all data from our servers.
					</AlertDialogDescription>
				</AlertDialogHeader>
				<AlertDialogFooter>
					<AlertDialogCancel>Cancel</AlertDialogCancel>
					<AlertDialogAction
						onClick={handleDeleteAthlete}
						className="bg-red-600 text-white hover:bg-red-700"
					>
						Confirm
					</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	)
}
