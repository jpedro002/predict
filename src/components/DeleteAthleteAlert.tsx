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
				toast.success('Athlète supprimé avec succès')
			}
		} catch (error) {
			console.error(error)
			toast.error("Erreur lors de la suppression de l'athlète")
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
					<span>Supprimer</span>
					<Trash size={18} />
				</Button>
			</AlertDialogTrigger>
			<AlertDialogContent>
				<AlertDialogHeader>
					<AlertDialogTitle>
						Êtes-vous sûr de vouloir supprimer cet utilisateur ?
					</AlertDialogTitle>
					<AlertDialogDescription>
						Cette action ne peut pas être annulée. Elle supprimera
						définitivement le compte et retirera toutes les données de nos
						serveurs.
					</AlertDialogDescription>
				</AlertDialogHeader>
				<AlertDialogFooter>
					<AlertDialogCancel>Annuler</AlertDialogCancel>
					<AlertDialogAction
						onClick={handleDeleteAthlete}
						className="bg-red-600 text-white hover:bg-red-700"
					>
						Confirmer
					</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	)
}
