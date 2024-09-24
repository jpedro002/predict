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
import { Trash } from 'lucide-react'

interface DeleteAthleteAlertProps {
	onDelete?: () => void
}
export const DeleteAthleteAlert = ({ onDelete }: DeleteAthleteAlertProps) => {
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
						onClick={onDelete}
						className="bg-red-600 text-white hover:bg-red-700"
					>
						Confirm
					</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	)
}
