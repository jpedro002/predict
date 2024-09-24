import { Button } from '@/components/ui/button/button'
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from '@/components/ui/popover'
import { TableCell, TableRow } from '@/components/ui/table'
import { Ellipsis, Pencil } from 'lucide-react'
import { DeleteUserAlert } from './DeleteUserAlert'

interface UsersTableRowProps {
	id: number
	name: string
	email: string
	cargo: string
}

export const UsersTableRow = ({
	id,
	name,
	email,
	cargo,
}: UsersTableRowProps) => {
	return (
		<TableRow key={id}>
			<TableCell className=" font-medium">{name}</TableCell>
			<TableCell>{email}</TableCell>
			<TableCell>{cargo}</TableCell>
			<TableCell>
				<Popover>
					<PopoverTrigger asChild>
						<Button variant="ghost" className="size-10 p-2">
							<Ellipsis />
						</Button>
					</PopoverTrigger>
					<PopoverContent align="end" className="w-[200px]">
						<Button variant="ghost" className="flex w-full justify-between p-2">
							<span>Editar</span>
							<Pencil size={18} />
						</Button>
						<DeleteUserAlert />
					</PopoverContent>
				</Popover>
			</TableCell>
		</TableRow>
	)
}
