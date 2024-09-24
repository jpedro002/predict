import { Button } from '@/components/ui/button/button'
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from '@/components/ui/popover'
import { TableCell, TableRow } from '@/components/ui/table'
import { Ellipsis, Pencil } from 'lucide-react'
import { DeleteAthleteAlert } from './DeleteAthleteAlert'

interface AthleteManagementTableRowProps {
	id: number
	name: string
	statusDailyResponse: boolean
}

export const AthleteManagementTableRow = ({
	id,
	name,
	statusDailyResponse,
}: AthleteManagementTableRowProps) => {
	return (
		<TableRow key={id}>
			<TableCell className=" font-medium">{name}</TableCell>
			<TableCell>
				{statusDailyResponse ? (
					<div className="flex items-center gap-2">
						<div className="h-2 w-2 bg-green-600 rounded-full" />
						<span className="text-green-600 font-medium text-sm">
							Responded
						</span>
					</div>
				) : (
					<div className="flex items-center gap-2">
						<div className="h-2 w-2 bg-red-600 rounded-full" />
						<span className="text-red-600 font-medium text-sm">
							Not Responded
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
						<Button variant="ghost" className="flex w-full justify-between p-2">
							<span>Edit</span>
							<Pencil size={18} />
						</Button>
						<DeleteAthleteAlert />
					</PopoverContent>
				</Popover>
			</TableCell>
		</TableRow>
	)
}
