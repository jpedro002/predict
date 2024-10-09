import { Button } from '@/components/ui/button/button'
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from '@/components/ui/popover'
import { TableCell, TableRow } from '@/components/ui/table'
import { Ellipsis } from 'lucide-react'
import { useMemo } from 'react'
import { DeleteAthleteAlert } from './DeleteAthleteAlert'
import { UpdateAthleteModal } from './UpdateAthletModal'

interface AthleteManagementTableRowProps {
	id: number
	name: string
	statusDailyResponse: boolean
	email: string
}

export const AthleteManagementTableRow = ({
	id,
	name,
	statusDailyResponse,
	email,
}: AthleteManagementTableRowProps) => {
	const defaultValues = useMemo(() => {
		return {
			name,
			email,
		}
	}, [name, email])

	return (
		<TableRow key={id}>
			<TableCell className=" font-medium">{name}</TableCell>
			<TableCell>
				{statusDailyResponse ? (
					<div className="flex items-center gap-2">
						<div className="h-2 w-2 bg-green-600 rounded-full" />
						<span className="text-green-600 font-medium text-sm">Répondu</span>
					</div>
				) : (
					<div className="flex items-center gap-2">
						<div className="h-2 w-2 bg-red-600 rounded-full" />
						<span className="text-red-600 font-medium text-sm">
							Non Répondu
						</span>
					</div>
				)}
			</TableCell>

			<TableCell>
				<Popover>
					<PopoverTrigger asChild>
						<Button variant="ghost" className="size-10 p-2">
							<Ellipsis />
						</Button>
					</PopoverTrigger>
					<PopoverContent align="end" className="w-[200px]">
						<UpdateAthleteModal athleteID={id} defaultValues={defaultValues} />
						<DeleteAthleteAlert athleteID={id} />
					</PopoverContent>
				</Popover>
			</TableCell>
		</TableRow>
	)
}
